# category_detector

## 模块职责

根据商品基础资料生成平台候选类目、置信度、理由和风险，供用户人工确认。

## 输入

`product_series_id`、产品名称、目标平台、目标市场及已有商品资料。

## 输出

候选一级/二级类目、置信度、推荐理由、风险提示；输出只代表 `category_detected`，不是确认结果。

## 依赖规则

`rules/platform_category_rules.json`。

## 依赖 Schema

确认后的系列类目字段参考 `backend/schemas/product_series.schema.json`。当前没有独立 `category_detection` Schema，不得自行创造；该缺口已记录。

## 前置状态 / 通过条件

前置为 `basic_info_completed`。模块完成候选输出后仍必须由用户确认，人工确认后才能进入 `category_confirmed`。

## ID 绑定要求

候选结果必须归属输入的 `product_series_id`；确认结果与系列对象的关系未来由 `validators` 校验。

## 禁止行为

不得自动确认类目、自动推进后续状态、发明平台类目树或把置信度当人工确认。

## 后续实现边界

未来只实现候选结构生成接口；不实现外部 AI/API 调用、数据库或人工确认 UI。
