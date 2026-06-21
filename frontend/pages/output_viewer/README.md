# 输出结果查看页

本文档描述前端页面职责，不是业务规则权威源；如与根目录 `00_design.md` 冲突，以 `00_design.md` 为准。

## 页面目标

按当前商品系列和实际批次读取、展示 Codex 已生成的内容资产，并支持人工验收标记；本页面不触发 Codex 执行。

## 前置状态

`task_package_exported`；外部处理期间可展示 `codex_processing`，结果可读后为 `codex_output_ready`。

## 进入条件

- 当前目标型号任务包已经导出。
- 实际 `product_series_id`、`variant_id` 和 `batch_id` 上下文明确。
- 只读取 `video_batch_plan` 中实际规划的视频。

## 输入 / 展示字段

- `product_series_id`、当前 `variant_id`、`batch_id` 和批次视频清单。
- `outputs/{product_series_id}/{batch_id}/` 下实际存在的批次与视频文件。
- 每条视频的策略、脚本、分镜、Shot Card、提示词及设计规定的输出资产字段。
- 文件存在状态、质量检查结果和缺失提示。

## 用户动作

- 查看和复制实际输出内容。
- 对输出标记通过或重做。
- 在需要修正任务上下文时提出重新导出任务包的意图。
- 不从本页面直接控制 Codex。

## 输出对象

页面展示状态、人工通过/重做标记和重新导出意图；不创建新的业务规则对象。

## 依赖后端模块

- `output_reader`
- `validators`

## 依赖 Schema

- `codex_task_package.schema.json`
- `video_batch_plan.schema.json`
- `shot_asset_plan.schema.json`
- `product_series.schema.json`

## 通过条件

- 读取路径与当前商品系列和实际批次绑定正确。
- 仅展示已规划视频及其实际存在的文件。
- 展示字段符合第 19 章质量控制要求，缺失文件有明确提示。
- 最终通过由用户人工确认，不因文件存在而自动完成。

## 失败 / 阻断表现

- 路径或 ID 不一致时停止读取并展示绑定错误。
- 文件缺失时明确标记缺失，不伪造内容或自动补齐。
- 没有批次规划时不得读取任何视频目录；批次未规划 `video_04` 或 `video_05` 时不得读取这些目录。

## 型号和 ID 约束

- 页面上下文中的 `variant_id` 必须等于当前 `selected_variant_id`。
- 读取路径必须对应任务包和批次计划中的同一 `product_series_id + variant_id + batch_id`；跨对象一致性由后续 `validators` 校验。
- 切换 `selected_variant_id` 会使未确认的画像、报告、图片绑定、批次和镜头规划失效并重新检查。

## 下一状态

外部处理期间为 `codex_processing`，结果存在并可读时为 `codex_output_ready`；人工验收后才可按设计进入 `completed`，页面不得自动推进。

## 未裁决约束

第 15、16 章的 B/C 级精简输出与第 19 章每条视频完整资产要求的适用关系尚未裁决。本页面只展示实际产物并标记缺失，不自行决定各等级应省略或补齐哪些资产。
