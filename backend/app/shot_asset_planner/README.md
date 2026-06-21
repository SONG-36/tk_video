# shot_asset_planner

## 模块职责

按批次和等级规划逐视频 Creative Board、Storyboard 及逐镜头 Shot Card、Prompt 资产。

## 输入

三类 ID、已确认批次、创意、材料、图片资产、产品约束和逐视频生成等级。

## 输出

绑定三类 ID 的 `shot_asset_plan`，包含视频路径、镜头字段、图片绑定、目标和失真风险。

## 依赖规则

`rules/shot_planning_rules.json`、`rules/video_batch_rules.json`、`rules/image_asset_rules.json`、`rules/creative_translation_rules.json`。

## 依赖 Schema

`backend/schemas/shot_asset_plan.schema.json`、`video_batch_plan.schema.json`、`image_asset.schema.json`、`creative_direction.schema.json`。

## 前置状态 / 通过条件

前置为 `video_batch_planned`；A/B/C 达到各自要求，镜头图片、失真风险和服务目标明确后达到 `shot_assets_planned`。

## ID 绑定要求

三类 ID 必须与批次一致，每个 video/shot 必须属于同一批次；这些跨对象关系由未来 `validators` 校验。

## 禁止行为

不得为显得专业堆镜头、遗漏图片和风险、生成未规划视频或改变镜头字段。

## 后续实现边界

未来只实现资产规划数据，不生成真实模型内容。B/C 与第 19 章的完整资产关系是设计未裁决约束。
