# 任务 15：任务包导出实现

## 执行目标
从 data 聚合同一已确认上下文，经 validators 后导出既定 Markdown 任务包和 JSON 任务包/索引到 `data/tasks/`。
## 前置任务
- 任务 13/14 通过；任务 06 模板与 Schema 同步。
## 必须读取的文件
- `00_design.md` 第 4—9、12—19、23、24 章。
- `docs/06_codex_task_package.md`、质量说明、设计问题；generator README；任务包及引用 Schema；data/tasks README；占位脚本；13/14 接口。
## 允许修改的文件
- `backend/app/task_package_generator/` 源码；`scripts/export_codex_task.py` 接入；对应测试和隔离样例 data fixture。
## 禁止修改的文件
- 设计/docs/rules/Schema/frontend/真实 data/outputs；其他 backend 模块。
## 具体实现范围
- 读取已确认报告、材料、图片、创意、批次、镜头计划；校验同一三类 ID、目标型号和前序状态。
- 缺对象或 ID 不一致零写入；输出仅两个既定文件名；支持 dry-run。
- 不直接调用 Codex/Seedance/即梦，不读取 outputs。
## 禁止越界事项
- 不新增字段、文件名、等级、视频数或自动补齐；不调用 API/AI，不修改 outputs。
## 已知未裁决问题处理方式
- B/C 冲突不裁决，任务包显式携带既有 unresolved constraint；不得据此增删资产要求。
- 创意映射和材料字段缺口只传递已确认输入；其余问题不由导出器补造。
## 验证命令或人工验收方式
- 在测试 fixture/temp 根生成两种文件；测试缺对象、ID错、状态错、跨型号、dry-run、禁止 outputs 读取；Schema 校验 JSON；`git diff --check`。
## 完成后输出
列出输入映射、输出路径、阻断矩阵、unresolved 表达和测试结果。
