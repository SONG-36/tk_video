import { useState } from 'react'
import { useLocation, useParams } from 'react-router'
import type { CreativeDirection } from '../../types/creative'
import { adaptedPattern, context, direction as source, fixtureSource, getIssues, viralPattern } from './fixture'
import './Page.css'

export default function CreativeDirectionPage() {
  const location = useLocation()
  const params = useParams()
  const [direction, setDirection] = useState<CreativeDirection>({
    ...source,
    creative_direction: {
      ...source.creative_direction,
      selected_styles: [...source.creative_direction.selected_styles],
      story_structures: [...source.creative_direction.story_structures],
    },
  })
  const [message, setMessage] = useState('未确认')
  const issues = getIssues(direction)
  const creative = direction.creative_direction

  return <section className="local-form-page creative-direction-page" data-page="creative_direction">
    <header>
      <h1>创意方向设定页</h1>
      <p><strong>Page key:</strong> creative_direction</p>
      <p><strong>Current route:</strong> {location.pathname}</p>
      <p>product_series_id：{params.productSeriesId} / selected_variant_id：{context.selected_variant_id} / 上游：{context.status}</p>
    </header>
    <div className="local-grid">
      <article>
        <h2>创意输入</h2>
        <p>创意风格：{creative.selected_styles.join('、')}</p>
        <p>剧情结构：{creative.story_structures.join('、')}</p>
        <p>表达强度：{creative.expression_level}</p>
        <p>真人限制：{creative.human_policy}</p>
        <label className="local-field">自由创意输入<textarea value={creative.user_free_idea ?? ''} onChange={(event) => setDirection({ ...direction, creative_direction: { ...creative, user_free_idea: event.target.value }, confirmed_by_user: false })} /></label>
      </article>
      <article>
        <h2>系统专业翻译 fixture</h2>
        <p>运镜：{creative.system_translation.camera_language.join('、')}</p>
        <p>质感：{creative.system_translation.visual_texture.join('、')}</p>
        <p>节奏：{creative.system_translation.rhythm}</p>
        <p>素材：{creative.system_translation.asset_needs.join('、')}</p>
      </article>
      <article>
        <h2>TikTok 原生结构</h2>
        <p>hook 偏好：{creative.hook_preferences?.join('、')}</p>
        <p>原生风格：{creative.native_style_requirement}</p>
        <p>结构：{creative.tiktok_creative_structure?.script_structure?.join(' → ')}</p>
      </article>
      <article>
        <h2>爆款模式迁移</h2>
        <p>{viralPattern.pattern_id} / {viralPattern.pattern_name}</p>
        <p>{adaptedPattern.adapted_pattern_id} / {adaptedPattern.adapted_concept}</p>
        <p>跨文化适配提醒：禁止复制原台词、人物与画面。</p>
        <p>产品适配提醒：产品必须承担解决方案。</p>
      </article>
    </div>
    <p className="local-alert">剧情压过产品仅作风险提示，不实现确定性算法；创意翻译不调用模型。“重点突出卖点”存在于设计，但不在当前 CreativeDirection Schema，本页不擅自补字段。</p>
    <div className="local-actions">
      <button type="button" onClick={() => setMessage('创意草稿已保存到页面内存')}>保存本地草稿</button>
      <button type="button" onClick={() => setMessage(issues.length ? `确认失败：${issues.join(' ')}` : '创意已本地确认，不推进 workflow')}>尝试确认</button>
      <span>{message}</span>
    </div>
    {issues.length > 0 && <p className="local-alert">阻断：{issues.join(' ')}</p>}
    <details className="local-debug"><summary>Fixture / debug 信息</summary><p>{fixtureSource}</p><pre>{JSON.stringify({ direction, viralPattern, adaptedPattern, issues }, null, 2)}</pre></details>
  </section>
}
