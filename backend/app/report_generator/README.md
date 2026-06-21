# report_generator

## 模块职责

整合目标型号的类目、商品分类、内容难度、视频分型、类目打法、风险和缺失信息。

## 输入

系列/型号 ID、人工确认类目、型号画像、分类结果、分型结果、类目打法、风险和缺失信息。

## 输出

型号级 `judgement_report`，包含顶部结论、评分、推荐排序、打法、风险、缺失和确认元数据。

## 依赖规则

`rules/product_classification_rules.json`、`rules/video_type_rules.json`、`rules/category_playbook_rules.json`。

## 依赖 Schema

`backend/schemas/product_series.schema.json`、`product_profile.schema.json`、`judgement_report.schema.json`。

## 前置状态 / 通过条件

类目、目标型号、画像和视频分型必须完成；生成后为 `report_generated`，用户阅读风险并确认后才是 `report_confirmed`。

## ID 绑定要求

报告必须绑定当前 `selected_variant_id`，输入对象归属和引用一致性由未来 `validators` 校验。

## 禁止行为

不得在类目或画像未完成时生成、遗漏风险缺失、把历史单型号对象当主结构或自动确认报告。

## 后续实现边界

未来只聚合既有判断结果。三档画像字段与第 18 章布尔字段、B/C 级与第 19 章完整资产要求均是设计未裁决约束；本模块不得自行转换、丢失信息或预先裁决后续输出等级。
