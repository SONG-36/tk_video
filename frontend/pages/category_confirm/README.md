# 类目确认页

本文档描述前端页面职责，不是业务规则权威源；如与根目录 `00_design.md` 冲突，以 `00_design.md` 为准。

## 页面目标

展示平台候选类目并取得人工确认，禁止自动猜测后继续。

## 前置状态

`basic_info_completed`；候选生成后为 `category_detected`。

## 进入条件

商品基础信息完整。

## 输入 / 展示字段

产品名称、候选一级/二级类目、置信度、推荐理由、风险提示。

## 用户动作

确认推荐类目、手动修改类目、返回修改商品名称。

## 输出对象

`category_detection`，包含平台类目、子类目、候选项及 `confirmed_by_user`。

## 依赖后端模块

`category_detector`、`validators`。

## 依赖 Schema

确认后的系列类目参考 `product_series.schema.json`；当前没有独立 `category_detection` Schema。

## 通过条件

`platform_category` 已确认；必要时 `sub_category` 已确认；用户点击确认。

## 失败 / 阻断表现

未人工确认时停留在 `category_detected`，不能进入型号业务信息。

## 型号和 ID 约束

结果绑定 `product_series_id`；此时尚未选择目标型号。

## 下一状态

`category_confirmed`。

## 未裁决约束

`category_detection` 缺少独立 Schema，页面不得自行定义替代字段。
