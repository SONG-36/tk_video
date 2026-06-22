# 镜头资产规划页

本文档描述前端页面职责，不是业务规则权威源；如与根目录 `00_design.md` 冲突，以 `00_design.md` 为准。

## 页面目标

依据已确认的视频批次与生成等级，为批次内每条视频规划 Creative Board、Storyboard、Shot Card 和镜头级 Seedance Prompt。

## 前置状态

`video_batch_planned`。

## 进入条件

- 当前目标型号的视频批次规划已经确认。
- `product_series_id + variant_id + batch_id` 绑定有效。
- 仅处理批次规划中实际存在的视频。

## 输入 / 展示字段

- 批次视频清单、每条视频的生成等级、目标时长和推荐镜头数量。
- Creative Board、Storyboard、Shot Card 的层级结构。
- 镜头目标、画面、动作、产品出现方式、卖点、字幕/配音、运镜、光线、所用图片、约束和风险。
- 镜头级提示词所需的主体、动作、场景、镜头、光线、风格、节奏和限制字段。
- 每个镜头的情绪触发、是否推进反转、是否证明产品、模式角色、证明场景和 CTA 画面。
- 产品首次出现时间、产品证明开始时间、剧情铺垫是否过长、剧情与产品平衡、字幕和声音/口播计划。

## 用户动作

- 查看并审阅系统按已确认批次形成的各视频镜头规划草案。
- 检查镜头与图片绑定、服务目标、失真风险和约束。
- 按 A/B/C 等级要求人工确认镜头资产规划。

## 输出对象

绑定 `product_series_id + variant_id + batch_id`，并按视频和镜头分层的 `shot_asset_plan`。

## 依赖后端模块

- `shot_asset_planner`
- `validators`

## 依赖 Schema

- `shot_asset_plan.schema.json`
- `video_batch_plan.schema.json`
- `image_asset.schema.json`
- `creative_direction.schema.json`
- `product_series.schema.json`

## 通过条件

- 每条已规划视频的资产完整度满足其 A/B/C 等级要求。
- 视频、镜头和批次归属一致。
- 每个镜头的图片绑定、服务目标、约束和失真风险明确。
- 用户已确认镜头资产规划。

## 失败 / 阻断表现

- 视频不属于当前批次、镜头归属不明或三类 ID 不一致时阻止通过。
- 图片不足以支撑镜头或生成等级时展示限制，不得虚构资产。
- 不为批次中不存在的视频创建镜头规划。

## 型号和 ID 约束

- 计划中的 `variant_id` 必须等于当前 `selected_variant_id`。
- video 与 shot 必须归属同一 `batch_id`；跨数组和跨对象关系由后续 `validators` 校验。
- `product_series_id + variant_id + batch_id` 必须与视频批次规划一致。
- 切换 `selected_variant_id` 会使未确认的画像、报告、图片绑定、批次和镜头规划失效并重新检查。

## 下一状态

通过后进入 `shot_assets_planned`。

## 未裁决约束

第 15、16 章的 B/C 级精简输出与第 21 章每条视频完整资产要求的适用关系尚未裁决。本页面不得自行补齐或删减对应等级资产。
