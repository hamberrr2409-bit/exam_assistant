const tools = window.ExamAssistantAITools;

const subjectEl = document.querySelector("#subject");
const topicEl = document.querySelector("#topic");
const difficultyEl = document.querySelector("#difficulty");
const contentEl = document.querySelector("#content");
const paperTextEl = document.querySelector("#paperText");
const resultEl = document.querySelector("#result");
const statusEl = document.querySelector("#status");
const fillDemoBtn = document.querySelector("#fillDemo");
const generateDailyPackBtn = document.querySelector("#generateDailyPack");
const dailyPackResultEl = document.querySelector("#dailyPackResult");
const dailyPackPanelEl = document.querySelector(".daily-pack-panel");
const debugWorkspaceEl = document.querySelector(".debug-workspace");
let latestDailyPackOutput = null;
const quizTimerIntervals = new WeakMap();

if (dailyPackPanelEl && debugWorkspaceEl) {
  debugWorkspaceEl.before(dailyPackPanelEl);
}
let activePodcastButton = null;
let activePodcastPlayer = null;
let currentPodcastText = "";
let currentPodcastRate = 0.92;
let currentPodcastChunks = [];
let currentPodcastChunkIndex = 0;
let currentPodcastSpokenChars = 0;
let podcastProgressTimer = null;

const demoData = {
  subject: "高数",
  topic: "导数",
  content: [
    "导数表示函数在某点的瞬时变化率。",
    "导数的几何意义是曲线在该点切线的斜率。",
    "可导一定连续，但连续不一定可导。",
    "复合函数求导时要注意链式法则。"
  ].join("\n"),
  paperText: [
    "一、选择题：导数的几何意义是什么？",
    "二、填空题：求函数的导数。",
    "三、计算题：利用导数判断函数单调性。",
    "四、选择题：极限的基本计算。",
    "五、计算题：导数与极限综合应用。",
    "六、简答题：实践与认识的关系。"
  ].join("\n")
};

const accountingDemoData = {
  subject: "会计学原理",
  topic: "借贷记账法",
  content: [
    "借贷记账法要求有借必有贷，借贷必相等。",
    "资产类账户借方登记增加，贷方登记减少。",
    "负债和所有者权益类账户贷方登记增加，借方登记减少。",
    "写会计分录前要先判断账户性质，再判断增加或减少。",
    "会计等式为：资产 = 负债 + 所有者权益。"
  ].join("\n"),
  paperText: [
    "一、选择题：会计等式的基本形式是什么？",
    "二、判断题：借贷记账法要求有借必有贷，借贷必相等。",
    "三、业务题：购入原材料一批，款项尚未支付，请编制会计分录。",
    "四、业务题：收到投资者投入资本，请编制会计分录。",
    "五、选择题：资产类账户增加应登记在哪一方？"
  ].join("\n")
};

const dailyTasks = [
  {
    subject: "高数",
    topic: "导数",
    allocatedMinutes: 96,
    content: demoData.content,
    pastPaperText: demoData.paperText
  },
  {
    subject: "会计学原理",
    topic: "借贷记账法",
    allocatedMinutes: 66,
    content: accountingDemoData.content,
    pastPaperText: accountingDemoData.paperText
  },
  {
    subject: "英语",
    topic: "阅读理解",
    allocatedMinutes: 48,
    content: "阅读理解需要先看题干关键词，再回原文定位。主旨题关注首尾段和转折句。细节题不要凭印象作答，要回到原文找同义替换。",
    pastPaperText: "阅读理解 主旨题 细节题 推断题 作文 阅读理解"
  },
  {
    subject: "马克思主义原理",
    topic: "实践与认识",
    allocatedMinutes: 30,
    content: "实践是认识的来源、动力、目的和检验标准。认识对实践具有反作用。材料题要结合材料，不要只背原理。",
    pastPaperText: "实践与认识 实践 真理 认识 材料分析题"
  }
];

if (fillDemoBtn) {
fillDemoBtn.addEventListener("click", () => {
  subjectEl.value = demoData.subject;
  topicEl.value = demoData.topic;
  contentEl.value = demoData.content;
  paperTextEl.value = demoData.paperText;
  statusEl.textContent = "已填入示例";
});
}

const accountingButton = document.querySelector("#fillAccountingDemo");
if (accountingButton) {
  accountingButton.addEventListener("click", () => {
    subjectEl.value = accountingDemoData.subject;
    topicEl.value = accountingDemoData.topic;
    contentEl.value = accountingDemoData.content;
    paperTextEl.value = accountingDemoData.paperText;
    if (statusEl) statusEl.textContent = "已填入会计示例";
  });
}

if (generateDailyPackBtn) {
  generateDailyPackBtn.addEventListener("click", () => {
    const output = tools.generateDailyStudyPacks(getDailyTasksFromConfig(), "2026-06-01");
    latestDailyPackOutput = output;
    renderDailyStudyPacks(output);
    if (statusEl) statusEl.textContent = "已生成今日多科学习包";
    dailyPackResultEl?.scrollIntoView({ behavior: "smooth", block: "start" });
  });
}

if (dailyPackResultEl) {
  dailyPackResultEl.addEventListener("click", (event) => {
    const podcastButton = event.target.closest("[data-podcast-action]");
    if (podcastButton) {
      handlePodcastAction(podcastButton);
      return;
    }

    const flashcardNav = event.target.closest("[data-flashcard-nav]");
    if (flashcardNav) {
      moveFlashcard(flashcardNav);
      return;
    }

    const flashcard = event.target.closest("[data-flashcard]");
    if (flashcard) {
      toggleFlashcard(flashcard);
      return;
    }

    const submitButton = event.target.closest("[data-quiz-submit]");
    if (submitButton) {
      revealQuizAnswer(submitButton);
      return;
    }
    const submitAllButton = event.target.closest("[data-quiz-submit-all]");
    if (submitAllButton) {
      gradeQuiz(submitAllButton);
      return;
    }
    const retryWrongButton = event.target.closest("[data-retry-wrong]");
    if (retryWrongButton) {
      retryWrongQuestions(retryWrongButton);
      return;
    }
    const timerStartButton = event.target.closest("[data-timer-start]");
    if (timerStartButton) {
      toggleQuizTimer(timerStartButton);
      return;
    }
    const timerResetButton = event.target.closest("[data-timer-reset]");
    if (timerResetButton) {
      resetQuizTimer(timerResetButton);
      return;
    }
    const chatButton = event.target.closest("[data-quiz-chat-send]");
    if (chatButton) {
      sendQuizChat(chatButton);
      return;
    }

    const button = event.target.closest("[data-pack-material]");
    if (!button || !latestDailyPackOutput) {
      return;
    }

    const pack = latestDailyPackOutput.studyPacks[Number(button.dataset.packIndex)];
    const materialKey = button.dataset.packMaterial;
    const material = pack?.materials?.[materialKey];
    const detailEl = dailyPackResultEl.querySelector("#dailyPackDetail");
    if (!pack || !material || !detailEl) {
      return;
    }

    dailyPackResultEl.querySelectorAll(".pack-action.is-active").forEach((item) => {
      item.classList.remove("is-active");
    });
    button.classList.add("is-active");
    dailyPackResultEl.querySelectorAll(".pack-inline-detail").forEach((item) => {
      item.innerHTML = "";
      item.classList.add("is-hidden");
      item.closest(".pack-card")?.classList.remove("is-expanded");
    });
    const packCardEl = button.closest(".pack-card");
    const inlineDetailEl = packCardEl?.querySelector(".pack-inline-detail");
    const targetDetailEl = inlineDetailEl || detailEl;
    targetDetailEl.innerHTML = `
      <div class="daily-detail-title">
        <span>${escapeHtml(pack.subject)} · ${escapeHtml(pack.topic)}</span>
        <strong>${escapeHtml(materialLabel(materialKey))}</strong>
      </div>
      ${materialDetailHtml(material)}
    `;
    targetDetailEl.classList.remove("is-hidden");
    packCardEl?.classList.add("is-expanded");
    targetDetailEl.scrollIntoView({ behavior: "smooth", block: "nearest" });
    if (statusEl) statusEl.textContent = `已打开：${pack.subject} ${materialLabel(materialKey)}`;
  });
}

