# image_asset_checker

## 模块职责

检查目标型号图片类型、用途、完整度、缺图、失真风险和提示词生成能力。

## 输入

系列/型号 ID及图片的 `image_id`、文件名、类型、视角、用途、质量、必需性和备注。

## 输出

图片资产清单、完整度等级、缺失图片、镜头用途、失真风险和能力限制。

## 依赖规则

`rules/image_asset_rules.json`。

## 依赖 Schema

`backend/schemas/image_asset.schema.json`。

## 前置状态 / 通过条件

前置为 `materials_checked`；完成上传或缺失标记、类型用途标注、完整度和限制生成后达到 `variant_image_assets_checked`。

## ID 绑定要求

每项图片必须属于同一系列和当前 `selected_variant_id`；图片引用和镜头引用一致性由未来 `validators` 校验。

## 禁止行为

不得跨型号误用图片、改变图片阈值、在少于 3 张时允许镜头级提示词或假装缺图不存在。

## 后续实现边界

未来只实现元数据检查，不执行 OCR、VLM、图片识别或外部模型调用。
