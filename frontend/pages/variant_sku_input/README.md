# 型号 / SKU 录入页

本文档描述前端页面职责，不是业务规则权威源；如与根目录 `00_design.md` 冲突，以 `00_design.md` 为准。

## 页面目标

记录系列下所有可独立选择、拍摄和销售的型号。

## 前置状态

`category_confirmed`。

## 进入条件

平台类目已人工确认。

## 输入 / 展示字段

型号名称、卖家 SKU、平台 SKU、颜色、尺寸、核心参数、配件、价格、型号图片。

## 用户动作

新增、编辑型号并确认录入。

## 输出对象

当前系列的 `variants[]`；单型号商品也创建一个默认型号。

## 依赖后端模块

`variant_manager`、`validators`。

## 依赖 Schema

`product_series.schema.json`、`variant.schema.json`。

## 通过条件

至少存在一个型号。

## 失败 / 阻断表现

没有型号时不能进行差异判断；字段错误时显示对应型号问题，不自动合并。

## 型号和 ID 约束

每个型号有唯一 `variant_id` 并归属当前 `product_series_id`；此页不提前设置 `selected_variant_id`。

## 下一状态

`variants_recorded`。
