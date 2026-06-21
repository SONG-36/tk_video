# 状态机与流程闸门

> 本文档来源于 `00_design.md`，仅用于阅读，不是权威源；如与 `00_design.md` 冲突，以 `00_design.md` 为准。
>
> 来源章节：第 8、9 章。

## 状态枚举

| 状态 | 含义 |
|---|---|
| `draft` | 草稿 |
| `basic_info_completed` | 商品系列基础信息已完成 |
| `category_detected` | 平台类目已识别 |
| `category_confirmed` | 平台类目已确认 |
| `variants_recorded` | 型号 / SKU 已录入 |
| `variant_differences_checked` | 型号差异已判断 |
| `target_variant_selected` | 本次拍摄型号已选择 |
| `variant_profile_completed` | 型号级商品画像已补全 |
| `video_type_completed` | 型号级视频分型已完成 |
| `report_generated` | 判断报告已生成 |
| `report_confirmed` | 判断报告已确认 |
| `materials_checked` | 材料已检查 |
| `variant_image_assets_checked` | 型号级产品图片资产已检查 |
| `creative_direction_confirmed` | 创意方向已确认 |
| `video_batch_planned` | 视频批次已规划 |
| `shot_assets_planned` | 镜头资产已规划 |
| `task_package_exported` | Codex 任务包已导出 |
| `codex_processing` | Codex 处理中 |
| `codex_output_ready` | Codex 输出已生成 |
| `completed` | 完成 |
| `blocked` | 被阻断 |

商品分类结论保存在型号级判断报告中，不增加主流程状态。可选 Revision 只作目标型号内部校验，不改变默认状态机。

## 状态推进闸门

1. 商品系列基础信息未完成：不能进入平台类目确认。
2. 平台类目未确认：不能录入并确认型号业务信息。
3. 型号 / SKU 未录入：不能进行型号差异判断。
4. 型号差异未判断：不能选择本次拍摄型号。
5. 本次拍摄型号未选择：不能补全型号级商品画像。
6. 型号级商品画像未完成：不能生成视频分型和判断报告。
7. 判断报告未确认：不能进入材料检查。
8. 材料检查未通过：不能进入型号级图片资产检查。
9. 目标型号图片资产未检查：不能进入创意方向设定。
10. 创意方向未确认：不能进入视频批次规划。
11. 视频批次未规划：不能进入镜头资产规划。
12. 镜头资产未规划：不能导出任务包。
13. 任务包未导出：不能进入 Codex 输出结果页。

任何前置未满足时进入或保持 `blocked`，不能跳过。

## 切换 selected_variant_id

切换后必须重新验证所有型号级步骤，包括画像、分型、报告、材料、图片、创意、批次、镜头和任务包。只有明确标为系列共享的材料可沿用。不得把其他型号的参数、图片、配件和卖点覆盖到新目标型号。
