# 本次拍摄型号选择页

本文档描述前端页面职责，不是业务规则权威源；如与根目录 `00_design.md` 冲突，以 `00_design.md` 为准。

## 页面目标

为本次内容生产选择唯一目标型号。

## 前置状态

`variant_differences_checked`。

## 进入条件

型号差异结论已确认。

## 输入 / 展示字段

商品系列、型号名称、`variant_id`、卖家/平台 SKU 和差异摘要。

## 用户动作

选择并确认本次拍摄型号。

## 输出对象

当前系列的 `selected_variant_id`。

## 依赖后端模块

`variant_manager`、`validators`。

## 依赖 Schema

`product_series.schema.json`、`variant.schema.json`。

## 通过条件

所选 ID 存在于当前系列 `variants[].variant_id`，且用户确认。

## 失败 / 阻断表现

未选择或引用无效型号时不能进入画像；显示系列、型号和 SKU 归属错误。

## 型号和 ID 约束

一个批次只能使用一个目标型号。切换 `selected_variant_id` 会使未确认的画像、报告、图片绑定、批次和镜头规划失效并重新检查。

## 下一状态

`target_variant_selected`。
