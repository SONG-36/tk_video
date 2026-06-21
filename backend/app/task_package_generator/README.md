# task_package_generator

- 输入：已确认的系列、型号、批次、报告、材料、图片、创意和镜头计划。
- 输出：绑定 `product_series_id + variant_id + batch_id` 的 Markdown/JSON 任务包。
- 依赖规则：第 17、19 章输出和质量规则、`codex_task_package.schema.json`。
- 禁止行为：不得越过镜头规划，不得混入其他型号数据，不得直接调用 Codex 或视频模型。
