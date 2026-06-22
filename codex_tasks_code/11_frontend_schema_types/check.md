# 任务 11 验收
## 文件变更检查
- [ ] 10 个 Schema 类型、统一导出和契约测试存在；Schema 零修改。
## 功能检查
- [ ] 类型检查通过，required/枚举/数组/null 与源 Schema 一致。
- [ ] 第 17/18 章新增字段均来自更新后的 Schema，四个相关类型与 Schema 保持等价。
## 业务边界检查
- [ ] 无新字段、临时接口、默认值、运行时 validator 或页面逻辑。
- [ ] 前端没有自创 TikTok、viral pattern 或 creative transfer 字段。
## ID 绑定检查
- [ ] 三类 ID 存在；`selected_variant_id` 和跨对象关系明确注释交给任务 13。
## 状态机/流程检查
- [ ] 类型没有推进状态或改变闸门。
## 未裁决问题检查
- [ ] category/basic_info 未猜类型；画像粒度未映射；其他算法未硬编码。
## 测试/命令检查
- [ ] 生成/一致性、typecheck、test、build、`git diff --check` 通过。
## 是否可以进入下一任务
10 个投影完整且缺失契约保持阻断后，才可逐页执行任务 12。
