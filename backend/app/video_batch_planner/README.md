# video_batch_planner

## 模块职责

在唯一目标型号上下文中规划 3—5 条差异化视频及 A/B/C 生成等级；批次同时测试视频分型、`hook_type`、情绪触发、爆款模式和创意迁移方式。

## 输入

三类 ID、批次目标、分型推荐、创意方向、材料/图片能力和逐视频配置。

## 输出

绑定 `product_series_id + variant_id + batch_id` 的 `video_batch_plan`。

## 依赖规则

`rules/video_batch_rules.json`、`rules/video_type_rules.json`、`rules/material_check_rules.json`、`rules/image_asset_rules.json`、`rules/creative_translation_rules.json`、`rules/tiktok_creative_style_rules.json`、`rules/viral_pattern_rules.json`、`rules/creative_transfer_rules.json`。

## 依赖 Schema

`backend/schemas/video_batch_plan.schema.json`、`product_profile.schema.json`、`material_check.schema.json`、`image_asset.schema.json`、`creative_direction.schema.json`。

## 前置状态 / 通过条件

前置为 `creative_direction_confirmed`；批次和逐视频字段完成、图片支撑等级、不合格视频被阻止进入 A 级、用户确认后达到 `video_batch_planned`。

## ID 绑定要求

`variant_id` 必须等于当前 `selected_variant_id`；视频 ID 唯一、数量与数组长度及三类 ID 一致性由未来 `validators` 校验。

## 禁止行为

不得默认五条全 A、把推荐分型数当生成数、生成同脚本变体、混入其他型号或绕过素材限制。一个批次内不应让 3 条视频都使用同一种前 3 秒机制；具体差异校验由后续 validators 实现。

## 后续实现边界

未来只实现结构化规划，不生成脚本或提示词。B/C 精简输出与第 21 章完整资产要求属于设计未裁决约束，本模块不得处理。
