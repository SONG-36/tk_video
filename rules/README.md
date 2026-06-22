# rules 机器可读规则目录

`rules/*.json` 是从 `00_design.md` 提取的机器可读投影，不是权威源。如任何 JSON 与 `00_design.md` 冲突，以 `00_design.md` 为准。

`docs/rules/*.md` 是面向阅读的 Markdown 拆分，不是机器规则。后续 `backend/` 只能读取 `rules/*.json`，不得从阅读版复制规则，也不得用后端实现反向覆盖规则文件或 `00_design.md`。

每个 JSON 使用统一元数据：`rule_file`、`rule_set`、`source_section`、`authority`、`version`、`status`、`rules`、`open_issues`。当前投影版本为 `0.1.0`，状态统一为 `draft`。

机器规则列表：

- `platform_category_rules.json`
- `variant_rules.json`
- `variant_difference_rules.json`
- `product_classification_rules.json`
- `video_type_rules.json`
- `category_playbook_rules.json`
- `material_check_rules.json`
- `image_asset_rules.json`
- `creative_translation_rules.json`
- `video_batch_rules.json`
- `shot_planning_rules.json`
- `tiktok_creative_style_rules.json`
- `viral_pattern_rules.json`
- `creative_transfer_rules.json`

新增或修改规则时，必须先更新 `00_design.md`，再同步阅读版和机器投影；未裁决问题只能记录在 `open_issues`，不得在实现层自行决定。
