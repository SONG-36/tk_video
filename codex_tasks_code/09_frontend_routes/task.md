# 任务 09：前端路由与 15 个空页面

## 执行目标
只建立路由配置和 15 个空页面挂载。每页只能显示中文名、当前路由和占位说明。
## 前置任务
- 任务 08 验收通过；路由库已在人工批准技术栈清单内。
- 未批准路由库或需新增依赖时阻断。
## 必须读取的文件
- `00_design.md` 第 4、7—9、23、24 章。
- `docs/03_page_design.md`、`docs/04_state_machine.md`。
- `frontend/pages/README.md` 和全部 15 个页面 README。
- 任务 08 产物、本任务 `task.md`/`check.md`。
## 允许修改的文件
- 前端路由配置、导航壳、15 个空页面组件及路由测试。
- `docs/99_design_issues.md` 仅可追加冲突。
## 禁止修改的文件
- 权威设计、docs 正文、rules、Schema、backend、data、outputs、scripts、任务文件。
- package/构建配置，除非使用任务 08 已批准依赖且只修正必要接入。
## 具体实现范围
顺序固定为：`product_list`、`product_create`、`category_confirm`、`variant_sku_input`、`variant_difference_check`、`target_variant_select`、`variant_profile`、`judgement_report`、`material_check`、`image_asset_check`、`creative_direction`、`video_batch_plan`、`shot_asset_plan`、`task_package_export`、`output_viewer`。建立路由映射、顺序导航展示和未知路由占位；不得赋予业务进入权限含义。
## 禁止越界事项
- 不写表单字段、业务按钮、状态机、守卫、API、fixture、后端调用或持久化。
- 不新增、合并、改名、调序页面。
## 已知未裁决问题处理方式
六类问题均不在空页面展示；页面不得显示推测值或临时字段。
## 验证命令或人工验收方式
- 运行任务 08 定义的 test/build。
- 自动测试 15 路由逐一挂载、标题/路径正确、顺序一致；人工确认页面仅三类占位信息。
- `git diff --check` 和范围检查。
## 完成后输出
输出路由表、15 个组件、测试结果及“无表单/状态/API”声明。
