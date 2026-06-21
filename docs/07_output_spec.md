# 输出规范

> 本文档来源于 `00_design.md`，仅用于阅读，不是权威源；如与 `00_design.md` 冲突，以 `00_design.md` 为准。
>
> 来源章节：第 17、19 章。

## outputs 目录结构

```text
outputs/{product_series_id}/{batch_id}/
├── batch_summary.md
├── video_01/
│   ├── creative_board.md
│   ├── script.md
│   ├── storyboard.md
│   ├── shot_cards/
│   ├── seedance_prompts/
│   ├── image_input_plan.md
│   ├── editing_plan.md
│   └── qc_checklist.md
├── video_02/
└── video_03/
```

默认规划三条。只有素材充足且批次检查通过时，才允许扩展 `video_04/05`；不得根据目录存在自行推断批次规划。

## 每条视频输出

每条视频至少描述视频编号、分型、创意风格、目标、开头钩子、故事板、镜头数量、镜头卡、镜头级提示词、绑定图片、所服务卖点、剪辑合成、缺失素材、风险提醒和可替换变量。A/B/C 级的实际文件完整度服从第 15、16 章。

## 每个镜头字段

`shot_id`、`duration`、`input_images`、`reference_videos`、`main_subject`、`scene`、`action`、`camera_movement`、`lighting`、`style`、`composition`、`product_constraints`、`subtitle_text`、`negative_prompt`、`output_goal`。

## 前端读取规则

输出查看页按商品系列和批次目录读取，并用任务包/批次中的三类 ID 验证归属。页面展示实际文件，支持查看、复制、标记通过、标记重做和重新导出任务包。缺失内容只显示提醒，不得推断、伪造或自动补写文件。
