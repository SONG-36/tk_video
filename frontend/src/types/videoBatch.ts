import type {
  BatchId,
  ProductSeriesId,
  VariantId,
  VideoId,
  VideoType,
} from './common'
import type {
  CTA,
  HookType,
  ProductAdaptedPatternRef,
  RetentionDesign,
  ScriptStructure,
  SoundOrVoiceoverPlan,
  TextOverlayPlan,
  TiktokNativeStyle,
  ViralPatternRef,
} from './creative'

export type GenerationLevel = 'A' | 'B' | 'C'
export type BatchGoal = string
export type DefaultGenerationPolicy = '1A_1B_1C' | '2A_2B_1C'

export interface VideoPlan {
  video_id: VideoId
  video_type: VideoType
  creative_style: string
  main_selling_point: string
  usage_scene: string
  target_pain_point: string
  generation_level: GenerationLevel
  generate_seedance_prompts: boolean
  requires_human_assets: boolean
  requires_product_image_lock: boolean
  requires_competitor_assets: boolean
  estimated_shot_count: number
  duration: string
  hook_type?: HookType
  first_3_seconds_text?: string
  first_3_seconds_visual?: string
  scroll_stop_reason?: string
  emotional_trigger?: string[]
  script_structure?: ScriptStructure
  retention_design?: RetentionDesign
  key_message?: string
  proof_point?: string
  cta?: CTA
  tiktok_native_style?: TiktokNativeStyle
  text_overlay_plan?: TextOverlayPlan
  sound_or_voiceover_plan?: SoundOrVoiceoverPlan
  viral_pattern_ref?: ViralPatternRef
  adapted_pattern_ref?: ProductAdaptedPatternRef
}

export interface VideoBatch {
  batch_id: BatchId
  product_series_id: ProductSeriesId
  variant_id: VariantId
  total_videos: number
  batch_goal: BatchGoal
  default_generation_policy: DefaultGenerationPolicy
  videos: VideoPlan[]
}

export interface VideoBatchPlan {
  video_batch_plan: VideoBatch
}
