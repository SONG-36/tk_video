# material_checker

## 模块职责

按必须、建议、风险等级检查目标型号材料，形成缺失项、继续条件和禁止编造约束。

## 输入

系列/型号 ID，商品基础、内容生产、创意、图片、视频、合规限制和竞品参考材料。

## 输出

三类材料清单、`missing_materials`、`do_not_invent`、`can_continue`。

## 依赖规则

`rules/material_check_rules.json`。

## 依赖 Schema

`backend/schemas/material_check.schema.json`、`backend/schemas/judgement_report.schema.json`。

## 前置状态 / 通过条件

前置为 `report_confirmed`。必须材料齐全、建议缺失已确认、风险缺失已转为禁止编造后达到 `materials_checked`。

## ID 绑定要求

材料检查必须绑定当前 `selected_variant_id`；系列共享材料是否可沿用由未来 `validators` 按明确共享标记校验。

## 禁止行为

不得让必须材料缺失时继续、吞掉风险约束、编造缺失参数或混入其他型号材料。

## 后续实现边界

未来只实现分级检查结果，不新增材料字段或自动补全材料。
