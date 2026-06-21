# output_reader

## 模块职责

按已规划商品系列、批次和视频清单只读索引 Codex 输出，报告实际文件和缺失项。

## 输入

`product_series_id`、`variant_id`、`batch_id`、任务包/批次规划、允许的 `video_id` 和 `outputs/` 文件系统。

## 输出

批次摘要、逐视频文件索引、可读内容、缺失文件、风险和质量展示字段。

## 依赖规则

`rules/video_batch_rules.json`、`rules/shot_planning_rules.json`。

## 依赖 Schema

`backend/schemas/codex_task_package.schema.json`、`video_batch_plan.schema.json`、`shot_asset_plan.schema.json`。

## 前置状态 / 通过条件

任务包已导出后才能进入处理；只有输出实际存在时达到 `codex_output_ready`。读取本身不生成状态或补文件。

## ID 绑定要求

先从批次计划取得允许的 `video_id`，再读取 `outputs/{product_series_id}/{batch_id}/`；路径归属和防越界由未来 `validators` 校验。

## 禁止行为

只能读取已规划输出，不读取未规划的 `video_04/05`；不得访问越界路径、伪造或修复缺失文件、写入 outputs 或推断不存在的输出。

## 后续实现边界

未来只实现本地只读索引，不实现前端展示或监控服务。B/C 与第 19 章的展示/验收关系是设计未裁决约束。
