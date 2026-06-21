# 商品内容生产流程式工作台

## 项目定位

本项目是面向 TikTok 电商商品短视频生产的流程式内容决策工作台。系统以商品系列为入口，以一个明确的型号 / SKU 为每次内容生产对象，通过流程闸门完成判断报告、材料和图片约束、创意翻译、视频批次规划、镜头资产规划及 Codex 任务包导出。

## 唯一权威源

本项目的唯一权威源是 `00_design.md`。`docs/` 只是阅读版，`codex_tasks/` 只是执行指令，`rules/` 是机器可读规则。`backend/` 和 `frontend/` 必须服从 `00_design.md`。发生冲突时，以 `00_design.md` 为准；业务变更必须先更新权威源，再同步从属文件。

## 目录结构

- `docs/`：从权威源拆分的阅读版、规则说明、案例及设计问题记录。
- `frontend/`：页面、流程交互、展示组件和前端类型骨架。
- `backend/`：规则判断器、检查器、规划器、生成器、读取器及 Schema 骨架。
- `rules/`：机器可读规则 JSON，不在前后端散落规则副本。
- `data/`：运行输入、中间数据和导出的任务包。
- `outputs/`：Codex 最终内容资产，后续按 `{product_series_id}/{batch_id}/` 组织。
- `codex_tasks/`：逐步执行且逐步验收的 Codex 任务。
- `scripts/`：结构校验、设计同步、任务导出和输出读取的辅助脚本骨架。
- `.vscode/`：本地任务入口。

## 核心业务链路

商品输入 → 平台类目确认 → 型号 / SKU 录入 → 型号差异判断 → 选择本次拍摄型号 → 型号级商品画像补全 → 型号级视频分型判断 → 判断报告确认 → 材料检查 → 型号级图片资产检查 → 创意方向设定 → 视频批次规划 → 镜头资产规划 → Codex 任务包导出 → Codex 生成 → 前端读取输出。

所有批次和任务包必须绑定 `product_series_id + variant_id + batch_id`。切换 `selected_variant_id` 后必须重新验证型号级步骤。

## 开发顺序

按 `codex_tasks/00_project_structure` 至 `codex_tasks/07_output_reader` 逐项执行和验收，再进行样例跑通、体验优化及外部能力接入。完整阶段见 `docs/09_development_plan.md`。

## Codex 使用方式

1. 每次任务先读取 `00_design.md`。
2. 一次只执行一个 `codex_tasks/` 任务，并按同目录 `check.md` 验收。
3. 任务包从 `data/tasks/` 读取，结果写入 `outputs/{product_series_id}/{batch_id}/`。
4. 不通过当前验收，不进入下一任务。

## 禁止事项

不得裁剪系统范围、绕过流程闸门、混用型号数据、编造参数或认证、把从属文档当权威源、在本阶段引入数据库或登录权限，也不得调用视频模型、执行 OCR / VLM、抓取 TikTok 数据或自行重新设计业务流程。
