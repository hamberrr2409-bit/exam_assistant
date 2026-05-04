# 从从容容考试助手 - B 部分规划算法

这是角色 B 的交付代码：多科统筹算法、优先级计算、复习时间分配、今日任务生成、动态调整逻辑。

## 文件说明

- `src/planner.js`：核心算法模块，供前端或智能体流程直接导入。
- `src/sampleData.js`：高数、会计学原理、英语、马原四科演示数据。
- `test/planner.test.js`：Node 内置测试，验证优先级排序、时间分配、计划生成和动态调整。

## 核心接口

```js
import {
  calculatePriority,
  allocateTime,
  generatePlan,
  generateTodayTasks,
  adjustPlan,
} from "./src/planner.js";
```

### `calculatePriority(exam, options)`

计算单科优先级。公式来自分工文稿：

```text
总优先级 = 剩余天数分 * 40 + 薄弱程度分 * 25 + 难度分 * 20 + 剩余任务分 * 15
```

其中：

- 剩余天数分 = `1 / 剩余天数`
- 薄弱程度分 = `6 - familiarity`
- 难度分 = `difficulty`
- 剩余任务分 = `estimatedHours - completedHours`

### `allocateTime(exams, dailyHours, options)`

按各科优先级比例分配当天复习时间，并返回每科安排理由和任务列表。

### `generatePlan(exams, dailyHours, options)`

生成默认 7 天复习计划。每天会模拟累加 `completedHours`，避免每天重复按同一份剩余任务计算。

### `generateTodayTasks(plan, options)`

从计划里提取今日任务，方便 D 同学在首页或任务面板展示。

### `adjustPlan(plan, completionRate)`

根据完成率动态调整：

- `>= 80%`：保持原计划。
- `50%-80%`：轻微压缩低优先级任务。
- `< 50%`：只保留高优先级科目和高频考点任务。

## 运行

```bash
npm test
npm run demo
```

`npm run demo` 会输出四科优先级、当天分配、7 天计划、今日任务和一次完成率 45% 的应急调整结果。