if (resultEl) {
  resultEl.addEventListener("click", (event) => {
    const podcastButton = event.target.closest("[data-podcast-action]");
    if (podcastButton) {
      handlePodcastAction(podcastButton);
      return;
    }

    const flashcardNav = event.target.closest("[data-flashcard-nav]");
    if (flashcardNav) {
      moveFlashcard(flashcardNav);
      return;
    }

    const flashcard = event.target.closest("[data-flashcard]");
    if (flashcard) {
      toggleFlashcard(flashcard);
      return;
    }

    const submitButton = event.target.closest("[data-quiz-submit]");
    if (submitButton) {
      revealQuizAnswer(submitButton);
      return;
    }
    const submitAllButton = event.target.closest("[data-quiz-submit-all]");
    if (submitAllButton) {
      gradeQuiz(submitAllButton);
      return;
    }
    const retryWrongButton = event.target.closest("[data-retry-wrong]");
    if (retryWrongButton) {
      retryWrongQuestions(retryWrongButton);
      return;
    }
    const timerStartButton = event.target.closest("[data-timer-start]");
    if (timerStartButton) {
      toggleQuizTimer(timerStartButton);
      return;
    }
    const timerResetButton = event.target.closest("[data-timer-reset]");
    if (timerResetButton) {
      resetQuizTimer(timerResetButton);
      return;
    }
    const chatButton = event.target.closest("[data-quiz-chat-send]");
    if (chatButton) {
      sendQuizChat(chatButton);
    }
  });
}

document.querySelectorAll("[data-action]").forEach((button) => {
  button.addEventListener("click", () => {
    const input = getInput();
    const action = button.dataset.action;
    const output = generate(action, input);
    render(output);
    statusEl.textContent = `已生成：${button.textContent}`;
  });
});

document.addEventListener("input", (event) => {
  const input = event.target.closest?.("[data-timer-minutes]");
  const timerEl = input?.closest("[data-quiz-timer]");
  if (!timerEl || quizTimerIntervals.get(timerEl)) {
    return;
  }
  const seconds = readTimerInputSeconds(timerEl);
  timerEl.dataset.initialSeconds = String(seconds);
  timerEl.dataset.secondsLeft = String(seconds);
  const displayEl = timerEl.querySelector("[data-timer-display]");
  if (displayEl) {
    displayEl.textContent = formatTime(seconds);
  }
});

document.addEventListener("change", (event) => {
  const input = event.target.closest?.("[data-daily-files]");
  if (!input) {
    return;
  }
  renderDailyFileList(input);
});

function getInput() {
  return {
    subject: subjectEl.value.trim() || "未命名科目",
    topic: topicEl.value.trim() || "综合复习",
    difficulty: difficultyEl.value,
    content: contentEl.value.trim(),
    paperText: paperTextEl.value.trim()
  };
}

function getDailyTasksFromConfig() {
  return dailyTasks.map((task, index) => {
    const topicInput = document.querySelector(`[data-daily-topic="${index}"]`);
    const minutesInput = document.querySelector(`[data-daily-minutes="${index}"]`);
    const uploadedFiles = getDailyUploadedFiles(index);
    const fileSummary = buildUploadedFileSummary(uploadedFiles);
    const examFileSummary = buildExamFileSummary(uploadedFiles);
    return {
      ...task,
      topic: topicInput?.value.trim() || task.topic,
      allocatedMinutes: Math.max(10, Number(minutesInput?.value || task.allocatedMinutes)),
      uploadedFiles,
      content: fileSummary ? `${task.content}\n上传资料：${fileSummary}` : task.content,
      pastPaperText: examFileSummary ? `${task.pastPaperText || ""}\n上传真题/试卷：${examFileSummary}` : task.pastPaperText
    };
  });
}

function getDailyUploadedFiles(index) {
  const input = document.querySelector(`[data-daily-files="${index}"]`);
  return Array.from(input?.files || []).map((file) => ({
    name: file.name,
    type: file.type || inferFileType(file.name),
    size: file.size
  }));
}

function renderDailyFileList(input) {
  const index = input.dataset.dailyFiles;
  const listEl = document.querySelector(`[data-file-list="${index}"]`);
  const files = Array.from(input.files || []);
  if (!listEl) {
    return;
  }
  listEl.innerHTML = files.length
    ? files.map((file) => `<span>${escapeHtml(file.name)} · ${formatFileSize(file.size)}</span>`).join("")
    : "未上传文件";
}

function buildUploadedFileSummary(files) {
  if (!files.length) {
    return "";
  }
  return files.map((file) => `${file.name}（${formatFileSize(file.size)}）`).join("；");
}

function buildExamFileSummary(files) {
  return files
    .filter((file) => /真题|试卷|考试|题|paper|exam/i.test(file.name))
    .map((file) => file.name)
    .join("；");
}

function inferFileType(name) {
  const ext = String(name || "").split(".").pop()?.toLowerCase();
  const labels = {
    pdf: "PDF",
    doc: "Word",
    docx: "Word",
    ppt: "PPT",
    pptx: "PPT",
    txt: "Text",
    md: "Markdown",
    png: "Image",
    jpg: "Image",
    jpeg: "Image"
  };
  return labels[ext] || "File";
}

function formatFileSize(size) {
  const value = Number(size) || 0;
  if (value >= 1024 * 1024) {
    return `${(value / 1024 / 1024).toFixed(1)} MB`;
  }
  if (value >= 1024) {
    return `${Math.round(value / 1024)} KB`;
  }
  return `${value} B`;
}

function generate(action, input) {
  if (action === "cheat") {
    return tools.generateCheatSheet(input.subject, input.content, input.topic, {
      pastPaperText: input.paperText
    });
  }
  if (action === "quiz") {
    return tools.generateQuiz(input.subject, input.topic, {
      difficulty: input.difficulty,
      count: 5,
      content: input.content,
      pastPaperText: input.paperText
    });
  }
  if (action === "flashcards") {
    return tools.generateFlashcards(input.subject, input.content, input.topic);
  }
  if (action === "podcast") {
    return tools.generatePodcastScript(input.subject, input.content, input.topic);
  }
  return tools.analyzeKeyPoints(input.paperText, input.subject);
}

function render(output) {
  if (output.type === "cheat_sheet") {
    renderCheatSheet(output);
  } else if (output.type === "quiz") {
    renderQuiz(output);
  } else if (output.type === "flashcards") {
    renderFlashcards(output);
  } else if (output.type === "podcast_script") {
    renderPodcast(output);
  } else if (output.type === "key_point_analysis") {
    renderAnalysis(output);
  }
}

function renderCheatSheet(data) {
  resultEl.innerHTML = `
    <h2>${escapeHtml(data.title)}</h2>
    <div class="source-note">
      <strong>生成依据：</strong>${escapeHtml(data.source.primary)}
      <span>${escapeHtml(data.source.noteSummary)}</span>
    </div>
    <div class="cheat-hero">
      <span>核心概念</span>
      <strong>${escapeHtml(data.content.coreConcept)}</strong>
    </div>
    ${section("重点知识卡", cheatKnowledgeCards(data))}
    ${section("必背公式/核心表达", sourceList(data.content.sourceMap.coreFormulas))}
    ${section("易错辨析", sourceList(data.content.sourceMap.mistakes))}
    ${section("解题步骤", sourceOrderedList(data.content.sourceMap.steps))}
    ${section("答题模板", list(data.content.answerTemplate))}
    <div class="script-box"><strong>记忆口诀：</strong>${escapeHtml(data.content.memoryTip)}</div>
  `;
}

function renderQuiz(data) {
  resultEl.innerHTML = `
    <h2>${escapeHtml(data.subject)}《${escapeHtml(data.topic)}》自测题</h2>
    <div class="source-note">
      <strong>难度：${escapeHtml(data.difficulty)}</strong>
      <span>${escapeHtml(data.reviewSuggestion)}</span>
    </div>
    <div class="source-note">
      <strong>出题依据：${escapeHtml(data.source.primary)}</strong>
      <span>${escapeHtml(data.source.noteSummary)}${data.source.examPointCount ? ` 已识别 ${data.source.examPointCount} 个真题高频考点。` : ""}</span>
    </div>
    ${quizSetHtml(data.questions, data)}
    ${jsonBlock(data)}
  `;
}

function renderFlashcards(data) {
  resultEl.innerHTML = `
    <h2>${escapeHtml(data.subject)}《${escapeHtml(data.topic)}》复习闪卡</h2>
    ${flashcardsHtml(data.cards)}
  `;
}

function renderPodcast(data) {
  resultEl.innerHTML = `
    <h2>${escapeHtml(data.title)}</h2>
    ${podcastPlayerHtml(data)}
  `;
}

