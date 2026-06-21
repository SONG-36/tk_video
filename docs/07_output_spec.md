# 输出规范

> 本文档来源于 `00_design.md`，仅用于阅读，不是权威源。来源：第 17、19 章；冲突时以 `00_design.md` 为准。

## outputs 目录结构

输出根为 `outputs/{product_series_id}/{batch_id}/`，包含 `batch_summary.md` 及批次规划中实际存在的 `video_01/` 至 `video_05/`。默认三条；不得无规划读取或创建 04/05。

## 每条视频输出

按生成等级输出视频编号、分型、创意风格、目标、开头钩子、Creative Board、Script、Storyboard、Shot Cards、Seedance Prompts、图片输入计划、剪辑合成计划、质检清单、缺失素材、风险提醒和可替换变量。A/B/C 级的完整度服从第 15、16 章。

## 每个镜头字段

`shot_id`、`duration`、`input_images`、`reference_videos`、`main_subject`、`scene`、`action`、`camera_movement`、`lighting`、`style`、`composition`、`product_constraints`、`subtitle_text`、`negative_prompt`、`output_goal`。

## 前端读取规则

输出查看页按三类 ID 定位批次，展示实际文件并支持查看、复制、通过、重做和重新导出任务包。读取器必须校验路径归属、批次视频清单和必要文件，缺失内容显示提醒，不得推断或伪造文件。
