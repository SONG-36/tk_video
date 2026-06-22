import type { ComponentType } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router'
import App, { NotFoundPage } from './App'
import CategoryConfirmPage from './pages/category_confirm/Page'
import CreativeDirectionPage from './pages/creative_direction/Page'
import ImageAssetCheckPage from './pages/image_asset_check/Page'
import JudgementReportPage from './pages/judgement_report/Page'
import MaterialCheckPage from './pages/material_check/Page'
import OutputViewerPage from './pages/output_viewer/Page'
import { pageMeta, type PageKey } from './pages/pageMeta'
import ProductCreatePage from './pages/product_create/Page'
import ProductListPage from './pages/product_list/Page'
import ShotAssetPlanPage from './pages/shot_asset_plan/Page'
import TargetVariantSelectPage from './pages/target_variant_select/Page'
import TaskPackageExportPage from './pages/task_package_export/Page'
import VariantDifferenceCheckPage from './pages/variant_difference_check/Page'
import VariantProfilePage from './pages/variant_profile/Page'
import VariantSkuInputPage from './pages/variant_sku_input/Page'
import VideoBatchPlanPage from './pages/video_batch_plan/Page'

const pageComponents: Record<PageKey, ComponentType> = {
  product_list: ProductListPage,
  product_create: ProductCreatePage,
  category_confirm: CategoryConfirmPage,
  variant_sku_input: VariantSkuInputPage,
  variant_difference_check: VariantDifferenceCheckPage,
  target_variant_select: TargetVariantSelectPage,
  variant_profile: VariantProfilePage,
  judgement_report: JudgementReportPage,
  material_check: MaterialCheckPage,
  image_asset_check: ImageAssetCheckPage,
  creative_direction: CreativeDirectionPage,
  video_batch_plan: VideoBatchPlanPage,
  shot_asset_plan: ShotAssetPlanPage,
  task_package_export: TaskPackageExportPage,
  output_viewer: OutputViewerPage,
}

export function RouteTree() {
  return (
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<Navigate to="/products" replace />} />
        {pageMeta.map((page) => {
          const Page = pageComponents[page.key]

          return <Route key={page.key} path={page.routePath} element={<Page />} />
        })}
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}

export function AppRouter() {
  return (
    <BrowserRouter>
      <RouteTree />
    </BrowserRouter>
  )
}
