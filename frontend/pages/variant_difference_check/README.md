# 型号差异判断页

本文档描述前端页面职责，不是业务规则权威源；如与根目录 `00_design.md` 冲突，以 `00_design.md` 为准。

## 页面目标

并排比较型号，判断共享字段、隔离字段及是否必须分别制作内容。

## 前置状态

`variants_recorded`。

## 进入条件

当前系列至少录入一个型号。

## 输入 / 展示字段

型号/SKU、外观颜色、尺寸重量、功能参数、按钮接口显示、包装配件、价格卖点、图片共用性、分型适配、合规安全信息。

## 用户动作

查看比较结果并确认共享/隔离结论。

## 输出对象

`variant_difference_report`：`checked`、共享字段、`non_shareable_fields`、`content_must_be_separated`。

## 依赖后端模块

`variant_difference_checker`、`validators`。

## 依赖 Schema

`product_series.schema.json`、`variant.schema.json`。

## 通过条件

全部已录入型号完成比较，隔离结论已确认。

## 失败 / 阻断表现

比较未完成时不能选择拍摄型号；影响画面、参数、卖点、配件或合规的差异不得标为共享。

## 型号和 ID 约束

所有比较对象必须属于同一 `product_series_id`，不能直接合并不同型号内容。

## 下一状态

`variant_differences_checked`。
