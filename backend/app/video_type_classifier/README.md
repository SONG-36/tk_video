# video_type_classifier

## 模块职责

对当前目标型号计算五类视频基础分、画像修正、推荐顺序和材料限制状态。

## 输入

系列/型号 ID、已确认类目、商品分类、型号画像及真人、竞品、场景素材可用性。

## 输出

五类视频分数、推荐顺序、原因、主力标记及“推荐但材料缺失/不可执行”状态。

## 依赖规则

`rules/video_type_rules.json`。

## 依赖 Schema

`backend/schemas/product_profile.schema.json`、`backend/schemas/judgement_report.schema.json`。

## 前置状态 / 通过条件

前置为 `variant_profile_completed`；完成分型后达到 `video_type_completed`，但推荐数量不等于实际生成数量。

## ID 绑定要求

分类、画像、素材和输出必须属于同一 `selected_variant_id`，未来由 `validators` 校验。

## 禁止行为

不得改评分、把推荐当生成数量、忽略真人/竞品/场景限制或跨型号复用推荐。

## 后续实现边界

未来只实现查表、加分和限制标记；不规划批次数量，不调用模型。
