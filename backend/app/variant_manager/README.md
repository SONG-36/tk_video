# variant_manager

## 模块职责

维护商品系列下的型号 / SKU、单型号默认对象、目标型号选择和可选 Revision。

## 输入

系列 ID，型号名称、卖家/平台 SKU、颜色、尺寸、参数、配件、价格和型号图片。

## 输出

`variants[]`、单型号默认对象、目标选择结果 `selected_variant_id`；Revision 默认不启用。

## 依赖规则

`rules/variant_rules.json`。

## 依赖 Schema

`backend/schemas/product_series.schema.json`、`backend/schemas/variant.schema.json`。

## 前置状态 / 通过条件

类目已人工确认后录入型号；至少一个型号后达到 `variants_recorded`。只有差异检查完成后才能确认 `target_variant_selected`。

## ID 绑定要求

`selected_variant_id` 必须引用当前系列 `variants[].variant_id`，型号 ID 唯一性和数组引用由未来 `validators` 校验。

## 禁止行为

不得省略单型号对象、混写系列与型号字段、在差异检查前选定目标型号或默认启用 Revision。

## 后续实现边界

未来只实现对象维护接口；不实现持久化、页面、状态越级或 Revision 新流程。
