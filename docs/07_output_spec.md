# 输出规范

> 本文档来源于 `00_design.md`，仅用于阅读，不是权威源；如与 `00_design.md` 冲突，以 `00_design.md` 为准。
>
> 来源章节：第 7—9、15—19、23、24 章，核心来源为第 17—19 章。

本文档只定义未来输出读取契约。本任务不创建或读取真实输出根，不实现目录遍历、路径校验、文件索引、缺失判断或内容解析。

## 输出根与路径边界

唯一读取目标根为：

```text
outputs/{product_series_id}/{batch_id}/
```

- `product_series_id` 来自当前商品系列。
- `batch_id` 来自已确认的视频批次。
- `variant_id` 不进入目录层级，但必须参与任务包、批次计划、镜头计划和读取上下文的归属校验。
- 所有候选文件必须位于指定批次根内，并以相对批次根的路径表示。
- 必须拒绝 `../`、绝对路径、危险软链接或任何可能逃逸到其他目录、系列、型号或批次的路径。
- 目录存在不代表允许读取，文件存在也不代表允许展示。

本任务不创建商品、批次、视频或资产目录，也不读取真实业务内容。

## 批次计划优先与读取顺序

未来读取器必须按以下顺序工作：

1. 取得并确认当前 `product_series_id + variant_id + batch_id` 上下文。
2. 读取已经确认的 `video_batch_plan`。
3. 从 `video_batch_plan.videos[].video_id` 得到允许的 `video_id` 白名单。
4. 在指定批次根下，只处理白名单对应的视频目录。
5. 按计划和既有质量规则形成只读展示结果。

默认只读取实际规划的视频。没有批次计划或视频不在白名单中时，即使目录存在，也不得读取或展示。不得从目录名、目录数量或文件存在情况反向推断视频计划。

## `batch_summary.md`

`batch_summary.md` 只用于展示当前批次的汇总内容。它不得反向覆盖或修改：

- 已确认的视频批次计划及视频白名单；
- 质量规则和输出目录规则；
- 任务包规则或 Schema；
- 系列、型号和批次归属。

文件缺失时只能标记缺失，不得自动生成、补写或从其他批次复制。

## 实际视频目录

设计中的目录示例为：

```text
video_01/
video_02/
video_03/
```

示例不表示固定数量。允许的视频目录必须逐一来自已确认 `video_batch_plan` 的 `video_id`。不得推断未规划视频，不得因为目录存在而展示，也不得从目录名反推批次计划。

`video_04/`、`video_05/` 只有在批次计划明确包含对应 `video_id` 且通过检查时才进入白名单；历史残留目录不读取、不展示。

## A/B/C 级资产读取边界

- A 级完整生成：读取设计已规定的 Creative Board、Script、Storyboard、Shot Cards、Seedance Prompts、Image Input Plan、Editing Plan 和 QC Checklist。
- B 级中度生成：读取设计已规定的 Script、Storyboard、主要镜头、简版 Seedance Prompt 和缺图提醒。
- C 级轻量草案：读取设计已规定的视频标题、开头钩子、视频结构、核心卖点和参考镜头。

第 15、16 章的 B/C 级精简输出与第 21 章“每条视频必须包含”完整资产要求的适用关系尚未裁决。读取器只能如实报告实际文件、缺失项和该未裁决约束，不得增加资产等级、输出文件、质量标准或自动修复规则。

## 逐视频 TikTok 创意与迁移信息

每条已规划视频的输出应包含或可展示：hook 信息（含类型、前 3 秒文字/画面和截停原因）、`script_structure`、`retention_design`、`proof_point`、CTA、`tiktok_native_style`、使用到的 viral pattern、`product_adapted_pattern`、`text_overlay_plan` 和 `sound_or_voiceover_plan`。

读取器只检查这些字段和结构是否存在、是否属于已规划视频，不做主观创意评分；缺少 hook、proof 或 CTA 时必须标记为不完整，不能把该视频显示为正式完整资产。

## 逐镜头字段

逐镜头读取字段来自第 16、19 章及既有 Schema：

`shot_id`、`duration`、`input_images`、`reference_videos`、`main_subject`、`scene`、`action`、`camera_movement`、`lighting`、`style`、`composition`、`product_constraints`、`subtitle_text`、`negative_prompt`、`output_goal`。

这些字段只用于按既有计划展示，不增加字段语义、状态或自动修复信息。

## 未来文件索引契约

未来只读结果可以在内存返回以下索引字段，但本任务不生成任何索引文件或实例：

| 字段 | 契约含义 |
|---|---|
| `product_series_id` | 当前商品系列 |
| `variant_id` | 当前目标型号归属 |
| `batch_id` | 当前批次 |
| `video_id` | 必须来自批次计划白名单 |
| `file_role` | 对应第 17、19 章已有输出资产角色 |
| `relative_path` | 相对指定批次根的路径，不得保存越界路径 |
| `exists` | 文件是否实际存在 |
| `missing_reason` | `exists=false` 时说明缺失原因 |
| `risk_note` | 既有风险信息，不新增质量判断 |
| `source_rule` | 说明来源计划或 `00_design.md` 规则位置 |

文件索引只是未来读取结果契约，不是业务对象、持久化格式或新权威源，不得反向修改批次计划、任务包、质量规则或 Schema。

## 缺失文件处理

- 缺失就如实标记缺失并说明原因。
- 不自动补写、生成、重命名或复制文件。
- 不从其他型号、系列或批次寻找替代文件。
- 不使用 AI、OCR 或 VLM 推断和补齐内容。
- 不调用 Codex、Seedance、即梦或其他模型重新生成。
- 不修改质量结论，也不把缺失文件显示为正常。

## 前端展示契约

输出查看页只展示后端 `output_reader` 返回的白名单内数据，包括画板、脚本、故事板、镜头卡、提示词、图片输入计划、剪辑计划、质检结果、缺失提醒和风险提醒。前端不得直接扫描文件系统、隐藏缺失或风险、展示未规划视频，或把输出查看页当作质量裁决工具。
