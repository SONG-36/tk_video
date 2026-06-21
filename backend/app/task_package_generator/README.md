# task_package_generator

## 模块职责

聚合同一目标型号和批次的前序已确认数据，生成 Markdown/JSON Codex 任务包文件。

## 输入

三类 ID、判断报告、材料检查、图片资产、创意方向、视频批次和镜头计划。

## 输出

`data/tasks/{product_series_id}_{variant_id}_{batch_id}_codex_task.{md,json}` 及指向 `outputs/{product_series_id}/{batch_id}/` 的输出要求。

## 依赖规则

`rules/material_check_rules.json`、`image_asset_rules.json`、`creative_translation_rules.json`、`video_batch_rules.json`、`shot_planning_rules.json`。

## 依赖 Schema

`backend/schemas/codex_task_package.schema.json` 及其引用的报告、材料、图片、创意、批次和镜头 Schema。

## 前置状态 / 通过条件

前置为 `shot_assets_planned`；前序对象齐全、禁止编造项写入、三类 ID 一致并完成导出后达到 `task_package_exported`。

## ID 绑定要求

任务包及全部前序对象必须共享 `product_series_id + variant_id + batch_id`，输出根也必须匹配；跨文件和路径关系由未来 `validators` 校验。

## 禁止行为

不得直接调用 Codex 或视频模型、混入其他型号数据、编造缺失参数、越过镜头规划或生成无上下文任务包。

## 后续实现边界

未来只实现本地文件聚合与生成。B/C 与第 19 章完整资产关系是设计未裁决约束，导出器不得自行改等级要求。
