# Codex 任务包

> 本文档来源于 `00_design.md`，仅用于阅读，不是权威源；如与 `00_design.md` 冲突，以 `00_design.md` 为准。
>
> 来源章节：第 4—9、12—19、23、24 章，核心来源为第 17 章。

本文档只收敛任务包的输入、绑定、模板、命名和衔接方式。任务包是提供给 Codex 的执行输入，不是新的业务流程或权威源。

## 导出前置条件

任务包只能在前序闸门全部完成后导出：目标型号已选择，判断报告已确认，材料与图片资产已检查，创意方向已确认，视频批次与镜头资产已规划。导出前状态必须达到 `shot_assets_planned`；成功导出后才进入 `task_package_exported`。

任务包只能来自当前目标型号：

- `variant_id` 必须等于当前 `selected_variant_id`。
- 参数、图片、配件、卖点、限制和前序结论只能来自该目标型号。
- 不得混入其他型号的参数、图片或配件，也不得混入其他商品资料。
- `product_series_id + variant_id + batch_id` 必须在任务包、视频批次、镜头计划及全部前序对象中一致。
- 跨文件、跨对象及路径一致性由后续 `validators` 校验；本任务不实现该校验。

## 导出输入文件与关系

第 17 章列出的输入文件为：

```text
data/products/p_001_product.json
data/reports/p_001_judgement_report.md
data/image_assets/p_001_image_assets.json
data/creative_boards/p_001_creative_board.md
data/video_batches/p_001_batch_001_video_batch_plan.json
data/shot_plans/p_001_batch_001_shot_plan.json
```

这些路径是设计中的文件示例，不代表可以只凭文件名确认归属。未来导出器必须读取同一目标上下文中的商品系列、判断报告、材料检查、图片资产、创意方向、视频批次和镜头计划；其中批次、镜头和任务包的三类 ID 必须一致。材料缺失必须显式传递，不能从其他型号补齐。

## 任务包文件名

```text
data/tasks/{product_series_id}_{variant_id}_{batch_id}_codex_task.md
data/tasks/{product_series_id}_{variant_id}_{batch_id}_codex_task.json
```

Markdown 与 JSON 是同一任务上下文的两种表示，必须绑定相同的三类 ID。

## Markdown 任务包模板

以下模板只组织 `00_design.md` 已定义的信息，不复制或替代完整业务流程。

````markdown
# Codex 任务包：生成商品视频内容资产

## 1. 商品基础信息

- 产品名称：{product_name}
- 商品系列 ID：{product_series_id}
- 本次拍摄型号：{variant_name}
- 型号 ID：{variant_id}
- 批次 ID：{batch_id}
- 目标平台：{target_platform}
- 目标市场：{target_market}
- 平台类目：{platform_category}
- 商品分类：{content_category}

## 2. 判断结论

{judgement_report}

## 3. 视频分型选择

- 批次策略：{default_generation_policy}
- 批次目标：{batch_goal}
- 批次内实际视频：{planned_videos}

{video_type_selection}

## 4. 已有材料

{available_materials}

## 5. 缺失材料处理

{missing_materials}

缺少参数时使用 `[参数名称]` 占位符，并把对应内容写入禁止编造清单。不得编造具体数值、认证、图片、配件或商品事实，也不得使用其他型号材料填补。

## 6. 输出要求

输出根：

```text
outputs/{product_series_id}/{batch_id}/
```

只处理视频批次中实际规划的视频。`video_04/`、`video_05/` 只有在批次规划中存在且通过检查时才允许出现。各视频按第 15、16 章规定的 A/B/C 级资产要求执行。

## 7. 质量要求

- 每条视频必须有明确开头钩子、视频分型和镜头顺序。
- 内容必须结合商品真实使用场景。
- 不得编造商品参数、认证或不存在的材料。
- 不得夸大功效、改变产品外观或生成无法执行的镜头。
- 不得把所有视频写成同一种结构。

