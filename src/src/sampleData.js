import {
  adjustPlan,
  allocateTime,
  calculatePriority,
  generatePlan,
  generateTodayTasks,
} from "./planner.js";
import { fileURLToPath } from "node:url";

export const sampleExams = [
  {
    subject: "高数",
    examDate: "2026-06-20",
    familiarity: 2,
    difficulty: 5,
    estimatedHours: 24,
    completedHours: 4,
    isFinished: false,
  },
  {
    subject: "会计学原理",
    examDate: "2026-06-21",
    familiarity: 3,
    difficulty: 4,
    estimatedHours: 18,
    completedHours: 2,
    isFinished: false,
  },
  {
    subject: "英语",
    examDate: "2026-06-23",
    familiarity: 3,
    difficulty: 3,
    estimatedHours: 16,
    completedHours: 3,
    isFinished: false,
  },
  {
    subject: "马原",
    examDate: "2026-06-25",
    familiarity: 4,
    difficulty: 2,
    estimatedHours: 10,
    completedHours: 2,
    isFinished: false,
  },
];

export function runDemo() {
  const referenceDate = "2026-05-04";
  const dailyHours = 4;
  const plan = generatePlan(sampleExams, dailyHours, {
    days: 7,
    referenceDate,
  });

  return {
    priorities: sampleExams.map((exam) => calculatePriority(exam, { referenceDate })),
    allocation: allocateTime(sampleExams, dailyHours, { referenceDate }),
    plan,
    todayTasks: generateTodayTasks(plan, { date: referenceDate }),
    adjustedPlan: adjustPlan(plan, 0.45),
  };
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  console.log(JSON.stringify(runDemo(), null, 2));
}
