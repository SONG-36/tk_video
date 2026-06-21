# Codex 任务包导出页

- 页面目标：聚合已确认结果并导出 Markdown/JSON 任务包，不直接调用 Codex。
- 输入字段：系列、目标型号、批次、报告、材料、图片、创意、批次和镜头计划。
- 输出数据：`data/tasks/{product_series_id}_{variant_id}_{batch_id}_codex_task.{md,json}`。
- 通过条件：三类 ID 一致；前序数据通过 Schema 和闸门；输出路径与禁止编造规则写入任务包。
- 状态依赖：镜头规划后进入，通过后为 `task_package_exported`。
