const DEFAULT_TOPIC = "综合复习";

const topicKnowledgeBase = {
  "导数": {
    coreConcept: "导数表示函数在某一点的瞬时变化率，几何意义是曲线在该点切线的斜率。",
    formulas: [
      "f'(x)=lim(h→0)[f(x+h)-f(x)]/h",
      "(x^n)'=n·x^(n-1)",
      "(uv)'=u'v+uv'",
      "(u/v)'=(u'v-uv')/v^2"
    ],
    keyPoints: [
      "导数表示函数在某一点的瞬时变化率。",
      "导数的几何意义是曲线在该点切线的斜率。",
      "可导一定连续，但连续不一定可导。",
      "求导前先判断题目要的是定义、计算、几何意义还是应用。"
    ],
    mistakes: [
      "不要把平均变化率和瞬时变化率混淆。",
      "复合函数求导时不要漏掉内层函数的导数。",
      "商的求导公式分子顺序不能写反。",
      "看到绝对值、分段函数时要特别检查不可导点。"
    ],
    steps: [
      "先判断函数类型：幂函数、乘积、商、复合函数或分段函数。",
      "选择对应求导公式。",
      "化简结果，并检查定义域。",
      "如果涉及几何意义，再代入指定点求切线斜率。"
    ],
    answerTemplate: [
      "若题目要求求导：先写出使用的求导公式，再代入函数并化简。",
      "若题目考几何意义：先求 f'(x)，再代入指定点得到切线斜率。",
      "若题目考单调性：先求导，再讨论 f'(x) 的正负区间。"
    ],
    lastMinute: [
      "看一遍导数定义和几何意义。",
      "复查乘积、商、复合函数求导公式。",
      "提醒自己遇到分段函数要检查分界点是否可导。"
    ],
    memoryTip: "定义抓“瞬时变化率”，图像抓“切线斜率”，应用题先求导再看正负。"
  },
  "极限": {
    coreConcept: "极限描述变量趋近某一过程时函数值的变化趋势，是连续、导数和积分的基础。",
    formulas: [
      "lim(x→0) sinx/x = 1",
      "lim(x→∞) (1+1/x)^x = e",
      "等价无穷小替换：sinx ~ x, tanx ~ x, 1-cosx ~ x^2/2"
    ],
    keyPoints: [
      "先代入判断是否出现 0/0、∞/∞ 等未定式。",
      "常用方法包括因式分解、等价无穷小、洛必达法则和夹逼准则。",
      "使用等价无穷小时要注意只在乘除关系中直接替换。"
    ],
    mistakes: [
      "不要在加减关系中随意使用等价无穷小替换。",
      "洛必达法则使用前要先确认是未定式。",
      "忽略左右极限可能导致结论错误。"
    ],
    steps: [
      "先直接代入。",
      "判断未定式类型。",
      "选择合适方法化简。",
      "必要时分别计算左右极限。"
    ],
    answerTemplate: [
      "先写直接代入后的形式。",
      "若为未定式，说明使用因式分解、等价无穷小或洛必达法则。",
      "最后写出极限值，并检查左右极限是否一致。"
    ],
    lastMinute: [
      "背熟两个重要极限。",
      "确认等价无穷小只能在合适条件下替换。",
      "看到分段函数先想左右极限。"
    ],
    memoryTip: "极限题先代入，再判型，最后选工具。"
  },
  "实践与认识": {
    coreConcept: "实践决定认识，认识来源于实践并反作用于实践，是马克思主义认识论的核心关系。",
    formulas: [
      "实践是认识的来源、动力、目的和检验标准。",
      "认识运动包括从实践到认识，再从认识回到实践。"
    ],
    keyPoints: [
      "实践决定认识，认识对实践具有反作用。",
      "真理具有客观性、具体性和条件性。",
      "认识过程具有反复性和无限性。"
    ],
    mistakes: [
      "不要把认识的来源误写成书本或理论本身。",
      "不要忽略认识对实践的反作用。",
      "回答材料题时要结合材料，不要只背概念。"
    ],
    steps: [
      "先写原理：实践和认识的关系。",
      "再扣材料：指出材料中对应的实践或认识活动。",
      "最后写方法论：坚持实践第一，理论联系实际。"
    ],
    answerTemplate: [
      "原理句：实践决定认识，认识对实践具有反作用。",
      "材料句：材料中某行为体现了通过实践获得或检验认识。",
      "方法论句：要坚持实践第一，做到理论联系实际。"
    ],
    lastMinute: [
      "背熟“来源、动力、目的、检验标准”。",
      "材料题一定要扣材料，不要只背原理。",
      "结尾补一句方法论，答案更完整。"
    ],
    memoryTip: "实践管来源，认识管指导，材料题要原理加材料加方法论。"
  },
  "借贷记账法": {
    coreConcept: "借贷记账法是以“借”和“贷”为记账符号，对每一笔经济业务在两个或两个以上账户中进行等额登记的复式记账方法。",
    formulas: [
      "资产 = 负债 + 所有者权益",
      "有借必有贷，借贷必相等",
      "资产类账户：借方登记增加，贷方登记减少",
      "负债和所有者权益类账户：贷方登记增加，借方登记减少"
    ],
    keyPoints: [
      "判断经济业务影响哪些会计要素。",
      "明确涉及的账户名称。",
      "判断每个账户是增加还是减少。",
      "根据账户性质确定借贷方向。",
      "最后检查借贷金额是否相等。"
    ],
    mistakes: [
      "不要只背“借增贷减”，不同账户性质方向不同。",
      "写分录前先判断账户性质，避免借贷方向写反。",
      "一笔业务至少影响两个账户，不能只写单边。",
      "分录金额必须借贷相等，否则试算不平衡。"
    ],
    steps: [
      "先读业务，圈出关键词：收到、支付、购入、销售、借入、归还。",
      "判断涉及的会计要素：资产、负债、所有者权益、收入、费用。",
      "写出账户名称，并判断增减变化。",
      "按账户性质确定借方或贷方。",
      "检查借贷双方金额是否相等。"
    ],
    answerTemplate: [
      "第一步：该业务涉及的账户为……",
      "第二步：其中……增加，应记借方；……增加/减少，应记贷方。",
      "第三步：会计分录为：借：…… 贷：……",
      "最后检查：借方金额 = 贷方金额。"
    ],
    lastMinute: [
      "默背会计等式：资产 = 负债 + 所有者权益。",
      "复查各类账户借贷方向。",
      "做分录题先判断账户性质，再写借贷方向。",
      "最后一定检查借贷是否平衡。"
    ],
    memoryTip: "先判账户性质，再判增减方向，最后看借贷是否相等。"
  },
  "会计等式": {
    coreConcept: "会计等式反映企业资产、负债和所有者权益之间的基本数量关系，是复式记账和编制资产负债表的基础。",
    formulas: [
      "资产 = 负债 + 所有者权益",
      "收入 - 费用 = 利润",
      "资产 + 费用 = 负债 + 所有者权益 + 收入"
    ],
    keyPoints: [
      "经济业务发生后，会计等式必须保持平衡。",
      "资产增加可能伴随负债增加、所有者权益增加，或另一项资产减少。",
      "收入会导致所有者权益增加，费用会导致所有者权益减少。"
    ],
    mistakes: [
      "不要把收入直接等同于资产，收入最终影响所有者权益。",
      "不要忽略一项经济业务对两个或多个项目的同时影响。",
      "判断业务类型时要检查等式两边是否仍然平衡。"
    ],
    steps: [
      "先判断业务影响哪些项目。",
      "再判断每个项目增加还是减少。",
      "代入会计等式检查左右是否平衡。",
      "如果不平衡，回头检查账户分类是否错误。"
    ],
    answerTemplate: [
      "该业务导致……增加/减少。",
      "根据会计等式，变化后仍满足：资产 = 负债 + 所有者权益。",
      "因此该业务不会破坏会计等式平衡。"
    ],
    lastMinute: [
      "先背基本等式，再看扩展等式。",
      "做判断题时抓住“等式始终平衡”。",
      "遇到收入费用题，要想到最终影响所有者权益。"
    ],
    memoryTip: "会计等式像天平，业务变化可以移动项目，但左右必须平。"
  },
  "阅读理解": {
    coreConcept: "阅读理解考查快速定位信息、判断文章结构、理解作者态度和推断隐含含义的能力。",
    formulas: [
      "先题后文：先看题干关键词，再回原文定位",
      "主旨题看首尾段和转折句",
      "细节题回原文找同义替换",
      "态度题关注形容词、副词和转折词"
    ],
    keyPoints: [
      "先快速浏览题干，圈出人名、时间、数字、主题词。",
      "细节题不要凭印象作答，要回到原文定位。",
      "主旨题关注文章结构和重复出现的核心词。",
      "推断题不能过度脑补，要基于原文线索。"
    ],
    mistakes: [
      "不要看到原文同词就立刻选，注意是否偷换概念。",
      "不要用个人常识替代文章信息。",
      "不要忽略 but, however, although 后面的转折重点。",
      "主旨题不要选择过窄或过宽的选项。"
    ],
    steps: [
      "先读题干，圈关键词。",
      "带着问题回原文定位。",
      "比较选项和原文是否同义替换。",
      "排除绝对化、偷换概念和无中生有选项。"
    ],
    answerTemplate: [
      "细节题：关键词定位 → 对照原文 → 选择同义替换项。",
      "主旨题：看首尾段 → 找重复主题词 → 排除过窄选项。",
      "推断题：找原文依据 → 做合理推断 → 不加入个人想象。"
    ],
    lastMinute: [
      "复习常见转折词和因果词。",
      "提醒自己细节题一定回原文。",
      "做题时先易后难，不在单题停留太久。"
    ],
    memoryTip: "阅读题别凭感觉，关键词定位加同义替换才稳。"
  }
};

function normalizeText(text) {
  return String(text || "")
    .replace(/\s+/g, " ")
    .trim();
}

function splitSentences(text) {
  return normalizeText(text)
    .split(/[。！？!?；;\n]/)
    .map((item) => item.trim())
    .filter(Boolean);
}

function uniqueList(items) {
  return Array.from(new Set(items.filter(Boolean)));
}

function asSourceItems(items, source) {
  return items.map((text) => ({ text, source }));
}

function mergeSourceItems(noteItems, knowledgeItems, limit = 6) {
  const seen = new Set();
  return [...asSourceItems(noteItems, "note"), ...asSourceItems(knowledgeItems, "knowledge")]
    .filter((item) => {
      const key = item.text.replace(/[。！？!?；;\s]/g, "");
      if (!key || seen.has(key)) {
        return false;
      }
      seen.add(key);
      return true;
    })
    .slice(0, limit);
}

