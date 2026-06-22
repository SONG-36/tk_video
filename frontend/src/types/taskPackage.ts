import type { BatchId, ProductSeriesId, VariantId } from './common'
import type { CreativeDirection } from './creative'
import type { ImageAsset } from './imageAsset'
import type { MaterialCheck } from './material'
import type { JudgementReport } from './report'
import type { ShotAssetPlan } from './shotPlan'
import type {
  ProductAdaptedPattern,
  ViralPatternCard,
} from './viralPattern'
import type { VideoBatchPlan } from './videoBatch'

/** The Schema currently reserves this as an unrestricted object. */
export type TiktokCreativeRequirements = Record<string, unknown>

export interface CreativeTransferConstraints {
  product_first_visible_max_seconds?: 8
  product_proof_start_max_seconds?: 12
  plot_must_not_overpower_product?: true
  reference_pattern_not_source_copy?: true
}

export type BlockedCopyingBehavior = string

export interface CodexTaskPackage {
  product_series_id: ProductSeriesId
  variant_id: VariantId
  batch_id: BatchId
  judgement_report: JudgementReport
  material_check: MaterialCheck
  image_assets: ImageAsset[]
  creative_direction: CreativeDirection
  video_batch_plan: VideoBatchPlan
  shot_asset_plan: ShotAssetPlan
  available_materials: string[]
  missing_materials: string[]
  do_not_invent: string[]
  output_root: string
  tiktok_creative_requirements?: TiktokCreativeRequirements
  viral_pattern_cards?: ViralPatternCard[]
  product_adapted_patterns?: ProductAdaptedPattern[]
  creative_transfer_constraints?: CreativeTransferConstraints
  blocked_copying_behaviors?: BlockedCopyingBehavior[]
}
