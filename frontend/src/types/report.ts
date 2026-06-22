import type { ProductSeriesId, VariantId, VideoType } from './common'

export type ContentCategory = '小件标品' | '非标品' | '大件标品'

export type VideoTypeName =
  | '生活场景型'
  | '卖点讲解型'
  | '开箱直拍型'
  | '买家卖家秀型'
  | '测评对比型'

export interface ClassificationReport {
  content_category: ContentCategory
  shooting_ease: number
  seeding_ease: number
  purchase_decision_ease: number
  self_made_video_recommendation: string
}

export interface VideoTypeRecommendation {
  type: VideoType
  name: VideoTypeName
  score?: number
  is_main_video_type?: boolean
  reason: string
}

export interface VideoFitReport {
  recommended_video_types: VideoTypeRecommendation[]
  not_recommended_video_types: VideoTypeRecommendation[]
}

export type CategoryPlaybook = Record<string, unknown>
export type RiskWarning = string
export type MissingInformation = string

export interface JudgementReport {
  product_series_id: ProductSeriesId
  variant_id: VariantId
  classification_report: ClassificationReport
  video_fit_report: VideoFitReport
  category_playbook: CategoryPlaybook
  risks: RiskWarning[]
  missing_information: MissingInformation[]
  confirmed_by_user: boolean
}
