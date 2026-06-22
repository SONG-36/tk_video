# 任务 08：前端工程初始化

`00_design.md` 是唯一业务权威源。本任务只初始化工程，技术栈必须由人工先确认。

## 人工确认技术栈

`08A_technical_stack_confirmation` 已确认以下工程选型：

```text
前端框架：React
语言：TypeScript
构建工具：Vite
包管理器：npm
测试工具：Vitest
样式方案：普通 CSS
```

同时确认以下任务边界：

- 任务 08 不引入 Tailwind 或 UI 组件库。
- React Router 延后到任务 09，任务 08 不引入路由库或路由实现。
- 本地状态机延后到任务 10，任务 08 不引入 Redux、Zustand 或其他状态库。
- 任务 08 不初始化后端服务，不创建后端代码。
- 任务 08 不实现真实数据读写，不读取 `data/` 或 `outputs/`。
- 任务 08 不创建 API client。

以上选型由人工明确给出，Codex 不得在任务 08 中替换技术栈或扩展依赖范围。

## 执行目标

创建可运行 `dev/build/test` 的最小前端工程：package、锁文件、构建/测试配置、入口文件和空应用壳。不得创建业务页面、路由、状态机、表单或 API client。

## 前置任务

- 任务 00—07 均已通过。
- 人工技术栈确认记录已存在于本任务和 `docs/09_development_plan.md`。
- 执行组合固定为 React、TypeScript、Vite、npm、Vitest 和普通 CSS。
- 未确认任一项、现有运行时不满足或需新增未批准依赖时立即阻断；Codex 不得推荐后自行替换人工选型。

## 必须读取的文件

- `00_design.md` 第 1—4、7—9、23、24 章。
- 根 `README.md`、`.gitignore`、`.vscode/tasks.json`。
- `frontend/README.md`、`frontend/pages/README.md` 与全部页面 README。
- `docs/99_design_issues.md`、本任务 `task.md`/`check.md`。

## 允许修改的文件

- `frontend/` 下人工批准栈所必需的 package、锁文件、构建/测试配置。
- 前端源码根中的单一入口、根组件、无业务样式和最小启动测试。
- `docs/99_design_issues.md` 仅可追加真实冲突。

## 禁止修改的文件

- `00_design.md`、其他 docs、rules、Schema、backend、data、outputs、scripts、`.vscode/`、现有任务文件。
- `frontend/pages/*/README.md` 及任何业务页面实现。

## 具体实现范围

- 空应用只显示项目名和“工程初始化完成”类非业务文字。
- package scripts 必须提供 dev/build/test；依赖仅限人工批准清单。
- 最小测试只验证应用入口可挂载。
- 普通 CSS 只用于最小空壳，不创建业务样式系统。

## 禁止越界事项

- 不创建 15 页、路由、导航、状态机、业务字段、表单、fixture、API client、登录或后端模拟。
- 不引入 React Router、Redux、Zustand、其他状态库、Tailwind 或 UI 组件库。
- 不初始化后端服务，不读取或写入真实 `data/`、`outputs/`。
- 不让 Codex 自行选型，不以初始化为由改写目录或业务规则。

## 已知未裁决问题处理方式

六类既有业务问题均与空壳无直接关系，不在本任务处理或编码；如初始化被迫引用任何业务字段，立即停止。

## 验证命令或人工验收方式

- 使用人工批准包管理器分别运行 package 中的 dev、build、test 命令。
- 人工检查源码树不存在页面、router、workflow、forms、api 等业务实现。
- `git diff --check`；核对差异仅在允许范围。

## 完成后输出

列出人工批准技术栈、依赖、文件、三个命令结果和差异范围；明确未创建任何业务能力。
