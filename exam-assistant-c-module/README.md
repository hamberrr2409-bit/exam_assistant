# C 模块：AI 学习内容生成

这是「从从容容考试助手」中 C 同学负责的独立模块原型。

它的目标是把 B 模块生成的复习任务，进一步转化为可以直接学习的内容：

- 考前速记卡
- AI 自测题
- 复习闪卡
- 播客复习脚本
- 高频考点分析

当前版本不依赖真实大模型 API，使用本地规则生成可演示结果。后续如果接入大模型，只需要把 `src/aiTools.js` 里的生成函数替换为 API 调用，并保持输出 JSON 格式不变。

## 文件结构

```text
exam-assistant-c-module
├─ README.md
├─ prompts.md
├─ src
│  └─ aiTools.js
└─ test
   └─ runDemo.js
```

## 快速运行

在当前文件夹运行：

```bash
node exam-assistant-c-module/test/runDemo.js
```

运行后会输出 5 类内容：

1. 高数导数速记卡
2. 高数导数自测题
3. 高数导数闪卡
4. 马原播客脚本
5. 高频考点分析

## 当前内置样本知识点

- 高数：导数、极限
- 马原：实践与认识
- 会计学原理：借贷记账法、会计等式

这些知识点用于保证课堂 demo 稳定。用户输入其他知识点时，系统会使用通用模板兜底生成。

## 对外接口

### `generateCheatSheet(subject, content, topic, options)`

生成考前速记卡。

`options.pastPaperText` 可传入真题文本。传入后，速记卡会自动提炼真题高频考点，并把它们加入考前优先级。

输出结构：

```json
{
  "type": "cheat_sheet",
  "subject": "高数",
  "topic": "导数",
  "title": "高数《导数》考前速记卡",
  "source": {
    "primary": "用户笔记 + 知识库补充",
    "noteSummary": ""
  },
  "content": {
    "coreConcept": "",
    "noteHighlights": [],
    "examKeyPoints": [],
    "priorityReview": [],
    "coreFormulas": [],
    "keyPoints": [],
    "mistakes": [],
    "steps": [],
    "sourceMap": {
      "coreFormulas": [],
      "keyPoints": [],
      "mistakes": [],
      "steps": []
    },
    "answerTemplate": [],
    "lastMinuteChecklist": [],
    "memoryTip": "",
    "examReminder": ""
  }
}
```

### `generateQuiz(subject, topic, count)`

生成自测题。

输出结构：

```json
{
  "type": "quiz",
  "subject": "高数",
  "topic": "导数",
  "questions": []
}
```

### `generateFlashcards(subject, content, topic, count)`

生成问答闪卡。

输出结构：

```json
{
  "type": "flashcards",
  "subject": "高数",
  "topic": "导数",
  "cards": []
}
```

### `generatePodcastScript(subject, content, topic)`

生成 3-5 分钟播客脚本。

### `analyzeKeyPoints(pastPaperText, subject)`

从真题文本中提取高频考点。

### `generateDailyStudyPacks(tasks, date)`

根据 B 模块输出的今日多科任务，批量生成每门课的学习包。

输入示例：

```json
[
  {
    "subject": "高数",
    "topic": "导数",
    "allocatedMinutes": 96,
    "content": "导数笔记内容",
    "pastPaperText": "历年真题文本"
  },
  {
    "subject": "会计学原理",
    "topic": "借贷记账法",
    "allocatedMinutes": 66,
    "content": "会计笔记内容"
  }
]
```

输出为 `daily_study_packs`，其中每门课包含推荐学习材料：速记卡、自测题、闪卡、播客脚本或高频考点分析。

## 和其他成员的对接

- B 模块告诉 C：今天要学什么，例如 `{ subject: "高数", topic: "导数" }`。
- C 模块生成学习材料，例如速记卡、自测题、闪卡。
- D 模块把 C 的 JSON 输出展示在页面上。

一句话：

```text
B 决定今天学什么，C 生成怎么学的材料，D 展示给用户。
```
