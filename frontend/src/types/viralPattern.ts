import type {
  BatchId,
  OpenStringUnion,
  ProductSeriesId,
  VariantId,
  VideoId,
} from './common'
import type { HookType } from './creative'

export type PatternCategory = OpenStringUnion<
  | 'conflict_reversal'
  | 'satisfaction_release'
  | 'awkward_rescue'
  | 'identity_entry'
  | 'low_cost_big_problem'
  | 'test_challenge'
>

export type SourcePlatform = OpenStringUnion<
  | 'TikTok'
  | 'TikTok Shop'
  | 'Douyin'
  | 'Xiaohongshu'
  | 'Kuaishou'
  | 'YouTube Shorts'
  | 'Instagram Reels'
  | 'competitor_ads'
  | 'creator_voiceover'
  | 'short_drama'
>

/** Source regions are required strings but have no closed source enum. */
export type SourceRegion = string
export type AttentionTrigger = string
export type EmotionalPayload = string
export type TransferableElement = string
export type NonTransferableElement = string
/** Risk levels are not enumerated in the current Schema or rules. */
export type CreativeTransferRiskLevel = string
export type CreativeTransferRiskCheck = Record<string, unknown>

export interface ViralPatternCard {
  pattern_id: string
  source_platform: SourcePlatform
  source_region: SourceRegion
  source_category: string
  source_url?: string
  pattern_name: string
  original_context_summary: string
  attention_trigger: AttentionTrigger[]
  first_3_seconds_mechanism: string
  retention_mechanism: string
  emotional_payload: EmotionalPayload[]
  structure: Record<string, unknown>
  transferable_elements: TransferableElement[]
  non_transferable_elements: NonTransferableElement[]
  suitable_product_types: string[]
  risk_flags: string[]
}

export interface ProductAdaptedPattern {
  adapted_pattern_id: string
  source_pattern_id: string
  product_series_id: ProductSeriesId
  variant_id: VariantId
  batch_id: BatchId
  video_id: VideoId
  adapted_concept: string
  hook_type: HookType
  first_3_seconds_text: string
  first_3_seconds_visual: string
  emotional_trigger: EmotionalPayload[]
  product_role: string
  proof_scene: string
  cta: string
  risk_check: CreativeTransferRiskCheck
}