## 8. 逐视频字段

- 视频编号
- 视频分型
- 创意风格
- 视频目标
- 开头钩子
- Creative Board
- Script
- Storyboard
- 镜头数量
- 镜头卡
- 镜头级 Seedance Prompt
- 绑定的输入图片
- 镜头服务的卖点
- 剪辑合成方案
- 缺失素材
- 风险提醒
- 可替换变量

Creative Board、完整镜头卡与镜头级提示词的逐等级适用关系遵守 `00_design.md`；不得由任务包自行改写。

## 9. 逐镜头字段

- shot_id
- duration
- input_images
- reference_videos
- main_subject
- scene
- action
- camera_movement
- lighting
- style
- composition
- product_constraints
- subtitle_text
- negative_prompt
- output_goal

## 10. 禁止事项

{do_not_invent}

- 不得混入其他型号或其他商品的参数、图片和配件。
- 不得生成批次中未规划的视频。
- 不得使用未经授权的品牌、明星、影视角色或明显版权元素。
- 不得调用或假定已经调用任何外部模型或平台 API。

## 11. 验收要求

- 输出路径与 `product_series_id + batch_id` 一致。
- 输出视频集合与 `video_batch_plan` 一致。
- 视频和镜头内容与目标 `variant_id` 一致。
- 缺失材料和风险已显式保留，未被编造内容替代。
- 输出内容按 `00_design.md` 第 19 章验收；已知等级适用关系未裁决时不得自行扩大或缩小要求。
````

## JSON 顶层字段

JSON 任务包必须与 `backend/schemas/codex_task_package.schema.json` 保持一致，顶层只包含以下字段：

| 字段 | 关系说明 |
|---|---|
| `product_series_id` | 当前商品系列 |
| `variant_id` | 当前目标型号，必须等于 `selected_variant_id` |
| `batch_id` | 当前视频批次 |
| `judgement_report` | 已确认的目标型号判断报告 |
| `material_check` | 已通过闸门的材料检查结果 |
| `image_assets` | 仅属于目标型号的图片资产 |
| `creative_direction` | 已确认的创意方向 |
| `video_batch_plan` | 同三类 ID 的视频批次计划 |
| `shot_asset_plan` | 同三类 ID 的镜头资产计划 |
| `available_materials` | 已有材料清单 |
| `missing_materials` | 显式缺失材料清单 |
| `do_not_invent` | 禁止编造清单 |
| `output_root` | `outputs/{product_series_id}/{batch_id}/` |

本阅读版不增加 Schema 外的 JSON 字段语义，也不提供真实任务包实例。

## 缺失参数占位规则

- 已确认缺失的参数使用 `[参数名称]` 表示，例如第 17、19 章中的 `[吸力参数]`。
- 占位符必须与 `missing_materials` 和 `do_not_invent` 对应。
- 占位符只表示缺失，不表示默认值、推测值或待自动补全值。
- 不得从其他型号、竞品或运营猜测中补齐。

## 输出目录约定

任务包只声明输出根：

```text
outputs/{product_series_id}/{batch_id}/
```

具体视频目录只能来自已确认的 `video_batch_plan`。本任务不创建输出根、视频目录或任何内容资产。

## VSCode / Codex 衔接

系统只负责未来生成任务包、保存到 `data/tasks/` 并由输出读取环节读取结果。用户在 VSCode 中明确选择任务包，让 Codex 读取该文件并按其中声明的输出根生成内容；前端、后端占位脚本和 VSCode task 都不直接控制 Codex。

当前 `export-codex-task` 入口只运行安全占位脚本，不聚合、不校验、不导出、不写文件，也不调用 Codex 或视频模型。

## 未裁决约束

第 15、16 章的 B/C 级精简输出与第 19 章“每条视频必须包含”完整资产要求的适用关系尚未裁决。模板仅保留两侧要求，不擅自决定 B/C 级的增删范围。
