export interface PageDefinition {
  key: string
  title: string
  routePath: string
  examplePath: string
}

export const pageMeta = [
  {
    key: 'product_list',
    title: '商品列表页',
    routePath: '/products',
    examplePath: '/products',
  },
  {
    key: 'product_create',
    title: '新建商品页',
    routePath: '/products/new',
    examplePath: '/products/new',
  },
  {
    key: 'category_confirm',
    title: '类目确认页',
    routePath: '/products/:productSeriesId/category',
    examplePath: '/products/p_001/category',
  },
  {
    key: 'variant_sku_input',
    title: '型号 / SKU 录入页',
    routePath: '/products/:productSeriesId/variants',
    examplePath: '/products/p_001/variants',
  },
  {
    key: 'variant_difference_check',
    title: '型号差异判断页',
    routePath: '/products/:productSeriesId/variant-differences',
    examplePath: '/products/p_001/variant-differences',
  },
  {
    key: 'target_variant_select',
    title: '本次拍摄型号选择页',
    routePath: '/products/:productSeriesId/target-variant',
    examplePath: '/products/p_001/target-variant',
  },
  {
    key: 'variant_profile',
    title: '型号级商品画像补全页',
    routePath: '/products/:productSeriesId/variants/:variantId/profile',
    examplePath: '/products/p_001/variants/sku_001/profile',
  },
  {
    key: 'judgement_report',
    title: '型号级判断报告页',
    routePath: '/products/:productSeriesId/variants/:variantId/report',
    examplePath: '/products/p_001/variants/sku_001/report',
  },
  {
    key: 'material_check',
    title: '材料检查页',
    routePath: '/products/:productSeriesId/variants/:variantId/materials',
    examplePath: '/products/p_001/variants/sku_001/materials',
  },
  {
    key: 'image_asset_check',
    title: '型号级产品图片资产页',
    routePath: '/products/:productSeriesId/variants/:variantId/images',
    examplePath: '/products/p_001/variants/sku_001/images',
  },
  {
    key: 'creative_direction',
    title: '创意方向设定页',
    routePath: '/products/:productSeriesId/variants/:variantId/creative',
    examplePath: '/products/p_001/variants/sku_001/creative',
  },
  {
    key: 'video_batch_plan',
    title: '型号级视频批次规划页',
    routePath:
      '/products/:productSeriesId/variants/:variantId/batches/:batchId/plan',
    examplePath: '/products/p_001/variants/sku_001/batches/batch_001/plan',
  },
  {
    key: 'shot_asset_plan',
    title: '镜头资产规划页',
    routePath:
      '/products/:productSeriesId/variants/:variantId/batches/:batchId/shots',
    examplePath: '/products/p_001/variants/sku_001/batches/batch_001/shots',
  },
  {
    key: 'task_package_export',
    title: 'Codex 任务包导出页',
    routePath:
      '/products/:productSeriesId/variants/:variantId/batches/:batchId/task-package',
    examplePath:
      '/products/p_001/variants/sku_001/batches/batch_001/task-package',
  },
  {
    key: 'output_viewer',
    title: '输出结果查看页',
    routePath:
      '/products/:productSeriesId/variants/:variantId/batches/:batchId/outputs',
    examplePath: '/products/p_001/variants/sku_001/batches/batch_001/outputs',
  },
] as const satisfies readonly PageDefinition[]

export type PageKey = (typeof pageMeta)[number]['key']

export const pageByKey = Object.fromEntries(
  pageMeta.map((page) => [page.key, page]),
) as Record<PageKey, (typeof pageMeta)[number]>
