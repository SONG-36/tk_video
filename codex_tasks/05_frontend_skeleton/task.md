# 任务 05：前端页面职责骨架

## 唯一权威源

根目录 `00_design.md` 是唯一权威源。页面 README 只描述既定页面和闸门，不能成为新权威源；docs、rules 和 Schema 也不能覆盖总设计。若任务说明、现有页面 README 或从属文件与 `00_design.md` 冲突，必须停止并记录到 `docs/99_design_issues.md`，不得擅自调整页面顺序或业务流程。

## 任务目标

只建立或补全 `frontend/pages/` 下 15 个页面 README，明确页面目标、输入字段、展示内容、用户动作、输出数据、通过条件和状态依赖。不写 UI、不创建路由或组件实现。

## 执行前必须读取的文件

1. 完整读取 `00_design.md`，重点读取第 2—9、12—19、23、24 章。
2. 读取 `frontend/README.md`、`frontend/pages/README.md` 和全部现有页面 README。
3. 读取 `docs/03_page_design.md`、`docs/04_state_machine.md` 仅作导航。
4. 读取相关 Schema 和规则文件名，只用于说明数据契约与依赖。
5. 读取 `docs/99_design_issues.md`。

## 允许修改的目录和文件

- `frontend/README.md`
- `frontend/pages/README.md`
- 下列页面目录中的 `README.md`：`product_list`、`product_create`、`category_confirm`、`variant_sku_input`、`variant_difference_check`、`target_variant_select`、`variant_profile`、`judgement_report`、`material_check`、`image_asset_check`、`creative_direction`、`video_batch_plan`、`shot_asset_plan`、`task_package_export`、`output_viewer`。
- 冲突记录例外：`docs/99_design_issues.md`。

## 禁止修改的目录和文件

- 禁止修改 `00_design.md`、其他 docs、rules、backend、Schema、data、outputs、scripts、VSCode 配置和其他任务文件。
- 禁止创建 React/Vue/HTML/CSS/TypeScript、路由、状态管理、组件、API 客户端、构建配置或依赖文件。
- 禁止把前端改成自由聊天框，禁止在页面 README 内定义新的业务规则。

## 具体要创建或修改的文件清单

以下清单同时规定每个文件应该写入什么内容：

每个页面 README 必须包含：中文页面名、页面目标、前置状态、进入条件、输入/展示字段、用户动作、输出对象、通过条件、失败/阻断表现、型号和 ID 约束、下一状态。

1. `product_list`：列表字段、操作和当前步骤展示。
2. `product_create`：必填/选填字段、业务阶段、基础信息输出。
3. `category_confirm`：候选类目展示、人工确认和修改动作。
4. `variant_sku_input`：型号/SKU 字段、至少一个型号、单型号默认对象。
5. `variant_difference_check`：差异比较维度、共享与隔离结论。
6. `target_variant_select`：选择唯一 `selected_variant_id`，持续展示系列/型号/SKU。
7. `variant_profile`：基础、风险、卖点字段和冲突确认。
8. `judgement_report`：报告结构、风险阅读和用户确认。
9. `material_check`：材料分类、等级、缺失和继续条件。
10. `image_asset_check`：资产标注、完整度、缺图和能力降级。
11. `creative_direction`：风格、剧情、强度、真人限制、卖点、自由输入、专业翻译和确认。
12. `video_batch_plan`：三类 ID、批次目标、3—5 条视频、逐视频字段、A/B/C 等级和素材闸门。
13. `shot_asset_plan`：按等级规划画板、故事板、镜头卡和提示词。
14. `task_package_export`：聚合已确认数据并导出文件，不直接控制 Codex。
15. `output_viewer`：按实际批次读取与展示，不读取未规划的视频目录。

`target_variant_select` 之后的所有型号级页面必须明确：切换 `selected_variant_id` 会使未确认的画像、报告、图片绑定、批次和镜头规划失效并重新检查。

## 必须遵守的 00_design.md 章节

- 第 2、3 章：前端是流程控制器，不是聊天框。
- 第 4—7 章：完整页面顺序、型号边界和页面字段。
- 第 8、9 章：状态枚举、进入条件和失效规则。
- 第 12—19 章：材料、图片、创意、批次、镜头、任务包、输出和质量约束。

## 不能发明的新规则

不得新增、删除、合并或调序页面；不得新增字段、状态、按钮语义、自动确认、跳过闸门或错误恢复流程；不得引入数据库、API、登录、聊天、Seedance / 即梦、OCR、VLM 或 TikTok 抓取。

## 完成后的输出说明

输出修改的 15 个页面 README、页面顺序、状态映射和型号绑定检查结果。明确说明未创建 UI、路由、组件或前端源码。
