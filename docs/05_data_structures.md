# 数据结构阅读版

> 本文档来源于 `00_design.md`，仅用于阅读，不是权威源；如与 `00_design.md` 冲突，以 `00_design.md` 为准。
>
> 来源章节：第 17、18、20 章。

## 数据归属硬规则

- 系列层只保存平台类目、市场和所有型号真正共享的信息。
- 型号层保存影响拍摄或表达的外观、参数、配件、图片、卖点和限制。
- `video_batch_plan`、`shot_asset_plan` 和 Codex 任务包必须包含 `product_series_id`、`variant_id`、`batch_id`。
- 单商品历史示例仅用于单型号兼容，新实现必须包裹在系列与型号关系中。
- `optional_revision` 默认是 `null`，不是必填业务对象。
- 新增创意对象不能替代或丢失 `product_series_id`、`variant_id`、`batch_id`、逐视频 `video_id` 与流程上下文中的 `selected_variant_id`。

## 系列与型号主对象

```json
{
  "product_series_id": "p_001",
  "product_series_name": "车载吸尘器系列",
  "platform_category": "Automotive & Motorcycle",
  "target_market": "US",
  "variants": [
    {
      "variant_id": "sku_001",
      "seller_sku": "VAC-BLACK-01",
      "variant_name": "黑色标准款",
      "attributes": {
        "color": "black",
        "accessory_set": "standard"
      },
      "image_asset_ids": ["img_001", "img_002"],
      "optional_revision": null
    }
  ],
  "variant_difference_report": {
    "checked": true,
    "content_must_be_separated": false,
    "non_shareable_fields": []
  },
  "selected_variant_id": "sku_001",
  "video_batch_plan": {
    "batch_id": "batch_001",
    "product_series_id": "p_001",
    "variant_id": "sku_001"
  }
}
```

`selected_variant_id` 必须对应当前系列 `variants[].variant_id`。批次 `variant_id` 必须是本次目标型号。

## 商品基础信息

| 层级 | 字段 |
|---|---|
| 根 | `product_series_id`、`status` |
| `basic_info` | `product_name`、`target_platform`、`target_market`、`business_stage`、`product_images`、`product_links` |
| `product_links` | `1688`、`tiktok`、`amazon` |

示例状态为 `basic_info_completed`。

## 类目确认

`category_detection` 包含 `platform_category`、`sub_category`、`candidate_categories[]`、`confirmed_by_user`。候选项包含 `category`、`confidence`、`reason`；确认状态为 `category_confirmed`。

## 商品画像

`product_profile` 包含：

- `size`
- `requires_model`
- `requires_large_scene`
- `has_clear_function`
- `style_sensitive`
- `suitable_for_comparison`
- `product_has_packaging`
- `is_electronic`
- `has_battery`
- `touches_body`
- `is_children_related`
- `is_pet_related`
- `is_food_related`
- `is_high_price`
- `selling_point_types[]`

第 20 章示例使用 `profile_completed`，与第 8 章正式状态 `variant_profile_completed` 的差异保留在问题记录中，阅读版不自行裁决。

## 图片资产

单项包含 `image_id`、`file_name`、`image_type`、`view_angle`、`usage[]`、`quality`、`required`、`notes`。第 20 章单项示例未显式给出系列和型号归属，但同章硬规则要求型号级数据隔离；该缺口保留在问题记录中。

## 创意方向

`creative_direction` 包含 `selected_styles[]`、`story_structures[]`、`expression_level`、`human_policy`、`user_free_idea` 和 `system_translation`。翻译结果包含 `camera_language[]`、`visual_texture[]`、`rhythm`、`asset_needs[]`。

它还可承载 `tiktok_creative_structure`、`hook_preferences[]`、`native_style_requirement`、`viral_pattern_refs[]` 和 `adapted_pattern_refs[]`。这些字段把第 17/18 章规则带入已存在的创意方向步骤，不增加新页面或状态。

## tiktok_creative_structure

逐视频 TikTok 创意结构至少描述 `hook`（含 `hook_type`、`first_3_seconds_text`、`first_3_seconds_visual`、`scroll_stop_reason`、`product_relevance`）、`script_structure`、`retention_design`、`key_message`、`proof_point`、`cta`、`tiktok_native_style`、`text_overlay_plan` 和 `sound_or_voiceover_plan`。它由 `creative_direction` 提供偏好和约束，在 `video_batch_plan.videos[]` 形成逐视频方案，并继续进入镜头计划和任务包。

## viral_pattern_card

`viral_pattern_card` 是对来源素材的结构化模式卡，包含 `pattern_id`、来源平台/地区/类目/引用、模式名、原内容摘要、注意力触发、前 3 秒机制、中段留人机制、情绪负载、时间结构、可迁移元素、不可迁移元素、适合/不适合商品类型和风险标记。它保存模式分析，不授权复制原人物、台词、画面、音乐、品牌或剧情细节。

## product_adapted_pattern

`product_adapted_pattern` 是模式适配到当前商品后的结果，绑定 `adapted_pattern_id + source_pattern_id + product_series_id + variant_id + batch_id + video_id`，并描述适配概念、hook、情绪触发、产品角色、证明场景、CTA 和风险检查。其 `variant_id` 必须对应 `selected_variant_id`；跨对象一致性由后续 validators 校验。

## 新对象与主对象关系

| 主对象 | 关系 |
|---|---|
| `creative_direction` | 保存 TikTok 结构偏好、原生风格要求及模式引用/适配引用。 |
| `video_batch_plan` | 为每个 `video_id` 固化具体 hook、结构、留人、证明、CTA、原生风格及两个模式引用。 |
| `shot_asset_plan` | 把适配模式转换为情绪、反转、产品证明、CTA、文字和声音层面的可执行镜头。 |
| `codex_task_package` | 聚合结构、模式卡、适配结果与禁止复制/产品出现时限约束，供 Codex 参考模式而非照抄。 |

## video_batch_plan

```json
{
  "video_batch_plan": {
    "batch_id": "batch_001",
    "product_series_id": "p_001",
    "variant_id": "sku_001",
    "total_videos": 3,
    "batch_goal": "测试不同内容角度",
    "default_generation_policy": "1A_1B_1C",
    "videos": [
      {
        "video_id": "video_01",
        "video_type": "life_scenario",
        "creative_style": "真实痛点",
        "main_selling_point": "座椅缝隙清洁",
        "usage_scene": "车内座椅缝隙",
        "target_pain_point": "手和纸巾清不到",
        "generation_level": "A",
        "generate_seedance_prompts": true,
        "estimated_shot_count": 5,
        "duration": "15-25 秒"
      }
    ]
  }
}
```

## shot_asset_plan

第 20 章结构按 `videos[]` 保存 `video_id`、`creative_board_path`、`storyboard_path` 和 `shots[]`。镜头示例字段为 `shot_id`、`duration`、`goal`、`product_visible`、`input_images[]`、`distortion_risk`。

同章硬规则要求 `shot_asset_plan` 包含三类 ID，但示例根对象未显式展示，阅读版保留这一差异并在 `99_design_issues.md` 记录，不自行补写为新结构。

## 单型号兼容对象（历史结构）

历史对象以 `product_id` 为根，聚合 `basic_info`、`category_detection`、`product_profile`、`classification_report`、`video_fit_report`、`category_playbook`、`material_check`、`image_assets`、`creative_direction`、`shot_asset_plan`、`video_batch_plan` 和 `task_package`。

它仅用于兼容旧单型号数据，不能解释为跨型号共享对象。新实现仍必须使用商品系列、默认型号和 `product_series_id + variant_id + batch_id` 绑定。
