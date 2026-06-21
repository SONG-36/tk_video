# creative_translator

## 模块职责

把用户创意选择翻译为剧情、运镜、质感、节奏、光线、素材和提示词要求。

## 输入

系列/型号 ID、风格、剧情结构、表达强度、真人限制、重点卖点、可选自由想法及产品约束。

## 输出

绑定目标型号的 `creative_direction`、`system_translation` 和用户确认结果。

## 依赖规则

`rules/creative_translation_rules.json`。

## 依赖 Schema

`backend/schemas/creative_direction.schema.json`、`backend/schemas/product_profile.schema.json`。

## 前置状态 / 通过条件

前置为 `variant_image_assets_checked`；必选项、优先级、翻译和用户确认完成后达到 `creative_direction_confirmed`。

## ID 绑定要求

创意输入、产品约束和输出必须属于当前 `selected_variant_id`，未来由 `validators` 校验。

## 禁止行为

不得让创意优先于产品清晰度和卖点，不得新增配件、参数、版权元素或绕过真人限制。

## 后续实现边界

未来只实现规则化翻译接口；确定性映射尚未由设计完整定义时不得自行补算法，也不调用大模型。
