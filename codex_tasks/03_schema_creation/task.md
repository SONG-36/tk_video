# 任务 03：JSON Schema 骨架建立

## 唯一权威源

根目录 `00_design.md` 是唯一权威源。Schema 只是数据校验投影，不得成为新权威源，不得用 Schema 反向重写流程或字段含义。发现本任务、既有 Schema、docs 或 rules 与 `00_design.md` 冲突时，立即停止并记录到 `docs/99_design_issues.md`。

## 任务目标

根据第 18 章建立或补全 10 个 JSON Schema 骨架，说明对象、必填字段、归属和绑定。重点保护 `selected_variant_id` 与 `variant_id` 的关系，以及 `product_series_id + variant_id + batch_id` 在批次、镜头和任务包中的一致性。不实现校验服务或后端逻辑。

## 执行前必须读取的文件

1. 完整读取 `00_design.md`，重点读取第 5—9、12—19、23、24 章。
2. 读取 `backend/schemas/README.md` 和全部现有 `*.schema.json`。
3. 读取 `rules/` 相关 JSON 仅用于枚举定位；冲突时以总设计为准。
4. 读取 `docs/05_data_structures.md`、`docs/99_design_issues.md` 仅作导航和问题记录。

## 允许修改的目录和文件

- `backend/schemas/README.md`
- `backend/schemas/product_series.schema.json`
- `backend/schemas/variant.schema.json`
- `backend/schemas/product_profile.schema.json`
- `backend/schemas/judgement_report.schema.json`
- `backend/schemas/material_check.schema.json`
- `backend/schemas/image_asset.schema.json`
- `backend/schemas/creative_direction.schema.json`
- `backend/schemas/video_batch_plan.schema.json`
- `backend/schemas/shot_asset_plan.schema.json`
- `backend/schemas/codex_task_package.schema.json`
- 冲突记录例外：`docs/99_design_issues.md`

## 禁止修改的目录和文件

- 禁止修改 `00_design.md`、其他 docs、`rules/`、`backend/app/`、`backend/tests/`、`frontend/`、`data/`、`outputs/`、`scripts/`、`.vscode/` 和其他任务文件。
- 禁止实现 Python/TypeScript 校验器、数据库模型、API 或迁移脚本。
- 禁止为了让示例通过而放宽权威源中的绑定和必填要求。

## 具体要创建或修改的文件清单

以下清单同时规定每个文件应该写入什么内容：

所有文件使用统一 JSON Schema draft，必须有 `$schema`、`$id`、`title`、`description`、对象类型、`required`、`properties` 和明确的扩展策略。

1. `product_series.schema.json`：系列 ID、名称、类目、市场、至少一个型号、差异报告、`selected_variant_id`；描述其必须引用 `variants[].variant_id`。
2. `variant.schema.json`：型号 ID、SKU、名称、属性、图片资产、`optional_revision`；Revision 默认可为 `null`。
3. `product_profile.schema.json`：系列/型号归属及第 18 章画像字段、至少一个卖点。
4. `judgement_report.schema.json`：型号绑定、分类、分型、打法、风险、缺失信息和用户确认。
5. `material_check.schema.json`：型号绑定、三种材料等级、缺失项、禁止编造和是否继续。
6. `image_asset.schema.json`：系列/型号归属、资产 ID、类型、视角、用途、质量、必需性和备注。
7. `creative_direction.schema.json`：型号绑定、风格、剧情、强度、真人策略、自由想法、系统翻译和确认。
8. `video_batch_plan.schema.json`：三类 ID、3—5 条视频、批次目标、生成策略及逐视频字段。
9. `shot_asset_plan.schema.json`：三类 ID、逐视频画板/故事板路径、逐镜头字段；三类 ID 必须与批次一致。
10. `codex_task_package.schema.json`：三类 ID、前序报告/计划/材料、禁止编造和输出根路径。

JSON Schema 无法原生表达的跨文件或跨数组关系，必须在 `description` 中明确标注“由后续 validators 校验”，不得假装已自动保证。

## 必须遵守的 00_design.md 章节

- 第 5、6 章：系列、型号、批次、镜头和 Revision 边界。
- 第 7—9 章：页面输出、状态和目标型号失效规则。
- 第 12—17 章：材料、图片、创意、批次、镜头和任务包字段。
- 第 18 章：主数据结构和数据归属硬规则。
- 第 19 章：质量和禁止编造约束。

## 不能发明的新规则

不得新增业务对象、状态、字段语义、ID 类型、数量门槛或枚举；不得把历史 `product_id` 兼容对象升级为主结构；不得强制启用 Revision；不得用 Schema 默认值绕过人工确认或流程闸门。

## 完成后的输出说明

输出修改的 Schema 清单、每个对象的必填字段、三类 ID 绑定说明、JSON/Schema 语法检查结果及需要后续 validators 处理的跨对象约束。不得声称后端校验已经实现。
