# 型号级判断报告页

本文档描述前端页面职责，不是业务规则权威源；如与根目录 `00_design.md` 冲突，以 `00_design.md` 为准。

## 页面目标

展示当前目标型号的类目、商品分类、内容难度、视频分型、类目打法、风险和信息缺口，并取得用户确认。

## 前置状态

`variant_profile_completed`；报告可确认前还需依次完成 `video_type_completed` 与 `report_generated`。

## 进入条件

- 当前目标型号画像已完成。
- `product_series_id` 与 `selected_variant_id` 的绑定有效。
- 分类、分型、打法和报告生成均使用当前目标型号上下文。

## 输入 / 展示字段

- 顶部结论卡片、商品分类与内容生产难度。
- 推荐视频类型、推荐拍摄顺序和类目打法。
- 风险项、缺失信息与下一步建议。
- 当前系列、目标型号、画像和规则来源摘要。

## 用户动作

- 阅读报告结论、风险和缺失信息。
- 对报告进行人工确认。
- 对严重问题返回画像页修正；材料缺失项保留给材料检查页处理。

## 输出对象

绑定 `product_series_id` 与当前 `variant_id` 的 `judgement_report`，以及报告确认状态。

## 依赖后端模块

- `product_classifier`
- `video_type_classifier`
- `playbook_generator`
- `report_generator`
- `validators`

## 依赖 Schema

- `product_series.schema.json`
- `product_profile.schema.json`
- `judgement_report.schema.json`

## 通过条件

- 分类、分型、打法、风险和缺失信息已经生成并可展示。
- 用户已阅读风险和缺失信息。
- 用户明确确认报告。

## 失败 / 阻断表现

- 报告未生成、字段不完整或 ID 不一致时阻止确认。
- 用户未确认风险时保持 `report_generated`。
- 严重画像问题提示返回画像页；不得由页面自行修正规则结论。

## 型号和 ID 约束

- 报告必须绑定当前 `product_series_id + selected_variant_id`。
- 报告中的 `variant_id` 必须等于当前 `selected_variant_id`。
- 切换 `selected_variant_id` 会使未确认的画像、报告、图片绑定、批次和镜头规划失效并重新检查。

## 下一状态

生成完成后为 `report_generated`；人工确认后进入 `report_confirmed`。

## 未裁决约束

第 7 章三个三档画像字段与第 18 章布尔字段的信息粒度不一致，报告生成和展示不得擅自裁决其映射关系。
