# variant_difference_checker

## 模块职责

比较同系列型号，确定共享字段、隔离字段及是否必须分别制作内容。

## 输入

同系列全部型号的名称/SKU、外观颜色、尺寸重量、功能参数、按钮接口、包装配件、价格卖点、图片、分型适配和合规安全信息。

## 输出

`checked`、可共享字段、`non_shareable_fields`、`content_must_be_separated`。

## 依赖规则

`rules/variant_difference_rules.json`。

## 依赖 Schema

`backend/schemas/product_series.schema.json`、`backend/schemas/variant.schema.json`。

## 前置状态 / 通过条件

前置为 `variants_recorded`；全部已录入型号完成比较并确认结论后达到 `variant_differences_checked`。

## ID 绑定要求

所有输入型号必须属于同一 `product_series_id`；归属和型号唯一性未来由 `validators` 校验。

## 禁止行为

不得直接合并不同型号内容，不得把影响画面、参数、卖点、配件或合规的差异标为共享。

## 后续实现边界

未来只实现结构化比较和报告接口；不自动修改型号数据或选择目标型号。
