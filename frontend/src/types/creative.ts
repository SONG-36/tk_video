import type { ProductSeriesId, VariantId } from './common'

export type CreativeStyle =
  | '搞笑反转'
  | '夸张戏剧化'
  | '好莱坞电影感'
  | '真实生活记录感'
  | '测评实验感'
  | '解压爽感'
  | '高级质感广告'
  | '原生 TikTok 口播'
  | '无厘头短剧'
  | '前后对比冲击'

export type StoryStructure =
  | '痛点夸张化'
  | '误会反转'
  | '前后对比'
  | '小剧场冲突'
  | '产品英雄登场'
  | '用户被惊艳'
  | '失败方法 vs 正确方法'
  | '普通工具 vs 本产品'

export type ExpressionLevel = '保守真实' | '中等夸张' | '强戏剧化'

export type HumanPolicy =
  | '不允许真人'
  | '只允许手部'
  | '允许真人但不露脸'
  | '允许真人露脸'

export type HookType =
  | 'pain_point_direct'
  | 'result_first'
  | 'failed_method'
  | 'counterintuitive'
  | 'audience_callout'
  | 'scene_entry'
  | 'suspense_reverse'
  | 'test_challenge'
  | 'price_value'

export type CTAType =
  | 'product_card_click'
  | 'comment_question'
  | 'save_for_later'
  | 'compare_before_buy'
  | 'limited_offer'
  | 'scenario_action'

export type TiktokStructureStep =
  | 'Hook'
  | 'Problem'
  | 'Product'
  | 'Proof'
  | 'CTA'

export interface TiktokCreativeStructure {
  script_structure?: TiktokStructureStep[]
  retention_requirements?: string[]
  cta_requirements?: string[]
  text_overlay_required?: boolean
  sound_or_voiceover_required?: boolean
}

export interface ScriptStructure {
  '0_3s'?: string
  '3_8s'?: string
  '8_18s'?: string
  '18_25s'?: string
  final_2_3s?: string
}

export type RetentionDesign = Record<string, unknown>

export interface CTA {
  cta_type?: CTAType
  cta_text?: string
  cta_visual?: string
}

/** No closed native-style name enum is defined by the current Schema. */
export type TiktokNativeStyleName = string
export type TiktokNativeStyle = Record<string, unknown>
export type TextOverlayPlan = Record<string, unknown>[]
export type SoundOrVoiceoverPlan = Record<string, unknown>
export type ViralPatternRef = string
export type ProductAdaptedPatternRef = string

export interface CreativeTranslation {
  camera_language: string[]
  visual_texture: string[]
  rhythm: string
  asset_needs: string[]
}

export interface CreativeDirectionDetails {
  selected_styles: CreativeStyle[]
  story_structures: StoryStructure[]
  expression_level: ExpressionLevel
  human_policy: HumanPolicy
  user_free_idea?: string
  tiktok_creative_structure?: TiktokCreativeStructure
  hook_preferences?: HookType[]
  native_style_requirement?: string
  viral_pattern_refs?: ViralPatternRef[]
  adapted_pattern_refs?: ProductAdaptedPatternRef[]
  system_translation: CreativeTranslation
}

export interface CreativeDirection {
  product_series_id: ProductSeriesId
  variant_id: VariantId
  creative_direction: CreativeDirectionDetails
  confirmed_by_user: boolean
}

export interface CreativeReadinessFlags {
  tiktok_creative_structure_incomplete: boolean
  viral_pattern_not_adapted: boolean
  product_adaptation_failed: boolean
  plot_overpowers_product_risk: boolean
  hook_missing: boolean
  proof_missing: boolean
  cta_missing: boolean
  product_first_visible_late_risk: boolean
  product_proof_late_risk: boolean
}
