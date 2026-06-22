# 任务 17：单样例本地闭环

## 执行目标
选择车载吸尘器或无线直发梳之一，在隔离 fixture 根跑通本地状态、页面展示、validators、任务包导出、模拟 outputs 读取和 output_viewer；不新增能力。
## 前置任务
- 任务 08—16 全部通过；样例涉及的未裁决问题已有人工处理方式。未满足即阻断。
## 必须读取的文件
- `00_design.md` 第 4—24 章及选定样例章；对应 examples、设计问题、全部前序实现/验收和相关 Schema/rules，特别是第 17/18 章。
## 允许修改的文件
- 单一样例的测试 fixture、模拟 outputs、集成测试和验收说明；缺陷修复仅限被测试证明相关的实现并补回归。
## 禁止修改的文件
- 设计/docs/rules/Schema/真实 data/真实 outputs/任务；无关实现。
## 具体实现范围
- 创建最小样例 data；跑 validators；在临时根导出任务包；准备已声明的模拟 outputs；用 reader 读取；前端本地 fixture 流走到 output_viewer。
- 所选样例至少包含一个 `viral_pattern_card` 和一个绑定同一五类 ID 的 `product_adapted_pattern`。
- 选择车载吸尘器时可使用“尴尬救场 + `failed_method`”；选择无线直发梳时可使用“结果先行 + 上班前救急”。这些仅是样例 fixture，不得提升为通用业务规则。
- 全过程只选一个商品，不调用真实后端 API或模型。
## 禁止越界事项
- 不调用 Codex、Seedance、即梦、OCR、VLM、TikTok；不把样例特例写成通用规则。
## 已知未裁决问题处理方式
- 六类问题逐项列入样例阻断/fixture 来源；无人工裁决时不得用假值跑通。B/C 只能展示 unresolved，不伪造完整产物。
## 验证命令或人工验收方式
- 运行前后端单测、集成测试、typecheck/build；人工按页面顺序走本地样例；确认网络调用为零、真实 data/outputs 零写入；`git diff --check`。
## 完成后输出
输出样例、fixture 清单、15 页路径、validators/导出/读取结果、外部调用零证明及未解决阻断。
