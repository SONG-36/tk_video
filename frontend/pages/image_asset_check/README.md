# 型号级产品图片资产页

本文档描述前端页面职责，不是业务规则权威源；如与根目录 `00_design.md` 冲突，以 `00_design.md` 为准。

## 页面目标

上传、标注并检查当前目标型号的图片资产，评估图片完整度、缺图情况、失真风险和可支持的后续生成等级。

## 前置状态

`materials_checked`。

## 进入条件

- 当前目标型号材料检查已经通过。
- `product_series_id` 与 `selected_variant_id` 绑定有效。

## 输入 / 展示字段

- 图片文件和型号归属。
- 图片类型、视角、用途、质量、是否必需和备注。
- 图片完整度等级、缺图清单、失真风险和生成能力限制。

## 用户动作

- 上传当前目标型号图片，或明确标记缺失。
- 为每张图片标注类型、关键用途及其他设计要求字段。
- 查看完整度、缺图、风险和能力限制。

## 输出对象

绑定 `product_series_id` 与当前 `variant_id` 的图片资产清单及图片检查结果。

## 依赖后端模块

- `image_asset_checker`
- `validators`

## 依赖 Schema

- `image_asset.schema.json`
- `material_check.schema.json`
- `product_series.schema.json`

## 通过条件

- 设计要求的图片已经上传，或缺失状态已经明确。
- 每张图片已经完成类型和关键用途标注。
- 系统已形成图片完整度、缺图清单、风险和能力限制。

## 失败 / 阻断表现

- 图片状态不明、归属型号不明或关键标注缺失时阻止通过。
- 图片少于三张时明确提示不能进入镜头级提示词生产，不得由页面绕过。
- 页面不得通过 OCR、VLM 或自动识图替代人工上传和标注。

## 型号和 ID 约束

- 每张图片必须绑定当前 `product_series_id + selected_variant_id`。
- 图片对象中的 `variant_id` 必须等于当前 `selected_variant_id`。
- 切换 `selected_variant_id` 会使未确认的画像、报告、图片绑定、批次和镜头规划失效并重新检查。

## 下一状态

通过后进入 `variant_image_assets_checked`。
