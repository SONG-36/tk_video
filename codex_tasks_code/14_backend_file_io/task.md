# 任务 14：后端本地文件 I/O

## 执行目标
实现 data/ 与 outputs/ 范围内的 JSON/Markdown 基础读写和安全路径层；不实现业务判断。outputs 对本系统读取器保持只读。
## 前置任务
- 任务 13 通过；后端运行时和原子写入方案由人工批准。
## 必须读取的文件
- `00_design.md` 第 17—19、23、24 章；任务包/输出 docs；data/outputs README；generator/reader README；validators。
## 允许修改的文件
- `backend/app/file_io/` 技术模块/README；对应临时目录测试与测试配置。
## 禁止修改的文件
- 设计/docs/rules/Schema/frontend/真实 data/真实 outputs/scripts；其他业务模块/API。
## 具体实现范围
- 约束根解析、UTF-8 JSON/Markdown 读写、JSON 解析错误、data 安全/原子写入、outputs 单文件只读。
- 路径按三类 ID 组织；拒绝绝对路径、`..`、危险软链和根外路径。所有测试使用临时目录。
## 禁止越界事项
- 不扫描真实 outputs，不写 outputs，不实现聚合、索引、API、AI或前端代码。
## 已知未裁决问题处理方式
- 六类业务问题不属于 I/O；文件层不得据此选择文件、缺失标准或目录数量。
## 验证命令或人工验收方式
- 测试 JSON读写、Markdown写入、原子失败、路径穿越、软链、data/outputs 权限矩阵；确认真实目录零访问；`git diff --check`。
## 完成后输出
列出 API、根/权限矩阵、原子策略和安全测试结果。
