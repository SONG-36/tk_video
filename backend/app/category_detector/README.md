# category_detector

- 输入：商品名、目标平台/市场及已有商品资料。
- 输出：候选一/二级类目、置信度、理由和风险提示。
- 依赖规则：`rules/platform_category_rules.json`。
- 禁止行为：不得自动越过人工类目确认，不得把候选结果视为确认结果。
