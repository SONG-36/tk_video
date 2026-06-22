# JSON Schema 目录

本目录保存从 `00_design.md` 投影出的 JSON Schema，使用 JSON Schema Draft 2020-12。Schema 不是权威源；与 `00_design.md` 冲突时，以 `00_design.md` 为准。

| Schema | 对象 | 来源章节 |
|---|---|---|
| `product_series.schema.json` | 商品系列及型号主对象 | 第 5、6、18 章 |
| `variant.schema.json` | 型号 / SKU | 第 5—7、18 章 |
| `product_profile.schema.json` | 型号级商品画像 | 第 7、18 章 |
| `judgement_report.schema.json` | 型号级判断报告 | 第 7、10、11、18 章历史结构 |
| `material_check.schema.json` | 材料检查 | 第 7、12、18 章历史结构 |
| `image_asset.schema.json` | 型号级图片资产 | 第 7、13、18 章 |
| `creative_direction.schema.json` | 创意方向、TikTok 结构偏好和模式引用 | 第 7、14、17、18、20 章 |
| `video_batch_plan.schema.json` | 视频批次规划及逐视频 TikTok 创意字段 | 第 7、15、17—21 章 |
| `shot_asset_plan.schema.json` | 镜头资产规划及模式转镜头字段 | 第 7、16—21 章 |
| `codex_task_package.schema.json` | Codex 任务包、模式卡与适配约束 | 第 17—21 章 |

`selected_variant_id` 的数组引用关系、跨文件三类 ID 一致性、视频与镜头的批次归属、任务包前序对象一致性无法由单个 JSON Schema 完整保证，均由后续 validators 校验。历史 `product_id` 对象不作为当前主 Schema。

产品首次清晰出现不晚于 8 秒、产品证明不晚于 12 秒开始、剧情不能压过产品，以及来源模式不可复制内容等跨镜头/跨对象语义只在 Schema 中预留字段和 description；Schema 不假装完成这些校验，后续由 validators 实现。`viral_pattern_card` 和 `product_adapted_pattern` 当前没有独立 Schema 文件，仅在允许修改的现有 Schema 中投影。