function buildPriorityList(noteInsights, knowledge, examInsights = [], limit = 6) {
  const examPriorities = examInsights.map((item) => ({
    text: `${item.point}（真题出现 ${item.count} 次）`,
    level: item.count >= 3 ? "高" : "中",
    reason: "来自真题高频考点分析，建议优先加入考前复习。"
  }));

  const notePriorities = [
    ...noteInsights.mistakes.map((text) => ({
      text,
      level: "高",
      reason: "来自笔记中的易错提醒，考前优先排查。"
    })),
    ...noteInsights.formulas.map((text) => ({
      text,
      level: "高",
      reason: "来自笔记中的公式/规则，适合考前快速背诵。"
    })),
    ...noteInsights.keyPoints.slice(0, 2).map((text) => ({
      text,
      level: "中",
      reason: "来自笔记中的重点句，建议配合例题复习。"
    }))
  ];

  const knowledgePriorities = [
    ...(knowledge.lastMinute || []).map((text) => ({
      text,
      level: "高",
      reason: "知识库考前清单，适合最后 10 分钟回看。"
    })),
    ...(knowledge.mistakes || []).slice(0, 2).map((text) => ({
      text,
      level: "中",
      reason: "常见失分点，建议做题前提醒自己。"
    }))
  ];

  const seen = new Set();
  return [...examPriorities, ...notePriorities, ...knowledgePriorities]
    .filter((item) => {
      const key = item.text.replace(/[。！？!?；;\s]/g, "");
      if (!key || seen.has(key)) {
        return false;
      }
      seen.add(key);
      return true;
    })
    .slice(0, limit);
}

function extractNoteInsights(content, topic = DEFAULT_TOPIC) {
  const sentences = splitSentences(content);
  const cleanTopic = normalizeText(topic) || DEFAULT_TOPIC;

  const formulaPattern = /[=≈~→∑√∞^]|lim|sin|cos|tan|f'\(x\)|公式|定义|法则/;
  const mistakePattern = /注意|不要|不能|易错|混淆|漏|错|检查|区别|不一定/;
  const stepPattern = /先|再|最后|步骤|方法|判断|代入|化简|整理/;

  const formulas = sentences
    .filter((sentence) => formulaPattern.test(sentence))
    .slice(0, 4);

  const mistakes = sentences
    .filter((sentence) => mistakePattern.test(sentence))
    .map((sentence) => sentence.startsWith("注意") ? sentence : `注意：${sentence}`)
    .slice(0, 4);

  const steps = sentences
    .filter((sentence) => stepPattern.test(sentence))
    .slice(0, 4);

  const keyPoints = sentences
    .filter((sentence) => sentence.includes(cleanTopic) || sentence.length >= 12)
    .slice(0, 5);

  return {
    source: sentences.length ? "user_note" : "fallback",
    keyPoints,
    formulas,
    mistakes,
    steps,
    summary: sentences.length
      ? `已从用户笔记中提炼 ${Math.min(sentences.length, 5)} 条可复习信息。`
      : "未检测到有效笔记内容，当前使用知识点模板生成。"
  };
}

function pickKnowledge(topic, content) {
  const normalizedTopic = normalizeText(topic) || DEFAULT_TOPIC;
  if (topicKnowledgeBase[normalizedTopic]) {
    return topicKnowledgeBase[normalizedTopic];
  }

  const contentText = normalizeText(content);
  const matchedTopic = Object.keys(topicKnowledgeBase).find((key) => contentText.includes(key));
  if (matchedTopic) {
    return topicKnowledgeBase[matchedTopic];
  }

  return {
    coreConcept: `围绕“${normalizedTopic}”建立核心概念、适用条件和典型题型的整体理解。`,
    formulas: ["整理本章核心定义、公式和关键词。"],
    keyPoints: [
      `围绕“${normalizedTopic}”梳理基本概念、适用条件和常见题型。`,
      "优先复习老师强调过、作业反复出现、真题重复出现的内容。",
      "把不熟悉的知识点拆成“定义-例题-易错点”三部分。"
    ],
    mistakes: [
      "只背结论，不理解适用条件。",
      "看到熟悉题型就急着套模板，忽略题目限制。",
      "复习后不做自测，容易产生掌握错觉。"
    ],
    steps: [
      "先读一遍核心概念。",
      "再完成 3-5 道典型题。",
      "整理错题原因。",
      "考前用速记卡快速回顾。"
    ],
    answerTemplate: [
      "先写核心概念或公式。",
      "再结合题目条件选择解题方法。",
      "最后检查单位、定义域、关键词或材料对应关系。"
    ],
    lastMinute: [
      "看一遍核心定义和易错点。",
      "只做最典型的 1-2 道题保持手感。",
      "不要临时开启全新章节。"
    ],
    memoryTip: "考前抓主干：概念、公式、错题、模板。"
  };
}

function generateCheatSheet(subject, content, topic = DEFAULT_TOPIC, options = {}) {
  const cleanSubject = normalizeText(subject) || "未命名科目";
  const cleanTopic = normalizeText(topic) || DEFAULT_TOPIC;
  const knowledge = pickKnowledge(cleanTopic, content);
  const noteInsights = extractNoteInsights(content, cleanTopic);
  const examInsights = extractExamInsights(options.pastPaperText || "", cleanSubject);

  return {
    type: "cheat_sheet",
    subject: cleanSubject,
    topic: cleanTopic,
    title: `${cleanSubject}《${cleanTopic}》考前速记卡`,
    source: {
      primary: noteInsights.source === "user_note" ? "用户笔记 + 知识库补充" : "知识库模板",
      noteSummary: noteInsights.summary
    },
    content: {
      coreConcept: knowledge.coreConcept,
      noteHighlights: noteInsights.keyPoints,
      examKeyPoints: examInsights,
      coreFormulas: uniqueList([...noteInsights.formulas, ...knowledge.formulas]).slice(0, 6),
      keyPoints: uniqueList([...noteInsights.keyPoints, ...knowledge.keyPoints]).slice(0, 7),
      mistakes: uniqueList([...noteInsights.mistakes, ...knowledge.mistakes]).slice(0, 6),
      steps: uniqueList([...noteInsights.steps, ...knowledge.steps]).slice(0, 6),
      sourceMap: {
        coreFormulas: mergeSourceItems(noteInsights.formulas, knowledge.formulas, 6),
        keyPoints: mergeSourceItems(noteInsights.keyPoints, knowledge.keyPoints, 7),
        mistakes: mergeSourceItems(noteInsights.mistakes, knowledge.mistakes, 6),
        steps: mergeSourceItems(noteInsights.steps, knowledge.steps, 6)
      },
      answerTemplate: knowledge.answerTemplate,
      memoryTip: knowledge.memoryTip
    }
  };
}

function extractExamInsights(pastPaperText, subject = "未命名科目") {
  const text = normalizeText(pastPaperText);
  if (!text) {
    return [];
  }
  return analyzeKeyPoints(text, subject).keyPoints;
}

function normalizeQuizOptions(optionsOrCount) {
  if (typeof optionsOrCount === "number") {
    return { count: optionsOrCount, difficulty: "中等", content: "", pastPaperText: "" };
  }
  return {
    count: optionsOrCount?.count || 5,
    difficulty: optionsOrCount?.difficulty || "中等",
    content: optionsOrCount?.content || "",
    pastPaperText: optionsOrCount?.pastPaperText || ""
  };
}

function generateQuiz(subject, topic = DEFAULT_TOPIC, optionsOrCount = 5) {
  const cleanSubject = normalizeText(subject) || "未命名科目";
  const cleanTopic = normalizeText(topic) || DEFAULT_TOPIC;
  const quizOptions = normalizeQuizOptions(optionsOrCount);
  const knowledge = pickKnowledge(cleanTopic, quizOptions.content);
  const noteInsights = extractNoteInsights(quizOptions.content, cleanTopic);
  const examInsights = extractExamInsights(quizOptions.pastPaperText || "", cleanSubject);
  const dynamicQuestions = buildMaterialBasedQuestions(
    cleanSubject,
    cleanTopic,
    noteInsights,
    examInsights,
    quizOptions.difficulty
  );
  const fallbackQuestions = buildSubjectQuestions(cleanSubject, cleanTopic, knowledge, quizOptions.difficulty);
  const baseQuestions = mergeQuizQuestions(dynamicQuestions, fallbackQuestions);

  return {
    type: "quiz",
    subject: cleanSubject,
    topic: cleanTopic,
    difficulty: quizOptions.difficulty,
    source: buildQuizSource(noteInsights, examInsights),
    questionCount: Math.max(1, Math.min(quizOptions.count, baseQuestions.length)),
    reviewSuggestion: buildQuizReviewSuggestion(cleanSubject, cleanTopic, quizOptions.difficulty),
    questions: baseQuestions
      .slice(0, Math.max(1, Math.min(quizOptions.count, baseQuestions.length)))
      .map((question) => ({
        ...question,
        knowledgePoint: question.knowledgePoint || inferQuestionKnowledgePoint(question, cleanTopic)
      }))
  };
}

async function generateQuizWithZhipu(subject, topic = DEFAULT_TOPIC, optionsOrCount = 5) {
  const localQuiz = generateQuiz(subject, topic, optionsOrCount);
  const apiKey = getZhipuApiKey();
  if (!apiKey) {
    return {
      ...localQuiz,
      aiProvider: {
        name: "zhipuai",
        used: false,
        reason: "未检测到 ZHIPUAI_API_KEY，已使用本地规则出题。"
      }
    };
  }

  const quizOptions = normalizeQuizOptions(optionsOrCount);
  const cleanSubject = normalizeText(subject) || "未命名科目";
  const cleanTopic = normalizeText(topic) || DEFAULT_TOPIC;

  try {
    const aiQuestions = await requestZhipuQuiz({
      apiKey,
      subject: cleanSubject,
      topic: cleanTopic,
      difficulty: quizOptions.difficulty,
      count: quizOptions.count,
      content: quizOptions.content,
      pastPaperText: quizOptions.pastPaperText
    });
    const questions = mergeQuizQuestions(aiQuestions, localQuiz.questions)
      .slice(0, Math.max(1, Math.min(quizOptions.count, aiQuestions.length + localQuiz.questions.length)));

    return {
      ...localQuiz,
      source: {
        ...localQuiz.source,
        primary: localQuiz.source.primary === "知识库模板"
          ? "智谱AI文本分析"
          : `${localQuiz.source.primary} + 智谱AI文本分析`
      },
      aiProvider: {
        name: "zhipuai",
        model: getZhipuModel(),
        used: true
      },
      questionCount: questions.length,
      questions
    };
  } catch (error) {
    return {
      ...localQuiz,
      aiProvider: {
        name: "zhipuai",
        model: getZhipuModel(),
        used: false,
        reason: `智谱AI调用失败，已回退到本地规则：${error.message}`
      }
    };
  }
}

