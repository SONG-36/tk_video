# 任务 16：outputs 读取实现

## 执行目标
只读已规划 batch/video，返回结构化内存索引、存在性、格式错误、缺失和风险；不生成内容或质量评价。
## 前置任务
- 任务 14/15 通过；任务 07 契约同步。
## 必须读取的文件
- `00_design.md` 第 4、7—9、15—21、23、24 章。
- `docs/07_output_spec.md`、质量说明、设计问题；output_reader/frontend viewer README；三个相关 Schema；outputs README和占位脚本。
## 允许修改的文件
- `backend/app/output_reader/` 源码；`scripts/read_outputs.py` 接入；隔离模拟 outputs fixture 和测试。
## 禁止修改的文件
- 设计/docs/rules/Schema/frontend/data/真实 outputs；其他 backend 模块。
## 具体实现范围
- 校验三类 ID 和批次根；从确认的 `video_batch_plan` 建白名单。
- 只读白名单目录；未规划 `video_04/05` 即使存在也拒绝。
- 返回任务 07 既定结构化索引；识别缺失和文本/JSON格式，不评价质量、不写索引文件。
- 对已规划视频检查 hook、proof、CTA、TikTok native style、viral pattern 和 `product_adapted_pattern` 信息是否存在；只返回字段/结构存在性与缺失，不做主观质量评分。
- 拒绝绝对路径、`..` 和危险软链。
## 禁止越界事项
- 不生成/修复/重命名文件，不解析视频二进制，不调用 AI/API，不修改任务包。
## 已知未裁决问题处理方式
- B/C 与第 21 章冲突只随结果标 unresolved，不能判断缺失是否合法。
- 旧 `video_04/05` 示例不授权读取；只认已确认白名单。其他问题不进入 reader。
## 验证命令或人工验收方式
- 仅用模拟 outputs 临时树测试合法读取、未规划目录、缺失、格式错、ID错、穿越/软链、零写入；`git diff --check`。
## 完成后输出
列出索引结构、白名单、错误/缺失矩阵、安全测试和真实 outputs 零访问证明。
