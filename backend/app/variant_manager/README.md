# variant_manager

- 输入：商品系列和型号名、SKU、属性、参数、配件、价格、图片。
- 输出：`variants[]`、默认单型号及 `selected_variant_id` 管理结果。
- 依赖规则：`rules/variant_rules.json` 和系列/型号 Schema。
- 禁止行为：不得省略单型号对象，不得混写系列共享和型号专属字段，不得默认启用 Revision。
