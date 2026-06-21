# 视频批次规划规则

> 本文档来源于 `00_design.md`，仅用于阅读，不是权威源；如与 `00_design.md` 冲突，以 `00_design.md` 为准。
>
> 来源章节：第 15 章。

## 批量生成原则

一个批次绑定一个目标型号。默认 3 条、策略 `1A_1B_1C`；最多 5 条；素材充足时可用 `2A_2B_1C`。图片、卖点、真人素材或合规信息不足时，不允许一次生成 5 条完整精修视频。

## 生成等级

- A：Creative Board、Script、Storyboard、Shot Cards、Seedance Prompts、Image Input Plan、Editing Plan、QC Checklist。
- B：Script、Storyboard、主要镜头、简版 Seedance Prompt、缺图提醒。
- C：视频标题、开头钩子、视频结构、核心卖点、参考镜头。

## 批次目标

测试不同视频分型、开头钩子、卖点、使用场景、创意风格或用户痛点。

## 每条视频字段

`video_id`、视频分型、创意风格、主卖点、使用场景、目标痛点、生成等级、是否生成镜头提示词、是否需要真人、是否需要原图锁定、是否需要竞品素材、预计镜头数、预计时长。

## 输出结构

`video_batch_plan` 包含 `batch_id`、`product_series_id`、`variant_id`、`total_videos`、`batch_goal`、`default_generation_policy`、`videos[]`。

## 通过条件

批次 ID 和数量已确认；每条视频已选分型、主卖点、风格、等级；系统检查图片支撑等级并限制不满足者进入 A 级；用户确认批次。
