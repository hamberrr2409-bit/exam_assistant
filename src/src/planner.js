const MS_PER_DAY = 24 * 60 * 60 * 1000;

export const DEFAULT_WEIGHTS = Object.freeze({
  days: 40,
  weakness: 25,
  difficulty: 20,
  remainingTask: 15,
});

export const DEFAULT_PLAN_DAYS = 7;

function toDateOnly(value) {
  if (value instanceof Date) {
    return new Date(value.getFullYear(), value.getMonth(), value.getDate());
  }

  if (typeof value !== "string") {
    throw new TypeError("date value must be a Date or YYYY-MM-DD string");
  }

  const [year, month, day] = value.split("-").map(Number);
  if (!year || !month || !day) {
    throw new TypeError(`invalid date string: ${value}`);
  }

  return new Date(year, month - 1, day);
}

function formatDate(date) {
  const d = toDateOnly(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function addDays(date, days) {
  const result = toDateOnly(date);
  result.setDate(result.getDate() + days);
  return result;
}

function clamp(value, min, max) {
  const number = Number(value);
  if (!Number.isFinite(number)) return min;
  return Math.min(Math.max(number, min), max);
}

function round(value, digits = 2) {
  const factor = 10 ** digits;
  return Math.round((value + Number.EPSILON) * factor) / factor;
}

function normalizeCompletionRate(completionRate) {
  const rate = Number(completionRate);
  if (!Number.isFinite(rate)) return 0;
  return clamp(rate > 1 ? rate / 100 : rate, 0, 1);
}

function remainingHours(exam) {
  return Math.max(0, Number(exam.estimatedHours || 0) - Number(exam.completedHours || 0));
}

function daysUntil(examDate, referenceDate) {
  return Math.ceil((toDateOnly(examDate).getTime() - toDateOnly(referenceDate).getTime()) / MS_PER_DAY);
}

function validateExam(exam) {
  if (!exam || typeof exam !== "object") {
    throw new TypeError("exam must be an object");
  }

  if (!exam.subject || typeof exam.subject !== "string") {
    throw new TypeError("exam.subject must be a non-empty string");
  }

  toDateOnly(exam.examDate);
}

function priorityReason(exam, metrics) {
  const parts = [];

  if (metrics.daysUntilExam <= 7) {
    parts.push("考试很近");
  } else if (metrics.daysUntilExam <= 21) {
    parts.push("考试逐渐临近");
  } else {
    parts.push(`距离考试 ${metrics.daysUntilExam} 天`);
  }

  if (metrics.weaknessScore >= 4) parts.push("熟悉度偏低");
  if (metrics.difficultyScore >= 4) parts.push("难度较高");
  if (metrics.remainingTaskScore >= 16) parts.push("剩余复习量大");

  return parts.length ? parts.join("，") : "风险适中，按比例安排";
}

function buildTasks(exam, allocatedHours, options = {}) {
  const hours = round(allocatedHours, 1);
  if (hours <= 0) return [];

  const subject = exam.subject;
  const focusOnly = Boolean(options.focusOnly);

  const templates = {
    高数: focusOnly
      ? ["梳理导数/极限核心公式", "做高频题型和错题回看"]
      : ["梳理导数/极限公式", "完成典型计算题训练", "整理错题中的计算步骤"],
    会计学原理: focusOnly
      ? ["复盘借贷记账法高频规则", "练习核心分录题"]
      : ["复盘借贷记账法和会计等式", "完成分录题练习", "整理易错规则"],
    英语: focusOnly
      ? ["背诵作文模板和高频表达", "限时完成一组阅读题"]
      : ["积累阅读高频词", "完成阅读理解练习", "整理作文模板句"],
    马原: focusOnly
      ? ["背诵实践与认识核心概念", "复述高频论述题框架"]
      : ["背诵实践与认识概念", "整理概念对比表", "复述论述题答题框架"],
  };

  const fallback = focusOnly
    ? ["复习高频考点", "回看错题和薄弱知识点"]
    : ["复习核心知识点", "完成一组练习题", "整理错题和易错点"];

  const selected = templates[subject] || fallback;
  const taskCount = Math.min(selected.length, Math.max(1, Math.ceil(hours)));
  const timePerTask = round(hours / taskCount, 1);

  return selected.slice(0, taskCount).map((title, index) => ({
    id: `${subject}-${index + 1}`,
    title,
    estimatedHours: index === taskCount - 1
      ? round(hours - timePerTask * (taskCount - 1), 1)
      : timePerTask,
    focus: focusOnly ? "high_frequency" : "normal",
  }));
}

function isActiveExam(exam, referenceDate) {
  return !exam.isFinished && remainingHours(exam) > 0 && daysUntil(exam.examDate, referenceDate) >= 0;
}

function normalizePlan(plan) {
  if (Array.isArray(plan)) return { schedule: plan, dailyHours: 0, exams: [] };
  if (!plan || typeof plan !== "object") {
    throw new TypeError("plan must be a generated plan object or schedule array");
  }

  return {
    ...plan,
    schedule: Array.isArray(plan.schedule) ? plan.schedule : [],
    exams: Array.isArray(plan.exams) ? plan.exams : [],
  };
}

export function calculatePriority(exam, options = {}) {
  validateExam(exam);

  const referenceDate = options.referenceDate || new Date();
  const weights = { ...DEFAULT_WEIGHTS, ...(options.weights || {}) };
  const daysLeft = daysUntil(exam.examDate, referenceDate);
  const remainingDaysScore = daysLeft < 0 ? 0 : 1 / Math.max(daysLeft, 1);
  const weaknessScore = 6 - clamp(exam.familiarity, 1, 5);
  const difficultyScore = clamp(exam.difficulty, 1, 5);
  const remainingTaskScore = remainingHours(exam);

  if (exam.isFinished || daysLeft < 0 || remainingTaskScore <= 0) {
    return {
      subject: exam.subject,
      priority: 0,
      daysUntilExam: daysLeft,
      remainingHours: remainingTaskScore,
      reason: exam.isFinished ? "考试已结束" : "没有剩余复习任务",
      breakdown: {
        days: 0,
        weakness: 0,
        difficulty: 0,
        remainingTask: 0,
      },
    };
  }

  const breakdown = {
    days: round(remainingDaysScore * weights.days),
    weakness: round(weaknessScore * weights.weakness),
    difficulty: round(difficultyScore * weights.difficulty),
    remainingTask: round(remainingTaskScore * weights.remainingTask),
  };

  const priority = round(
    breakdown.days + breakdown.weakness + breakdown.difficulty + breakdown.remainingTask,
  );

  const metrics = {
    daysUntilExam: daysLeft,
    remainingHours: remainingTaskScore,
    remainingDaysScore,
    weaknessScore,
    difficultyScore,
    remainingTaskScore,
  };

  return {
    subject: exam.subject,
    priority,
    daysUntilExam: daysLeft,
    remainingHours: remainingTaskScore,
    reason: priorityReason(exam, metrics),
    breakdown,
  };
}

export function allocateTime(exams, dailyHours, options = {}) {
  if (!Array.isArray(exams)) {
    throw new TypeError("exams must be an array");
  }

  const referenceDate = options.referenceDate || new Date();
  const budget = Math.max(0, Number(dailyHours || 0));
  const active = exams
    .filter((exam) => isActiveExam(exam, referenceDate))
    .map((exam) => ({
      exam,
      metrics: calculatePriority(exam, { ...options, referenceDate }),
      allocatedHours: 0,
    }))
    .filter((item) => item.metrics.priority > 0);

  if (budget <= 0 || active.length === 0) return [];

  let remainingBudget = Math.min(budget, active.reduce((sum, item) => sum + item.metrics.remainingHours, 0));
  let candidates = active.slice();

  while (remainingBudget > 0.0001 && candidates.length > 0) {
    const totalPriority = candidates.reduce((sum, item) => sum + item.metrics.priority, 0);
    let capped = false;

    for (const item of candidates) {
      const share = remainingBudget * (item.metrics.priority / totalPriority);
      const cap = item.metrics.remainingHours - item.allocatedHours;
      if (share >= cap) {
        item.allocatedHours += cap;
        remainingBudget -= cap;
        capped = true;
      }
    }

    candidates = candidates.filter((item) => item.metrics.remainingHours - item.allocatedHours > 0.0001);

    if (!capped) {
      for (const item of candidates) {
        item.allocatedHours += remainingBudget * (item.metrics.priority / totalPriority);
      }
      remainingBudget = 0;
    }
  }

  return active
    .filter((item) => item.allocatedHours > 0)
    .sort((a, b) => b.metrics.priority - a.metrics.priority)
    .map((item) => ({
      subject: item.exam.subject,
      examDate: formatDate(item.exam.examDate),
      allocatedHours: round(item.allocatedHours, 1),
      priority: item.metrics.priority,
      daysUntilExam: item.metrics.daysUntilExam,
      remainingHours: round(item.metrics.remainingHours, 1),
      reason: item.metrics.reason,
      tasks: buildTasks(item.exam, item.allocatedHours, options),
      breakdown: item.metrics.breakdown,
    }));
}

export function generatePlan(exams, dailyHours, options = {}) {
  const days = Math.max(1, Number(options.days || DEFAULT_PLAN_DAYS));
  const startDate = toDateOnly(options.startDate || options.referenceDate || new Date());
  const simulatedExams = exams.map((exam) => ({ ...exam }));
  const schedule = [];

  for (let dayIndex = 0; dayIndex < days; dayIndex += 1) {
    const currentDate = addDays(startDate, dayIndex);
    const subjects = allocateTime(simulatedExams, dailyHours, {
      ...options,
      referenceDate: currentDate,
    });

    for (const subjectPlan of subjects) {
      const exam = simulatedExams.find((item) => item.subject === subjectPlan.subject);
      if (exam) {
        exam.completedHours = round(Number(exam.completedHours || 0) + subjectPlan.allocatedHours, 1);
      }
    }

    const totalAllocatedHours = round(
      subjects.reduce((sum, item) => sum + item.allocatedHours, 0),
      1,
    );

    schedule.push({
      date: formatDate(currentDate),
      dailyHours: Number(dailyHours),
      totalAllocatedHours,
      subjects,
      summary: subjects.length
        ? `今日重点：${subjects.map((item) => item.subject).join("、")}`
        : "今日没有待安排复习任务",
    });
  }

  return {
    generatedAt: formatDate(startDate),
    dailyHours: Number(dailyHours),
    days,
    strategy: "normal",
    exams: exams.map((exam) => ({ ...exam })),
    schedule,
  };
}

export function generateTodayTasks(plan, options = {}) {
  const normalized = normalizePlan(plan);
  const targetDate = formatDate(options.date || normalized.generatedAt || new Date());
  const dayPlan = normalized.schedule.find((day) => day.date === targetDate) || normalized.schedule[0];

  if (!dayPlan) return [];

  return dayPlan.subjects.flatMap((subjectPlan) => subjectPlan.tasks.map((task) => ({
    id: `${dayPlan.date}-${subjectPlan.subject}-${task.id}`,
    date: dayPlan.date,
    subject: subjectPlan.subject,
    allocatedHours: subjectPlan.allocatedHours,
    priority: subjectPlan.priority,
    title: task.title,
    estimatedHours: task.estimatedHours,
    done: false,
  })));
}

function compressLowPrioritySubjects(schedule) {
  return schedule.map((day) => {
    const priorities = day.subjects.map((item) => item.priority).sort((a, b) => a - b);
    const median = priorities[Math.floor(priorities.length / 2)] || 0;
    const subjects = day.subjects.map((item) => {
      if (item.priority >= median) return item;

      const allocatedHours = round(item.allocatedHours * 0.8, 1);
      return {
        ...item,
        allocatedHours,
        reason: `${item.reason}；完成率一般，低优先级任务轻微压缩`,
        tasks: item.tasks.slice(0, Math.max(1, item.tasks.length - 1)),
      };
    });

    return {
      ...day,
      totalAllocatedHours: round(subjects.reduce((sum, item) => sum + item.allocatedHours, 0), 1),
      subjects,
      summary: `${day.summary}；已压缩低优先级任务`,
    };
  });
}

function focusHighPrioritySubjects(schedule) {
  return schedule.map((day) => {
    const subjects = day.subjects
      .slice()
      .sort((a, b) => b.priority - a.priority)
      .slice(0, Math.min(2, day.subjects.length))
      .map((item) => ({
        ...item,
        reason: `${item.reason}；完成率偏低，仅保留临近考试和高频考点`,
        tasks: buildTasks({ subject: item.subject }, item.allocatedHours, { focusOnly: true }),
      }));

    return {
      ...day,
      totalAllocatedHours: round(subjects.reduce((sum, item) => sum + item.allocatedHours, 0), 1),
      subjects,
      summary: subjects.length
        ? `应急重点：${subjects.map((item) => item.subject).join("、")}`
        : "今日没有可保留的高优先级任务",
    };
  });
}

export function adjustPlan(plan, completionRate) {
  const normalized = normalizePlan(plan);
  const rate = normalizeCompletionRate(completionRate);

  if (rate >= 0.8) {
    return {
      ...normalized,
      strategy: "keep",
      adjustment: {
        completionRate: round(rate, 2),
        message: "完成率达到 80% 以上，保持原计划。",
      },
    };
  }

  if (rate >= 0.5) {
    return {
      ...normalized,
      strategy: "compress_low_priority",
      schedule: compressLowPrioritySubjects(normalized.schedule),
      adjustment: {
        completionRate: round(rate, 2),
        message: "完成率在 50%-80% 之间，轻微压缩低优先级任务。",
      },
    };
  }

  return {
    ...normalized,
    strategy: "focus_high_priority",
    schedule: focusHighPrioritySubjects(normalized.schedule),
    adjustment: {
      completionRate: round(rate, 2),
      message: "完成率低于 50%，重新聚焦临近考试和高频考点。",
    },
  };
}
