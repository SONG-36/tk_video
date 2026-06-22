# Codex 任务包导出页

本文档描述前端页面职责，不是业务规则权威源；如与根目录 `00_design.md` 冲突，以 `00_design.md` 为准。

## 页面目标

展示当前目标型号和批次是否具备导出条件，并在后端校验通过后触发 Markdown 与 JSON 任务包文件导出。页面展示导出结果路径或失败原因，不直接控制或调用 Codex。

## 前置状态

`shot_assets_planned`。

## 进入条件

- 当前批次的镜头资产规划已经确认。
- 报告、材料、图片、创意、视频批次和镜头规划均存在且通过对应闸门。
- `product_series_id + variant_id + batch_id` 在所有前序对象中一致。

## 输入 / 展示字段

- 商品系列、目标型号和批次标识。
- 判断报告、材料检查、图片资产、创意方向、视频批次计划和镜头资产计划。
- 前置状态及各流程闸门是否满足。
- 已有材料、缺失材料和禁止编造约束。
- 任务包文件预览及预期导出路径。
- `tiktok_creative_requirements`、`viral_pattern_cards`、`product_adapted_patterns`、`creative_transfer_constraints` 和禁止复制约束。

## 用户动作

- 检查任务包的对象引用、ID 绑定、输出路径和禁止事项。
- 在后端校验通过后触发 Markdown 与 JSON 两种任务包文件导出。
- 查看导出结果路径或导出失败原因。
- 页面不得提供直接启动或控制 Codex 的动作。

## 输出对象

- `data/tasks/{product_series_id}_{variant_id}_{batch_id}_codex_task.md`
- `data/tasks/{product_series_id}_{variant_id}_{batch_id}_codex_task.json`

## 依赖后端模块

- `task_package_generator`
- `validators`

## 依赖 Schema

- `codex_task_package.schema.json`
- `product_series.schema.json`
- `judgement_report.schema.json`
- `material_check.schema.json`
- `image_asset.schema.json`
- `creative_direction.schema.json`
- `video_batch_plan.schema.json`
- `shot_asset_plan.schema.json`

## 通过条件

- `product_series_id + variant_id + batch_id` 在任务包及所有前序对象中一致。
- 前序对象已通过对应 Schema 和流程闸门检查。
- 输出路径、实际计划视频和禁止编造约束已写入任务包。
- Markdown 与 JSON 文件均可导出。

## 失败 / 阻断表现

- 任一前序对象缺失、未确认或 ID 不一致时禁止导出。
- 任务包引用未规划视频、缺失输出路径或未携带禁止编造约束时禁止导出。
- 正式任务包缺少 hook、proof 或 CTA，或未携带已引用模式的迁移约束时禁止导出。
- 后端校验失败时展示具体阻断原因，不在前端修改业务判断或手工拼接资料。
- 页面不得以导出成功表示 Codex 已执行。

## 页面不负责

- 不直接控制 Codex，不直接调用 Seedance、即梦或其他视频模型。
- 不上传到 TikTok，不创建 `outputs/` 内容。
- 不修改业务判断，不绕过后端校验和流程闸门。
- 不手工拼接其他型号或其他商品资料。

## 型号和 ID 约束

- 任务包中的 `variant_id` 必须等于当前 `selected_variant_id`。
- 任务包必须绑定同一 `product_series_id + variant_id + batch_id` 的全部前序上下文；该跨对象关系由后续 `validators` 校验。
- 切换 `selected_variant_id` 会使未确认的画像、报告、图片绑定、批次和镜头规划失效并重新检查。

## 下一状态

成功导出后进入 `task_package_exported`。

## 未裁决约束

第 15、16 章的 B/C 级精简输出与第 21 章每条视频完整资产要求的适用关系尚未裁决。任务包不得自行解释或改写该约束。
