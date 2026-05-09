# 成员 A：智能体多轮对话上下文管理与状态转换逻辑

## 1. 概述

为了确保“从从容容考试助手”智能体能够进行流畅、连贯的多轮对话，并准确理解用户意图，我们需要设计一套有效的上下文管理和状态转换逻辑。这套逻辑将帮助智能体记住对话历史、追踪当前对话阶段，并根据用户输入和系统反馈进行状态切换。

## 2. 对话状态定义

我们将智能体与用户的交互过程划分为以下核心状态：

| 状态名称 | 描述 | 触发条件 | 退出条件 |
| :------- | :--- | :------- | :------- |
| `INITIAL` | 智能体首次启动或对话重置。 | 用户首次进入或明确请求重置。 | 智能体发出欢迎语。 |
| `WELCOME` | 智能体已发出欢迎语，等待用户回应。 | `INITIAL` 状态下智能体发出欢迎语。 | 用户输入考试数量。 |
| `COLLECTING_EXAM_COUNT` | 智能体正在询问用户考试数量。 | `WELCOME` 状态下用户回应。 | 用户提供有效考试数量。 |
| `COLLECTING_SUBJECT_INFO` | 智能体正在逐门收集科目详细信息。 | 用户提供有效考试数量。 | 所有科目信息收集完毕。 |
| `COLLECTING_DAILY_CAPACITY` | 智能体正在询问用户每日可复习时长。 | 所有科目信息收集完毕。 | 用户提供有效每日可复习时长。 |
| `PLAN_GENERATING` | 智能体正在调用核心大脑生成复习计划。 | 用户提供有效每日可复习时长。 | 计划生成成功或失败。 |
| `PLAN_READY` | 计划已生成并向用户展示，等待用户查看或反馈。 | 计划生成成功。 | 用户反馈任务完成情况或请求调整。 |
| `TASK_FEEDBACK` | 智能体正在等待用户反馈任务完成情况。 | `PLAN_READY` 状态下用户查看任务。 | 用户反馈任务完成或未完成。 |
| `PLAN_ADJUSTING` | 智能体正在调用核心大脑调整复习计划。 | 用户反馈任务未完成。 | 计划调整成功或失败。 |
| `ADJUSTMENT_READY` | 计划已调整并向用户展示，等待用户查看或反馈。 | 计划调整成功。 | 用户反馈任务完成情况或请求其他操作。 |
| `ERROR_HANDLING` | 智能体检测到无效输入或异常，正在引导用户修正。 | 任何状态下用户输入无效或系统发生异常。 | 用户修正输入或系统恢复正常。 |
| `IDLE` | 对话暂时结束，等待用户新的指令。 | 用户完成所有任务或对话长时间无响应。 | 用户发起新的对话。 |

## 3. 上下文管理机制

智能体需要维护以下关键上下文信息，以支持多轮对话：

*   **`current_state`**：当前对话所处的阶段，决定智能体的响应逻辑。
*   **`user_profile`**：用户的基本信息，如 `user_id`。
*   **`exam_list`**：用户已录入的所有考试科目列表，每个科目包含 `subject_name`, `exam_date`, `familiarity_level`, `difficulty_level`, `estimated_study_hours` 等。
*   **`current_subject_index`**：在 `COLLECTING_SUBJECT_INFO` 状态下，追踪当前正在收集信息的科目索引。
*   **`daily_study_capacity`**：用户提供的每日可复习时长。
*   **`generated_plan`**：核心大脑生成的最新复习计划。
*   **`uncompleted_tasks_buffer`**：用户反馈的未完成任务列表，用于计划调整。

## 4. 状态转换逻辑

状态转换将通过以下规则进行：

1.  **基于用户意图**：通过自然语言理解 (NLU) 识别用户输入中的意图和实体，驱动状态向前推进。
2.  **基于系统反馈**：核心大脑的规划和调整结果将触发状态转换。
3.  **基于错误处理**：当检测到错误时，对话将暂时进入 `ERROR_HANDLING` 状态，待用户修正后返回原状态或引导至新状态。

### 4.1 示例状态转换

*   **从 `WELCOME` 到 `COLLECTING_EXAM_COUNT`**：
    *   **用户输入**：“我需要准备3门考试。”
    *   **意图**：`provide_exam_count`
    *   **实体**：`exam_count = 3`
    *   **动作**：更新 `exam_count`，状态转换为 `COLLECTING_SUBJECT_INFO`。

*   **从 `COLLECTING_SUBJECT_INFO` 到 `COLLECTING_DAILY_CAPACITY`**：
    *   **条件**：`current_subject_index` 等于 `exam_count` (所有科目信息已收集完毕)。
    *   **动作**：智能体询问每日可复习时长，状态转换为 `COLLECTING_DAILY_CAPACITY`。

*   **从 `PLAN_READY` 到 `PLAN_ADJUSTING`**：
    *   **用户输入**：“我昨天的高数任务没完成。”
    *   **意图**：`report_uncompleted_task`
    *   **实体**：`subject_name = 
高等数学`
    *   **动作**：将未完成任务加入 `uncompleted_tasks_buffer`，调用核心大脑的调整接口，状态转换为 `PLAN_ADJUSTING`。

## 5. 待办事项

*   将上述状态管理逻辑与实际的后端实现（如使用状态机库）进行对接。
*   在 `member_A_interactive_logic.md` 中引用此文档，并确保话术与状态转换保持一致。
