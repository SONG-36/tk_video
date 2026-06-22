import type {
  ImageId,
  ProductSeriesId,
  VariantId,
} from './common'

export type ImageAssetType =
  | 'product_reference'
  | 'product_detail'
  | 'usage_scene'
  | 'before_after'
  | 'packaging'
  | 'style_reference'
  | 'motion_reference'

/** No closed enum exists in image_asset.schema.json. */
export type ImageCompletenessLevel = string
/** The Schema deliberately keeps distortion risk open as a string. */
export type ImageDistortionRisk = string
export type ImageUsage = string

export interface ImageAsset {
  product_series_id: ProductSeriesId
  variant_id: VariantId
  image_id: ImageId
  file_name: string
  image_type: ImageAssetType
  view_angle: string
  usage: ImageUsage[]
  quality: string
  required: boolean
  notes: string
}
