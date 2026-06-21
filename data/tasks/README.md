# data/tasks 目录职责

本目录用于未来存放已经导出的 Codex Markdown / JSON 任务包实例。当前任务只定义命名、输入关系和边界，不生成任何真实任务包实例。

任务包实例命名必须为：

```text
{product_series_id}_{variant_id}_{batch_id}_codex_task.md
{product_series_id}_{variant_id}_{batch_id}_codex_task.json
```

每个实例必须能够回溯到唯一的 `product_series_id + variant_id + batch_id`，并且只能引用该目标型号及批次的报告、材料、图片、创意、视频批次和镜头计划。

本目录不得保存模板权威规则，不得混入其他型号数据，不得由人工拼接多个型号资料。任务包实例是 `00_design.md` 的从属执行输入，不是权威源。
