# 型号级商品画像补全页

本文档描述前端页面职责，不是业务规则权威源；如与根目录 `00_design.md` 冲突，以 `00_design.md` 为准。

## 页面目标

在已选目标型号的上下文中，以结构化方式补齐影响商品分类、视频分型和内容生产的商品画像。

## 前置状态

`target_variant_selected`。

## 进入条件

- `product_series_id` 已确定。
- `selected_variant_id` 已人工选择，并能引用当前系列 `variants[].variant_id`。
- 型号差异检查已经完成。

## 输入 / 展示字段

- 基础画像：体积、是否需要真人、是否需要大场景、功能是否清晰、审美依赖、是否适合对比、包装要求。
- 风险画像：电子、电池、人体接触、儿童、宠物、食品、高价和合规风险。
- 卖点类型：至少选择一个适用于当前目标型号的卖点类型。
- 当前 `product_series_id`、`selected_variant_id` 与目标型号摘要。

## 用户动作

- 为当前目标型号逐项补齐画像。
- 选择至少一个卖点类型。
- 对轻微冲突进行人工确认；严重冲突时返回修正。

## 输出对象

绑定 `product_series_id` 与当前 `variant_id` 的 `product_profile`。

## 依赖后端模块

- `validators`：后续校验字段完整性、目标型号归属及跨对象 ID 一致性。
- `product_classifier`、`video_type_classifier`：在画像确认后消费该对象，本页面不代替这些模块执行分类或分型。

## 依赖 Schema

- `product_profile.schema.json`
- `product_series.schema.json`

## 通过条件

- 基础画像和风险画像字段填写完整。
- 至少选择一个卖点类型。
- 不存在严重冲突。
- 轻微冲突已经由用户明确确认。

## 失败 / 阻断表现

- 字段缺失或未选择卖点类型时，展示缺失项并阻止继续。
- 严重冲突时展示冲突原因并要求修正。
- 轻微冲突未经确认时保持当前状态，不进入下一页。

## 型号和 ID 约束

- 所有输入和输出必须绑定当前 `product_series_id + selected_variant_id`。
- 输出对象中的 `variant_id` 必须等于当前 `selected_variant_id`。
- 切换 `selected_variant_id` 会使未确认的画像、报告、图片绑定、批次和镜头规划失效并重新检查。

## 下一状态

通过后进入 `variant_profile_completed`。

## 未裁决约束

第 7 章三个三档画像字段与第 18 章布尔字段的信息粒度不一致。本页面只保留两侧定义，不擅自进行映射或降级；实现前需人工裁决。