function renderAnalysis(data) {
  const summary = data.sourceSummary || {};
  const overview = data.overview || {};
  resultEl.innerHTML = `
    <div class="analysis-head">
      <div>
        <h2>${escapeHtml(data.subject)}高频考点分析</h2>
        <p>${escapeHtml(summary.method || "规则识别分析")}</p>
      </div>
      <div class="analysis-metrics">
        <span><strong>${summary.totalQuestions || 0}</strong>题样本</span>
        <span><strong>${Math.round((summary.coverageRate || 0) * 100)}%</strong>识别率</span>
        ${summary.ignoredCrossSubjectPoints ? `<span><strong>${summary.ignoredCrossSubjectPoints}</strong>条降噪</span>` : ""}
      </div>
    </div>
    <section class="analysis-overview">
      <strong>${escapeHtml(overview.conclusion || "已完成真题考点聚合。")}</strong>
      <p>${escapeHtml(overview.riskNote || "")}</p>
      ${overview.reviewOrder?.length ? `
        <div class="review-order">
          ${overview.reviewOrder.map((point, index) => `<span>${index + 1}. ${escapeHtml(point)}</span>`).join("")}
        </div>
      ` : ""}
    </section>
    ${data.keyPoints
      .map((item) => `
        <article class="key-point">
          <div class="key-point-top">
            <span class="rank">#${item.priority || 1}</span>
            <div>
              <strong>${escapeHtml(item.point)}</strong>
              <p>${escapeHtml(item.possibleQuestionTypes.join("、"))}</p>
            </div>
            <span class="heat heat-${heatClass(item.heatLevel)}">${escapeHtml(item.heatLevel || "低")}频</span>
          </div>
          <div class="key-point-stats">
            <span>${item.count} 次出现</span>
            <span>权重 ${item.score || item.count}</span>
            <span>置信度 ${Math.round((item.confidence || 0) * 100)}%</span>
          </div>
          <p><strong>复习建议：</strong>${escapeHtml(item.suggestion)}</p>
          ${item.drillPlan ? `<p><strong>训练动作：</strong>${escapeHtml(item.drillPlan)}</p>` : ""}
          ${item.evidence?.length ? `<div class="evidence-list"><strong>题目依据</strong>${item.evidence.map((text) => `<blockquote>${escapeHtml(text)}</blockquote>`).join("")}</div>` : ""}
        </article>
      `)
      .join("")}
    ${jsonBlock(data)}
  `;
}

function heatClass(level) {
  if (level === "高") return "high";
  if (level === "中") return "mid";
  return "low";
}

function renderDailyStudyPacks(data) {
  dailyPackResultEl.innerHTML = `
    <div class="daily-pack-header">
      <strong>${escapeHtml(data.date)} 今日学习包</strong>
      <span>共 ${data.totalSubjects} 门课</span>
    </div>
    <div class="pack-grid">
      ${data.studyPacks.map((pack, packIndex) => `
        <article class="pack-card">
          <div>
            <span class="tag">${pack.allocatedMinutes} 分钟</span>
            <h3>${escapeHtml(pack.subject)} · ${escapeHtml(pack.topic)}</h3>
            <p>${escapeHtml(pack.taskGoal)}</p>
            ${pack.uploadedFiles?.length ? `<p class="pack-source-files">已接入资料：${pack.uploadedFiles.map((file) => escapeHtml(file.name)).join("、")}</p>` : ""}
          </div>
          <div class="pack-actions">
            ${pack.materialTypes.map((type) => `
              <button type="button" class="pack-action" data-pack-index="${packIndex}" data-pack-material="${escapeHtml(type)}">
                ${materialLabel(type)}
              </button>
            `).join("")}
          </div>
          <div class="pack-inline-detail is-hidden"></div>
        </article>
      `).join("")}
    </div>
    <div class="daily-pack-detail is-hidden" id="dailyPackDetail"></div>
  `;
}

function materialDetailHtml(data) {
  if (data.type === "cheat_sheet") {
    return `
      <div class="cheat-hero">
        <span>核心概念</span>
        <strong>${escapeHtml(data.content.coreConcept)}</strong>
      </div>
      ${section("重点知识卡", cheatKnowledgeCards(data))}
      ${section("必背公式/核心表达", sourceList(data.content.sourceMap.coreFormulas))}
      ${section("易错辨析", sourceList(data.content.sourceMap.mistakes))}
      ${section("解题步骤", sourceOrderedList(data.content.sourceMap.steps))}
      ${section("答题模板", list(data.content.answerTemplate))}
    `;
  }
  if (data.type === "quiz") {
    return quizSetHtml(data.questions, data);
  }
  if (data.type === "flashcards") {
    return flashcardsHtml(data.cards);
  }
  if (data.type === "podcast_script") {
    return podcastPlayerHtml(data);
  }
  if (data.type === "key_point_analysis") {
    return analysisDetailHtml(data);
  }
  return `<pre class="json-view">${escapeHtml(JSON.stringify(data, null, 2))}</pre>`;
}

function analysisDetailHtml(data) {
  const summary = data.sourceSummary || {};
  const overview = data.overview || {};
  return `
    <div class="analysis-head compact">
      <div>
        <h3>${escapeHtml(data.subject)}高频考点分析</h3>
        <p>${escapeHtml(summary.method || "规则识别分析")}</p>
      </div>
      <div class="analysis-metrics">
        <span><strong>${summary.totalQuestions || 0}</strong>题样本</span>
        <span><strong>${Math.round((summary.coverageRate || 0) * 100)}%</strong>识别率</span>
        ${summary.ignoredCrossSubjectPoints ? `<span><strong>${summary.ignoredCrossSubjectPoints}</strong>条降噪</span>` : ""}
      </div>
    </div>
    <section class="analysis-overview">
      <strong>${escapeHtml(overview.conclusion || "已完成真题考点聚合。")}</strong>
      <p>${escapeHtml(overview.riskNote || "")}</p>
      ${overview.reviewOrder?.length ? `
        <div class="review-order">
          ${overview.reviewOrder.map((point, index) => `<span>${index + 1}. ${escapeHtml(point)}</span>`).join("")}
        </div>
      ` : ""}
    </section>
    ${data.keyPoints
      .map((item) => `
        <article class="key-point">
          <div class="key-point-top">
            <span class="rank">#${item.priority || 1}</span>
            <div>
              <strong>${escapeHtml(item.point)}</strong>
              <p>${escapeHtml((item.possibleQuestionTypes || []).join("、"))}</p>
            </div>
            <span class="heat heat-${heatClass(item.heatLevel)}">${escapeHtml(item.heatLevel || "低")}频</span>
          </div>
          <div class="key-point-stats">
            <span>${item.count || 0} 次出现</span>
            <span>权重 ${item.score || item.count || 0}</span>
            <span>置信度 ${Math.round((item.confidence || 0) * 100)}%</span>
          </div>
          <p><strong>复习建议：</strong>${escapeHtml(item.suggestion || "优先回看相关知识点，并做同类题。")}</p>
          ${item.drillPlan ? `<p><strong>训练动作：</strong>${escapeHtml(item.drillPlan)}</p>` : ""}
          ${item.evidence?.length ? `<div class="evidence-list"><strong>题目依据</strong>${item.evidence.map((text) => `<blockquote>${escapeHtml(text)}</blockquote>`).join("")}</div>` : ""}
        </article>
      `)
      .join("")}
  `;
}

function quizSetHtml(questions, context = {}) {
  const safeQuestions = Array.isArray(questions) ? questions : [];
  return `
    <div class="quiz-set" data-quiz-set data-quiz-subject="${escapeHtml(context.subject || "")}" data-quiz-topic="${escapeHtml(context.topic || "")}">
      <div class="quiz-main">
        ${quizTimerHtml(safeQuestions.length)}
        ${safeQuestions.map(quizQuestionHtml).join("")}
        ${quizSummaryHtml(safeQuestions.length, context)}
      </div>
    </div>
  `;
}

function quizTimerHtml(total) {
  const seconds = 0;
  return `
    <div class="quiz-timer" data-quiz-timer data-seconds-left="${seconds}" data-initial-seconds="${seconds}">
      <div>
        <span class="timer-label">限时练习</span>
        <strong data-timer-display>${formatTime(seconds)}</strong>
      </div>
      <label class="timer-config">
        自定义分钟
        <input type="number" min="0" max="180" step="1" value="0" data-timer-minutes />
      </label>
      <div class="timer-actions">
        <button type="button" data-timer-start>开始</button>
        <button type="button" data-timer-reset>重置</button>
      </div>
    </div>
  `;
}

function quizQuestionHtml(question, index) {
  const fieldName = `quiz-${index}-${Math.random().toString(36).slice(2)}`;
  return `
    <article class="question" data-quiz-question data-answer="${escapeHtml(question.answer)}" data-question-type="${escapeHtml(question.type || "")}" data-knowledge-point="${escapeHtml(question.knowledgePoint || inferQuizKnowledgePoint(question))}" data-review-action="${escapeHtml(question.reviewAction || "")}">
      <div class="question-meta">
        <span class="tag">${quizTypeLabel(question.type)}</span>
        ${question.source ? `<span class="tag">${quizSourceLabel(question.source)}</span>` : ""}
        <span class="knowledge-tag">考查：${escapeHtml(question.knowledgePoint || inferQuizKnowledgePoint(question))}</span>
      </div>
      <p class="question-title"><strong>${index + 1}. ${escapeHtml(question.question)}</strong></p>
      ${quizAnswerInput(question, fieldName)}
      <button type="button" class="submit-answer" data-quiz-submit>提交本题</button>
      <p class="question-feedback" data-question-feedback></p>
      <div class="answer-panel is-hidden">
        <p><strong>答案：</strong>${escapeHtml(question.answer)}</p>
        <p><strong>解析：</strong>${escapeHtml(question.explanation)}</p>
        <p><strong>错因提示：</strong>${escapeHtml(question.wrongReason)}</p>
        ${question.reviewAction ? `<p><strong>复习动作：</strong>${escapeHtml(question.reviewAction)}</p>` : ""}
      </div>
    </article>
  `;
}

