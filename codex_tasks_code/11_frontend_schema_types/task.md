# 任务 11：前端 Schema 类型投影

## 执行目标
把现有 10 个 `backend/schemas/*.schema.json` 等价投影为前端类型或批准的生成结果，只提供静态契约。
## 前置任务
- 任务 10 通过；人工已确认手写或生成方式及所需工具。不得自行安装生成器。
## 必须读取的文件
- `00_design.md` 第 6、8、9、15—21、23、24 章。
- `docs/05_data_structures.md`、`docs/99_design_issues.md`。
- Schema README 与全部 10 个 Schema；前端现有类型/状态配置。
## 允许修改的文件
- 前端 types/schema 投影、统一导出、批准的生成配置和类型契约测试。
## 禁止修改的文件
- Schema、rules、设计/docs、backend、页面、路由业务、API、data、outputs。
## 具体实现范围
- 覆盖 product_series、variant、product_profile、judgement_report、material_check、image_asset、creative_direction、video_batch_plan、shot_asset_plan、codex_task_package。
- 保留 required/optional、枚举、数组、null 与封闭对象含义。
- 必须从本次更新后的四个 Schema 同步 TikTok 创意结构、模式引用、逐视频 hook/proof/CTA、模式转镜头及任务包迁移字段；不允许前端类型自创、改名或补默认字段。
- 注释 `selected_variant_id` 引用、型号唯一性、三类 ID、video/shot/task 归属由任务 13 validators 校验。
## 禁止越界事项
- 不新增 Schema 外业务字段、默认值、临时对象或 validator。
- 不用类型反向覆盖 Schema，不为缺失 Schema 猜接口。
## 已知未裁决问题处理方式
- `category_detection` 无独立 Schema，且 `basic_info` 契约缺失：不生成猜测类型。
- 三档画像与布尔字段冲突：忠实投影现有 Schema并注释阻断，不映射。
- 其余问题不影响类型生成，但须保留注释，不得硬编码算法。
## 验证命令或人工验收方式
- 运行批准的类型生成/一致性命令、typecheck、test、build。
- 对照清单逐一检查 10 个 Schema 与类型；检查无业务 validator。
## 完成后输出
列出 10 个映射、生成方式、validators 注释、阻断对象和命令结果。
