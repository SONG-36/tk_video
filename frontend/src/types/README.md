# 前端 Schema 类型投影

本目录是 `backend/schemas/*.schema.json`、`00_design.md` 和机器规则的静态 TypeScript 投影，不是新的权威源。类型不执行运行时解析、默认值填充、跨对象校验或业务判断。

## Schema 映射

| Backend Schema | TypeScript 投影 |
|---|---|
| `product_series.schema.json` | `product.ts` 中的 `ProductSeries`、`VariantDifferenceReport` |
| `variant.schema.json` | `product.ts` 中的 `Variant` |
| `product_profile.schema.json` | `profile.ts` 中的 `ProductProfile` |
| `judgement_report.schema.json` | `report.ts` 中的 `JudgementReport` |
| `material_check.schema.json` | `material.ts` 中的 `MaterialCheck` |
| `image_asset.schema.json` | `imageAsset.ts` 中的 `ImageAsset` |
| `creative_direction.schema.json` | `creative.ts` 中的 `CreativeDirection` |
| `video_batch_plan.schema.json` | `videoBatch.ts` 中的 `VideoBatchPlan`、`VideoPlan` |
| `shot_asset_plan.schema.json` | `shotPlan.ts` 中的 `ShotAssetPlan`、`VideoShotPlan`、`ShotCard` |
| `codex_task_package.schema.json` | `taskPackage.ts` 中的 `CodexTaskPackage`，以及 `viralPattern.ts` 中的两个内嵌模式对象 |

`index.ts` 是统一类型导出入口。当前采用人工等价投影，没有 Schema 自动生成器，也没有新增依赖。

## Required、optional 与开放结构

- Schema `required` 中的字段在接口中为必填；其余属性使用 `?`。
- `optional_revision` 保持 `object | null | undefined`。
- Schema 只声明 `type: object`、未声明内部属性时，投影为 `Record<string, unknown>`，不猜测字段。
- Schema 枚举保持字面量联合类型；未定义枚举的字符串保持 `string`。
- `additionalProperties: false` 的封闭对象边界由静态对象字面量检查辅助约束，运行时仍由任务 13 validators 负责。

## ID 与 validators 边界

`ProductSeriesId`、`VariantId`、`BatchId`、`VideoId`、`ShotId`、`ImageId` 当前集中定义为 `string` alias。以下关系不能由这些静态类型保证，留给任务 13：

- `selected_variant_id` 必须引用同系列 `variants[].variant_id`。
- 型号 ID 唯一性以及 `product_series_id + variant_id + batch_id` 跨对象一致性。
- video、shot、任务包的归属和引用一致性。
- 产品 8 秒出现、12 秒开始证明和剧情/产品平衡判断。

## 保留的未解决问题

- `category_detection` 和商品 `basic_info` 没有独立 Schema，本目录不猜测对应接口。
- 商品画像页面三档字段与 Schema 布尔字段粒度冲突未裁决；`ProductProfile` 忠实使用 Schema 布尔值。
- `viral_pattern_card` 与 `product_adapted_pattern` 没有独立 Schema；当前类型只投影 `codex_task_package.schema.json` 的内嵌定义。机器规则提到但该封闭定义未允许的 `unsuitable_product_types` 不加入任务包类型。
- `ImageCompletenessLevel`、`ImageDistortionRisk`、`TiktokNativeStyleName`、`CreativeTransferRiskLevel` 和 `PlotVsProductBalance` 没有封闭枚举，保持 `string`。
- 当前 Schema 没有独立完整 `SeedancePromptDraft`；该类型只从 `ShotCard` 选取 Schema 已存在的提示词相关字段，不补造 `main_subject`、`scene`、`action`、`style` 或 `composition`。
- 第 15/16 章 B/C 级精简输出与第 21 章完整资产要求的关系未裁决，类型不改变 required 集合。
