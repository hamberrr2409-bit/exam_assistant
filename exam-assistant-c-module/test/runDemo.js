const {
  generateCheatSheet,
  generateQuiz,
  generateFlashcards,
  generatePodcastScript,
  generateDailyStudyPacks,
  analyzeKeyPoints
} = require("../src/aiTools");

const calculusNote = [
  "导数表示函数在某点的瞬时变化率。",
  "导数的几何意义是曲线在该点切线的斜率。",
  "可导一定连续，但连续不一定可导。",
  "复合函数求导时要注意链式法则。"
].join("\n");

const politicsNote = [
  "实践是认识的来源、动力、目的和检验标准。",
  "认识对实践具有反作用。",
  "真理具有客观性、具体性和条件性。"
].join("\n");

const pastPaperText = [
  "一、选择题：导数的几何意义是什么？",
  "二、填空题：求函数的导数。",
  "三、计算题：利用导数判断函数单调性。",
  "四、选择题：极限的基本计算。",
  "五、计算题：导数与极限综合应用。",
  "六、简答题：实践与认识的关系。"
].join("\n");

const demoOutputs = [
  generateCheatSheet("高数", calculusNote, "导数"),
  generateQuiz("高数", "导数", {
    content: calculusNote,
    pastPaperText,
    count: 5
  }),
  generateFlashcards("高数", calculusNote, "导数"),
  generatePodcastScript("马原", politicsNote, "实践与认识"),
  analyzeKeyPoints(pastPaperText, "高数"),
  generateDailyStudyPacks([
    {
      subject: "高数",
      topic: "导数",
      content: calculusNote,
      pastPaperText,
      allocatedMinutes: 96
    },
    {
      subject: "会计学原理",
      topic: "借贷记账法",
      content: "借贷记账法要求有借必有贷，借贷必相等。资产类账户借方登记增加，贷方登记减少。",
      allocatedMinutes: 66
    },
    {
      subject: "英语",
      topic: "阅读理解",
      content: "阅读理解需要先看题干关键词，再回原文定位。主旨题关注首尾段和转折句。",
      allocatedMinutes: 48
    },
    {
      subject: "马原",
      topic: "实践与认识",
      content: politicsNote,
      allocatedMinutes: 30
    }
  ], "2026-06-01")
];

console.log(JSON.stringify(demoOutputs, null, 2));