function buildQuizChatSeed(context = {}) {
  const subject = `${context.subject || ""} ${context.topic || ""}`;
  if (/会计|借贷|分录|资产|负债|租金|折旧/.test(subject)) {
    return "你可以问我：这笔业务为什么借现金？预付租金月末怎么调整？折旧为什么贷累计折旧？";
  }
  if (/英语|阅读|作文|翻译/.test(subject)) {
    return "你可以问我：细节题怎么定位？为什么这个选项是同义替换？主旨题怎么排除过窄选项？";
  }
  if (/马原|马克思|实践|认识|真理|矛盾/.test(subject)) {
    return "你可以问我：这个材料应该套哪个原理？实践和认识怎么组织答案？简答题怎么写得完整？";
  }
  return "你可以问我：为什么这题答案是 5f'(x0)？导数定义怎么拆？我这一步错在哪里？";
}

function buildQuizChatPlaceholder(context = {}) {
  const subject = `${context.subject || ""} ${context.topic || ""}`;
  if (/会计|借贷|分录|资产|负债|租金|折旧/.test(subject)) {
    return "输入你的疑问，例如：为什么预收款要转收入？";
  }
  if (/英语|阅读|作文|翻译/.test(subject)) {
    return "输入你的疑问，例如：细节题怎么找同义替换？";
  }
  if (/马原|马克思|实践|认识|真理|矛盾/.test(subject)) {
    return "输入你的疑问，例如：材料题怎么扣原理？";
  }
  return "输入你的疑问，例如：为什么要拆成两段？";
}

function quizSummaryHtml(total, context = {}) {
  return `
    <div class="quiz-summary" data-quiz-summary data-total="${total}">
      <button type="button" class="submit-quiz" data-quiz-submit-all>提交整套自测</button>
      <div class="quiz-score is-hidden" data-quiz-score></div>
      <div class="weak-report is-hidden" data-weak-report></div>
      <div class="wrong-flow is-hidden" data-wrong-flow></div>
      <div class="quiz-chat" data-quiz-chat>
        <div class="quiz-chat-title">
          <strong>疑问对话</strong>
          <span>可以追问解析、错因或同类题思路</span>
        </div>
        <div class="quiz-chat-messages" data-quiz-chat-messages>
          <div class="chat-message assistant">${escapeHtml(buildQuizChatSeed(context))}</div>
        </div>
        <div class="quiz-chat-input">
          <input type="text" data-quiz-chat-input placeholder="${escapeHtml(buildQuizChatPlaceholder(context))}" />
          <button type="button" data-quiz-chat-send>发送</button>
        </div>
      </div>
    </div>
  `;
}

function quizAnswerInput(question, fieldName) {
  if (question.options?.length) {
    return `
      <div class="quiz-options">
        ${question.options.map((option, optionIndex) => `
          <label class="quiz-option">
            <input type="radio" name="${fieldName}" value="${escapeHtml(option)}" />
            <span>${String.fromCharCode(65 + optionIndex)}. ${escapeHtml(option)}</span>
          </label>
        `).join("")}
      </div>
    `;
  }
  if (question.type === "judge") {
    return `
      <div class="quiz-options">
        ${["对", "错"].map((option) => `
          <label class="quiz-option">
            <input type="radio" name="${fieldName}" value="${option}" />
            <span>${option}</span>
          </label>
        `).join("")}
      </div>
    `;
  }
  return `
    <label class="quiz-written">
      我的作答
      <textarea rows="3" placeholder="先自己写答案，再提交查看解析"></textarea>
    </label>
  `;
}

function revealQuizAnswer(button) {
  const questionEl = button.closest(".question");
  const answerEl = questionEl?.querySelector(".answer-panel");
  if (!answerEl) {
    return;
  }
  const result = gradeQuestion(questionEl);
  applyQuestionFeedback(questionEl, result);
  answerEl.classList.remove("is-hidden");
  button.textContent = result.isCorrect ? "已提交：正确" : "已提交：待复盘";
  button.disabled = true;
  button.classList.add("is-submitted");
}

function gradeQuiz(button) {
  const quizSet = button.closest("[data-quiz-set]");
  const questions = Array.from(quizSet?.querySelectorAll("[data-quiz-question]") || []);
  const wrongItems = [];
  let correctCount = 0;

  questions.forEach((questionEl) => {
    const result = gradeQuestion(questionEl);
    applyQuestionFeedback(questionEl, result);
    questionEl.querySelector(".answer-panel")?.classList.remove("is-hidden");
    const submit = questionEl.querySelector("[data-quiz-submit]");
    if (submit) {
      submit.disabled = true;
      submit.classList.add("is-submitted");
      submit.textContent = result.isCorrect ? "已提交：正确" : "已提交：待复盘";
    }
    if (result.isCorrect) {
      correctCount += 1;
    } else {
      wrongItems.push(buildWrongItem(questionEl, result));
    }
  });

  saveWrongItems(wrongItems);
  renderQuizScore(quizSet, correctCount, questions.length, wrongItems);
  renderWeakReport(quizSet, wrongItems, questions);
  button.disabled = true;
  button.classList.add("is-submitted");
  button.textContent = "已提交整套自测";
}

function gradeQuestion(questionEl) {
  const expected = questionEl.dataset.answer || "";
  const selected = questionEl.querySelector("input[type='radio']:checked");
  const textarea = questionEl.querySelector("textarea");
  const userAnswer = selected?.value || textarea?.value || "";
  const isCorrect = selected ? normalizeAnswer(userAnswer) === normalizeAnswer(expected) : gradeWrittenAnswer(userAnswer, expected);
  return { userAnswer, expected, isCorrect };
}

