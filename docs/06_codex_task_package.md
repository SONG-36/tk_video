# Codex 任务包

> 本文档来源于 `00_design.md`，仅用于阅读，不是权威源；如与 `00_design.md` 冲突，以 `00_design.md` 为准。
>
> 来源章节：第 17 章。

## 型号绑定要求

每个任务包唯一绑定 `product_series_id`、`variant_id`、`batch_id`。参数、图片、配件、卖点和限制只能来自目标型号。

## 导出文件

任务包聚合以下对应数据：

```text
data/products/p_001_product.json
data/reports/p_001_judgement_report.md
data/image_assets/p_001_image_assets.json
data/creative_boards/p_001_creative_board.md
data/video_batches/p_001_batch_001_video_batch_plan.json
data/shot_plans/p_001_batch_001_shot_plan.json
```

通用任务文件输出为：

```text
data/tasks/{product_series_id}_{variant_id}_{batch_id}_codex_task.md
data/tasks/{product_series_id}_{variant_id}_{batch_id}_codex_task.json
```

## Markdown 模板结构

任务包依次包含商品基础信息、判断报告结论、批次和视频分型、已有材料、缺失材料处理、输出文件要求、质量要求和输出内容要求。缺少参数时使用如 `[吸力参数]` 的占位符，不得编造。

````markdown
# Codex 任务包：生成商品视频内容资产

## 1. 商品基础信息

- 产品名称：{product_name}
- 商品系列 ID：{product_series_id}
- 本次拍摄型号：{variant_name}
- 型号 ID：{variant_id}
- 目标平台：{target_platform}
- 目标市场：{target_market}
- 平台类目：{platform_category}
- 商品分类：{content_category}

## 2. 判断报告结论

{judgement_summary}

## 3. 视频分型选择

- 本次批次：{batch_id}
- 目标型号 ID：{variant_id}
- 批次策略：{generation_policy}
- 逐视频配置：{videos}

## 4. 已有材料

{available_materials}

## 5. 缺失材料处理规则

{missing_materials}

缺少参数时使用 `[参数名称]` 占位符，不得编造具体数值或认证。

## 6. 输出文件要求

```text
outputs/{product_series_id}/{batch_id}/
```

只生成批次规划中实际存在的视频目录，并按 A/B/C 级输出对应资产。

## 7. 质量要求

每条视频有明确钩子、视频分型、镜头顺序和真实使用场景；不得编造、夸大、改变产品外观或生成无法执行的镜头。

## 8. 输出内容要求

逐视频输出方向、目标、画板、脚本、故事板、镜头资产、图片输入、剪辑、质检、缺失素材、风险和变量；逐镜头输出第 16、19 章规定字段。
````

JSON 任务包使用同一业务内容，并必须在顶层明确携带 `product_series_id`、`variant_id`、`batch_id`。参数、图片、配件和限制只能来自该目标型号。

## 输出目录

```text
outputs/{product_series_id}/{batch_id}/
├── batch_summary.md
├── video_01/
├── video_02/
└── video_03/
```

每个实际视频目录按生成等级包含画板、脚本、故事板、镜头卡、提示词、图片输入计划、剪辑计划和质检清单。只有规划存在并通过检查时才允许 `video_04/`、`video_05/`。

## VSCode / Codex 衔接

系统只生成任务包、保存到项目目录并读取输出。用户在 VSCode 打开项目，让 Codex 读取 `data/tasks/` 的指定任务包并写入对应 `outputs/`；前端不直接控制插件。
