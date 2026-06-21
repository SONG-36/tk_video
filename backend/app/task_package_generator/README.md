# task_package_generator

## 模块职责

未来读取同一目标上下文中的商品系列、目标型号、目标批次、视频批次计划和镜头资产计划，并汇总判断报告、材料检查、图片资产与创意方向，导出 Markdown / JSON Codex 任务包。

该模块是本地文件聚合与生成器，不是 Codex 或视频模型服务。当前任务只定义职责，不实现聚合、校验、渲染或文件写入。

## 输入

- `product_series_id` 对应的目标商品系列。
- 等于当前 `selected_variant_id` 的 `variant_id` 及其型号资料。
- 当前 `batch_id`。
- 已确认的判断报告、材料检查、图片资产和创意方向。
- 同一三类 ID 的 `video_batch_plan` 与 `shot_asset_plan`。
- 已有材料、缺失材料和禁止编造清单。

## 输出

未来仅输出：

```text
data/tasks/{product_series_id}_{variant_id}_{batch_id}_codex_task.md
data/tasks/{product_series_id}_{variant_id}_{batch_id}_codex_task.json
```

任务包声明的输出根为 `outputs/{product_series_id}/{batch_id}/`；本模块本次不写入 `outputs/`。

## 依赖规则

`rules/material_check_rules.json`、`rules/image_asset_rules.json`、`rules/creative_translation_rules.json`、`rules/video_batch_rules.json`、`rules/shot_planning_rules.json`。规则文件是机器可读投影，不能覆盖 `00_design.md`。

## 依赖 Schema

`backend/schemas/codex_task_package.schema.json` 及其引用的判断报告、材料、图片、创意、视频批次和镜头规划 Schema。

## 前置状态 / 通过条件

- 目标型号已经选择，商品分类判断和视频分型选择已经完成。
- 判断报告已经确认。
- 材料检查和图片资产检查已经完成。
- 创意方向、视频批次计划和镜头资产计划已经确认。
- 当前状态达到 `shot_assets_planned`。
- 所有必需对象存在且三类 ID 一致，未来导出成功后才进入 `task_package_exported`。

## ID 绑定要求

- `variant_id` 必须等于当前 `selected_variant_id`。
- 任务包及全部前序对象必须共享 `product_series_id + variant_id + batch_id`。
- video、shot 和输出根必须归属同一批次。
- 跨文件、跨数组和路径关系由未来 `validators` 校验；当前 README 不代表校验已经实现。

## 缺失材料处理

- 缺失材料必须显式标记为缺失。
- 不得自动补齐，不得编造参数、认证、图片或配件。
- 不得使用其他型号或其他商品资料填补。
- 缺失参数必须进入任务包的缺失材料与禁止编造约束。

## 禁止行为

- 不调用 Codex、Seedance、即梦、OCR、VLM 或任何 API。
- 不直接生成视频，不创建真实内容资产，不写入 `outputs/`。
- 不混入其他型号数据，不编造缺失信息。
- 不绕过判断、材料、图片、创意、批次或镜头审核闸门。
- 不创建数据库、API 路由或外部模型客户端。

## 后续实现边界

未来只在人工确认设计未裁决约束后实现本地聚合、validators 校验、模板渲染和任务包文件生成。第 15、16 章 B/C 级与第 19 章完整资产要求的关系不得由本模块自行裁决。
