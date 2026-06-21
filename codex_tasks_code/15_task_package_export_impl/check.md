# 任务 15 验收
## 文件变更检查
- [ ] 仅 generator、导出脚本接入和隔离测试/fixture 变化。
## 功能检查
- [ ] 样例 data 可生成既定 MD/JSON；缺对象或 validator 失败零写入。
## 业务边界检查
- [ ] 不调用 Codex/模型/API，不读取或修改 outputs，不补造材料。
## ID 绑定检查
- [ ] 所有前序对象和文件名绑定同一三类 ID及 selected variant。
## 状态机/流程检查
- [ ] 仅 `shot_assets_planned` 后可导出；导出成功语义与 `task_package_exported` 一致。
## 未裁决问题检查
- [ ] B/C 仅标 unresolved；其他五类问题未由导出器解决。
## 测试/命令检查
- [ ] Schema、阻断、dry-run、路径和 `git diff --check` 通过。
## 是否可以进入下一任务
隔离导出完整、真实 outputs 零访问且未裁决问题未硬编码后进入任务 16。
