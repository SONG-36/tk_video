# 任务 06 人工验收

## 人工验收清单

- [ ] 执行前完整读取了 `00_design.md`。
- [ ] Markdown/JSON 模板说明完整，且只来自第 17—19 章。
- [ ] 任务包输入、输出、命名和三类 ID 关系明确。
- [ ] 脚本运行只提示未实现，不创建或修改业务文件。

## 文件是否存在

- [ ] `docs/06_codex_task_package.md` 含 Markdown 模板和 JSON 字段说明。
- [ ] `data/tasks/README.md` 存在并说明实例命名与职责。
- [ ] `backend/app/task_package_generator/README.md` 和导出页面 README 存在。
- [ ] `scripts/export_codex_task.py` 占位存在。
- [ ] `.vscode/tasks.json` 有且只有一个 `export-codex-task` 入口。
- [ ] `outputs/README.md` 保留输出路径说明，目录内无真实资产。

## 内容是否符合 00_design.md

- [ ] 任务包必须绑定 `product_series_id + variant_id + batch_id`。
- [ ] 输入只来自已确认的目标型号及其报告、材料、图片、创意、批次和镜头计划。
- [ ] 文件名与 `data/tasks/{product_series_id}_{variant_id}_{batch_id}_codex_task.*` 一致。
- [ ] 输出根严格为 `outputs/{product_series_id}/{batch_id}/`。
- [ ] `video_04/05` 只在批次规划存在并通过时出现。
- [ ] 缺失参数使用占位符且写明禁止编造。

## 是否存在越权修改

- [ ] `git diff` 只包含允许的说明、README、占位脚本和单个 VSCode 入口。
- [ ] 未修改 rules、Schema、其他模块/页面/脚本、任务或 `00_design.md`。
- [ ] 未生成真实任务包、data 实例或 outputs 内容。
- [ ] 未实现数据库、API、登录、Codex 控制或模型调用。

## 是否存在业务规则被改写

- [ ] 模板没有新增、删减或重解释业务字段和质量要求。
- [ ] 没有改变批次数量、生成等级、输出层级或型号绑定。
- [ ] 没有把模板、docs、rules 或 Schema 当成权威源。
- [ ] 冲突已记录，没有自行选择旧文件名或旧目录规则。

## 是否可以进入下一任务的判断标准

只有模板和关系说明完整、脚本确为无副作用占位、三类 ID 与输出路径准确、允许范围外零改动时，才可以进入任务 07。
