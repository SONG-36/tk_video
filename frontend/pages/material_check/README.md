# 材料检查页

本文档描述前端页面职责，不是业务规则权威源；如与根目录 `00_design.md` 冲突，以 `00_design.md` 为准。

## 页面目标

在脚本、分镜和提示词生产前，检查当前目标型号的商品、内容、视频和合规材料是否满足后续生产条件。

## 前置状态

`report_confirmed`。

## 进入条件

- 当前目标型号判断报告已经人工确认。
- `product_series_id` 与 `selected_variant_id` 绑定有效。

## 输入 / 展示字段

- 商品基础材料、内容生产材料、视频素材材料、合规与限制材料。
- 每项材料的必须、建议或风险级别。
- 已提供材料、缺失项、确认状态和禁止编造项。

## 用户动作

- 补充或确认当前型号的材料状态。
- 对建议材料缺失进行人工确认。
- 查看风险材料缺失对应的禁止编造规则。

## 输出对象

绑定 `product_series_id` 与当前 `variant_id` 的 `material_check`。

## 依赖后端模块

- `material_checker`
- `validators`

## 依赖 Schema

- `judgement_report.schema.json`
- `material_check.schema.json`
- `product_series.schema.json`

## 通过条件

- 必须材料齐全。
- 建议材料缺失已经由用户确认。
- 风险材料缺失已经写入禁止编造约束。

## 失败 / 阻断表现

- 必须材料缺失时列出缺失项并阻止通过。
- 建议材料缺失但未经确认时保持当前状态。
- 风险项未形成禁止编造约束时阻止继续。

## 型号和 ID 约束

- 材料检查必须绑定当前 `product_series_id + selected_variant_id`。
- 输出中的 `variant_id` 必须等于当前 `selected_variant_id`。
- 切换 `selected_variant_id` 会使未确认的画像、报告、图片绑定、批次和镜头规划失效并重新检查。

## 下一状态

通过后进入 `materials_checked`。
