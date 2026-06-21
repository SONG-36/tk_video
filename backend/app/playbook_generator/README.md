# playbook_generator

## 模块职责

根据已确认类目和目标型号结果读取类目打法，生成报告中的打法建议。

## 输入

系列/型号 ID、已确认平台类目、型号画像、视频分型结果。

## 输出

内容重点、开头方式、必须展示项、适合分型和适用的信任补强建议。

## 依赖规则

`rules/category_playbook_rules.json`。

## 依赖 Schema

`backend/schemas/product_profile.schema.json`、`backend/schemas/judgement_report.schema.json`。

## 前置状态 / 通过条件

类目必须人工确认，目标型号画像和分型必须完成；结果作为 `report_generated` 的组成部分。

## ID 绑定要求

类目、画像、分型和打法输出必须归属同一系列和目标型号，未来由 `validators` 校验。

## 禁止行为

不得创造规则库外打法、把案例钩子当通用规则、忽略型号差异或绕过类目人工确认。

## 后续实现边界

未来只实现规则映射和结构化输出，不生成自由创意或脚本。
