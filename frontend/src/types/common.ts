/** Central aliases for identifiers projected from the backend schemas. */
export type ProductSeriesId = string
export type VariantId = string
export type BatchId = string
export type VideoId = string
export type ShotId = string
export type ImageId = string

export type VideoType =
  | 'life_scenario'
  | 'selling_point'
  | 'unboxing'
  | 'buyer_seller_show'
  | 'evaluation_comparison'

export type OpenStringUnion<Known extends string> =
  | Known
  | (string & Record<never, never>)
