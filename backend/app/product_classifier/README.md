# product_classifier

## 模块职责

对当前目标型号执行小件标品、非标品、大件标品分类，形成判断报告组件。

## 输入

`product_series_id`、当前 `variant_id`、已确认平台类目和型号级商品画像。

## 输出

商品分类、拍摄/种草/决策评分、特征、风险和自制视频建议所需分类结果。

## 依赖规则

`rules/product_classification_rules.json`。

## 依赖 Schema

`backend/schemas/product_profile.schema.json`、`backend/schemas/judgement_report.schema.json`。

## 前置状态 / 通过条件

必须已有 `target_variant_selected` 且画像达到 `variant_profile_completed`；分类结果进入报告，不产生独立主流程状态。

## ID 绑定要求

输入和输出 `variant_id` 必须等于当前 `selected_variant_id`，由未来 `validators` 校验。

## 禁止行为

不得只按系列名称分类、跨型号复用结论、改变分类覆盖类目或评分。

## 后续实现边界

未来只实现规则查表与结构化结果，不引入自学习分类、外部模型或新算法。
