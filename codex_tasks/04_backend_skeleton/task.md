# 任务 04：后端模块职责骨架

## 唯一权威源

根目录 `00_design.md` 是唯一权威源。后端 README 只描述如何承接设计，不是业务规则源；`docs/`、`rules/` 和 Schema 也不能替代总设计。发现冲突时必须停止，并把冲突位置、涉及模块和影响记录到 `docs/99_design_issues.md`，不得擅自修改业务流程。

## 任务目标

只建立或补全 `backend/app/` 各模块 README，明确输入、输出、依赖规则、状态/绑定约束和禁止行为。不创建模块源码，不实现复杂逻辑，不接入任何服务。

## 执行前必须读取的文件

1. 完整读取 `00_design.md`，重点读取第 2—19、23、24 章。
2. 读取 `backend/README.md`、`backend/app/README.md` 和现有模块 README。
3. 读取 `rules/README.md` 及规则 JSON，只确认依赖文件名。
4. 读取 `backend/schemas/README.md` 和 Schema，只确认数据契约。
5. 读取 `docs/99_design_issues.md`，不把已知缺口自行补成规则。

## 允许修改的目录和文件

- `backend/README.md`
- `backend/app/README.md`
- 下列模块目录中的 `README.md`：`category_detector`、`variant_manager`、`variant_difference_checker`、`product_classifier`、`video_type_classifier`、`playbook_generator`、`material_checker`、`image_asset_checker`、`creative_translator`、`video_batch_planner`、`shot_asset_planner`、`report_generator`、`task_package_generator`、`output_reader`、`validators`。
- 冲突记录例外：`docs/99_design_issues.md`。

## 禁止修改的目录和文件

- 禁止修改 `00_design.md`、其他 docs、rules、Schema、tests、frontend、data、outputs、scripts、VSCode 配置和其他任务文件。
- 禁止创建 `.py`、`.ts`、依赖文件、数据库模型、API 路由、登录、队列、外部模型客户端或测试实现。
- 禁止把后端描述成大模型服务或让它绕过人工确认和流程闸门。

## 具体要创建或修改的文件清单

以下清单同时规定每个文件应该写入什么内容：

每个模块 README 必须包含：模块职责、输入、输出、依赖规则、依赖 Schema、前置状态/通过条件、ID 绑定、禁止行为、后续实现边界。

1. `category_detector`：候选类目、置信度、理由和风险；必须人工确认。
2. `variant_manager`：系列、型号/SKU、单型号默认对象、目标型号和可选 Revision。
3. `variant_difference_checker`：全部差异维度、共享/隔离结论。
4. `product_classifier`：对当前型号执行三类商品分类。
5. `video_type_classifier`：五类分型评分、画像修正和材料限制；不决定生成数量。
6. `playbook_generator`：按已确认类目读取类目打法，不创造新打法。
7. `material_checker`：必须/建议/风险材料、缺失项和禁止编造。
8. `image_asset_checker`：类型、完整度、缺图、失真风险和生成能力限制。
9. `creative_translator`：用户创意到专业镜头要求，服从创意优先级。
10. `video_batch_planner`：唯一型号的 3—5 条视频和 A/B/C 策略。
11. `shot_asset_planner`：逐视频和逐镜头资产规划。
12. `report_generator`：整合类目、分类、分型、打法、风险和缺失信息。
13. `task_package_generator`：聚合前序数据并保持三类 ID，一律不直接调用 Codex。
14. `output_reader`：按规划读取输出，不读取未规划视频。
15. `validators`：状态闸门、Schema、跨对象和目标型号切换失效校验的未来职责。

## 必须遵守的 00_design.md 章节

- 第 2、3 章：后端是规则判断器和文件生成器，不是大模型服务。
- 第 4—9 章：完整顺序、型号边界、页面输出和状态闸门。
- 第 10—16 章：各判断/检查/规划模块的规则来源。
- 第 17—19 章：任务包、数据绑定、输出读取和质量控制。

## 不能发明的新规则

不得新增模块职责对应的业务步骤、分类算法、分型评分、材料/图片门槛、批次策略、镜头字段、状态或错误恢复流程；不得引入数据库、API、登录、Seedance / 即梦、OCR、VLM 或 TikTok 抓取。

## 完成后的输出说明

输出修改的模块 README 清单、每个模块的输入输出摘要、依赖规则/Schema 映射和发现的设计冲突。明确说明没有创建后端源码、没有实现服务。
