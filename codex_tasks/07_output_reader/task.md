# 任务 07：Codex 输出读取说明与脚本骨架

## 唯一权威源

根目录 `00_design.md` 是唯一权威源。输出读取说明、docs、rules、Schema 和脚本都不是新权威源。若本任务、既有输出说明或目录实例与 `00_design.md` 冲突，必须停止并记录到 `docs/99_design_issues.md`，不得自行改变读取路径、展示字段或质量规则。

## 任务目标

定义如何安全读取 `outputs/{product_series_id}/{batch_id}/`，说明批次目录发现、视频白名单、文件索引、缺失文件、质量字段和前端展示契约。只创建说明与无副作用脚本骨架，不实现复杂解析或 UI。

## 执行前必须读取的文件

1. 完整读取 `00_design.md`，重点读取第 4、7—9、15—19、23、24 章。
2. 读取 `docs/07_output_spec.md`、`docs/08_quality_control.md`、`docs/06_codex_task_package.md`。
3. 读取 `backend/app/output_reader/README.md`、`frontend/pages/output_viewer/README.md`。
4. 读取 `backend/schemas/video_batch_plan.schema.json`、`shot_asset_plan.schema.json`、`codex_task_package.schema.json`。
5. 读取 `outputs/README.md`、`scripts/read_outputs.py`、`.vscode/tasks.json`。
6. 读取 `docs/99_design_issues.md`，核对旧输出结构和 04/05 目录残留。

## 允许修改的目录和文件

- `docs/07_output_spec.md`
- `docs/08_quality_control.md` 中与读取验收直接相关的说明
- `backend/app/output_reader/README.md`
- `frontend/pages/output_viewer/README.md`
- `outputs/README.md`
- `scripts/read_outputs.py`
- `.vscode/tasks.json` 中 `read-outputs` 入口
- 冲突记录例外：`docs/99_design_issues.md`

## 禁止修改的目录和文件

- 禁止修改 `00_design.md`、其他 docs、rules、Schema、其他后端模块、其他前端页面、data、真实 outputs、其他脚本和其他任务文件。
- 禁止创建 UI、API、数据库、登录、文件监控服务、模型调用或真实输出资产。
- 禁止让读取器自动补写、修复、重命名或生成缺失文件。

## 具体要创建或修改的文件清单

以下清单同时规定每个文件应该写入什么内容：

1. `docs/07_output_spec.md`：定义输出根、`batch_summary.md`、实际视频目录、A/B/C 对应资产、逐镜头字段和读取规则。
2. `docs/08_quality_control.md`：只同步前端展示所需的禁止行为和验收字段，不新增质量标准。
3. `backend/app/output_reader/README.md`：说明输入为系列 ID、批次 ID、已确认批次计划和文件系统；输出为文件索引、可读内容、缺失项、风险和错误；明确路径边界和只读行为。
4. `frontend/pages/output_viewer/README.md`：说明展示画板、脚本、故事板、镜头卡、提示词、图片计划、剪辑计划、质检和缺失提醒；只定义数据契约，不写 UI。
5. `scripts/read_outputs.py`：仅保留未来职责、预期参数、路径校验顺序和未实现 `main()`；运行不得遍历或修改真实 outputs。
6. `.vscode/tasks.json`：`read-outputs` 只调用占位脚本，不添加未定义参数。
7. `outputs/README.md`：强调只读目标结构和本阶段没有真实输出。

读取顺序必须先从已确认 `video_batch_plan` 得到允许的 `video_id`，再在对应批次根下查找文件。默认只读取实际规划的视频；没有规划时不得因为目录存在而读取 `video_04/05`。所有路径必须拒绝越过指定批次根。

## 必须遵守的 00_design.md 章节

- 第 4、7—9 章：输出页面位置和进入条件。
- 第 15、16 章：批次视频白名单和 A/B/C 资产差异。
- 第 17 章：统一输出目录及逐视频文件。
- 第 18 章：系列、型号、批次归属。
- 第 19 章：展示字段和质量控制。

## 不能发明的新规则

不得新增输出格式、文件名、状态、自动修复、自动重试、目录扫描策略或展示字段；不得推断未规划视频；不得解析或生成视频二进制；不得引入 API、数据库、登录、Seedance / 即梦、OCR、VLM 或前端实现。

## 完成后的输出说明

输出读取契约、路径边界、允许的视频目录、文件索引字段、缺失处理和脚本占位接口。明确说明未读取真实业务内容、未实现复杂解析、未创建 UI、未修改 outputs。
