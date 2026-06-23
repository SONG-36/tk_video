import { useMemo, useState, type FormEvent } from 'react'
import { useLocation, useParams } from 'react-router'
import { canEnterPage, getBlockedReason } from '../../state/workflowGuards'
import { WORKFLOW_FLAGS } from '../../state/workflowState'
import type { ContentCategory, JudgementReport } from '../../types/report'
import {
  applyJudgementReportConfirmation,
  getJudgementReportConfirmationIssues,
  getJudgementReportDraftIssues,
  judgementReportContextFixture,
  judgementReportContractGaps,
  judgementReportFixture,
  judgementReportFixtureSource,
  judgementReportWorkflowFixture,
  updateClassificationField,
} from './fixture'
import './Page.css'

const contentCategoryOptions: ContentCategory[] = [
  '小件标品',
  '非标品',
  '大件标品',
]

function cloneReportFixture(): JudgementReport {
  return {
    ...judgementReportFixture,
    classification_report: { ...judgementReportFixture.classification_report },
    video_fit_report: {
      recommended_video_types:
        judgementReportFixture.video_fit_report.recommended_video_types.map(
          (item) => ({ ...item }),
        ),
      not_recommended_video_types:
        judgementReportFixture.video_fit_report.not_recommended_video_types.map(
          (item) => ({ ...item }),
        ),
    },
    category_playbook: { ...judgementReportFixture.category_playbook },
    risks: [...judgementReportFixture.risks],
    missing_information: [...judgementReportFixture.missing_information],
  }
}

function textToItems(value: string): string[] {
  return value
    .split('\n')
    .map((item) => item.trim())
    .filter(Boolean)
}

