import { useState } from 'react'
import { useLocation, useParams } from 'react-router'
import type { ShotAssetPlan } from '../../types/shotPlan'
import { context, fixtureSource, getIssues, getRisks, levels, plan as source } from './fixture'
import './Page.css'

export default function ShotAssetPlanPage() {
  const location = useLocation()
  const params = useParams()
  const [plan, setPlan] = useState<ShotAssetPlan>({
    shot_asset_plan: {
      ...source.shot_asset_plan,
      videos: source.shot_asset_plan.videos.map((video) => ({ ...video, shots: video.shots.map((shot) => ({ ...shot })) })),
    },
  })
  const [message, setMessage] = useState('未确认')
  const issues = getIssues(plan)
  const risks = getRisks(plan)

  return <section className="local-form-page shot-asset-plan-page" data-page="shot_asset_plan">
    <header>
      <h1>镜头资产规划页</h1>
      <p><strong>Page key:</strong> shot_asset_plan</p>
      <p><strong>Current route:</strong> {location.pathname}</p>
      <p>IDs：{params.productSeriesId}/{params.variantId}/{params.batchId}; fixture：{context.product_series_id}/{context.selected_variant_id}/{context.batch_id}</p>
      <p>上游：{context.status}</p>
    </header>
    <div className="local-grid">{plan.shot_asset_plan.videos.map((video, videoIndex) => <article key={video.video_id}>
      <h2>{video.video_id} / {levels[video.video_id as keyof typeof levels]}</h2>
      <p>Creative Board：{video.creative_board_path ?? '轻量/未要求'}</p>
      <p>Storyboard：{video.storyboard_path ?? '轻量/未要求'}</p>
      <p>产品首次出现：{video.product_first_visible_time ?? '未记录'} / 证明开始：{video.product_proof_start_time ?? '未记录'}</p>
      <p>plot_vs_product_balance：{video.plot_vs_product_balance ?? '未定义'}</p>
      {video.shots.map((shot, shotIndex) => <div key={shot.shot_id} className="local-panel">
        <h3>Shot Card / Seedance Prompt 草案：{shot.shot_id}</h3>
        <p>duration：{shot.duration} / goal：{shot.goal}</p>
        <p>product_visible：{String(shot.product_visible)}</p>
        <p>input_images：{shot.input_images.join('、')}</p>
        <label className="local-field">distortion_risk<input value={shot.distortion_risk} onChange={(event) => setPlan({ shot_asset_plan: { ...plan.shot_asset_plan, videos: plan.shot_asset_plan.videos.map((item, itemIndex) => itemIndex === videoIndex ? { ...item, shots: item.shots.map((candidate, candidateIndex) => candidateIndex === shotIndex ? { ...candidate, distortion_risk: event.target.value } : candidate) } : item) } })} /></label>
        <p>emotional_trigger：{shot.emotional_trigger?.join('、')} / pattern_role：{shot.pattern_role}</p>
        <p>proof_scene：{shot.proof_scene} / cta_visual：{shot.cta_visual}</p>
      </div>)}
    </article>)}</div>
    <p className="local-alert">notes / missing_assets 不在当前 ShotAssetPlan Schema，本页不擅自补字段。8/12 秒与剧情平衡仅显示风险，不实现跨镜头算法。{risks.join(' ')}</p>
    <div className="local-actions">
      <button type="button" onClick={() => setMessage('镜头草稿已保存到页面内存')}>保存本地草稿</button>
      <button type="button" onClick={() => setMessage(issues.length ? `确认失败：${issues.join(' ')}` : '镜头计划已本地确认，不生成 prompt 文件、不推进 workflow')}>尝试确认</button>
      <span>{message}</span>
    </div>
    {issues.length > 0 && <p className="local-alert">阻断：{issues.join(' ')}</p>}
    <details className="local-debug"><summary>Fixture / debug 信息</summary><p>{fixtureSource}</p><pre>{JSON.stringify({ plan, levels, issues, risks }, null, 2)}</pre></details>
  </section>
}
