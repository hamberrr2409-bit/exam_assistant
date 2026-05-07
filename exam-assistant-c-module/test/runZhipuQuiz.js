const { generateQuizWithZhipu } = require("../src/aiTools");

const note = [
  "导数表示函数在某点的瞬时变化率。",
  "导数的几何意义是曲线在该点切线的斜率。",
  "可导一定连续，但连续不一定可导。",
  "复合函数求导时要注意链式法则。"
].join("\n");

const pastPaperText = [
  "一、选择题：导数的几何意义是什么？",
  "二、填空题：求函数的导数。",
  "三、计算题：利用导数判断函数单调性。"
].join("\n");

generateQuizWithZhipu("高数", "导数", {
  difficulty: "中等",
  count: 5,
  content: note,
  pastPaperText
})
  .then((result) => {
    console.log(JSON.stringify(result, null, 2));
  })
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
