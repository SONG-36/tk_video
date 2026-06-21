# 任务 13：后端 Validators

## 执行目标
只实现 JSON Schema 基础校验入口、跨对象一致性和状态闸门 validators，不实现任何业务模块。
## 前置任务
- 任务 03/04 通过；后端语言、测试器、Schema 校验库由人工批准。未批准则阻断。
## 必须读取的文件
- `00_design.md` 第 5—9、15—19、23、24 章；全部 Schema、rules 和 README；`backend/app/validators/README.md`；设计问题和既有测试说明。
## 允许修改的文件
- `backend/app/validators/` 源码/导出；对应单元测试、fixture 和必要测试配置。
## 禁止修改的文件
- 设计/docs/rules/Schema/frontend/data/outputs/scripts；其他 backend 模块、API、数据库。
## 具体实现范围
- Schema 入口；`selected_variant_id` 引用；系列内 `variant_id` 唯一；三类 ID 一致；`video_id` 唯一；数量等于数组长度；shot 归属 video/batch；task package 全上下文；输出路径白名单；第 8/9 章状态闸门。
- 错误必须含对象、字段路径、规则来源和可读原因；不得修改输入或调用业务模块。
## 禁止越界事项
- 不生成报告，不做类目/分类/分型/材料/图片/创意/批次/镜头判断，不调用 AI。
## 已知未裁决问题处理方式
- B/C、画像粒度、缺失 category Schema、类目算法、创意映射和材料字段缺口只能返回 `unresolved`/阻断信息，不编码结论。
## 验证命令或人工验收方式
- 运行 backend test；正反例覆盖每项关系、错误可读性、输入不变和业务模块零调用；`git diff --check`。
## 完成后输出
列出 validator 清单、错误结构、测试矩阵、人工批准技术栈和 unresolved 项。
