# 任务 00 人工验收

## 人工验收清单

- [ ] 执行记录表明已先完整读取 `00_design.md`。
- [ ] 只补齐目录、职责说明、占位文件和任务入口，没有业务实现。
- [ ] 根 README 明确 `00_design.md` 是唯一权威源。
- [ ] `docs/`、`rules/`、Schema 和任务文件没有被描述为新权威源。

## 文件是否存在

- [ ] 九个顶层目录及其 README 存在。
- [ ] `frontend/pages`、`frontend/components`、`frontend/types`、`backend/app`、`backend/schemas`、`backend/tests`、`docs/rules`、`docs/examples` 的职责 README 存在。
- [ ] `docs/rules/` 存在。
- [ ] `docs/examples/` 存在。
- [ ] `docs/99_design_issues.md` 存在。
- [ ] 不存在 `docs/04_rules/`。
- [ ] 不存在 `docs/07_examples/`。
- [ ] 不存在 `docs/99_summary.md`。
- [ ] 八个 `data/` 子目录及 `outputs/` 均有 `.gitkeep`。
- [ ] 四个 `scripts/*.py` 占位文件存在。
- [ ] `.vscode/tasks.json` 存在且只有规定的四个任务入口。
- [ ] `00_design.md` 仍位于根目录且内容无差异。

## 内容是否符合 00_design.md

- [ ] 目录职责与第 1—3、17、18、22—24 章一致。
- [ ] `00_design.md` 不再把 `docs/04_rules/`、`docs/07_examples/` 或 `docs/99_summary.md` 作为当前结构或兼容入口。
- [ ] README 中的业务链路与第 4 章顺序一致。
- [ ] `data/` 与 `outputs/` 的职责和路径未被改写。
- [ ] 脚本明确为占位，没有暗示已完成业务能力。

## 是否存在越权修改

- [ ] 未修改 docs 业务正文、规则 JSON、Schema、页面 README、模块 README 或其他任务文件。
- [ ] 未创建业务源码、依赖配置、数据库、API、登录、模型调用或真实数据。
- [ ] 未删除、移动或重命名任何现有任务目录。
- [ ] `git diff` 中除允许文件外没有其他变化。

## 是否存在业务规则被改写

- [ ] 没有新增或删减页面、状态、流程步骤、业务对象或 ID 绑定。
- [ ] 没有使用“简化流程”替代完整设计。
- [ ] 发现冲突时仅记录到 `docs/99_design_issues.md`，没有自行修正规则。

## 是否可以进入下一任务的判断标准

只有全部检查项通过、允许范围外无改动、`00_design.md` 无变化，且所有真实冲突已经记录后，才可以进入任务 01；任一项失败则停止并先修正本任务产物。
