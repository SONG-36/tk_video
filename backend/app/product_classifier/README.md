# product_classifier

- 输入：确认类目、当前 `variant_id` 和型号级画像。
- 输出：小件标品、非标品或大件标品及评分、特征、风险。
- 依赖规则：`rules/product_classification_rules.json`。
- 禁止行为：不得只按系列名分类，不得改变三类含义或评分来源。