function gradeWrittenAnswer(userAnswer, expected) {
  const user = normalizeAnswer(userAnswer);
  const answer = normalizeAnswer(expected);
  if (!user) {
    return false;
  }
  if (user.includes(answer) || answer.includes(user)) {
    return true;
  }
  const tokens = answer.match(/[a-zA-Z]+|\d+|[\u4e00-\u9fa5]{2,}|f'|Δx|dx|dy|dz|ln/g) || [];
  const uniqueTokens = [...new Set(tokens)].filter((token) => token.length > 1);
  if (!uniqueTokens.length) {
    return false;
  }
  const hitCount = uniqueTokens.filter((token) => user.includes(normalizeAnswer(token))).length;
  return hitCount / uniqueTokens.length >= 0.5;
}

function normalizeAnswer(value) {
  return String(value || "")
    .toLowerCase()
    .replace(/\s+/g, "")
    .replace(/[，。；：、,.，;:()（）[\]【】]/g, "")
    .replace(/＝/g, "=");
}

function applyQuestionFeedback(questionEl, result) {
  const feedback = questionEl.querySelector("[data-question-feedback]");
  if (!feedback) {
    return;
  }
  feedback.classList.remove("is-correct", "is-wrong");
  feedback.classList.add(result.isCorrect ? "is-correct" : "is-wrong");
  feedback.textContent = result.isCorrect
    ? "判定：正确。这个知识点掌握较稳。"
    : "判定：需要复盘。已加入本次错题回流。";
}

function buildWrongItem(questionEl, result) {
  return {
    knowledgePoint: questionEl.dataset.knowledgePoint || "未标注知识点",
    questionType: questionEl.dataset.questionType || "",
    question: questionEl.querySelector(".question-title")?.textContent?.replace(/^\d+\.\s*/, "") || "",
    userAnswer: result.userAnswer || "未作答",
    answer: result.expected,
    reviewAction: questionEl.dataset.reviewAction || "回看速记卡并重做同类题。",
    createdAt: new Date().toISOString()
  };
}

function saveWrongItems(items) {
  if (!items.length) {
    return;
  }
  const key = "examAssistantWrongQuestions";
  const oldItems = JSON.parse(localStorage.getItem(key) || "[]");
  const map = new Map(oldItems.map((item) => [`${item.knowledgePoint}::${item.question}`, item]));
  items.forEach((item) => map.set(`${item.knowledgePoint}::${item.question}`, item));
  localStorage.setItem(key, JSON.stringify(Array.from(map.values()).slice(-50)));
}

function renderQuizScore(quizSet, correctCount, total, wrongItems) {
  const scoreEl = quizSet.querySelector("[data-quiz-score]");
  const wrongEl = quizSet.querySelector("[data-wrong-flow]");
  const percent = total ? Math.round((correctCount / total) * 100) : 0;
  const comment = percent >= 85 ? "掌握较好，可以进入下一轮限时练习。" : percent >= 60 ? "基础有一定掌握，建议针对错题做专项回看。" : "当前薄弱点较明显，建议先回到速记卡和例题。";
  scoreEl.classList.remove("is-hidden");
  scoreEl.innerHTML = `
    <strong>本次得分：${correctCount}/${total}（${percent} 分）</strong>
    <p>${comment}</p>
  `;
  wrongEl.classList.remove("is-hidden");
  wrongEl.innerHTML = wrongItems.length
    ? `
      <strong>错题回流</strong>
      <p>已把 ${wrongItems.length} 道题加入本地错题本，后续可用于薄弱点复习。</p>
      <ul>${wrongItems.map((item) => `<li>${escapeHtml(item.knowledgePoint)}：${escapeHtml(item.reviewAction)}</li>`).join("")}</ul>
      <button type="button" class="retry-wrong" data-retry-wrong>只重练错题</button>
    `
    : "<strong>错题回流</strong><p>本次没有错题，暂不需要回流。</p>";
}

function renderWeakReport(quizSet, wrongItems, questions) {
  const reportEl = quizSet.querySelector("[data-weak-report]");
  if (!reportEl) {
    return;
  }
  reportEl.classList.remove("is-hidden");
  if (!wrongItems.length) {
    reportEl.innerHTML = `
      <strong>薄弱点报告</strong>
      <p>本次没有明显薄弱点。下一步可以提高限时要求，或者换一组同类题巩固速度。</p>
    `;
    return;
  }

  const pointStats = new Map();
  wrongItems.forEach((item) => {
    const key = item.knowledgePoint || "未标注知识点";
    const old = pointStats.get(key) || { count: 0, actions: new Set(), types: new Set() };
    old.count += 1;
    if (item.reviewAction) old.actions.add(item.reviewAction);
    if (item.questionType) old.types.add(quizTypeLabel(item.questionType));
    pointStats.set(key, old);
  });

  const rows = Array.from(pointStats.entries())
    .sort((a, b) => b[1].count - a[1].count)
    .map(([point, stat]) => {
      const action = Array.from(stat.actions)[0] || "回看速记卡，再重做同类题。";
      const types = Array.from(stat.types).join("、") || "综合题";
      return `
        <li>
          <strong>${escapeHtml(point)}</strong>
          <span>错 ${stat.count} 题 · 题型：${escapeHtml(types)}</span>
          <p>${escapeHtml(action)}</p>
        </li>
      `;
    })
    .join("");

  const total = questions.length || wrongItems.length;
  reportEl.innerHTML = `
    <strong>薄弱点报告</strong>
    <p>本次 ${wrongItems.length}/${total} 题需要复盘，优先处理下面这些知识点。</p>
    <ul>${rows}</ul>
  `;
}

function retryWrongQuestions(button) {
  const quizSet = button.closest("[data-quiz-set]");
  const questions = Array.from(quizSet?.querySelectorAll("[data-quiz-question]") || []);
  const wrongQuestions = questions.filter((questionEl) =>
    questionEl.querySelector("[data-question-feedback]")?.classList.contains("is-wrong")
  );
  if (!wrongQuestions.length) {
    return;
  }

  questions.forEach((questionEl) => {
    const shouldRetry = wrongQuestions.includes(questionEl);
    questionEl.classList.toggle("is-hidden", !shouldRetry);
    if (shouldRetry) {
      resetQuestionForRetry(questionEl);
    }
  });

  const scoreEl = quizSet.querySelector("[data-quiz-score]");
  if (scoreEl) {
    scoreEl.classList.remove("is-hidden");
    scoreEl.innerHTML = `<strong>错题重练模式</strong><p>已只保留 ${wrongQuestions.length} 道错题。重新作答后，可以逐题提交查看反馈。</p>`;
  }
  button.disabled = true;
  button.textContent = "正在重练错题";
}

function resetQuestionForRetry(questionEl) {
  questionEl.querySelectorAll("input[type='radio']").forEach((input) => {
    input.checked = false;
  });
  const textarea = questionEl.querySelector("textarea");
  if (textarea) {
    textarea.value = "";
  }
  questionEl.querySelector(".answer-panel")?.classList.add("is-hidden");
  const feedback = questionEl.querySelector("[data-question-feedback]");
  if (feedback) {
    feedback.textContent = "";
    feedback.classList.remove("is-correct", "is-wrong");
  }
  const submit = questionEl.querySelector("[data-quiz-submit]");
  if (submit) {
    submit.disabled = false;
    submit.classList.remove("is-submitted");
    submit.textContent = "提交本题";
  }
}

function toggleQuizTimer(button) {
  const timerEl = button.closest("[data-quiz-timer]");
  const displayEl = timerEl?.querySelector("[data-timer-display]");
  if (!timerEl || !displayEl) {
    return;
  }
  if (Number(timerEl.dataset.secondsLeft || 0) <= 0 && !quizTimerIntervals.get(timerEl)) {
    syncTimerFromInput(timerEl);
  }
  if (Number(timerEl.dataset.secondsLeft || 0) <= 0) {
    timerEl.classList.add("is-finished");
    return;
  }

  const existing = quizTimerIntervals.get(timerEl);
  if (existing) {
    clearInterval(existing);
    quizTimerIntervals.delete(timerEl);
    button.textContent = "继续";
    timerEl.classList.add("is-paused");
    return;
  }

  syncTimerFromInput(timerEl);
  timerEl.classList.remove("is-paused", "is-finished");
  button.textContent = "暂停";
  const interval = setInterval(() => {
    const next = Math.max(0, Number(timerEl.dataset.secondsLeft || 0) - 1);
    timerEl.dataset.secondsLeft = String(next);
    displayEl.textContent = formatTime(next);
    if (next <= 0) {
      clearInterval(interval);
      quizTimerIntervals.delete(timerEl);
      timerEl.classList.add("is-finished");
      button.textContent = "开始";
    }
  }, 1000);
  quizTimerIntervals.set(timerEl, interval);
}

function resetQuizTimer(button) {
  const timerEl = button.closest("[data-quiz-timer]");
  const displayEl = timerEl?.querySelector("[data-timer-display]");
  if (!timerEl || !displayEl) {
    return;
  }
  const existing = quizTimerIntervals.get(timerEl);
  if (existing) {
    clearInterval(existing);
    quizTimerIntervals.delete(timerEl);
  }
  const initial = readTimerInputSeconds(timerEl);
  timerEl.dataset.initialSeconds = String(initial);
  timerEl.dataset.secondsLeft = String(initial);
  displayEl.textContent = formatTime(initial);
  timerEl.classList.remove("is-paused", "is-finished");
  const startButton = timerEl.querySelector("[data-timer-start]");
  if (startButton) {
    startButton.textContent = "开始";
  }
}

function syncTimerFromInput(timerEl) {
  const existing = quizTimerIntervals.get(timerEl);
  if (existing) {
    return;
  }
  const inputSeconds = readTimerInputSeconds(timerEl);
  const secondsLeft = Number(timerEl.dataset.secondsLeft || 0);
  const initialSeconds = Number(timerEl.dataset.initialSeconds || 0);
  if (!secondsLeft || secondsLeft === initialSeconds) {
    timerEl.dataset.initialSeconds = String(inputSeconds);
    timerEl.dataset.secondsLeft = String(inputSeconds);
    const displayEl = timerEl.querySelector("[data-timer-display]");
    if (displayEl) {
      displayEl.textContent = formatTime(inputSeconds);
    }
  }
}

function readTimerInputSeconds(timerEl) {
  const input = timerEl.querySelector("[data-timer-minutes]");
  const minutes = Math.max(0, Math.min(180, Number(input?.value || 0)));
  if (input) {
    input.value = String(minutes);
  }
  return Math.round(minutes * 60);
}

function formatTime(seconds) {
  const safeSeconds = Math.max(0, Number(seconds) || 0);
  const minutes = Math.floor(safeSeconds / 60);
  const rest = safeSeconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(rest).padStart(2, "0")}`;
}

function sendQuizChat(button) {
  const chatEl = button.closest("[data-quiz-chat]");
  const inputEl = chatEl?.querySelector("[data-quiz-chat-input]");
  const messagesEl = chatEl?.querySelector("[data-quiz-chat-messages]");
  const question = inputEl?.value.trim();
  if (!question || !messagesEl) {
    return;
  }
  messagesEl.insertAdjacentHTML("beforeend", `<div class="chat-message user">${escapeHtml(question)}</div>`);
  messagesEl.insertAdjacentHTML("beforeend", `<div class="chat-message assistant">${escapeHtml(buildQuizChatReply(question, button.closest("[data-quiz-set]")))}</div>`);
  inputEl.value = "";
  messagesEl.scrollTop = messagesEl.scrollHeight;
}

function buildQuizChatReply(question, quizSet) {
  const text = question.toLowerCase();
  const subjectContext = `${quizSet?.dataset.quizSubject || ""} ${quizSet?.dataset.quizTopic || ""}`;
  const wrongPoints = Array.from(quizSet?.querySelectorAll(".question-feedback.is-wrong") || [])
    .map((item) => item.closest("[data-quiz-question]")?.dataset.knowledgePoint)
    .filter(Boolean);

  if (/会计|借贷|分录|资产|负债|租金|折旧/.test(subjectContext)) {
    if (/预付|租金|保险|费用/.test(question)) {
      return "预付类题先把付款时的资产记清楚，月末只把本期已经受益的部分转为费用。比如 9 000 元管 3 个月，1 个月就是借：租金费用 3 000；贷：预付租金 3 000。";
    }
    if (/预收|未赚取|收入|定金/.test(question)) {
      return "预收款一开始是负债，不是收入。等本期已经提供服务或交付商品时，再把已赚部分转为收入：借：未赚取收入；贷：收入。";
    }
    if (/折旧|累计折旧|设备/.test(question)) {
      return "折旧题不要直接贷记设备。标准调整分录是借：折旧费用；贷：累计折旧。设备账户保留原始成本，累计折旧用来反映价值减少。";
    }
    if (/赊销|应收|收款|现金/.test(question)) {
      return "赊销时借：应收账款，贷：收入；之后收回账款时借：现金，贷：应收账款。收款这一步不再重复确认收入。";
    }
    if (/错|错题|哪里|怎么做|思路|步骤/.test(question)) {
      return wrongPoints.length
        ? `你当前优先复盘：${[...new Set(wrongPoints)].join("、")}。会计分录题按“找账户-判性质-判增减-定借贷-查金额相等”五步走。`
        : "会计题先不要急着写借贷，先圈业务关键词：收现、赊销、预付、预收、应计、折旧。再判断账户性质和增减方向。";
    }
    return "这类会计循环题重点看业务实质。你可以问我某笔业务为什么借/贷某账户，或者问预付、预收、折旧、应计费用如何调整。";
  }

  if (/英语|阅读|作文|翻译/.test(subjectContext)) {
    if (/细节|定位|同义/.test(question)) {
      return "细节题先圈题干关键词，再回原文定位。正确选项通常不是原词照抄，而是同义替换；看到原词反而要检查有没有偷换范围或对象。";
    }
    if (/主旨|标题|中心/.test(question)) {
      return "主旨题看首尾段、转折句和反复出现的主题词。过窄的选项只概括局部，过宽的选项会超出文章范围。";
    }
    return "英语阅读疑问可以按题型问：细节题怎么定位、主旨题怎么排除、推断题依据在哪里、选项哪里偷换概念。";
  }

  if (/马原|马克思|实践|认识|真理|矛盾/.test(subjectContext)) {
    if (/材料|怎么答|模板/.test(question)) {
      return "马克思主义原理材料题建议按“原理句-材料句-方法论”写。先点明原理，再扣材料关键词，最后写应该怎么做。";
    }
    return "马克思主义原理题不要只背概念，要把原理和材料连接起来。你可以问我某段材料对应实践认识、真理、矛盾中的哪一个原理。";
  }

  if (/5f|五|为什么.*5|拆/.test(question)) {
    return "这题的关键是把分子拆成两段：f(x0+3Δx)-f(x0) 和 f(x0)-f(x0-2Δx)。第一段对应 3f'(x0)，第二段对应 2f'(x0)，所以合起来是 5f'(x0)。";
  }
  if (/导数定义|差商|lim|极限/.test(question)) {
    return "遇到导数定义题，先把式子凑成 [f(x0+h)-f(x0)]/h。若增量是 3Δx，就要乘出系数 3；若增量是 -2Δx，也要处理符号和系数。";
  }
  if (/链式|复合|ln/.test(question)) {
    return "复合函数求导按“外层导数 × 内层导数”。例如 ln(1+x^2)，外层 ln u 给 1/u，内层 1+x^2 的导数是 2x，所以结果是 2x/(1+x^2)。";
  }
  if (/连续|可导/.test(question)) {
    return "记住方向：可导一定连续，但连续不一定可导。考试常用 |x| 在 0 处连续但不可导作为反例。";
  }
  if (/错|错题|哪里/.test(question)) {
    return wrongPoints.length
      ? `你当前需要优先回看：${[...new Set(wrongPoints)].join("、")}。建议先看对应速记卡，再重做同类题。`
      : "目前还没有提交出的错题。你可以先提交整套自测，我会根据错题帮你定位薄弱知识点。";
  }
  if (/怎么做|思路|步骤/.test(question)) {
    return "建议按三步走：先识别题型，再写对应公式或定义，最后检查系数、符号和适用条件。高数导数题尤其要小心差商里的增量倍数。";
  }
  return "我会优先围绕当前自测题回答。你可以具体问某一道题的步骤、答案为什么这样来、或者你自己的某一步哪里不对。";
}

function inferQuizKnowledgePoint(question) {
  const text = `${question.question || ""} ${question.answer || ""} ${question.explanation || ""}`;
  if (/切线|斜率|几何意义/.test(text)) return "导数的几何意义";
  if (/链式|复合函数|求导/.test(text)) return "求导公式与链式法则";
  if (/单调|极值|递增|递减/.test(text)) return "导数判断单调性";
  if (/借贷|有借必有贷|借贷必相等/.test(text)) return "借贷记账法规则";
  if (/资产|负债|所有者权益|账户/.test(text)) return "账户性质与借贷方向";
  if (/原材料|应付账款|实收资本|分录/.test(text)) return "会计分录处理";
  if (/阅读|定位|同义替换|题干/.test(text)) return "阅读理解定位与同义替换";
  if (/实践|认识/.test(text)) return "实践与认识的关系";
  return "核心概念";
}

function materialLabel(type) {
  const labels = {
    cheatSheet: "速记卡",
    quiz: "自测题",
    flashcards: "闪卡",
    podcast: "播客",
    analysis: "高频考点分析"
  };
  return labels[type] || type;
}

function quizTypeLabel(type) {
  const labels = {
    single_choice: "选择",
    blank: "填空",
    judge: "判断",
    accounting_entry: "分录",
    short_answer: "简答",
    calculation: "计算",
    proof: "证明"
  };
  return labels[type] || type;
}

function quizSourceLabel(source) {
  const labels = {
    user_note: "来自笔记",
    past_paper: "来自真题",
    past_paper_style: "仿真题型"
  };
  return labels[source] || "模板补充";
}

function section(title, html) {
  return `<h3>${escapeHtml(title)}</h3>${html}`;
}

function list(items) {
  return `<ul>${items.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>`;
}

function orderedList(items) {
  return `<ol>${items.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ol>`;
}

function sourceList(items) {
  return `<ul class="source-list">${dedupeSourceItems(items).map(sourceItem).join("")}</ul>`;
}

function sourceOrderedList(items) {
  return `<ol class="source-list">${dedupeSourceItems(items).map(sourceItem).join("")}</ol>`;
}

function sourceItem(item) {
  const label = item.source === "note" ? "笔记" : "知识库";
  return `<li>${escapeHtml(item.text)} <span class="source-badge ${item.source}">${label}</span></li>`;
}

function dedupeSourceItems(items) {
  const seen = new Set();
  return items.filter((item) => {
    const key = normalizeKnowledgeKey(item.text);
    if (!key || seen.has(key)) {
      return false;
    }
    seen.add(key);
    return true;
  });
}

function priorityList(items) {
  return `
    <div class="priority-list">
      ${items.map((item) => `
        <article class="priority-item level-${item.level}">
          <span>${escapeHtml(item.level)}优先级</span>
          <strong>${escapeHtml(item.text)}</strong>
          <p>${escapeHtml(item.reason)}</p>
        </article>
      `).join("")}
    </div>
  `;
}

function examKeyPointList(items) {
  return `
    <div class="exam-key-list">
      ${items.map((item) => `
        <article class="exam-key-item">
          <div>
            <strong>${escapeHtml(item.point)}</strong>
            <span>出现 ${item.count} 次</span>
          </div>
          <p><strong>可能题型：</strong>${escapeHtml(item.possibleQuestionTypes.join("、"))}</p>
          <p><strong>复习建议：</strong>${escapeHtml(item.suggestion)}</p>
          ${item.evidence?.length ? `<p><strong>题目依据：</strong>${escapeHtml(item.evidence.join("；"))}</p>` : ""}
        </article>
      `).join("")}
    </div>
  `;
}

function cheatKnowledgeCards(data) {
  const items = buildCheatKnowledgeCards(data);
  return `
    <div class="knowledge-card-list">
      ${items.map((item) => `
        <article class="knowledge-card">
          <strong>${escapeHtml(item.title)}</strong>
          <p>${escapeHtml(item.detail)}</p>
        </article>
      `).join("")}
    </div>
  `;
}

function buildCheatKnowledgeCards(data) {
  const candidates = [
    ...data.content.examKeyPoints.map((item) => ({
      raw: item.point,
      score: 300 + (item.count || 0) * 20
    })),
    ...data.content.noteHighlights.map((item, index) => ({
      raw: item,
      score: 200 - index
    })),
    ...data.content.keyPoints.map((item, index) => ({
      raw: item,
      score: 100 - index
    }))
  ];

  const seenTitles = new Set();
  const seenDetails = new Set();
  const coreKey = normalizeKnowledgeKey(data.content.coreConcept);

  return candidates
    .map((item) => {
      const title = simplifyKnowledgeTitle(item.raw);
      const detail = explainKnowledgePoint(item.raw, data);
      return {
        title,
        detail,
        score: item.score,
        titleKey: normalizeKnowledgeKey(title),
        detailKey: normalizeKnowledgeKey(detail)
      };
    })
    .sort((a, b) => b.score - a.score)
    .filter((item) => {
      if (!item.titleKey || !item.detailKey) {
        return false;
      }
      if (seenTitles.has(item.titleKey) || seenDetails.has(item.detailKey)) {
        return false;
      }
      if (item.titleKey.length > 8 && coreKey.includes(item.titleKey)) {
        return false;
      }
      seenTitles.add(item.titleKey);
      seenDetails.add(item.detailKey);
      return true;
    })
    .slice(0, 5)
    .map(({ title, detail }) => ({ title, detail }));
}

function simplifyKnowledgeTitle(text) {
  return String(text)
    .replace(/^注意：/, "")
    .replace(/[。；;]$/g, "")
    .slice(0, 28);
}

function explainKnowledgePoint(text, data) {
  const value = String(text);
  if (/导数.*几何意义|切线|斜率/.test(value)) {
    return "导数在某点的值就是曲线在该点切线的斜率。若点为 (x0, f(x0))，切线可写成 y - f(x0) = f'(x0)(x - x0)。";
  }
  if (/基本求导|复合函数|链式法则/.test(value)) {
    return "先判断函数结构，再选公式。复合函数求导要外层先求导、内层再乘上内层导数，不能漏掉链式法则。";
  }
  if (/单调|极值|增减/.test(value)) {
    return "先求 f'(x)，再看导数符号：f'(x)>0 时函数递增，f'(x)<0 时函数递减；导数变号的位置常用于判断极值。";
  }
  if (/极限.*计算|等价无穷小|洛必达/.test(value)) {
    return "极限题先直接代入，若出现 0/0 或 ∞/∞，再考虑因式分解、等价无穷小或洛必达法则。";
  }
  if (/导数.*极限|极限.*导数/.test(value)) {
    return "导数定义本质上是一个极限：f'(x)=lim(h→0)[f(x+h)-f(x)]/h，看到类似差商形式要想到导数定义。";
  }
  if (/会计等式/.test(value)) {
    return "基本等式是资产 = 负债 + 所有者权益。经济业务发生后，等式两边仍要保持平衡。";
  }
  if (/借贷记账法|有借必有贷|借贷必相等/.test(value)) {
    return "借贷记账法要求每笔业务至少影响两个账户，登记时必须有借方也有贷方，且借方金额等于贷方金额。";
  }
  if (/原材料|应付账款|采购/.test(value)) {
    return "购入原材料但尚未付款时，原材料增加记借方，应付账款增加记贷方，分录为：借：原材料；贷：应付账款。";
  }
  if (/投资者|投入资本|实收资本/.test(value)) {
    return "收到投资者投入资本时，银行存款等资产增加记借方，实收资本增加记贷方。";
  }
  if (/资产类账户|资产.*借方|资产.*贷方/.test(value)) {
    return "资产类账户通常借方登记增加，贷方登记减少；负债和所有者权益类账户方向相反。";
  }
  if (/实践.*认识|认识.*实践/.test(value)) {
    return "实践决定认识，是认识的来源、动力、目的和检验标准；认识对实践具有反作用，正确认识能指导实践。";
  }
  if (/真理/.test(value)) {
    return "真理具有客观性、具体性和条件性，不能脱离具体时间、地点和条件抽象地判断真理。";
  }
  if (/阅读理解|题干|定位|细节题/.test(value)) {
    return "阅读理解先看题干关键词，再回原文定位；细节题重点比较原文和选项是否构成同义替换。";
  }
  if (/主旨题/.test(value)) {
    return "主旨题看文章整体结构，重点关注首尾段、转折句和反复出现的主题词，避免选择过窄的局部细节。";
  }
  if (/推断题/.test(value)) {
    return "推断题必须从原文线索推出，不能加入个人常识或过度脑补。";
  }
  return data.content.coreConcept;
}

function uniqueTextList(items) {
  return [...new Set(items.filter(Boolean))];
}

function normalizeKnowledgeKey(text) {
  return String(text || "")
    .replace(/^注意：/, "")
    .replace(/[，。；：、“”‘’"'（）()《》\s]/g, "")
    .replace(/的/g, "")
    .slice(0, 40);
}

function jsonBlock(data) {
  return `<pre class="json-view">${escapeHtml(JSON.stringify(data, null, 2))}</pre>`;
}

function flashcardsHtml(cards) {
  return `
    <div class="flashcard-deck" data-flashcard-deck data-active-index="0">
      <div class="flashcard-stage">
      ${cards.map(flashcardHtml).join("")}
      </div>
      <div class="flashcard-controls">
        <button type="button" class="flashcard-nav" data-flashcard-nav="prev" disabled>上一张</button>
        <div class="flashcard-dots" aria-hidden="true">
          ${cards.map((_, index) => `<span class="flashcard-dot${index === 0 ? " is-active" : ""}"></span>`).join("")}
        </div>
        <button type="button" class="flashcard-nav" data-flashcard-nav="next" ${cards.length <= 1 ? "disabled" : ""}>下一张</button>
      </div>
    </div>
  `;
}

function podcastPlayerHtml(data) {
  const durationSeconds = Number(data.estimatedSeconds || Math.round((data.estimatedMinutes || 1) * 60));
  const minuteLabel = Number(data.estimatedMinutes || durationSeconds / 60).toFixed(1).replace(/\.0$/, "");
  return `
    <section class="podcast-player" data-podcast-text="${escapeHtml(data.script)}" data-duration-seconds="${durationSeconds}" data-elapsed-seconds="0">
      <div class="podcast-head">
        <div>
          <span class="tag">${escapeHtml(minuteLabel)} 分钟音频</span>
          <strong>${escapeHtml(data.voiceStyle || "清晰复习播报")}</strong>
          ${data.source ? `<p>${escapeHtml(data.source.primary)}：${escapeHtml(data.source.noteSummary)}</p>` : ""}
        </div>
        <div class="podcast-controls">
          <button type="button" data-podcast-action="play">播放</button>
          <button type="button" data-podcast-action="pause">暂停</button>
          <button type="button" data-podcast-action="stop">停止</button>
          <button type="button" data-podcast-action="rate" data-rate="1.08">0.92x</button>
        </div>
      </div>
      <div class="podcast-progress-wrap">
        <div class="podcast-progress-meta">
          <span data-podcast-status>准备播放</span>
          <strong data-podcast-time>00:00 / ${formatTime(durationSeconds)}</strong>
        </div>
        <progress class="podcast-progress" data-podcast-progress value="0" max="100"></progress>
      </div>
      <div class="podcast-summary">
        <span>${Array.isArray(data.segments) ? data.segments.length : 1} 段复习音频</span>
        <span>主题：${escapeHtml(data.subject)} · ${escapeHtml(data.topic)}</span>
      </div>
    </section>
  `;
}

function handlePodcastAction(button) {
  const player = button.closest("[data-podcast-text]");
  const status = player?.querySelector("[data-podcast-status]");
  const action = button.dataset.podcastAction;
  if (!("speechSynthesis" in window)) {
    if (status) status.textContent = "当前浏览器不支持语音合成，请换用 Chrome 或 Edge。";
    return;
  }

  if (action === "rate") {
    currentPodcastRate = currentPodcastRate === 0.92 ? Number(button.dataset.rate || 1.08) : 0.92;
    button.textContent = `${currentPodcastRate}x`;
    if (status) status.textContent = `语速已切换到 ${currentPodcastRate}x`;
    return;
  }

  if (action === "pause") {
    if (window.speechSynthesis.speaking && !window.speechSynthesis.paused) {
      window.speechSynthesis.pause();
      stopPodcastProgressTimer();
      if (status) status.textContent = "已暂停";
    } else if (window.speechSynthesis.paused) {
      window.speechSynthesis.resume();
      startPodcastProgressTimer(player);
      if (status) status.textContent = "继续播放";
    }
    return;
  }

  if (action === "stop") {
    window.speechSynthesis.cancel();
    clearActivePodcast();
    stopPodcastProgressTimer();
    resetPodcastProgress(player);
    if (status) status.textContent = "已停止";
    return;
  }

  const text = player?.dataset.podcastText || "";
  if (!text) {
    if (status) status.textContent = "没有可播放的播客文本";
    return;
  }

  if (window.speechSynthesis.paused && activePodcastButton === button && currentPodcastText === text) {
    window.speechSynthesis.resume();
    startPodcastProgressTimer(player);
    if (status) status.textContent = "继续播放";
    return;
  }

  window.speechSynthesis.cancel();
  stopPodcastProgressTimer();
  resetPodcastProgress(player);
  activePodcastButton = button;
  activePodcastPlayer = player;
  currentPodcastText = text;
  currentPodcastChunks = buildPodcastSpeechChunks(text);
  currentPodcastChunkIndex = 0;
  currentPodcastSpokenChars = 0;
  startPodcastProgressTimer(player);
  speakNextPodcastChunk(player, status);
}

function speakNextPodcastChunk(player, status) {
  if (!player || activePodcastPlayer !== player) return;
  if (currentPodcastChunkIndex >= currentPodcastChunks.length) {
    clearActivePodcast();
    stopPodcastProgressTimer();
    updatePodcastProgress(player, 1);
    if (status) status.textContent = "播放完成";
    return;
  }

  const chunk = currentPodcastChunks[currentPodcastChunkIndex];
  const utterance = new SpeechSynthesisUtterance(chunk);
  const voice = getPreferredPodcastVoice();
  utterance.lang = "zh-CN";
  utterance.rate = currentPodcastRate;
  utterance.pitch = 1.04;
  utterance.volume = 1;
  if (voice) {
    utterance.voice = voice;
  }
  utterance.onstart = () => {
    const voiceLabel = voice ? `，${voice.name}` : "，系统默认中文音色";
    if (status) status.textContent = `正在播放，语速 ${currentPodcastRate}x${voiceLabel}`;
  };
  utterance.onboundary = (event) => {
    if (typeof event.charIndex === "number" && currentPodcastText.length) {
      const ratio = Math.min(0.98, (currentPodcastSpokenChars + event.charIndex) / currentPodcastText.length);
      updatePodcastProgress(player, ratio);
    }
  };
  utterance.onend = () => {
    if (activePodcastPlayer !== player) return;
    currentPodcastSpokenChars += chunk.length;
    currentPodcastChunkIndex += 1;
    updatePodcastProgress(player, Math.min(0.98, currentPodcastText.length ? currentPodcastSpokenChars / currentPodcastText.length : 1));
    window.setTimeout(() => speakNextPodcastChunk(player, status), 220);
  };
  utterance.onerror = () => {
    if (activePodcastPlayer !== player) return;
    clearActivePodcast();
    stopPodcastProgressTimer();
    if (status) status.textContent = "播放失败，请检查系统语音服务或浏览器权限。";
  };
  window.speechSynthesis.speak(utterance);
}

function buildPodcastSpeechChunks(text) {
  const paragraphs = String(text || "")
    .split(/\n{2,}/)
    .map((item) => item.trim())
    .filter(Boolean);
  const chunks = [];
  paragraphs.forEach((paragraph) => {
    const sentences = paragraph.split(/(?<=[。！？；])/).map((item) => item.trim()).filter(Boolean);
    const source = sentences.length ? sentences : [paragraph];
    let buffer = "";
    source.forEach((sentence) => {
      if ((buffer + sentence).length > 90 && buffer) {
        chunks.push(buffer);
        buffer = sentence;
      } else {
        buffer = buffer ? `${buffer} ${sentence}` : sentence;
      }
    });
    if (buffer) chunks.push(buffer);
  });
  return chunks.length ? chunks : [String(text || "")];
}

function getPreferredPodcastVoice() {
  const voices = window.speechSynthesis.getVoices ? window.speechSynthesis.getVoices() : [];
  const chineseVoices = voices.filter((voice) => /zh|cmn|yue/i.test(`${voice.lang} ${voice.name}`));
  const preferredPatterns = [
    /Xiaoxiao|Xiaoyi|Yunxi|Yunjian|Natural/i,
    /Microsoft/i,
    /Google.*(中文|普通话|Mandarin|Chinese)/i,
    /Huihui|Yaoyao|Kangkang/i
  ];
  return preferredPatterns
    .map((pattern) => chineseVoices.find((voice) => pattern.test(voice.name)))
    .find(Boolean) || chineseVoices[0] || null;
}

function clearActivePodcast() {
  activePodcastButton = null;
  activePodcastPlayer = null;
  currentPodcastText = "";
  currentPodcastChunks = [];
  currentPodcastChunkIndex = 0;
  currentPodcastSpokenChars = 0;
}

function startPodcastProgressTimer(player) {
  if (!player) return;
  stopPodcastProgressTimer();
  const startedAt = Date.now() - Number(player.dataset.elapsedSeconds || 0) * 1000;
  player.dataset.startedAt = String(startedAt);
  podcastProgressTimer = setInterval(() => {
    const duration = Number(player.dataset.durationSeconds || 240);
    const elapsed = Math.min(duration, Math.floor((Date.now() - startedAt) / 1000));
    player.dataset.elapsedSeconds = String(elapsed);
    updatePodcastProgress(player, duration ? elapsed / duration : 0);
  }, 500);
}

function stopPodcastProgressTimer() {
  if (podcastProgressTimer) {
    clearInterval(podcastProgressTimer);
    podcastProgressTimer = null;
  }
}

function resetPodcastProgress(player) {
  if (!player) return;
  player.dataset.elapsedSeconds = "0";
  updatePodcastProgress(player, 0);
}

function updatePodcastProgress(player, ratio) {
  if (!player) return;
  const duration = Number(player.dataset.durationSeconds || 240);
  const safeRatio = Math.max(0, Math.min(1, Number(ratio) || 0));
  const elapsed = Math.round(duration * safeRatio);
  player.dataset.elapsedSeconds = String(elapsed);
  const progress = player.querySelector("[data-podcast-progress]");
  const time = player.querySelector("[data-podcast-time]");
  if (progress) {
    progress.value = Math.round(safeRatio * 100);
  }
  if (time) {
    time.textContent = `${formatTime(elapsed)} / ${formatTime(duration)}`;
  }
}

function flashcardHtml(card, index) {
  return `
    <button type="button" class="flashcard${index === 0 ? " is-active" : ""}" data-flashcard data-flashcard-index="${index}" aria-pressed="false">
      <span class="flashcard-inner">
        <span class="flashcard-face flashcard-front">
          <span class="flashcard-text">${escapeHtml(card.front)}</span>
        </span>
        <span class="flashcard-face flashcard-back">
          <span class="flashcard-text">${escapeHtml(card.back)}</span>
        </span>
      </span>
    </button>
  `;
}

function toggleFlashcard(cardEl) {
  const isFlipped = cardEl.classList.toggle("is-flipped");
  cardEl.setAttribute("aria-pressed", String(isFlipped));
}

function moveFlashcard(button) {
  const deck = button.closest("[data-flashcard-deck]");
  const cards = Array.from(deck?.querySelectorAll("[data-flashcard]") || []);
  if (!deck || !cards.length) {
    return;
  }
  const direction = button.dataset.flashcardNav === "next" ? 1 : -1;
  const currentIndex = Number(deck.dataset.activeIndex || 0);
  const nextIndex = Math.max(0, Math.min(cards.length - 1, currentIndex + direction));
  setFlashcardIndex(deck, nextIndex);
}

function setFlashcardIndex(deck, activeIndex) {
  const cards = Array.from(deck.querySelectorAll("[data-flashcard]"));
  const dots = Array.from(deck.querySelectorAll(".flashcard-dot"));
  cards.forEach((card, index) => {
    const isActive = index === activeIndex;
    card.classList.toggle("is-active", isActive);
    card.classList.remove("is-flipped");
    card.setAttribute("aria-pressed", "false");
  });
  dots.forEach((dot, index) => {
    dot.classList.toggle("is-active", index === activeIndex);
  });
  deck.dataset.activeIndex = String(activeIndex);
  const prevButton = deck.querySelector('[data-flashcard-nav="prev"]');
  const nextButton = deck.querySelector('[data-flashcard-nav="next"]');
  if (prevButton) {
    prevButton.disabled = activeIndex === 0;
  }
  if (nextButton) {
    nextButton.disabled = activeIndex === cards.length - 1;
  }
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