function getZhipuApiKey() {
  if (typeof process === "undefined" || !process.env) {
    return "";
  }
  return process.env.ZHIPUAI_API_KEY || "";
}

function getZhipuModel() {
  if (typeof process === "undefined" || !process.env) {
    return "glm-4.5";
  }
  return process.env.ZHIPUAI_MODEL || "glm-4.5";
}

async function requestZhipuQuiz({ apiKey, subject, topic, difficulty, count, content, pastPaperText }) {
  if (typeof fetch !== "function") {
    throw new Error("当前 Node 环境不支持 fetch，请使用 Node 18+。");
  }

  const response = await fetch("https://open.bigmodel.cn/api/paas/v4/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: getZhipuModel(),
      messages: [
        {
          role: "system",
          content: "你是大学课程自测题生成助手。必须只输出合法 JSON，不要输出 Markdown。"
        },
        {
          role: "user",
          content: buildZhipuQuizPrompt({ subject, topic, difficulty, count, content, pastPaperText })
        }
      ],
      thinking: {
        type: "disabled"
      },
      temperature: 0.5,
      max_tokens: 2048,
      stream: false
    })
  });

  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(data.error?.message || data.message || `HTTP ${response.status}`);
  }

  const text = data.choices?.[0]?.message?.content;
  if (!text) {
    throw new Error("响应中没有可解析的题目内容。");
  }

  return normalizeZhipuQuestions(parseJsonFromModelText(text), difficulty);
}

function buildZhipuQuizPrompt({ subject, topic, difficulty, count, content, pastPaperText }) {
  return [
    `请根据用户材料生成 ${count} 道“${subject}《${topic}》”自测题。`,
    `难度：${difficulty}`,
    "",
    "出题要求：",
    "1. 必须优先依据用户笔记和真题文本，不要泛泛出模板题。",
    "2. 题型可以包含 single_choice、blank、judge、short_answer、accounting_entry。",
    "3. 每题都要有 question、answer、explanation、wrongReason、reviewAction、source。",
    "4. source 只能是 user_note、past_paper 或 ai_analysis。",
    "5. 选择题必须给 options，且 answer 必须与其中一个选项完全一致。",
    "6. 输出必须是 JSON，格式为 {\"questions\": [...]}。",
    "",
    `用户笔记：${normalizeText(content) || "无"}`,
    "",
    `真题文本：${normalizeText(pastPaperText) || "无"}`
  ].join("\n");
}

