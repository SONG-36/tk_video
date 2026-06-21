# 数据结构阅读版

> 本文档来源于 `00_design.md`，仅用于阅读，不是权威源。来源：第 18 章；冲突时以 `00_design.md` 为准。

## 系列与型号主对象

主对象包含 `product_series_id`、系列名、平台类目、市场、`variants[]`、型号差异报告、`selected_variant_id` 和当前 `video_batch_plan`。型号包含 `variant_id`、卖家 SKU、型号名、属性、图片资产 ID 与可选 Revision。

## 数据归属与绑定

系列层仅保存真正共享的信息；型号层保存影响拍摄和表达的外观、参数、配件、图片、卖点及限制。`video_batch_plan`、`shot_asset_plan`、任务包必须绑定 `product_series_id + variant_id + batch_id`。`selected_variant_id` 必须对应 `variants[].variant_id`，批次 `variant_id` 必须等于当前目标型号。

## 商品基础信息

由 `product_series_id`、`basic_info` 和状态组成。`basic_info` 至少包含产品名、目标平台、目标市场、业务阶段，可带图片和 1688/TikTok/Amazon 链接。

## 类目确认

`category_detection` 包含平台类目、子类目、候选类目（置信度和理由）及 `confirmed_by_user`，确认状态为 `category_confirmed`。

## 商品画像

`product_profile` 包含尺寸、真人和大场景需求、功能清晰度、审美依赖、可对比性、包装价值、电子/电池/人体/儿童/宠物/食品/高价风险以及卖点类型。

## 图片资产

单资产包含 `image_id`、文件名、资产类型、视角、用途、质量、是否必需和备注；资产必须归属目标型号。

## 创意方向

包含风格、剧情结构、表达强度、真人策略、自由想法，以及系统翻译出的运镜、画面质感、节奏和素材需求。

## video_batch_plan

包含三类绑定 ID、视频总数、批次目标、默认等级策略和 `videos[]`。每条视频包含分型、创意、主卖点、场景、痛点、生成等级、提示词开关、镜头数和时长。

## shot_asset_plan

按 `videos[]` 保存画板路径、故事板路径和镜头。镜头包含 `shot_id`、时长、目标、产品可见性、输入图片和失真风险，并继承批次三类 ID 绑定。

## 单型号兼容对象

历史 `product_id` 对象仅用于兼容单型号数据，不表示跨型号共享。新实现必须包裹在系列—型号关系中，使用三类 ID 绑定；`optional_revision` 默认是 `null`。
