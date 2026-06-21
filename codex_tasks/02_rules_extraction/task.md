# 任务 02：机器可读规则骨架提取

## 唯一权威源

根目录 `00_design.md` 是唯一权威源。`rules/*.json` 只是机器可读投影，不能成为新权威源，也不能反向修改 docs、Schema 或业务实现。若本任务或既有规则文件与 `00_design.md` 冲突，必须停止并把问题记录到 `docs/99_design_issues.md`，不得自行选择规则版本。

## 任务目标

从 `00_design.md` 忠实提取规则 JSON 骨架，使规则可定位、可扩展、可校验。每个规则文件必须包含 `source_section`，本任务不实现规则执行器、不写前后端逻辑。

## 执行前必须读取的文件

1. 完整读取 `00_design.md`，重点读取第 5—16、18、19、22—24 章。
2. 读取现有 `rules/*.json` 和 `rules/README.md`。
3. 只作为导航读取 `docs/rules/*.md`；不得以阅读版覆盖总设计。
4. 读取 `docs/99_design_issues.md`，核对重复标题、重复规则和命名问题。

## 允许修改的目录和文件

- `rules/README.md`
- `rules/platform_category_rules.json`
- `rules/variant_rules.json`
- `rules/variant_difference_rules.json`
- `rules/product_classification_rules.json`
- `rules/video_type_rules.json`
- `rules/category_playbook_rules.json`
- `rules/material_check_rules.json`
- `rules/image_asset_rules.json`
- `rules/creative_translation_rules.json`
- `rules/video_batch_rules.json`
- `rules/shot_planning_rules.json`
- 冲突记录例外：`docs/99_design_issues.md`

## 禁止修改的目录和文件

- 禁止修改 `00_design.md`、其他 docs、`backend/`、`frontend/`、`data/`、`outputs/`、`scripts/`、`.vscode/`、其他 `codex_tasks/` 文件。
- 禁止在前端页面或后端模块中复制规则。
- 禁止创建规则执行代码、数据库表、API 或外部服务配置。

## 具体要创建或修改的文件清单

以下清单同时规定每个文件应该写入什么内容：

所有 JSON 必须语法有效，顶层至少包含 `rule_set`、`source_section`、`status` 和对应规则主体；`source_section` 必须精确到章节或小节。

1. `platform_category_rules.json`：第 7、9 章的候选展示字段、人工确认要求和进入闸门；不得发明平台类目树。
2. `variant_rules.json`：第 5、6、7、18 章的型号字段、至少一个型号、单型号默认对象、目标型号和可选 Revision。
3. `variant_difference_rules.json`：第 6 章全部比较维度及必须隔离内容的条件。
4. `product_classification_rules.json`：第 10 章三种分类的覆盖类目、评分、特征和风险。
5. `video_type_rules.json`：第 11 章五类分型定义、要求、适用商品、一级类目评分表、画像修正和限制规则。
6. `category_playbook_rules.json`：第 11 章六组类目打法的覆盖类目、重点、开头、必须展示和适合分型。
7. `material_check_rules.json`：第 12 章材料分类、必须/建议/风险等级及通过条件。
8. `image_asset_rules.json`：第 13 章资产类型、三组最低要求、完整度等级、镜头绑定和通过条件。
9. `creative_translation_rules.json`：第 14 章用户选项、专业翻译输出、优先级、禁止事项和通过条件。
10. `video_batch_rules.json`：第 15 章批次原则、A/B/C 等级、默认与最大策略、批次目标、逐视频字段和通过条件。
11. `shot_planning_rules.json`：第 16 章四类资产、镜头数量、镜头卡字段、提示词字段和通过条件。

空数组只允许表示“该规则将在后续忠实补全”，不得用空数组掩盖当前章节已有明确枚举；明确规则应在本任务中提取。

## 必须遵守的 00_design.md 章节

- 第 1、3 章：权威源和职责边界。
- 第 5—9 章：型号、页面和状态闸门相关规则。
- 第 10—16 章：规则正文。
- 第 18、19 章：字段归属、ID 绑定与质量限制。
- 第 22—24 章：阅读版从属关系和分步执行。

## 不能发明的新规则

不得新增分类、分型、类目分数、修正分、材料等级、图片数量阈值、创意优先级、批次策略、镜头数量或通过条件；不得推断 `00_design.md` 未定义的平台类目映射；不得把案例特例变成通用规则。

## 完成后的输出说明

输出修改的规则文件、每个文件的 `source_section`、JSON 语法检查结果、仍为骨架的字段和冲突记录。不得声称规则执行功能已经完成。