function parseJsonFromModelText(text) {
  const raw = normalizeText(text)
    .replace(/^```json\s*/i, "")
    .replace(/^```\s*/i, "")
    .replace(/```$/i, "")
    .trim();
  const start = raw.indexOf("{");
  const end = raw.lastIndexOf("}");
  if (start === -1 || end === -1 || end <= start) {
    throw new Error("模型输出不是 JSON 对象。");
  }
  return JSON.parse(raw.slice(start, end + 1));
}

function normalizeZhipuQuestions(payload, defaultDifficulty) {
  const rawQuestions = Array.isArray(payload.questions) ? payload.questions : [];
  return rawQuestions
    .map((item) => ({
      type: item.type || "short_answer",
      difficulty: item.difficulty || defaultDifficulty,
      source: item.source || "ai_analysis",
      question: normalizeText(item.question),
      options: Array.isArray(item.options) ? item.options.map(normalizeText).filter(Boolean) : undefined,
      answer: normalizeText(item.answer),
      explanation: normalizeText(item.explanation),
      wrongReason: normalizeText(item.wrongReason),
      reviewAction: normalizeText(item.reviewAction)
    }))
    .filter((item) => item.question && item.answer && item.explanation)
    .map((item) => {
      if (item.type === "single_choice" && (!item.options || !item.options.includes(item.answer))) {
        return { ...item, type: "short_answer", options: undefined };
      }
      return item;
    });
}

function buildQuizSource(noteInsights, examInsights) {
  const sources = [];
  if (noteInsights.source === "user_note") {
    sources.push("用户笔记");
  }
  if (examInsights.length) {
    sources.push("真题文本");
  }

  return {
    primary: sources.length ? sources.join(" + ") : "知识库模板",
    noteSummary: noteInsights.summary,
    examPointCount: examInsights.length
  };
}

function buildMaterialBasedQuestions(subject, topic, noteInsights, examInsights, difficulty) {
  const questions = [];

  if (subject.includes("高数") || topic.includes("导数")) {
    return buildCalculusDerivativePaperQuestions(difficulty);
  }
  if (subject.includes("会计") || topic.includes("借贷") || topic.includes("会计")) {
    return buildAccountingCycleQuestions(difficulty);
  }
  if (subject.includes("马原") || subject.includes("马克思") || topic.includes("实践") || topic.includes("认识")) {
    return buildPoliticsQuestions(topic, difficulty);
  }

  noteInsights.keyPoints.slice(0, 2).forEach((point) => {
    questions.push(buildNoteKeyPointQuestion(topic, point, difficulty));
  });

  noteInsights.formulas.slice(0, 1).forEach((formula) => {
    questions.push(buildNoteFormulaQuestion(topic, formula, difficulty));
  });

  noteInsights.mistakes.slice(0, 1).forEach((mistake) => {
    questions.push(buildNoteMistakeQuestion(topic, mistake, difficulty));
  });

  examInsights.slice(0, 2).forEach((item) => {
    questions.push(buildExamPointQuestion(subject, topic, item, difficulty));
  });

  return questions;
}

function buildCalculusDerivativePaperQuestions(difficulty) {
  return [
    {
      type: "calculation",
      difficulty,
      source: "past_paper_style",
      knowledgePoint: "导数定义与差商极限",
      question: "若 f'(x0) 存在，求极限 lim(Δx→0) [f(x0+3Δx)-f(x0-2Δx)] / Δx。",
      answer: "5f'(x0)",
      explanation: "把分子拆成 [f(x0+3Δx)-f(x0)] + [f(x0)-f(x0-2Δx)]。第一项除以 Δx 等于 3·[f(x0+3Δx)-f(x0)]/(3Δx) → 3f'(x0)；第二项等于 2·[f(x0)-f(x0-2Δx)]/(2Δx) → 2f'(x0)。所以极限为 5f'(x0)。",
      wrongReason: "常见错误是只看到 Δx 就直接套 f'(x0)，忽略了 3Δx 和 -2Δx 带来的系数。",
      reviewAction: "回看导数定义 f'(x0)=lim(h→0)[f(x0+h)-f(x0)]/h，再做 2 道差商变形题。"
    },
    {
      type: "calculation",
      difficulty,
      source: "past_paper_style",
      knowledgePoint: "导数定义变形",
      question: "已知 f'(a) 存在，求 lim(h→0) [f(a+2h)-f(a-h)] / h。",
      answer: "3f'(a)",
      explanation: "分子拆为 [f(a+2h)-f(a)] + [f(a)-f(a-h)]。第一项除以 h 的极限为 2f'(a)，第二项除以 h 的极限为 f'(a)，合计 3f'(a)。",
      wrongReason: "如果写成 f'(a)，说明没有识别差商中自变量增量的倍数。",
      reviewAction: "把增量统一改成 t，例如 t=2h 或 t=-h，再套导数定义。"
    },
    {
      type: "judge",
      difficulty,
      source: "past_paper_style",
      knowledgePoint: "可导与连续的关系",
      question: "判断：若 f'(x0) 存在，则 f(x) 在 x0 处一定连续。",
      answer: "对",
      explanation: "可导必连续。因为 f(x)-f(x0) = [(f(x)-f(x0))/(x-x0)]·(x-x0)，当 x→x0 时，前一因子趋于 f'(x0)，后一因子趋于 0，所以函数增量趋于 0。",
      wrongReason: "容易把“可导必连续”和“连续必可导”混淆。后者不成立，例如 |x| 在 0 处连续但不可导。",
      reviewAction: "把“可导 ⇒ 连续；连续 ⇏ 可导”写入易错辨析。"
    },
    {
      type: "proof",
      difficulty,
      source: "past_paper_style",
      knowledgePoint: "一阶微分形式不变性",
      question: "设 y=f(x) 在区间内可导，z=g(y) 可导。说明为什么 dz = g'(y)dy 在 y 为自变量或中间变量时形式都成立。",
      answer: "当 y 为自变量时，按定义 dz=g'(y)dy；当 y=f(x) 为中间变量时，dz=(g∘f)'(x)dx=g'(y)f'(x)dx，而 dy=f'(x)dx，所以 dz=g'(y)dy。",
      explanation: "这类题考查复合函数求导和微分形式不变性，本质是链式法则的微分表达。",
      wrongReason: "如果只背结论不写链式法则，证明会显得空泛。",
      reviewAction: "复习 dy=f'(x)dx 与 dz=g'(y)dy 的变量关系。"
    },
    {
      type: "calculation",
      difficulty,
      source: "past_paper_style",
      knowledgePoint: "复合函数求导",
      question: "求函数 y=ln(1+x^2) 的导数。",
      answer: "y' = 2x/(1+x^2)",
      explanation: "外层是 ln u，导数为 u'/u；内层 u=1+x^2，u'=2x，所以 y'=2x/(1+x^2)。",
      wrongReason: "常见错误是只写 1/(1+x^2)，漏乘内层函数导数 2x。",
      reviewAction: "复习链式法则：外层导数 × 内层导数。"
    }
  ];
}

function buildNoteKeyPointQuestion(topic, point, difficulty) {
  return {
    type: "short_answer",
    difficulty,
    source: "user_note",
    knowledgePoint: summarizeKnowledgePoint(point, topic),
    question: `根据你的笔记，简述“${topic}”中这条内容的含义：${point}`,
    answer: point,
    explanation: "这道题直接来自用户笔记，用来检查是否真正理解笔记里的核心句，而不是只看过一遍。",
    wrongReason: "如果答不出来，说明这条笔记还没有转化成自己的表达。",
    reviewAction: "把这条笔记改写成“定义-适用场景-例题”的三行复习卡。"
  };
}

function buildNoteFormulaQuestion(topic, formula, difficulty) {
  return {
    type: "blank",
    difficulty,
    source: "user_note",
    knowledgePoint: summarizeKnowledgePoint(formula, topic),
    question: `请填空：复习“${topic}”时，笔记中提到的关键公式/规则是：${maskAnswerText(formula)}`,
    answer: formula,
    explanation: "这道题从笔记中的公式、定义或规则抽取，适合考前检查基础表述是否熟练。",
    wrongReason: "如果填不完整，说明公式或规则只停留在眼熟阶段。",
    reviewAction: "把该公式/规则默写 1 遍，并配 1 道对应例题。"
  };
}

function buildNoteMistakeQuestion(topic, mistake, difficulty) {
  const cleanMistake = mistake.replace(/^注意[:：]?/, "");
  return {
    type: "single_choice",
    difficulty,
    source: "user_note",
    knowledgePoint: summarizeKnowledgePoint(cleanMistake, topic),
    question: `根据你的笔记，复习“${topic}”时最需要避免哪种错误？`,
    options: [
      cleanMistake,
      "只要记住标题即可，不需要看条件",
      "所有题都可以直接套同一个模板",
      "做完题后不需要整理错因"
    ],
    answer: cleanMistake,
    explanation: "这道题来自用户笔记里的易错提醒，用选择题形式强化做题前的警觉点。",
    wrongReason: "如果选错，说明对自己笔记中标出的风险点不够敏感。",
    reviewAction: "把该易错点加入错题本，并写一个触发提醒。"
  };
}

function buildExamPointQuestion(subject, topic, item, difficulty) {
  const typeLabel = Array.isArray(item.possibleQuestionTypes)
    ? item.possibleQuestionTypes.join("、")
    : "常见题型";
  const evidence = item.evidence?.[0] ? `参考真题：“${item.evidence[0]}”。` : "";

  return {
    type: "short_answer",
    difficulty,
    source: "past_paper",
    knowledgePoint: item.point,
    question: `请解释“${item.point}”在“${subject}《${topic}》”中的核心含义或解题要点。`,
    answer: item.suggestion,
    explanation: `${evidence}这道题依据真题文本中提炼出的知识点生成，用来检查是否真的理解该考点。`,
    wrongReason: "如果答不出核心含义，说明还停留在只知道名称、不会展开的阶段。",
    reviewAction: `回到速记卡中的“${item.point}”，补充一个最小例题或答题步骤。`
  };
}

function summarizeKnowledgePoint(text, fallbackTopic) {
  const cleanText = normalizeText(text).replace(/^注意[:：]?/, "");
  if (/几何意义|切线|斜率/.test(cleanText)) return "导数的几何意义";
  if (/复合函数|链式法则|求导/.test(cleanText)) return "求导公式与链式法则";
  if (/单调|极值|增减/.test(cleanText)) return "导数判断单调性";
  if (/连续|可导/.test(cleanText)) return "可导与连续的关系";
  if (/借贷|有借必有贷|借贷必相等/.test(cleanText)) return "借贷记账法规则";
  if (/资产|负债|所有者权益|账户/.test(cleanText)) return "账户性质与借贷方向";
  if (/实践|认识/.test(cleanText)) return "实践与认识的关系";
  if (/阅读|定位|题干|同义替换/.test(cleanText)) return "阅读理解定位与同义替换";
  return cleanText.slice(0, 18) || fallbackTopic;
}

function inferQuestionKnowledgePoint(question, fallbackTopic) {
  const text = `${question.question || ""} ${question.answer || ""} ${question.explanation || ""}`;
  return summarizeKnowledgePoint(text, fallbackTopic);
}

function maskAnswerText(text) {
  const cleanText = normalizeText(text);
  if (cleanText.length <= 6) {
    return "________";
  }
  return `${cleanText.slice(0, 3)}________${cleanText.slice(-3)}`;
}

function mergeQuizQuestions(primaryQuestions, fallbackQuestions) {
  const seen = new Set();
  return [...primaryQuestions, ...fallbackQuestions].filter((question) => {
    const key = question.question.replace(/[。！？!?；;\s]/g, "");
    if (!key || seen.has(key)) {
      return false;
    }
    seen.add(key);
    return true;
  });
}

function buildSubjectQuestions(subject, topic, knowledge, difficulty) {
  if (subject.includes("会计") || topic.includes("借贷") || topic.includes("会计")) {
    return buildAccountingQuestions(topic, difficulty);
  }
  if (subject.includes("英语") || topic.includes("阅读")) {
    return buildEnglishQuestions(topic, difficulty);
  }
  if (subject.includes("马原") || subject.includes("马克思") || topic.includes("实践")) {
    return buildPoliticsQuestions(topic, difficulty);
  }
  return buildDefaultQuestions(topic, knowledge, difficulty);
}

function buildDefaultQuestions(topic, knowledge, difficulty) {
  return [
    {
      type: "single_choice",
      difficulty,
      question: `${topic}中最核心的概念或意义是什么？`,
      options: [
        knowledge.keyPoints[0] || "核心概念不明确",
        "只需要记住题目答案即可",
        "与考试题型没有关系",
        "只在课本目录中出现"
      ],
      answer: knowledge.keyPoints[0] || "核心概念不明确",
      explanation: "自测题优先检查核心概念，确保不是只会机械套题。",
      wrongReason: "如果选错，说明对核心概念的定义和适用场景还不稳定。",
      reviewAction: "回到速记卡的核心概念和高频考点部分，再做 1 道同类题。"
    },
    {
      type: "single_choice",
      difficulty,
      question: `复习“${topic}”时，下列哪种做法更合理？`,
      options: [
        "先理解概念，再做典型题并整理错因",
        "只看答案，不做题",
        "只背标题，不看例题",
        "完全跳过易错点"
      ],
      answer: "先理解概念，再做典型题并整理错因",
      explanation: "理解、练习、纠错形成闭环，复习效率更高。",
      wrongReason: "如果选错，说明复习策略容易停留在机械背诵。",
      reviewAction: "按“概念-例题-错因”重新整理该知识点。"
    },
    {
      type: "single_choice",
      difficulty,
      question: `关于“${topic}”的易错点，下列哪项最需要注意？`,
      options: [
        knowledge.mistakes[0] || "忽略适用条件",
        "题目越长越不用看条件",
        "所有题都可以用同一个模板",
        "错题不需要回顾"
      ],
      answer: knowledge.mistakes[0] || "忽略适用条件",
      explanation: "考试中丢分往往来自概念边界和适用条件。",
      wrongReason: "如果选错，说明对常见失分点不够敏感。",
      reviewAction: "优先复习速记卡里的“易错警告”。"
    },
    {
      type: "blank",
      difficulty,
      question: `请填空：“${topic}”复习时，建议按照“概念理解 → 典型题训练 → ________”的顺序进行。`,
      answer: "错题整理",
      explanation: "错题整理能暴露薄弱点，也是动态调整计划的重要依据。",
      wrongReason: "如果不会填，说明还没有形成复习闭环意识。",
      reviewAction: "完成自测后至少记录 1 条错因。"
    },
    {
      type: "blank",
      difficulty,
      question: `请填空：考前复习应优先关注高频考点、易错点和________。`,
      answer: "错题",
      explanation: "错题最能代表用户自己的薄弱环节。",
      wrongReason: "如果不会填，说明考前优先级还不清楚。",
      reviewAction: "把错题加入明日复习任务。"
    }
  ];
}

function buildAccountingQuestions(topic, difficulty) {
  return buildAccountingCycleQuestions(difficulty);
}

function buildAccountingCycleQuestions(difficulty) {
  return [
    {
      type: "accounting_entry",
      difficulty,
      source: "past_paper_style",
      knowledgePoint: "现销收入的日记账分录",
      question: "四金软件公司 3 月份取得现销收入 38 000 元。请编制简化会计分录。",
      answer: "借：现金 38000；贷：营业收入 38000",
      explanation: "收到现金，资产增加，记借方；已经提供服务或销售形成收入，收入增加，记贷方。",
      wrongReason: "常见错误是只写收入，不写现金增加，或者把收入误记在借方。",
      reviewAction: "遇到收入题先判断是否收现：收现借现金，赊销借应收账款。"
    },
    {
      type: "accounting_entry",
      difficulty,
      source: "past_paper_style",
      knowledgePoint: "赊销与收回应收账款",
      question: "公司发生赊销收入 20 000 元，月末收回其中 6 000 元现金。请分别编制两笔简化分录。",
      answer: "赊销：借：应收账款 20000；贷：营业收入 20000。收款：借：现金 6000；贷：应收账款 6000",
      explanation: "赊销时尚未收款，所以形成应收账款；后来收到现金时，应收账款减少，现金增加。",
      wrongReason: "容易把赊销也写成借现金，或者收款时又重复确认收入。",
      reviewAction: "区分“确认收入”和“收回账款”：收回应收账款时不再贷记收入。"
    },
    {
      type: "accounting_entry",
      difficulty,
      source: "past_paper_style",
      knowledgePoint: "固定资产购入与付款方式",
      question: "公司购入设备 180 000 元，支付现金 70 000 元，其余开出应付票据。请编制简化分录。",
      answer: "借：固定资产/设备 180000；贷：现金 70000；贷：应付票据 110000",
      explanation: "设备增加按总成本入账；一部分现金支付导致现金减少，另一部分形成应付票据负债。",
      wrongReason: "常见错误是只按现金 70 000 入账，漏记应付票据，导致资产成本少记。",
      reviewAction: "购入资产题要先确定资产总成本，再拆分付款来源。"
    },
    {
      type: "accounting_entry",
      difficulty,
      source: "past_paper_style",
      knowledgePoint: "预付费用的期末调整",
      question: "9 月 1 日支付 3 个月预付租金 9 000 元。9 月 30 日编制调整分录，确认 9 月租金费用。",
      answer: "借：租金费用 3000；贷：预付租金 3000",
      explanation: "9 000 元覆盖 3 个月，每月应确认 3 000 元费用；预付租金作为资产减少。",
      wrongReason: "容易把 9 000 元一次性全部计入 9 月费用，或者忘记冲减预付租金。",
      reviewAction: "预付类调整按“总额/受益期数=本期费用”计算。"
    },
    {
      type: "accounting_entry",
      difficulty,
      source: "past_paper_style",
      knowledgePoint: "应计费用调整",
      question: "月末应付但尚未支付工资 5 000 元。请编制调整分录。",
      answer: "借：工资费用 5000；贷：应付工资 5000",
      explanation: "本期已经发生的工资应计入本期费用；尚未支付形成负债。",
      wrongReason: "如果不做分录，会低估本期费用和负债。",
      reviewAction: "应计费用抓两个词：已经发生、尚未支付。"
    },
    {
      type: "accounting_entry",
      difficulty,
      source: "past_paper_style",
      knowledgePoint: "折旧调整分录",
      question: "出租设备成本 180 000 元，直线法折旧，使用年限 10 年，假设无残值。请编制 1 个月折旧调整分录。",
      answer: "借：折旧费用 1500；贷：累计折旧 1500",
      explanation: "年折旧额为 180000/10=18000 元，月折旧额为 1500 元。折旧费用增加记借方，累计折旧增加记贷方。",
      wrongReason: "常见错误是贷记设备账户，而不是贷记累计折旧。",
      reviewAction: "折旧调整固定写法：借折旧费用，贷累计折旧。"
    },
    {
      type: "accounting_entry",
      difficulty,
      source: "past_paper_style",
      knowledgePoint: "预收收入转已赚收入",
      question: "收到客户设备租赁预付款 20 000 元，其中 12 000 元本月已经赚取。请编制月末调整分录。",
      answer: "借：未赚取租金收入 12000；贷：已赚取租金收入 12000",
      explanation: "预收款最初是负债；本月已经提供服务的部分应从负债转为收入。",
      wrongReason: "容易在收到预付款时就全部确认收入，或月末忘记把已赚部分转收入。",
      reviewAction: "预收类调整按“已提供服务的金额”确认收入。"
    }
  ];
}

function buildEnglishQuestions(topic, difficulty) {
  return [
    {
      type: "single_choice",
      difficulty,
      question: "阅读理解细节题最稳妥的做法是？",
      options: ["回原文定位并寻找同义替换", "凭第一印象选择", "只看选项不看文章", "优先选择最长选项"],
      answer: "回原文定位并寻找同义替换",
      explanation: "细节题通常考查原文信息和选项之间的同义替换。",
      wrongReason: "如果选错，说明容易凭感觉做题。",
      reviewAction: "练习圈题干关键词并回文定位。"
    },
    {
      type: "single_choice",
      difficulty,
      question: "主旨题通常应该重点关注哪里？",
      options: ["首尾段和反复出现的主题词", "某一个生词", "任意一个数字", "最长的一句话"],
      answer: "首尾段和反复出现的主题词",
      explanation: "主旨题考文章整体，不应被局部细节带偏。",
      wrongReason: "如果选错，说明容易把局部细节当主旨。",
      reviewAction: "做主旨题时先概括段落结构。"
    },
    {
      type: "judge",
      difficulty,
      question: "阅读理解中，看到原文同词出现就一定是正确选项。对还是错？",
      answer: "错",
      explanation: "同词可能是干扰项，仍要检查语义是否一致。",
      wrongReason: "如果判断错误，说明没有警惕偷换概念。",
      reviewAction: "训练识别同义替换和反向干扰。"
    },
    {
      type: "blank",
      difficulty,
      question: "阅读细节题建议先圈出题干中的人名、时间、数字和________。",
      answer: "关键词",
      explanation: "关键词能帮助快速定位原文信息。",
      wrongReason: "如果不会填，说明做题流程不够清晰。",
      reviewAction: "每篇阅读先练 30 秒题干关键词标注。"
    },
    {
      type: "short_answer",
      difficulty,
      question: "简述阅读理解中“先题后文”的好处。",
      answer: "先看题干可以明确阅读目标，带着关键词回原文定位，提高效率并减少无效阅读。",
      explanation: "这是阅读题提高速度和准确率的常见方法。",
      wrongReason: "如果答不完整，说明技巧理解还停留在口号层面。",
      reviewAction: "用一篇短文实际演练先题后文。"
    }
  ];
}

function buildPoliticsQuestions(topic, difficulty) {
  return [
    {
      type: "short_answer",
      difficulty,
      source: "past_paper_style",
      knowledgePoint: "实践与认识的辩证关系",
      question: "材料分析：某地为了治理城市内涝，最初照搬外地排水方案，效果不佳。后来调研本地地形、降雨和管网情况，反复试点改造，最终形成适合本地的治理方案。请用“实践与认识”的关系分析这一过程。",
      answer: "实践决定认识，实践是认识的来源、动力、目的和检验标准；认识对实践具有反作用。材料中，当地通过调查研究和试点实践获得真实情况，并用治理效果检验和修正方案，体现了从实践到认识、再由认识指导实践的过程。方法论上应坚持实践第一，做到理论联系实际，不能照搬经验。",
      explanation: "这类题要先写原理，再扣材料中的“调研、试点、修正、形成方案”，最后落到方法论。",
      wrongReason: "如果只背“实践决定认识”，没有解释材料中的试点和修正，就会显得空泛。",
      reviewAction: "按“原理句-材料句-方法论句”重写一遍答案。"
    },
    {
      type: "short_answer",
      difficulty,
      source: "past_paper_style",
      knowledgePoint: "认识对实践的反作用",
      question: "材料分析：某科研团队在农业生产中发现传统经验无法解决盐碱地增产问题，于是建立实验田，形成新的种植理论，并推广后提升了产量。请说明材料体现了认识对实践的什么作用。",
      answer: "材料体现了认识对实践具有反作用，正确认识能够指导实践并促进实践发展。科研团队在实验田中形成新的种植理论，并将其推广到农业生产中，提高产量，说明科学理论一旦被群众掌握并用于实践，就能转化为改造世界的力量。",
      explanation: "答题重点不是只说“认识有反作用”，而是要指出新理论如何指导农业实践并产生效果。",
      wrongReason: "容易只写实践决定认识，漏掉题目问的是认识如何指导实践。",
      reviewAction: "看到“理论推广、政策指导、科学方案产生效果”时，优先想到认识对实践的反作用。"
    },
    {
      type: "short_answer",
      difficulty,
      source: "past_paper_style",
      knowledgePoint: "实践是检验真理的唯一标准",
      question: "材料分析：一种新药在实验室理论推导中效果很好，但经过多轮临床试验后发现副作用明显，最终调整了研发方向。请用马克思主义认识论说明为什么要经过临床试验检验。",
      answer: "实践是检验认识真理性的唯一标准。理论推导只是认识的一种形式，是否正确必须放到实践中检验。临床试验暴露出副作用，说明原有认识需要修正，体现了实践对认识真理性的检验作用，也说明认识具有反复性和发展性。",
      explanation: "材料关键词是“理论推导”和“临床试验”，要把它们对应到认识与实践的关系。",
      wrongReason: "如果只说新药有副作用，没有上升到实践检验真理，就没有用到马原知识。",
      reviewAction: "材料里出现“检验、试验、验证、结果证明”时，想到实践是检验真理的唯一标准。"
    },
    {
      type: "short_answer",
      difficulty,
      source: "past_paper_style",
      knowledgePoint: "认识过程的反复性和无限性",
      question: "材料分析：人工智能技术在应用中不断出现新问题，人们在实践中发现算法偏见、数据安全等风险，又不断修正规则和技术方案。请用认识过程的特点分析这一现象。",
      answer: "认识具有反复性和无限性。由于客观事物复杂变化，人的认识会受到实践条件和认识能力限制，需要在实践中不断发现问题、修正认识、深化认识。材料中人工智能应用不断暴露新风险，人们持续完善规则和技术方案，体现了认识在实践基础上的反复发展。",
      explanation: "这道题考“认识不是一次完成的”，要抓住不断发现、不断修正、不断深化。",
      wrongReason: "如果只写实践决定认识，会漏掉认识反复发展这一层。",
      reviewAction: "把“实践-认识-再实践-再认识”的循环写成固定答题句。"
    },
    {
      type: "short_answer",
      difficulty,
      source: "past_paper_style",
      knowledgePoint: "材料题答题结构",
      question: "材料分析：某企业转型时只追逐热门概念，忽视自身生产条件，结果投入很大但效果有限。后来企业重新调查市场和生产流程，制定符合自身实际的转型方案。请用马克思主义原理分析其启示。",
      answer: "这一材料启示我们要坚持一切从实际出发，理论联系实际。实践决定认识，正确认识必须来源于对具体实际的调查研究；认识对实践具有反作用，符合实际的方案才能有效指导实践。企业不能脱离自身条件照搬热门概念，应在实践中形成并检验适合自身的转型认识。",
      explanation: "这类现实背景题要把“脱离实际失败”和“调查实际后改进”分别扣到原理上。",
      wrongReason: "如果只写企业管理建议，没有使用实践认识、一切从实际出发等原理，就偏离了马原答题要求。",
      reviewAction: "练习把现实材料压缩成“问题-原理-材料对应-方法论”四句。"
    }
  ];
}

function buildQuizReviewSuggestion(subject, topic, difficulty) {
  if (subject.includes("会计")) {
    return `本组题重点检查“${topic}”的规则判断和分录能力。若分录题错误，优先复习账户性质和借贷方向。`;
  }
  if (subject.includes("英语")) {
    return `本组题重点检查阅读技巧。若正确率低，先练关键词定位和同义替换，不要急着刷长篇。`;
  }
  if (subject.includes("马原") || subject.includes("马克思")) {
    return `本组题重点训练“现实背景材料 + 马克思主义原理分析”。若答题空泛，按“原理-材料-方法论”模板重练。`;
  }
  return `本组题为${difficulty}难度，重点检查“${topic}”的概念、易错点和复习闭环。`;
}

function generateFlashcards(subject, content, topic = DEFAULT_TOPIC, count = 5) {
  const cleanSubject = normalizeText(subject) || "未命名科目";
  const cleanTopic = normalizeText(topic) || DEFAULT_TOPIC;
  const knowledge = pickKnowledge(cleanTopic, content);
  const noteInsights = extractNoteInsights(content, cleanTopic);

  const cards = buildKnowledgeFlashcards(cleanTopic, knowledge, noteInsights);

  return {
    type: "flashcards",
    subject: cleanSubject,
    topic: cleanTopic,
    cards: cards.slice(0, Math.max(1, Math.min(count, cards.length)))
  };
}

function buildKnowledgeFlashcards(topic, knowledge, noteInsights) {
  if (/借贷|会计|分录|账户/.test(topic)) {
    return buildAccountingFlashcards();
  }

  const candidates = [
    {
      front: `${topic}的核心概念是什么？`,
      back: knowledge.coreConcept || knowledge.keyPoints?.[0] || `围绕 ${topic} 梳理核心定义、适用条件和典型题型。`
    },
    ...noteInsights.keyPoints.map((text) => knowledgeFlashcard(text, topic, "keyPoint")),
    ...knowledge.keyPoints.map((text) => knowledgeFlashcard(text, topic, "keyPoint")),
    ...knowledge.formulas.map((text) => knowledgeFlashcard(text, topic, "formula")),
    ...noteInsights.mistakes.map((text) => knowledgeFlashcard(text, topic, "mistake")),
    ...knowledge.mistakes.map((text) => knowledgeFlashcard(text, topic, "mistake")),
    ...knowledge.steps.map((text) => knowledgeFlashcard(text, topic, "step"))
  ];

  const seen = new Set();
  return candidates.filter((card) => {
    const backKey = normalizeFlashcardKey(card.back);
    if (!backKey || seen.has(backKey)) {
      return false;
    }
    seen.add(backKey);
    return true;
  });
}

function knowledgeFlashcard(text, topic, kind) {
  return {
    front: flashcardKnowledgeQuestion(text, topic, kind),
    back: text
  };
}

function buildAccountingFlashcards() {
  return [
    {
      front: "收到现金收入时怎样记账？",
      back: "借：现金/银行存款；贷：营业收入。关键是资产增加记借方，收入增加记贷方。"
    },
    {
      front: "赊销收入和收回应收账款怎样区分？",
      back: "赊销时借：应收账款，贷：营业收入；收回账款时借：现金/银行存款，贷：应收账款，不再重复确认收入。"
    },
    {
      front: "购入设备一部分付现、一部分欠款怎样记？",
      back: "借：固定资产/设备总成本；贷：现金/银行存款已付金额；贷：应付账款或应付票据未付金额。"
    },
    {
      front: "预付租金或保险费月末怎样调整？",
      back: "先按预付款作为资产入账；月末把本期受益部分转费用：借：租金费用/保险费用；贷：预付租金/预付保险费。"
    },
    {
      front: "应计未付工资怎样调整？",
      back: "本期已发生但未支付：借：工资费用；贷：应付工资。这样同时补记费用和负债。"
    },
    {
      front: "设备折旧调整分录怎样写？",
      back: "借：折旧费用；贷：累计折旧。不要直接贷记设备账户，设备账户保留原始成本。"
    },
    {
      front: "预收租金或客户定金什么时候转收入？",
      back: "收到时先贷记未赚取收入；已经提供服务的部分月末转收入：借：未赚取收入；贷：已赚取收入/营业收入。"
    },
    {
      front: "写会计分录的固定步骤是什么？",
      back: "先圈业务关键词，再找账户，判断账户性质和增减方向，最后写借贷并检查借贷金额相等。"
    }
  ];
}

function flashcardKnowledgeQuestion(text, topic, kind) {
  const value = normalizeText(text)
    .replace(/^注意：/, "")
    .replace(/[。；;]$/g, "");

  if (/瞬时变化率/.test(value)) {
    return `${topic}表示什么？`;
  }
  if (/几何意义|切线|斜率/.test(value)) {
    return `${topic}的几何意义是什么？`;
  }
  if (/可导.*连续|连续.*可导/.test(value)) {
    return "可导和连续有什么关系？";
  }
  if (/复合函数|链式法则/.test(value)) {
    return "复合函数求导要注意什么？";
  }
  if (/单调|极值|增减/.test(value)) {
    return `${topic}怎样用于判断函数变化？`;
  }
  if (/资产\s*=|会计等式/.test(value)) {
    return "会计等式是什么？";
  }
  if (/有借必有贷|借贷必相等/.test(value)) {
    return "借贷记账的基本规则是什么？";
  }
  if (/账户性质|借方|贷方/.test(value)) {
    return "账户性质怎样决定借贷方向？";
  }
  if (/实践.*认识|认识.*实践/.test(value)) {
    return "实践和认识是什么关系？";
  }
  if (/真理/.test(value)) {
    return "真理有哪些特征？";
  }
  if (/题干|定位|细节题/.test(value)) {
    return "阅读细节题应该怎么定位？";
  }
  if (/主旨题/.test(value)) {
    return "主旨题应该看哪里？";
  }
  if (/推断题/.test(value)) {
    return "推断题的依据是什么？";
  }

  if (kind === "formula") {
    return `${topic}要记住什么公式或规则？`;
  }
  if (kind === "mistake") {
    return `${topic}最容易错在哪里？`;
  }
  if (kind === "step") {
    return `做${topic}题时第一步是什么？`;
  }
  return `${topic}有哪些具体知识点？`;
}

function normalizeFlashcardKey(text) {
  return normalizeText(text)
    .replace(/[，。；：、“”‘’"'（）()《》\s]/g, "")
    .replace(/的/g, "")
    .slice(0, 48);
}

function generatePodcastScript(subject, content, topic = DEFAULT_TOPIC) {
  const cleanSubject = normalizeText(subject) || "未命名科目";
  const cleanTopic = normalizeText(topic) || DEFAULT_TOPIC;
  const knowledge = pickKnowledge(cleanTopic, content);
  const noteInsights = extractNoteInsights(content, cleanTopic);
  const context = buildPodcastContext(cleanSubject, cleanTopic, knowledge, noteInsights);
  const segments = buildSubjectPodcastSegments(context);
  const script = segments.map((segment) => `${segment.label}：${segment.text}`).join("\n\n");
  const estimatedSeconds = estimatePodcastSeconds(script);
  const estimatedMinutes = Number((estimatedSeconds / 60).toFixed(1));

  return {
    type: "podcast_script",
    subject: cleanSubject,
    topic: cleanTopic,
    title: `${cleanSubject}《${cleanTopic}》播客`,
    estimatedSeconds,
    estimatedMinutes,
    voiceStyle: "沉稳、清晰、适合考前复盘",
    source: {
      primary: noteInsights.source === "user_note" ? "用户笔记 + 知识库补充" : "知识库模板",
      noteSummary: noteInsights.summary
    },
    segments,
    script
  };
}

function buildPodcastContext(subject, topic, knowledge, noteInsights) {
  return {
    subject,
    topic,
    knowledge,
    noteInsights,
    keyPoints: cleanPodcastItems(uniqueList([...noteInsights.keyPoints, ...knowledge.keyPoints]), 5),
    mistakes: cleanPodcastItems(uniqueList([...noteInsights.mistakes, ...knowledge.mistakes]), 3),
    formulas: cleanPodcastItems(uniqueList([...noteInsights.formulas, ...knowledge.formulas]), 3),
    steps: cleanPodcastItems(uniqueList([...(knowledge.steps || [])]), 4)
  };
}

function cleanPodcastItems(items, limit) {
  const seen = new Set();
  return items
    .map((item) => normalizeText(item).replace(/^注意：/, "").replace(/[。；;]$/g, ""))
    .filter((item) => {
      const key = item
        .replace(/^会计等式为[:：]?/, "")
        .replace(/^基本公式[:：]?/, "")
        .replace(/[，。；：、“”‘’"'（）()《》\s]/g, "");
      if (!key || seen.has(key)) return false;
      seen.add(key);
      return true;
    })
    .slice(0, limit);
}

function buildSubjectPodcastSegments(context) {
  const { subject, topic } = context;
  if (subject.includes("会计") || topic.includes("借贷")) {
    return buildAccountingPodcastSegments(context);
  }
  if (subject.includes("英语") || topic.includes("阅读")) {
    return buildEnglishPodcastSegments(context);
  }
  if (subject.includes("马原") || topic.includes("实践") || topic.includes("认识")) {
    return buildPoliticsPodcastSegments(context);
  }
  if (subject.includes("高数") || /导数|极限|积分|函数/.test(topic)) {
    return buildMathPodcastSegments(context);
  }
  return buildGeneralPodcastSegments(context);
}

function buildMathPodcastSegments({ topic, knowledge, keyPoints, formulas, mistakes, steps }) {
  const formulaText = formulas.filter((item) => /[=~'()]/.test(item)).slice(0, 3);
  return [
    {
      label: "一句话",
      text: `${topic}先抓两个词：变化率和斜率。${knowledge.coreConcept}`
    },
    {
      label: "怎么考",
      text: `选择题常问概念和几何意义；计算题常让你求导、代点、判断单调性；综合题会把${topic}和极限、切线方程放在一起。看到“切线”“单调”“极值”，先想到求导。`
    },
    {
      label: "手上步骤",
      text: steps.length
        ? steps.map((step, index) => `${index + 1}. ${step}`).join(" ")
        : "先看函数结构，再选公式，最后代入题目条件。"
    },
    {
      label: "必须会写",
      text: formulaText.length
        ? formulaText.join("；")
        : keyPoints.slice(0, 3).join("；")
    },
    {
      label: "别丢分",
      text: mistakes.length
        ? mistakes.join("；")
        : "复合函数别漏内层导数，分段函数别忘检查分界点。"
    }
  ];
}

function buildAccountingPodcastSegments({ topic, knowledge, keyPoints, formulas, mistakes, steps }) {
  return [
    {
      label: "核心规则",
      text: `${topic}只记一句：有借必有贷，借贷必相等。真正做题时，关键不是背“借贷”两个字，而是先判断账户性质。`
    },
    {
      label: "分录怎么做",
      text: steps.length
        ? steps.map((step, index) => `${index + 1}. ${step}`).join(" ")
        : "先圈业务关键词，再判断会计要素，写账户名称，确定借贷方向，最后检查金额相等。"
    },
    {
      label: "账户方向",
      text: formulas.length
        ? formulas.join("；")
        : keyPoints.slice(0, 4).join("；")
    },
    {
      label: "典型业务",
      text: "购入材料未付款：原材料增加记借方，应付账款增加记贷方。收到投资者投入资本：银行存款等资产增加记借方，实收资本增加记贷方。"
    },
    {
      label: "常见错法",
      text: mistakes.length
        ? mistakes.join("；")
        : "最常见错误是账户性质没判清、只写单边、借贷金额不相等。"
    }
  ];
}

function buildEnglishPodcastSegments({ topic, knowledge, keyPoints, formulas, mistakes, steps }) {
  return [
    {
      label: "做题顺序",
      text: `${topic}不要从头硬读。先看题干，圈人名、时间、数字、态度词和主题词，再回原文定位。`
    },
    {
      label: "题型处理",
      text: "细节题找同义替换，主旨题看首尾段和反复出现的主题词，推断题只能从原文线索推出，不能加自己的常识。"
    },
    {
      label: "定位动作",
      text: steps.length
        ? steps.map((step, index) => `${index + 1}. ${step}`).join(" ")
        : keyPoints.slice(0, 4).join("；")
    },
    {
      label: "排除选项",
      text: "绝对化表达、偷换概念、无中生有、只截取局部细节的选项，优先怀疑。看到原词复现也别急着选，要检查意思是否一致。"
    },
    {
      label: "今天练法",
      text: "拿一篇阅读，只练两件事：30 秒圈题干关键词，2 分钟回文定位证据。先把定位练稳，再追求速度。"
    }
  ];
}

function buildPoliticsPodcastSegments({ topic, knowledge, keyPoints, formulas, mistakes, steps }) {
  return [
    {
      label: "原理句",
      text: `${topic}先背主干：${knowledge.coreConcept}`
    },
    {
      label: "材料题写法",
      text: steps.length
        ? steps.map((step, index) => `${index + 1}. ${step}`).join(" ")
        : "先写原理，再扣材料，最后落到方法论。"
    },
    {
      label: "高频表述",
      text: formulas.length
        ? formulas.join("；")
        : keyPoints.slice(0, 4).join("；")
    },
    {
      label: "别空泛",
      text: "材料里出现调查、劳动、实验、改革、社会活动，就往实践上靠；出现观点、理论、判断、方案，就往认识上靠。答案必须点出材料中的具体行为。"
    },
    {
      label: "失分点",
      text: mistakes.length
        ? mistakes.join("；")
        : "不要把认识来源写成书本，不要漏掉认识对实践的反作用。"
    }
  ];
}

function buildGeneralPodcastSegments({ topic, knowledge, keyPoints, formulas, mistakes, steps }) {
  return [
    {
      label: "核心",
      text: knowledge.coreConcept
    },
    {
      label: "重点",
      text: keyPoints.slice(0, 4).join("；")
    },
    {
      label: "规则",
      text: formulas.length ? formulas.join("；") : steps.slice(0, 4).join("；")
    },
    {
      label: "易错",
      text: mistakes.length ? mistakes.join("；") : `复习 ${topic} 时先确认题目条件，再套用结论。`
    }
  ];
}

function estimatePodcastSeconds(script) {
  const compactLength = normalizeText(script).replace(/\s/g, "").length;
  return Math.max(30, Math.ceil(compactLength / 4.8));
}

function generateStudyPack(task) {
  const subject = normalizeText(task.subject) || "未命名科目";
  const topic = normalizeText(task.topic) || DEFAULT_TOPIC;
  const content = task.content || "";
  const materialTypes = task.materialTypes || recommendMaterialTypes(subject, topic);

  const materials = {};
  if (materialTypes.includes("cheatSheet")) {
    materials.cheatSheet = generateCheatSheet(subject, content, topic, {
      pastPaperText: task.pastPaperText
    });
  }
  if (materialTypes.includes("quiz")) {
    materials.quiz = generateQuiz(subject, topic, {
      content,
      pastPaperText: task.pastPaperText,
      count: 5
    });
  }
  if (materialTypes.includes("flashcards")) {
    materials.flashcards = generateFlashcards(subject, content, topic);
  }
  if (materialTypes.includes("podcast")) {
    materials.podcast = generatePodcastScript(subject, content, topic);
  }
  if (materialTypes.includes("analysis")) {
    materials.analysis = analyzeKeyPoints(task.pastPaperText || content, subject);
  }

  return {
    subject,
    topic,
    allocatedMinutes: task.allocatedMinutes || 0,
    taskGoal: task.taskGoal || buildTaskGoal(subject, topic),
    uploadedFiles: task.uploadedFiles || [],
    materialTypes,
    materials
  };
}

function generateDailyStudyPacks(tasks, date = new Date().toISOString().slice(0, 10)) {
  const studyPacks = tasks.map(generateStudyPack);
  return {
    type: "daily_study_packs",
    date,
    totalSubjects: studyPacks.length,
    studyPacks
  };
}

function recommendMaterialTypes(subject, topic) {
  if (subject.includes("马原") || subject.includes("马克思")) {
    return ["cheatSheet", "quiz", "flashcards", "podcast", "analysis"];
  }
  if (subject.includes("英语")) {
    return ["cheatSheet", "flashcards", "podcast", "analysis"];
  }
  if (subject.includes("会计")) {
    return ["cheatSheet", "quiz", "flashcards", "podcast", "analysis"];
  }
  return ["cheatSheet", "quiz", "flashcards", "podcast", "analysis"];
}

function buildTaskGoal(subject, topic) {
  if (subject.includes("会计")) {
    return `掌握“${topic}”的规则、易错点和业务题处理步骤。`;
  }
  if (subject.includes("英语")) {
    return `围绕“${topic}”进行技巧复习和碎片化练习。`;
  }
  if (subject.includes("马原") || subject.includes("马克思")) {
    return `理解并背诵“${topic}”的核心原理和答题模板。`;
  }
  return `复习“${topic}”的核心公式、典型题和易错点。`;
}

function analyzeKeyPoints(pastPaperText, subject = "未命名科目") {
  const text = normalizeText(pastPaperText);
  const cleanSubject = normalizeText(subject) || "未命名科目";
  const questions = parseExamQuestions(pastPaperText);
  const rawRuleResults = questions.flatMap((question) => inferConcreteExamPoints(question, cleanSubject));
  const ruleResults = filterSubjectRelevantPoints(rawRuleResults, cleanSubject);
  const grouped = groupExamPoints(ruleResults);
  const fallbackResults = grouped.length ? [] : fallbackKeywordAnalysis(text);
  const results = grouped.length ? grouped : fallbackResults;
  const totalQuestions = questions.length || (text ? 1 : 0);
  const recognizedQuestions = new Set(ruleResults.map((item) => item.questionIndex)).size;
  const keyPoints = results.length ? results : [
    {
      point: "核心概念",
      count: 1,
      score: 1,
      heatLevel: "低",
      priority: 1,
      confidence: 0.35,
      possibleQuestionTypes: ["选择题", "简答题"],
      suggestion: "当前文本可识别考点较少，建议补充更多真题文本后再次分析。",
      drillPlan: "先人工标出题干中的章节名、公式名或概念名，再重新生成分析。",
      evidence: []
    }
  ];

  return {
    type: "key_point_analysis",
    subject: cleanSubject,
    sourceSummary: {
      totalQuestions,
      recognizedQuestions,
      coverageRate: totalQuestions ? Number((recognizedQuestions / totalQuestions).toFixed(2)) : 0,
      ignoredCrossSubjectPoints: Math.max(0, rawRuleResults.length - ruleResults.length),
      method: grouped.length ? "规则识别 + 科目降噪 + 题型权重排序" : "关键词兜底分析"
    },
    overview: buildAnalysisOverview(keyPoints, totalQuestions, recognizedQuestions),
    keyPoints
  };
}

function splitExamQuestions(text) {
  return parseExamQuestions(text).map((item) => item.text);
}

function parseExamQuestions(text) {
  const raw = String(text || "")
    .replace(/\r/g, "\n")
    .replace(/\n{2,}/g, "\n")
    .trim();
  if (!raw) return [];

  const withBreaks = raw.replace(/\s*((?:\d+[\.、]|[一二三四五六七八九十]+、|选择题[:：]|填空题[:：]|判断题[:：]|计算题[:：]|业务题[:：]|简答题[:：]|材料题[:：]|阅读题[:：]|写作题[:：]))/g, "\n$1");

  return withBreaks
    .split(/\n+/)
    .map((item) => normalizeText(item))
    .filter((item) => item.length >= 4)
    .map((item, index) => ({
      index,
      text: item,
      questionType: inferQuestionTypeFromText(item)
    }));
}

function inferConcreteExamPoints(question, subject) {
  const q = normalizeText(typeof question === "string" ? question : question.text);
  const explicitType = typeof question === "string" ? inferQuestionTypeFromText(q) : question.questionType;
  const questionIndex = typeof question === "string" ? 0 : question.index;
  const points = [];
  const add = (point, types, suggestion, options = {}) => {
    const questionTypes = Array.isArray(types) ? types : String(types).split(/[、/]/).filter(Boolean);
    const weightedType = explicitType && explicitType !== "选择题/简答题" ? explicitType : questionTypes[0];
    points.push({
      point,
      questionType: weightedType,
      possibleTypes: questionTypes,
      suggestion,
      drillPlan: options.drillPlan || buildDrillPlan(point, weightedType),
      evidence: q,
      questionIndex,
      score: options.score || questionTypeWeight(weightedType),
      matchedBy: options.matchedBy || "规则命中"
    });
  };

  if (/导数/.test(q) && /几何意义|切线|斜率|法线/.test(q)) {
    add("导数的几何意义：切线斜率", ["选择题", "填空题", "计算题"], "把导数定义、切线斜率和指定点代入放在一起复习，重点防止把平均变化率当瞬时变化率。", {
      drillPlan: "做 2 道切线斜率题：一道直接求斜率，一道先求导再写切线方程。"
    });
  }
  if (/求.*导数|导数.*计算|函数的导数|求导|链式法则|复合函数/.test(q)) {
    add("基本求导公式与复合函数求导", ["填空题", "计算题"], "背熟幂函数、乘积、商和复合函数求导公式，做题时先标出外层函数和内层函数。", {
      drillPlan: "连续练 3 道求导题：幂函数、乘积/商、复合函数各 1 道。"
    });
  }
  if (/单调|增减|极值|最值/.test(q) && /导数|函数/.test(q)) {
    add("利用导数判断函数单调性与极值", ["计算题", "综合题"], "按“定义域-求导-判正负-写区间/极值”的顺序复习，尤其注意端点和不可导点。", {
      score: questionTypeWeight(explicitType) + 0.3,
      drillPlan: "做 1 道含参数或分段函数的单调性题，训练完整步骤。"
    });
  }
  if (/极限/.test(q) && /基本|计算|求|lim|趋于|无穷小/.test(q)) {
    add("极限基本计算方法", ["选择题", "填空题", "计算题"], "先判断未定式，再选择直接代入、因式分解、等价无穷小、重要极限或洛必达法则。", {
      drillPlan: "整理 4 类极限题各 1 道：直接代入、0/0、重要极限、等价无穷小。"
    });
  }
  if (/导数/.test(q) && /极限/.test(q)) {
    add("导数与极限综合应用", ["综合题", "计算题"], "复习导数定义式与极限计算的联系，看到 f'(a) 形式要主动联想到定义式。", {
      score: questionTypeWeight(explicitType) + 0.4,
      drillPlan: "做 2 道把极限改写成导数定义的综合题。"
    });
  }
  if (/积分|原函数|定积分|不定积分/.test(q)) {
    add("积分计算与基本换元", ["填空题", "计算题"], "先判断是基本积分公式、换元还是分部积分，定积分还要关注上下限和几何意义。");
  }

  if (/会计等式|资产\s*=|资产.*负债.*所有者权益/.test(q)) {
    add("会计基本等式：资产=负债+所有者权益", ["选择题", "判断题"], "背熟基本等式，并练习经济业务发生后等式如何保持平衡。");
  }
  if (/有借必有贷|借贷必相等|借贷记账法/.test(q)) {
    add("借贷记账法记账规则", ["选择题", "判断题", "业务分录题"], "重点记忆“有借必有贷，借贷必相等”，并结合账户性质判断借贷方向。");
  }
  if (/原材料|购入|尚未支付|应付账款/.test(q)) {
    add("采购原材料未付款的会计分录", ["业务分录题"], "先判断资产和负债变化，再写“借：原材料；贷：应付账款”。");
  }
  if (/投资者|投入资本|实收资本|银行存款/.test(q)) {
    add("投资者投入资本的会计分录", ["业务分录题"], "注意银行存款增加记借方，所有者权益增加记贷方。");
  }
  if (/资产类账户|资产.*借方|资产.*贷方/.test(q)) {
    add("资产类账户借贷方向", ["选择题", "判断题"], "重点区分资产类账户增加记借方、减少记贷方，并和负债/权益类账户反向记忆。");
  }

  if (/实践.*认识|认识.*实践/.test(q)) {
    add("实践与认识的辩证关系", ["选择题", "简答题", "材料分析题"], "按“实践决定认识-认识反作用于实践-方法论”模板复习，材料题要扣材料关键词。");
  }
  if (/真理/.test(q)) {
    add("真理的客观性、具体性和条件性", ["选择题", "简答题"], "复习真理特征，并准备材料题中的对应表述。");
  }
  if (/矛盾|对立统一|主要矛盾|矛盾主要方面/.test(q)) {
    add("矛盾分析法：两点论与重点论", ["选择题", "简答题", "材料分析题"], "区分主要矛盾和矛盾主要方面，材料题用“抓重点、统筹兼顾”组织答案。");
  }

  if (/阅读理解|细节题|主旨题|推断题|同义替换/.test(q)) {
    add("阅读理解题型策略：定位、主旨、推断", ["阅读题"], "训练题干关键词定位、同义替换识别和主旨概括。");
  }
  if (/作文|写作|模板|应用文/.test(q)) {
    add("英语作文模板与高频句型", ["写作题"], "整理开头、过渡、观点和结尾句型，考前背诵并仿写。");
  }
  if (/翻译|长难句|从句|非谓语/.test(q)) {
    add("翻译与长难句结构拆分", ["翻译题", "阅读题"], "先找主干，再处理从句、非谓语和修饰成分，避免逐词硬译。");
  }

  return points;
}

function groupExamPoints(points) {
  const map = new Map();
  points.forEach((item) => {
    if (!map.has(item.point)) {
      map.set(item.point, {
        point: item.point,
        count: 0,
        score: 0,
        typeSet: new Set(),
        possibleTypeSet: new Set(),
        suggestions: new Set(),
        drillPlans: new Set(),
        evidences: []
      });
    }
    const target = map.get(item.point);
    target.count += 1;
    target.score += item.score || 1;
    target.typeSet.add(item.questionType);
    (item.possibleTypes || []).forEach((type) => target.possibleTypeSet.add(type));
    target.suggestions.add(item.suggestion);
    target.drillPlans.add(item.drillPlan);
    target.evidences.push(item.evidence);
  });

  return Array.from(map.values())
    .sort((a, b) => b.score - a.score || b.count - a.count)
    .slice(0, 6)
    .map((item, index) => ({
      point: item.point,
      count: item.count,
      score: Number(item.score.toFixed(1)),
      heatLevel: item.score >= 3.2 ? "高" : item.score >= 2 ? "中" : "低",
      priority: index + 1,
      confidence: Number(Math.min(0.95, 0.52 + item.count * 0.12 + item.typeSet.size * 0.06).toFixed(2)),
      possibleQuestionTypes: Array.from(new Set([...item.possibleTypeSet, ...item.typeSet])),
      suggestion: Array.from(item.suggestions)[0],
      drillPlan: Array.from(item.drillPlans)[0],
      evidence: item.evidences.slice(0, 2)
    }));
}

function fallbackKeywordAnalysis(text) {
  const candidates = [
    "导数", "极限", "积分", "函数", "矩阵", "概率",
    "实践", "认识", "真理", "矛盾", "阅读理解", "作文", "翻译",
    "会计等式", "借贷记账法", "资产", "负债", "所有者权益", "会计分录"
  ];

  return candidates
    .map((keyword) => ({
      keyword,
      count: (text.match(new RegExp(keyword, "g")) || []).length
    }))
    .filter((item) => item.count > 0)
    .sort((a, b) => b.count - a.count)
    .slice(0, 5)
    .map((item, index) => ({
      point: item.keyword,
      count: item.count,
      score: item.count,
      heatLevel: item.count >= 3 ? "高" : item.count >= 2 ? "中" : "低",
      priority: index + 1,
      confidence: 0.45,
      possibleQuestionTypes: inferQuestionTypes(item.keyword),
      suggestion: `把“${item.keyword}”加入考前必看列表，优先做专项练习并整理错题。`,
      drillPlan: buildDrillPlan(item.keyword, inferQuestionTypes(item.keyword)[0]),
      evidence: []
    }));
}

function filterSubjectRelevantPoints(points, subject) {
  const domain = inferSubjectDomain(subject);
  if (domain === "general") return points;
  const filtered = points.filter((item) => inferPointDomain(item) === domain || inferPointDomain(item) === "general");
  return filtered.length ? filtered : points;
}

function inferSubjectDomain(subject) {
  if (/高数|数学|微积分|线代|概率|函数|导数|极限|积分/.test(subject)) return "math";
  if (/会计|财务|借贷|分录|资产|负债/.test(subject)) return "accounting";
  if (/马原|马克思|政治|思政|哲学|实践|认识|真理|矛盾/.test(subject)) return "politics";
  if (/英语|阅读|作文|写作|翻译/.test(subject)) return "english";
  return "general";
}

function inferPointDomain(item) {
  const text = `${item.point} ${(item.possibleTypes || []).join(" ")} ${item.questionType || ""}`;
  if (/导数|极限|积分|函数|矩阵|概率|切线|斜率|单调|极值/.test(text)) return "math";
  if (/会计|借贷|分录|资产|负债|权益|原材料|应付账款|实收资本/.test(text)) return "accounting";
  if (/实践|认识|真理|矛盾|马克思|材料分析/.test(text)) return "politics";
  if (/阅读|作文|写作|翻译|长难句|从句/.test(text)) return "english";
  return "general";
}

function buildAnalysisOverview(keyPoints, totalQuestions, recognizedQuestions) {
  const top = keyPoints[0];
  const coverage = totalQuestions ? recognizedQuestions / totalQuestions : 0;
  const weakPoints = keyPoints
    .filter((item) => item.confidence < 0.65 || item.heatLevel === "低")
    .slice(0, 2)
    .map((item) => item.point);

  return {
    conclusion: top
      ? `优先复习“${top.point}”，它在当前样本中的综合权重最高。`
      : "当前样本不足，建议先补充真题文本。",
    reliability: coverage >= 0.8 ? "较高" : coverage >= 0.5 ? "中等" : "偏低",
    reviewOrder: keyPoints.slice(0, 4).map((item) => item.point),
    riskNote: weakPoints.length
      ? `低频但可能失分的点：${weakPoints.join("、")}。`
      : "当前样本识别较集中，可直接按优先级复习。"
  };
}

function questionTypeWeight(type) {
  if (/综合|材料分析|业务分录/.test(type)) return 1.45;
  if (/计算|写作|翻译/.test(type)) return 1.3;
  if (/简答|阅读/.test(type)) return 1.15;
  if (/填空|判断/.test(type)) return 1.05;
  return 1;
}

function buildDrillPlan(point, type) {
  if (/计算|综合|业务分录/.test(type)) {
    return `围绕“${point}”做 2 道同类题，要求写完整步骤并标出易错点。`;
  }
  if (/材料|简答|写作|翻译/.test(type)) {
    return `围绕“${point}”整理 1 份答题模板，再用一道题限时复述。`;
  }
  return `围绕“${point}”先背核心结论，再做 3 道选择/填空题快速校验。`;
}

function inferQuestionTypeFromText(text) {
  if (/判断|对还是错|是否正确/.test(text)) return "判断题";
  if (/填空|____|空/.test(text)) return "填空题";
  if (/分录|借：|贷：|业务/.test(text)) return "业务分录题";
  if (/简述|说明|为什么/.test(text)) return "简答题";
  if (/求|计算/.test(text)) return "计算题";
  return "选择题/简答题";
}

function inferQuestionTypes(keyword) {
  if (["导数", "极限", "积分", "矩阵", "概率"].includes(keyword)) {
    return ["选择题", "填空题", "计算题"];
  }
  if (["实践", "认识", "真理", "矛盾"].includes(keyword)) {
    return ["选择题", "简答题", "材料分析题"];
  }
  if (["会计等式", "借贷记账法", "资产", "负债", "所有者权益", "会计分录"].includes(keyword)) {
    return ["选择题", "判断题", "业务分录题"];
  }
  if (["阅读理解", "作文", "翻译"].includes(keyword)) {
    return ["阅读题", "写作题", "翻译题"];
  }
  return ["选择题", "简答题"];
}

const ExamAssistantAITools = {
  generateCheatSheet,
  generateQuiz,
  generateQuizWithZhipu,
  generateFlashcards,
  generatePodcastScript,
  generateStudyPack,
  generateDailyStudyPacks,
  analyzeKeyPoints
};

if (typeof module !== "undefined" && module.exports) {
  module.exports = ExamAssistantAITools;
}

if (typeof window !== "undefined") {
  window.ExamAssistantAITools = ExamAssistantAITools;
}
