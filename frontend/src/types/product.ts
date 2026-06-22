import type {
  BatchId,
  ImageId,
  ProductSeriesId,
  VariantId,
} from './common'

export interface Variant {
  variant_id: VariantId
  seller_sku: string
  platform_sku?: string
  variant_name: string
  attributes: Record<string, unknown>
  image_asset_ids: ImageId[]
  optional_revision?: Record<string, unknown> | null
}

export interface VariantDifferenceReport {
  checked: boolean
  content_must_be_separated: boolean
  non_shareable_fields: string[]
}

export interface ProductSeriesVideoBatchReference {
  batch_id: BatchId
  product_series_id: ProductSeriesId
  variant_id: VariantId
}

export interface ProductSeries {
  product_series_id: ProductSeriesId
  product_series_name: string
  platform_category: string
  target_market: string
  variants: Variant[]
  variant_difference_report: VariantDifferenceReport
  selected_variant_id: VariantId
  video_batch_plan?: ProductSeriesVideoBatchReference
}

/**
 * Workflow context from the design, not a standalone backend Schema object.
 * Membership of selected_variant_id and all cross-object ID equality checks
 * remain task 13 validator responsibilities.
 */
export interface SelectedVariantContext {
  product_series_id: ProductSeriesId
  selected_variant_id: VariantId
  variant_id: VariantId
  batch_id: BatchId
}
