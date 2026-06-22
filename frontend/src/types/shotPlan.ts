import type {
  BatchId,
  ImageId,
  ProductSeriesId,
  ShotId,
  VariantId,
  VideoId,
  VideoType,
} from './common'
import type {
  SoundOrVoiceoverPlan,
  TextOverlayPlan,
} from './creative'

export type ShotGoal =
  | '放大痛点'
  | '展示产品'
  | '证明卖点'
  | '建立信任'
  | '推动剧情'
  | '促进转化'

/** The accepted values and decision method remain unresolved. */
export type PlotVsProductBalance = string

export interface ShotCard {
  shot_id: ShotId
  duration: string
  goal: ShotGoal
  video_type?: VideoType
  visual_content?: string
  subject_action?: string
  product_visible: boolean
  product_appearance?: string
  selling_point?: string
  subtitle_text?: string
  voiceover_text?: string
  camera_movement?: string
  visual_texture?: string
  lighting?: string
  input_images: ImageId[]
  reference_videos?: string[]
  product_constraints?: string
  negative_prompt?: string
  distortion_risk: string
  output_goal?: string
  emotional_trigger?: string[]
  pattern_role?: string
  product_first_visible_time?: number
  product_proof_start_time?: number
  plot_vs_product_balance?: PlotVsProductBalance
  proof_scene?: string
  cta_visual?: string
  text_overlay_plan?: TextOverlayPlan
  sound_or_voiceover_plan?: SoundOrVoiceoverPlan
}

export interface VideoShotPlan {
  video_id: VideoId
  creative_board_path?: string
  storyboard_path?: string
  product_first_visible_time?: number
  product_proof_start_time?: number
  plot_vs_product_balance?: PlotVsProductBalance
  text_overlay_plan?: TextOverlayPlan
  sound_or_voiceover_plan?: SoundOrVoiceoverPlan
  shots: ShotCard[]
}

export interface ShotAssetPlanDetails {
  product_series_id: ProductSeriesId
  variant_id: VariantId
  batch_id: BatchId
  videos: VideoShotPlan[]
}

export interface ShotAssetPlan {
  shot_asset_plan: ShotAssetPlanDetails
}

/**
 * The current Schema has no standalone Seedance prompt definition. This alias
 * exposes only prompt-related fields that already exist on the shot Schema.
 */
export type SeedancePromptDraft = Pick<
  ShotCard,
  | 'shot_id'
  | 'duration'
  | 'input_images'
  | 'reference_videos'
  | 'camera_movement'
  | 'lighting'
  | 'product_constraints'
  | 'subtitle_text'
  | 'negative_prompt'
  | 'output_goal'
>
