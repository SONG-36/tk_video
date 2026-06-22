# 镜头资产规划规则

> 本文档来源于 `00_design.md`，仅用于阅读，不是权威源；如与 `00_design.md` 冲突，以 `00_design.md` 为准。
>
> 来源章节：第 16—18 章。

## 四类资产

- Creative Board：每条视频一个，说明整体创意、卖点、风格、参考和禁区。
- Storyboard：每条视频一个，说明镜头顺序、时长、画面、字幕和节奏。
- Shot Card：每个镜头一个，说明执行要求。
- Seedance Prompt：每个镜头一个，作为视频模型具体提示词。

## 推荐镜头数量

15 秒 3—5 个；20—30 秒 5—8 个；复杂剧情 8—10 个。镜头不能为显得专业而增加，每个镜头至少服务放大痛点、展示产品、证明卖点、建立信任、推动剧情、促进转化之一。

## 镜头卡字段

`shot_id`、所属视频、镜头时长、镜头目标、视频分型、画面内容、主体动作、产品是否出现、产品出现方式、对应卖点、字幕、配音、运镜、画面质感、光线、输入图片、参考视频、产品锁定规则、负向提示词、失真风险、输出目标。

使用 viral pattern 时还需增加或预留：`emotional_trigger`、`pattern_role`、是否推进反转、是否证明产品、`product_first_visible_time`、`product_proof_start_time`、`plot_vs_product_balance`、`proof_scene`、`cta_visual`、`text_overlay_plan`、`sound_or_voiceover_plan`。产品首次清晰出现不得晚于 8 秒，产品证明不得晚于 12 秒开始，剧情铺垫不能压过产品证明；跨镜头时间计算由后续 validators 完成。

## 镜头级提示词字段

`shot_id`、`duration`、`input_images`、`reference_videos`、`main_subject`、`scene`、`action`、`camera_movement`、`lighting`、`style`、`composition`、`product_constraints`、`subtitle_text`、`negative_prompt`、`output_goal`。

## 通过条件

- A 级：画板、故事板、每镜头 Shot Card、图片绑定或无需图片标记、每镜头提示词草案。
- B 级：简版 Storyboard 和主要镜头说明。
- C 级：轻量草案。
- 所有镜头：标记失真风险，并确认服务的卖点或剧情目标。
