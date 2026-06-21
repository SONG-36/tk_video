# 型号级视频批次规划页

本文档描述前端页面职责，不是业务规则权威源；如与根目录 `00_design.md` 冲突，以 `00_design.md` 为准。

## 页面目标

在当前目标型号上下文中规划 3—5 条差异化测试视频，并为每条视频确定 A、B 或 C 生成等级。

## 前置状态

`creative_direction_confirmed`。

## 进入条件

- 当前目标型号的报告、材料、图片资产和创意方向均已通过对应闸门。
- `product_series_id` 与 `selected_variant_id` 绑定有效。

## 输入 / 展示字段

- `product_series_id`、`variant_id`、`batch_id`、批次目标和视频数量。
- 每条视频的分型、风格、主卖点、场景、痛点、生成等级、提示词开关、素材需求、镜头数和时长。
- 图片能力、材料限制及默认 `1A_1B_1C` 策略。

## 用户动作

- 设置批次目标和 3—5 条视频的数量。
- 配置并检查每条视频的设计要求字段。
- 根据图片和材料能力确认 A/B/C 等级及整个批次。

## 输出对象

绑定 `product_series_id + variant_id + batch_id` 的 `video_batch_plan`。

## 依赖后端模块

- `video_batch_planner`
- `validators`

## 依赖 Schema

- `video_batch_plan.schema.json`
- `product_profile.schema.json`
- `material_check.schema.json`
- `image_asset.schema.json`
- `creative_direction.schema.json`
- `product_series.schema.json`

## 通过条件

- 三类 ID 和批次目标有效。
- 视频数量为 3—5 条，且每条视频的必填配置完整。
- 图片资产能够支撑所选等级；条件不满足时不得进入 A 级。
- 用户已确认批次规划。

## 失败 / 阻断表现

- ID 不一致、数量越界或必填配置缺失时阻止通过。
- 图片或材料不支持所选等级时展示原因并要求调整。
- 不允许默认生成五条完整资产，也不允许以页面操作绕过 A/B/C 规则。

## 型号和 ID 约束

- 计划中的 `variant_id` 必须等于当前 `selected_variant_id`。
- `product_series_id + variant_id + batch_id` 必须贯穿后续镜头规划和任务包；跨对象一致性由后续 `validators` 校验。
- 切换 `selected_variant_id` 会使未确认的画像、报告、图片绑定、批次和镜头规划失效并重新检查。

## 下一状态

通过后进入 `video_batch_planned`。

## 未裁决约束

第 15、16 章的 B/C 级精简输出与第 19 章每条视频完整资产要求的适用关系尚未裁决。本页面保留该约束，不改变任何等级的资产要求。
