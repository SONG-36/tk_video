# 任务 01：docs 阅读版拆分

## 唯一权威源

根目录 `00_design.md` 是唯一权威源。`docs/` 只能是阅读版，不能替代、覆盖或扩展权威源。若本任务、现有 docs 或其他从属文件与 `00_design.md` 冲突，必须停止，将问题记录到 `docs/99_design_issues.md`，不得自行改业务规则。

## 任务目标

按指定主题把 `00_design.md` 忠实拆分为可阅读文档，保留完整业务范围、流程顺序、规则含义和数据归属。不写实现代码，不产生第二套总设计。

## 执行前必须读取的文件

1. 完整读取 `00_design.md` 第 1—24 章。
2. 读取 `docs/README.md`、现有 `docs/*.md`、`docs/rules/*.md`、`docs/examples/*.md`。
3. 读取 `docs/99_design_issues.md`，避免把已知冲突静默修入阅读版。
4. 读取根 README 中的权威源声明；不得以 README 反向覆盖总设计。

## 允许修改的目录和文件

- `docs/README.md`
- `docs/00_overview.md`
- `docs/01_product_flow.md`
- `docs/02_variant_sku_flow.md`
- `docs/03_page_design.md`
- `docs/04_state_machine.md`
- `docs/05_data_structures.md`
- `docs/06_codex_task_package.md`
- `docs/07_output_spec.md`
- `docs/08_quality_control.md`
- `docs/09_development_plan.md`
- `docs/99_design_issues.md`
- `docs/rules/README.md` 及 `01_product_classification_rules.md` 至 `08_shot_planning_rules.md`
- `docs/examples/README.md`、`01_car_vacuum_example.md`、`02_cordless_hair_straightening_brush_example.md`

## 禁止修改的目录和文件

- 禁止修改 `00_design.md`、根 README、`codex_tasks/`、`rules/`、`frontend/`、`backend/`、`data/`、`outputs/`、`scripts/`、`.vscode/`。
- 禁止创建新的总设计、主设计、产品方案或与上述清单并行的 docs 体系。
- 禁止写业务代码、UI、后端逻辑、Schema 或机器规则。

## 具体要创建或修改的文件清单

以下清单同时规定每个文件应该写入什么内容：

每个阅读版开头必须写：本文档来源于 `00_design.md`，仅用于阅读，不是权威源；并标注来源章节。

1. `00_overview.md`：第 1、2、3、5、24 章的文档定位、项目定位、原则、复杂度边界和总结。
2. `01_product_flow.md`：第 4、9 章完整流程、主流程说明和逐步进入条件。
3. `02_variant_sku_flow.md`：第 5、6 章系列/型号/SKU、差异判断、目标型号、Revision 预留。
4. `03_page_design.md`：第 7 章全部 15 个页面，保留目标、字段、动作、输出和通过条件。
5. `04_state_machine.md`：第 8、9 章全部状态、推进闸门和切换 `selected_variant_id` 的失效规则。
6. `05_data_structures.md`：第 18 章所有当前对象和历史兼容对象，明确数据归属与三类 ID 绑定。
7. `06_codex_task_package.md`：第 17 章绑定、导出文件、Markdown 模板、输出目录和 VSCode/Codex 衔接。
8. `07_output_spec.md`：第 17、19 章输出目录、逐视频资产、逐镜头字段和读取限制。
9. `08_quality_control.md`：第 19 章系统禁止、Codex 禁止和验收标准。
10. `09_development_plan.md`：完整范围的阶段 0—9，只安排施工顺序，不删减功能或发明业务。
11. `docs/rules/*.md`：分别忠实拆分第 10—16 章；批次和镜头规则分开。
12. `docs/examples/*.md`：分别拆分第 20、21 章，不把案例值提升为通用规则。
13. `99_design_issues.md`：只记录重复、冲突、命名不一致、旧残留、无效路径及流程/数据不一致，不给出未经确认的新规则。

## 必须遵守的 00_design.md 章节

必须遵守第 1、3、22、23 章的权威与同步规则，并按上述来源完整使用第 4—21、24 章。不得把第 22 章旧路径与本项目当前指定路径之间的差异静默改写为业务变化。

## 不能发明的新规则

不得新增页面、状态、字段、分类、分型、评分、通过条件、素材门槛、生成等级、镜头字段或输出文件；不得把重复内容擅自合并成含义变化；不得把历史兼容对象当新主结构。

## 完成后的输出说明

输出修改的 docs 文件、各自来源章节、记录的设计问题和未能拆分的原因。明确声明 docs 仍是阅读版，未修改 `00_design.md`，未实现任何业务功能。