export default function JudgementReportPage() {
  const location = useLocation()
  const params = useParams<{
    productSeriesId: string
    variantId: string
  }>()
  const [draft, setDraft] = useState<JudgementReport>(cloneReportFixture)
  const [risksReviewed, setRisksReviewed] = useState(false)
  const [saveMessage, setSaveMessage] = useState('尚未保存本地草稿')
  const [confirmationAttempted, setConfirmationAttempted] = useState(false)

  const entryAllowed = canEnterPage(
    'judgement_report',
    judgementReportWorkflowFixture,
  )
  const guardBlockedReason = getBlockedReason(
    'judgement_report',
    judgementReportWorkflowFixture,
  )
  const routeMatchesFixture =
    params.productSeriesId ===
      judgementReportContextFixture.product_series_id &&
    params.variantId === judgementReportContextFixture.selected_variant_id

  const draftIssues = useMemo(
    () => getJudgementReportDraftIssues(draft),
    [draft],
  )
  const confirmationIssues = useMemo(
    () =>
      getJudgementReportConfirmationIssues({
        draft,
        workflow: judgementReportWorkflowFixture,
        entryAllowed,
        routeMatchesFixture,
        risksReviewed,
      }),
    [draft, entryAllowed, routeMatchesFixture, risksReviewed],
  )
  const canConfirm = confirmationIssues.length === 0
  const activeReadinessFlags = WORKFLOW_FLAGS.filter(
    (flag) => judgementReportWorkflowFixture.flags[flag],
  )

  const updateClassification = <Field extends keyof JudgementReport['classification_report']>(
    field: Field,
    value: JudgementReport['classification_report'][Field],
  ) => {
    setDraft((current) => updateClassificationField(current, field, value))
    setConfirmationAttempted(false)
  }

  const updateListField = (
    field: 'risks' | 'missing_information',
    value: string,
  ) => {
    setDraft((current) => ({
      ...current,
      [field]: textToItems(value),
      confirmed_by_user: false,
    }))
    setConfirmationAttempted(false)
  }

  const handleConfirm = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setConfirmationAttempted(true)
    setDraft((current) =>
      applyJudgementReportConfirmation(current, confirmationIssues),
    )
  }

  return (
    <section className="judgement-report-page" data-page="judgement_report">
      <header>
        <h1>Judgement Report / 判断报告</h1>
        <p>
          基于已确认型号画像展示本地 fixture 报告骨架；不生成真实报告，不调用后端。
        </p>
        <p>
          <strong>Page key:</strong> judgement_report
        </p>
        <p>
          <strong>Current route:</strong> {location.pathname}
        </p>
      </header>

      <section className="judgement-report-context" aria-labelledby="report-context-title">
        <h2 id="report-context-title">报告上下文</h2>
        <dl>
          <dt>product_series_id</dt>
          <dd>{judgementReportContextFixture.product_series_id}</dd>
          <dt>selected_variant_id</dt>
          <dd>{judgementReportContextFixture.selected_variant_id}</dd>
          <dt>目标型号</dt>
          <dd>{judgementReportContextFixture.variant_name}</dd>
          <dt>judgement_report_id</dt>
          <dd>当前契约未定义，以系列 ID + 型号 ID 绑定</dd>
          <dt>variant_profile_status</dt>
          <dd>{judgementReportContextFixture.variant_profile_status}</dd>
          <dt>当前 mock 状态</dt>
          <dd>{judgementReportWorkflowFixture.status}</dd>
          <dt>readiness flags</dt>
          <dd>
            {activeReadinessFlags.length > 0
              ? activeReadinessFlags.join('、')
              : '9 项均为 clear'}
          </dd>
          <dt>当前允许确认</dt>
          <dd>{canConfirm ? '是' : '否'}</dd>
        </dl>
      </section>

      {entryAllowed && routeMatchesFixture ? (
        <p className="judgement-report-success" role="status">
          页面进入闸门已通过；报告 fixture 已绑定当前 selected_variant_id。
        </p>
      ) : (
        <p className="judgement-report-notice" role="alert">
          阻断：
          {guardBlockedReason ??
            '当前路由 ID 与报告 fixture 的 selected_variant_id 不一致。'}
        </p>
      )}

      <aside className="judgement-report-notice" aria-labelledby="report-gap-title">
        <strong id="report-gap-title">契约缺口（本页不补造）</strong>
        <ul className="judgement-report-list">
          {judgementReportContractGaps.map((gap) => (
            <li key={gap}>{gap}</li>
          ))}
        </ul>
      </aside>

      <form onSubmit={handleConfirm}>
        <fieldset
          className="judgement-report-panel"
          disabled={!entryAllowed || !routeMatchesFixture}
        >
          <legend>本地报告草稿</legend>

          <section className="judgement-report-panel" aria-labelledby="classification-title">
            <h2 id="classification-title">
              classification_report / 产品分类判断
            </h2>
            <div className="judgement-report-grid">
              <label className="judgement-report-field">
                分类结果
                <select
                  value={draft.classification_report.content_category}
                  onChange={(event) =>
                    updateClassification(
                      'content_category',
                      event.target.value as ContentCategory,
                    )
                  }
                >
                  {contentCategoryOptions.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </label>
              {(
                [
                  ['shooting_ease', '拍摄容易度'],
                  ['seeding_ease', '种草容易度'],
                  ['purchase_decision_ease', '消费决策容易度'],
                ] as const
              ).map(([field, label]) => (
                <label className="judgement-report-field" key={field}>
                  {label}（1—5）
                  <input
                    type="number"
                    min="1"
                    max="5"
                    step="1"
                    value={draft.classification_report[field]}
                    onChange={(event) =>
                      updateClassification(field, Number(event.target.value))
                    }
                  />
                </label>
              ))}
              <label className="judgement-report-field">
                自制视频推荐
                <input
                  value={
                    draft.classification_report
                      .self_made_video_recommendation
                  }
                  onChange={(event) =>
                    updateClassification(
                      'self_made_video_recommendation',
                      event.target.value,
                    )
                  }
                />
              </label>
            </div>
            <p>
              分类依据、适用类目、目标用户和结构化转化风险不是当前
              `classification_report` 字段，不在本页新增。
            </p>
          </section>

          <section className="judgement-report-panel" aria-labelledby="video-fit-title">
            <h2 id="video-fit-title">video_fit_report / 视频分型建议</h2>
            <div className="judgement-report-grid">
              {draft.video_fit_report.recommended_video_types.map((item) => (
                <article className="judgement-report-video-card" key={item.type}>
                  <h3>{item.name}</h3>
                  <p>评分：{item.score ?? '未提供'}</p>
                  <p>主力：{item.is_main_video_type ? '是' : '否'}</p>
                  <p>{item.reason}</p>
                </article>
              ))}
            </div>
            <h3>不推荐分型</h3>
            <ul className="judgement-report-list">
              {draft.video_fit_report.not_recommended_video_types.map((item) => (
                <li key={item.type}>
                  {item.name}：{item.reason}
                </li>
              ))}
            </ul>
          </section>

          <section className="judgement-report-panel" aria-labelledby="playbook-title">
            <h2 id="playbook-title">category_playbook / 类目打法</h2>
            <div className="judgement-report-grid">
              {Object.entries(draft.category_playbook).map(([key, value]) => (
                <div key={key}>
                  <h3>{key}</h3>
                  {Array.isArray(value) ? (
                    <ul className="judgement-report-list">
                      {value.map((item) => (
                        <li key={String(item)}>{String(item)}</li>
                      ))}
                    </ul>
                  ) : (
                    <p>{String(value)}</p>
                  )}
                </div>
              ))}
            </div>
          </section>

          <section className="judgement-report-panel" aria-labelledby="risk-summary-title">
            <h2 id="risk-summary-title">risks / 风险汇总</h2>
            <label className="judgement-report-field">
              每行一个风险项
              <textarea
                rows={4}
                value={draft.risks.join('\n')}
                onChange={(event) => updateListField('risks', event.target.value)}
              />
            </label>
          </section>

          <section className="judgement-report-panel" aria-labelledby="missing-info-title">
            <h2 id="missing-info-title">
              missing_information / 缺失信息
            </h2>
            <label className="judgement-report-field">
              每行一个缺失项；保留给后续材料检查
              <textarea
                rows={5}
                value={draft.missing_information.join('\n')}
                onChange={(event) =>
                  updateListField('missing_information', event.target.value)
                }
              />
            </label>
          </section>

          <section className="judgement-report-panel" aria-labelledby="next-step-title">
            <h2 id="next-step-title">下一步与人工确认</h2>
            <p>
              当前契约没有 `next_step` 对象。按状态机，报告经人工确认后才可进入
              material_check；本页不会修改共享 workflow。
            </p>
            <label>
              <input
                type="checkbox"
                checked={risksReviewed}
                onChange={(event) => {
                  setRisksReviewed(event.target.checked)
                  setDraft((current) => ({
                    ...current,
                    confirmed_by_user: false,
                  }))
                  setConfirmationAttempted(false)
                }}
              />{' '}
              我已阅读风险与缺失信息
            </label>
          </section>
        </fieldset>

        {draftIssues.length > 0 && (
          <div className="judgement-report-notice" role="alert">
            <strong>报告字段不完整</strong>
            <ul className="judgement-report-list">
              {draftIssues.map((issue) => (
                <li key={issue}>{issue}</li>
              ))}
            </ul>
          </div>
        )}

        <div className="judgement-report-actions">
          <button
            type="button"
            onClick={() => setSaveMessage('本地草稿已保存到页面内存')}
          >
            保存本地草稿
          </button>
          <button type="submit" aria-disabled={!canConfirm}>
            尝试人工确认
          </button>
          <span>{saveMessage}</span>
          <span>
            人工确认状态：
            {draft.confirmed_by_user ? '已确认（仅本地）' : '未确认'}
          </span>
        </div>

        {confirmationAttempted && confirmationIssues.length > 0 && (
          <div className="judgement-report-notice" role="alert">
            <strong>确认失败，不推进状态</strong>
            <ul className="judgement-report-list">
              {confirmationIssues.map((issue) => (
                <li key={issue}>{issue}</li>
              ))}
            </ul>
          </div>
        )}

        {draft.confirmed_by_user && (
          <p className="judgement-report-success" role="status">
            fixture 报告已人工确认；共享 workflow 仍保持 report_generated。
          </p>
        )}
      </form>

      <details className="judgement-report-debug">
        <summary>Fixture / debug 信息</summary>
        <p>{judgementReportFixtureSource}</p>
        <pre>
          {JSON.stringify(
            {
              context: judgementReportContextFixture,
              workflow: judgementReportWorkflowFixture,
              report: draft,
              confirmation_issues: confirmationIssues,
              contract_gaps: judgementReportContractGaps,
            },
            null,
            2,
          )}
        </pre>
      </details>
    </section>
  )
}
