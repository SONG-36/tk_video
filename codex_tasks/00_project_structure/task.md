# 任务 00：项目结构检查与补齐

## 唯一权威源

根目录 `00_design.md` 是本项目唯一权威源。`docs/`、`rules/`、`backend/schemas/` 和本任务文件均为从属材料，不能成为新的权威源。

如果本任务与 `00_design.md` 冲突，立即停止执行，不得自行选择或折中业务规则；只把冲突事实、位置和影响记录到 `docs/99_design_issues.md`，等待人工处理。

## 任务目标

只检查并补齐项目级目录、职责 README、数据目录占位文件、辅助脚本占位和 VSCode 任务入口。不得写业务逻辑，不得修改业务流程、状态机、规则或数据结构含义。

## 执行前必须读取的文件

1. 完整读取 `00_design.md`，重点读取第 1—9、17、18、22—24 章。
2. 读取根目录 `README.md` 和 `.gitignore`。
3. 读取现有顶层目录 README、`scripts/*.py`、`.vscode/tasks.json`。
4. 读取 `docs/99_design_issues.md`，确认已有问题不会被擅自修复。
5. 列出当前目录和文件，先判断缺项，不得无条件覆盖已有内容。

## 允许修改的目录和文件

- 根目录：`README.md`、`.gitignore`。
- 顶层职责文件：`docs/README.md`、`frontend/README.md`、`backend/README.md`、`rules/README.md`、`data/README.md`、`outputs/README.md`、`codex_tasks/README.md`、`scripts/README.md`、`.vscode/README.md`。
- 父目录职责文件：`frontend/pages/README.md`、`frontend/components/README.md`、`frontend/types/README.md`、`backend/app/README.md`、`backend/schemas/README.md`、`backend/tests/README.md`、`docs/rules/README.md`、`docs/examples/README.md`。
- 数据占位：`data/products/.gitkeep`、`data/variants/.gitkeep`、`data/reports/.gitkeep`、`data/image_assets/.gitkeep`、`data/creative_boards/.gitkeep`、`data/video_batches/.gitkeep`、`data/shot_plans/.gitkeep`、`data/tasks/.gitkeep`、`outputs/.gitkeep`。
- 脚本占位：`scripts/validate_structure.py`、`scripts/validate_design_sync.py`、`scripts/export_codex_task.py`、`scripts/read_outputs.py`。
- VSCode：`.vscode/tasks.json`。
- 冲突记录例外：仅在发现真实冲突时追加 `docs/99_design_issues.md`。

允许创建缺失目录，但不能创建新的业务模块、页面、任务目录或第二套设计目录。

`docs/` 下允许创建和检查的正式路径只使用 `docs/rules/`、`docs/examples/` 与 `docs/99_design_issues.md`，不得使用旧编号路径。

## 禁止修改的目录和文件

- 禁止修改、移动、重命名或删除 `00_design.md`。
- 禁止修改 `docs/` 的业务正文、`rules/*.json`、`backend/schemas/*.json`。
- 禁止修改 `frontend/pages/*/README.md` 和 `backend/app/*/README.md` 的业务内容；它们由后续任务负责。
- 禁止修改任何现有 `codex_tasks/*/task.md`、`check.md`。
- 禁止创建 `docs/04_rules/`、`docs/07_examples/` 或 `docs/99_summary.md`；这些旧路径不作为兼容入口保留。
- 禁止创建前后端源码、数据库文件、API、登录、外部模型调用或真实输出。
- 禁止在 `data/` 写样例业务数据，在 `outputs/` 写生成资产。

## 具体要创建或修改的文件清单

以下清单同时规定每个文件应该写入什么内容：

1. 上述 README：说明“负责什么、不负责什么、未来如何扩展”，并声明服从 `00_design.md`。
2. `.gitkeep`：只用于保留空目录，不写任何内容。
3. 四个脚本：仅保留模块说明、未来职责、空 `main()` 或明确的“尚未实现”提示；不得包含规则判断、文件导出或输出解析逻辑。
4. `.vscode/tasks.json`：只配置 `validate-structure`、`validate-design-sync`、`export-codex-task`、`read-outputs` 四个入口，分别指向对应占位脚本。
5. `.gitignore`：忽略缓存、依赖、本地环境、运行数据和生成输出，同时保留 README、`.gitkeep` 和 `.vscode/tasks.json`。
6. 根 README：写明项目定位、唯一权威源、目录职责、完整业务链路、开发顺序、Codex 使用方式和禁止事项；不得增加新业务流程。

## 必须遵守的 00_design.md 章节

- 第 1—3 章：权威源、项目定位和职责边界。
- 第 4—9 章：目录说明不得改变完整流程、型号边界、页面和状态闸门。
- 第 17 章：本地结构、任务包、输出与 VSCode 衔接。
- 第 18 章：数据目录必须保留系列、型号、批次和镜头的归属边界。
- 第 22—24 章：docs、Codex 分步任务和系统总结。

## 不能发明的新规则

不得新增页面、状态、字段、业务对象、流程步骤、生成等级、目录含义或 ID 规则；不得引入数据库、API、登录权限、Seedance / 即梦调用、OCR、VLM 或 TikTok 自动抓取。

## 完成后的输出说明

只输出：补齐的目录、README、`.gitkeep`、脚本占位和 VSCode 配置清单；未补齐项及原因；发现的冲突记录。不得声称业务功能已经实现。
