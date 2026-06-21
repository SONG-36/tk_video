# output_reader

## 模块职责

未来按照已确认的视频批次计划，在指定商品系列和批次根内只读汇总 Codex 输出，并向前端返回白名单内的文件索引、可读内容摘要、缺失项、风险项和错误信息。

本文件只定义读取契约。本任务不读取或遍历真实 `outputs/`，不实现路径校验、文件索引、缺失判断、内容解析或文件写入。

## 输入

- `product_series_id`。
- `variant_id`，用于验证输出上下文属于当前 `selected_variant_id`；它不改变第 17 章的目录层级。
- `batch_id`。
- 已确认的 `video_batch_plan`。
- 未来文件系统中的 `outputs/{product_series_id}/{batch_id}/` 批次根。

## 输出

未来只在内存或调用边界返回：

- 白名单范围内的文件索引。
- 可读内容摘要。
- 缺失项。
- 风险项和既有质量字段。
- 路径、归属或读取错误信息。

本任务不创建 `output_index.json`、`missing_files.json`、`viewer_payload.json` 或其他结果文件，也不生成真实输出。

## 依赖规则

`rules/video_batch_rules.json`、`rules/shot_planning_rules.json`。规则文件是机器可读投影，不能覆盖 `00_design.md`。

## 依赖 Schema

`backend/schemas/codex_task_package.schema.json`、`backend/schemas/video_batch_plan.schema.json`、`backend/schemas/shot_asset_plan.schema.json`。

## 前置状态 / 通过条件

任务包已导出后才能进入输出处理。只有实际结果可以按设计读取时才达到 `codex_output_ready`；读取动作本身不生成新状态、不改变质量结论，也不补文件。

## 读取顺序

未来实现必须依次：

1. 校验 `product_series_id`。
2. 校验 `batch_id`，并结合 `variant_id` 确认系列、目标型号和批次归属。
3. 确认唯一批次根 `outputs/{product_series_id}/{batch_id}/`。
4. 读取已确认的 `video_batch_plan`。
5. 从计划得到允许的 `video_id` 白名单。
6. 只读取白名单内的视频目录。
7. 汇总文件索引、可读摘要、缺失项、风险项和错误。
8. 将结果返回前端展示。

当前任务不实现上述步骤。

## 路径边界

- 所有候选文件必须限制在指定批次根内，并使用相对批次根的路径展示。
- 不接受绝对路径作为业务输入，不允许 `../` 越界。
- 不读取批次根外文件，不跟随可能逃逸批次根的危险软链接。
- 不通过目录存在、目录数量或文件存在反推读取范围。
- `video_04/05` 或其他目录只有位于已确认批次计划白名单内时才允许读取。

## ID 绑定要求

- `variant_id` 必须等于当前 `selected_variant_id`。
- `product_series_id + variant_id + batch_id` 必须与任务包、视频批次和镜头计划一致。
- 路径边界及跨对象一致性未来由 `validators` 校验；本 README 不表示校验已实现。

## 只读行为与禁止事项

- 不写入、修复、重命名或删除 `outputs/` 内容。
- 不创建缺失文件、目录、索引文件或 viewer payload。
- 不自动复制其他系列、型号或批次文件。
- 不修改质量结论，不自动修复质量问题。
- 不解析或生成视频二进制。
- 不调用 Codex、Seedance、即梦、OCR、VLM、API 或其他模型。
- 不创建数据库、API、UI、监控服务或后台任务。

## 后续实现边界

未来只实现受批次白名单和路径边界约束的本地只读读取。实现前必须继续保留 B/C 级资产与第 19 章完整资产要求的未裁决约束，不得由读取器决定缺失是否合规。
