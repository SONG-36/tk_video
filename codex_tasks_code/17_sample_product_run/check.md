# 任务 17 验收
## 文件变更检查
- [ ] 只有一个样例 fixture、模拟 outputs、集成测试/说明和有证据的缺陷修复。
## 功能检查
- [ ] 样例 data 完整；validators 通过；任务包可导出；reader 可读模拟 outputs；前端到 output_viewer。
## 业务边界检查
- [ ] 无外部 API/AI/TikTok；无真实 data/outputs 写入；样例特例未通用化。
## ID 绑定检查
- [ ] 全链路同一 product_series/variant/batch，其他型号资料未混入。
## 状态机/流程检查
- [ ] 15 页和人工确认顺序完整，无跳步或自动通过。
## 未裁决问题检查
- [ ] 六类问题均有人工来源、阻断或 unresolved 展示，无假值裁决。
## 测试/命令检查
- [ ] 前后端单测、集成、typecheck/build、零网络/零真实写入和 `git diff --check` 通过。
## 是否可以进入下一任务
全部通过才完成任务 17；真实内容生产必须另立并授权。
