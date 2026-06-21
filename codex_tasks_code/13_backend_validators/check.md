# 任务 13 验收
## 文件变更检查
- [ ] 仅 validators、测试/fixture和批准测试配置变化。
## 功能检查
- [ ] Schema入口及附件列出的九类跨对象校验均有正反单测，错误可读且输入不变。
## 业务边界检查
- [ ] 不调用业务模块、不生成报告、不含 AI/API/数据库/file I/O。
## ID 绑定检查
- [ ] selected variant、variant/video 唯一、三类 ID、shot/task/output 路径全部覆盖。
## 状态机/流程检查
- [ ] 第 8/9 章闸门覆盖，不代替模块推进状态。
## 未裁决问题检查
- [ ] 六类问题未硬编码，只报告 unresolved。
## 测试/命令检查
- [ ] backend test、覆盖矩阵、`git diff --check` 通过。
## 是否可以进入下一任务
全部 validators 独立通过且无业务调用后进入任务 14。
