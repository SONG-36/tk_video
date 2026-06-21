# 状态机与流程闸门

> 本文档来源于 `00_design.md`，仅用于阅读，不是权威源。来源：第 8、9 章；冲突时以 `00_design.md` 为准。

## 状态枚举

`draft` → `basic_info_completed` → `category_detected` → `category_confirmed` → `variants_recorded` → `variant_differences_checked` → `target_variant_selected` → `variant_profile_completed` → `video_type_completed` → `report_generated` → `report_confirmed` → `materials_checked` → `variant_image_assets_checked` → `creative_direction_confirmed` → `video_batch_planned` → `shot_assets_planned` → `task_package_exported` → `codex_processing` → `codex_output_ready` → `completed`。

`blocked` 表示流程被闸门阻断。商品分类保存在判断报告中，不增加状态；可选 Revision 只作目标型号内部校验。

## 状态流转

每个状态只在对应页面通过条件满足后推进。类目需要人工确认；材料缺失按必须、建议和风险等级处理；图片不足会限制生成等级；任务包导出前必须完成批次和镜头规划。

## 切换 selected_variant_id 的失效规则

切换后，未确认的型号画像、分型和报告、型号材料判断、图片绑定、创意方向、视频批次、镜头规划和任务包均必须重新验证或失效。只有明确标记为系列共享且仍适用的材料可沿用，其他型号的参数、图片、配件和卖点不得继承。
