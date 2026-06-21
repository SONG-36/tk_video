# 创意方向设定页

本文档描述前端页面职责，不是业务规则权威源；如与根目录 `00_design.md` 冲突，以 `00_design.md` 为准。

## 页面目标

收集用户对当前目标型号的普通创意意图，并展示其向运镜、质感、节奏、光线和素材需求的专业翻译结果。

## 前置状态

`variant_image_assets_checked`。

## 进入条件

- 当前目标型号图片资产检查已经通过。
- `product_series_id` 与 `selected_variant_id` 绑定有效。

## 输入 / 展示字段

- 至少一个创意风格和至少一个剧情结构。
- 表达强度、真人限制、重点卖点、自由想法和禁止事项。
- 创意优先级。
- 系统翻译后的运镜、质感、节奏、光线和素材需求。

## 用户动作

- 选择创意风格、剧情结构和表达约束。
- 填写重点卖点、自由想法和禁区。
- 确认创意优先级与专业翻译结果。

## 输出对象

绑定 `product_series_id` 与当前 `variant_id` 的 `creative_direction`。

## 依赖后端模块

- `creative_translator`
- `validators`

## 依赖 Schema

- `creative_direction.schema.json`
- `product_profile.schema.json`
- `image_asset.schema.json`
- `product_series.schema.json`

## 通过条件

- 必选创意字段已完成。
- 创意优先级已确认。
- 专业翻译结果已形成。
- 用户已经人工确认创意方向。

## 失败 / 阻断表现

- 必选项缺失、优先级未确认或翻译结果未完成时阻止通过。
- 创意与真人限制、材料风险或图片能力冲突时展示原因并要求修正或确认设计允许的处理方式。
- 页面不得增加设计外的新创意规则。

## 型号和 ID 约束

- 创意方向必须绑定当前 `product_series_id + selected_variant_id`。
- 输出中的 `variant_id` 必须等于当前 `selected_variant_id`。
- 切换 `selected_variant_id` 会使未确认的画像、报告、图片绑定、批次和镜头规划失效并重新检查。

## 下一状态

通过后进入 `creative_direction_confirmed`。
