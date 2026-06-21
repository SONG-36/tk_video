# 任务 06：Codex 任务包导出模板与脚本骨架

## 唯一权威源

根目录 `00_design.md` 是唯一权威源。任务包模板、docs、rules、Schema 和脚本均为从属产物，不能成为新权威源。若本任务、模板或现有说明与 `00_design.md` 冲突，必须停止并记录到 `docs/99_design_issues.md`，不得自行修改流程、字段或输出规则。

## 任务目标

定义 Codex 任务包的 Markdown/JSON 模板、输入文件关系、三类 ID 绑定、输出目录约定和占位脚本接口。不实现完整聚合、校验或导出逻辑，不直接调用 Codex 或任何视频模型。

## 执行前必须读取的文件

1. 完整读取 `00_design.md`，重点读取第 4—9、12—19、23、24 章。
2. 读取 `docs/06_codex_task_package.md`、`docs/07_output_spec.md`、`docs/08_quality_control.md`。
3. 读取 `backend/schemas/codex_task_package.schema.json`、`video_batch_plan.schema.json`、`shot_asset_plan.schema.json`。
4. 读取 `backend/app/task_package_generator/README.md`、`frontend/pages/task_package_export/README.md`。
5. 读取 `data/README.md`、`outputs/README.md`、`scripts/export_codex_task.py`、`.vscode/tasks.json`。
6. 读取 `docs/99_design_issues.md`，特别核对旧文件名和旧 VSCode 示例。

## 允许修改的目录和文件

- `docs/06_codex_task_package.md`
- `docs/07_output_spec.md` 中与任务包输出路径直接相关的说明
- `backend/app/task_package_generator/README.md`
- `frontend/pages/task_package_export/README.md`
- `data/tasks/README.md`
- `outputs/README.md`
- `scripts/export_codex_task.py`
- `.vscode/tasks.json` 中 `export-codex-task` 入口
- 冲突记录例外：`docs/99_design_issues.md`

## 禁止修改的目录和文件

- 禁止修改 `00_design.md`、其他 docs、rules、Schema、其他后端模块、其他前端页面、tests、实际 data 文件、实际 outputs 文件、其他脚本和其他任务文件。
- 禁止生成真实商品任务包，禁止创建 `outputs/{id}/{batch}/` 示例资产。
- 禁止实现完整导出、文件写入、业务校验、模板渲染、API、数据库、登录或外部模型调用。

## 具体要创建或修改的文件清单

以下清单同时规定每个文件应该写入什么内容：

1. `docs/06_codex_task_package.md`：保留第 17 章的型号绑定、导出输入文件、通用文件名、完整 Markdown 模板、JSON 顶层字段、缺失参数占位规则、输出目录及 VSCode/Codex 衔接。
2. `docs/07_output_spec.md`：只同步任务包规定的输出根和逐等级资产，不扩展质量规则。
3. `data/tasks/README.md`：说明这里存放导出的 Markdown/JSON 实例，命名为 `{product_series_id}_{variant_id}_{batch_id}_codex_task.*`；禁止放模板权威规则或其他型号数据。
4. `backend/app/task_package_generator/README.md`：明确输入对象、前置状态、三类 ID 一致性、缺失材料处理、输出文件和禁止行为。
5. `frontend/pages/task_package_export/README.md`：明确页面只触发文件导出并展示结果，不直接控制 Codex。
6. `scripts/export_codex_task.py`：仅保留未来职责说明、预期命令参数、输入/输出路径说明和未实现的 `main()`；运行不得写文件或生成任务包。
7. `.vscode/tasks.json`：`export-codex-task` 只指向上述占位脚本，不带未定义业务参数。
8. `outputs/README.md`：说明任务包只声明 `outputs/{product_series_id}/{batch_id}/`，本任务不生成内容。

模板必须明确包含商品基础信息、判断结论、视频分型选择、已有材料、缺失材料处理、输出要求、质量要求和逐视频/逐镜头字段；所有数据只来自目标型号。

## 必须遵守的 00_design.md 章节

- 第 4—9 章：只有前序闸门完成后才能导出。
- 第 12—16 章：材料、图片、创意、批次和镜头输入。
- 第 17 章：绑定、文件名、模板、输出目录和 Codex 衔接。
- 第 18 章：`product_series_id + variant_id + batch_id` 数据绑定。
- 第 19 章：禁止编造和输出质量。
- 第 23 章：分步执行与验收。

## 不能发明的新规则

不得新增任务包字段语义、输出文件、视频数量、生成等级、占位符处理、自动修复或重试流程；不得让任务包混入其他型号参数、图片或配件；不得调用 Codex、Seedance / 即梦、OCR、VLM 或任何 API。

## 完成后的输出说明

输出模板章节清单、允许的输入文件、任务包命名、三类 ID 校验说明、脚本占位接口和未实现项。明确说明没有生成真实任务包、没有写入 outputs、没有实现导出逻辑。
