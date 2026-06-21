# 任务 12：15 个页面表单/展示骨架（逐页执行）

## 执行目标
最终覆盖 15 页字段展示、表单输入、人工确认和阻断提示；为保持小任务，每次只允许指定并实现一个 `TARGET_PAGE`，15 次分别验收。数据仅用本地临时状态或明确 fixture，不接真实后端。
## 前置任务
- 任务 11 通过；目标页路由、守卫、类型及契约已确定。
- 未指定唯一 `TARGET_PAGE` 或目标页存在未裁决契约时阻断。
## 必须读取的文件
- `00_design.md` 第 4、7—19、23、24 章中目标页内容。
- 全部页面 README、目标页依赖 Schema/rules/backend README、前端类型与状态机。
- `docs/03_page_design.md`、`04_state_machine.md`、`99_design_issues.md`。
## 允许修改的文件
- 仅 `TARGET_PAGE` 页面、专用组件/fixture/测试；共享组件仅最小改动并补回归测试。
## 禁止修改的文件
- 其他页面；设计/docs/rules/Schema/backend/data/outputs/scripts/tasks；真实 API 配置。
## 具体实现范围
- 15 个目标依次为任务 09 路由清单；每次实现字段展示、允许输入、已有人工确认按钮、通过/阻断提示和 ID 上下文。
- 报告/任务包/输出页只展示 fixture 契约，不生成报告、任务包或读取 outputs。
- 累计完成标准是 15 份独立验收记录，不允许一次批量实现。
## 禁止越界事项
- 不调用 API、不生成真实报告/任务包、不读 outputs、不复制后端规则。
- 不新增字段、按钮语义、默认业务值或自动确认。
## 已知未裁决问题处理方式
- `product_create`、`category_confirm` 因缺少独立 Schema 阻断数据提交类型；只可在人工补契约后实现。
- `category_confirm` 不实现候选/置信度算法；`variant_profile` 不映射三档与布尔；`creative_direction` 不实现确定性翻译；`material_check` 不补缺失字段组；批次/镜头/输出页不裁决 B/C 冲突。
## 验证命令或人工验收方式
- 每次运行目标页测试、typecheck、build；检查其他 14 页无差异。
- 按目标 README 逐字段、动作、确认点、阻断和 ID 对照；`git diff --check`。
## 完成后输出
输出唯一 `TARGET_PAGE`、覆盖矩阵、fixture 来源、测试和阻断；阶段完成时汇总 15 份记录。
