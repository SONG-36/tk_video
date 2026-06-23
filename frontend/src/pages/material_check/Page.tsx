import { useMemo, useState, type FormEvent } from 'react'
import { useLocation, useParams } from 'react-router'
import { canEnterPage, getBlockedReason } from '../../state/workflowGuards'
import type { MaterialCheck } from '../../types/material'
import {
  applyMaterialCheckConfirmation,
  getMaterialCheckConfirmationIssues,
  getMaterialCheckDraftIssues,
  materialCheckContextFixture,
  materialCheckContractGaps,
  materialCheckFixture,
  materialCheckFixtureSource,
  materialCheckWorkflowFixture,
  updateMaterialList,
} from './fixture'
import './Page.css'

function cloneMaterialFixture(): MaterialCheck {
  return {
    ...materialCheckFixture,
    required_materials: [...materialCheckFixture.required_materials],
    recommended_materials: [...materialCheckFixture.recommended_materials],
    risk_materials: [...materialCheckFixture.risk_materials],
    missing_materials: [...materialCheckFixture.missing_materials],
    do_not_invent: [...materialCheckFixture.do_not_invent],
  }
}

function textToItems(value: string): string[] {
  return value
    .split('\n')
    .map((item) => item.trim())
    .filter(Boolean)
}

export default function MaterialCheckPage() {
  const location = useLocation()
  const params = useParams<{
    productSeriesId: string
    variantId: string
  }>()
  const [draft, setDraft] = useState<MaterialCheck>(cloneMaterialFixture)
  const [recommendedMissingConfirmed, setRecommendedMissingConfirmed] =
    useState(false)
  const [saveMessage, setSaveMessage] = useState('尚未保存本地草稿')
  const [confirmationAttempted, setConfirmationAttempted] = useState(false)

  const entryAllowed = canEnterPage(
    'material_check',
    materialCheckWorkflowFixture,
  )
  const guardBlockedReason = getBlockedReason(
    'material_check',
    materialCheckWorkflowFixture,
  )
  const routeMatchesFixture =
    params.productSeriesId === materialCheckContextFixture.product_series_id &&
    params.variantId === materialCheckContextFixture.selected_variant_id

  const draftIssues = useMemo(
    () => getMaterialCheckDraftIssues(draft),
    [draft],
  )
  const confirmationIssues = useMemo(
    () =>
      getMaterialCheckConfirmationIssues({
        draft,
        workflow: materialCheckWorkflowFixture,
        entryAllowed,
        routeMatchesFixture,
        recommendedMissingConfirmed,
      }),
    [
      draft,
      entryAllowed,
      routeMatchesFixture,
      recommendedMissingConfirmed,
    ],
  )
  const canConfirm = confirmationIssues.length === 0

  const updateList = (
    field: 'missing_materials' | 'do_not_invent',
    value: string,
  ) => {
    setDraft((current) =>
      updateMaterialList(current, field, textToItems(value)),
    )
    setConfirmationAttempted(false)
  }

  const handleConfirm = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setConfirmationAttempted(true)
    setDraft((current) =>
      applyMaterialCheckConfirmation(current, confirmationIssues),
    )
  }

  const materialGroups = [
    ['required_materials', '必须材料', draft.required_materials],
    ['recommended_materials', '建议材料', draft.recommended_materials],
    ['risk_materials', '风险材料', draft.risk_materials],
  ] as const

  return (
    <section className="material-check-page" data-page="material_check">
      <header>
        <h1>材料检查页</h1>
        <p>检查当前目标型号的材料分级；所有编辑和确认仅保存在页面内存中。</p>
        <p>
          <strong>Page key:</strong> material_check
        </p>
        <p>
          <strong>Current route:</strong> {location.pathname}
        </p>
      </header>

      <section className="material-check-context" aria-labelledby="material-context-title">
        <h2 id="material-context-title">目标型号上下文</h2>
        <dl>
          <dt>product_series_id</dt>
          <dd>{materialCheckContextFixture.product_series_id}</dd>
          <dt>selected_variant_id</dt>
          <dd>{materialCheckContextFixture.selected_variant_id}</dd>
          <dt>目标型号</dt>
          <dd>{materialCheckContextFixture.variant_name}</dd>
          <dt>judgement_report_status</dt>
          <dd>{materialCheckContextFixture.judgement_report_status}</dd>
          <dt>当前 mock 状态</dt>
          <dd>{materialCheckWorkflowFixture.status}</dd>
          <dt>当前允许确认</dt>
          <dd>{canConfirm ? '是' : '否'}</dd>
        </dl>
      </section>

      {entryAllowed && routeMatchesFixture ? (
        <p className="material-check-success" role="status">
          页面进入闸门已通过；判断报告 fixture 已人工确认。
        </p>
      ) : (
        <p className="material-check-notice" role="alert">
          阻断：
          {guardBlockedReason ??
            '当前路由 ID 与材料 fixture 的 selected_variant_id 不一致。'}
        </p>
      )}

      <aside className="material-check-notice" aria-labelledby="material-gap-title">
        <strong id="material-gap-title">契约缺口（本页不补造）</strong>
        <ul className="material-check-list">
          {materialCheckContractGaps.map((gap) => (
            <li key={gap}>{gap}</li>
          ))}
        </ul>
      </aside>

      <form onSubmit={handleConfirm}>
        <fieldset
          className="material-check-panel"
          disabled={!entryAllowed || !routeMatchesFixture}
        >
          <legend>材料检查本地草稿</legend>

          <section className="material-check-panel" aria-labelledby="material-level-title">
            <h2 id="material-level-title">材料分级清单</h2>
            <div className="material-check-grid">
              {materialGroups.map(([field, label, materials]) => (
                <article key={field}>
                  <h3>{label}</h3>
                  <p>{field}</p>
                  <ul className="material-check-list">
                    {materials.map((material) => (
                      <li key={material}>{material}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </section>

          <section className="material-check-panel" aria-labelledby="missing-material-title">
            <h2 id="missing-material-title">missing_materials / 缺失材料</h2>
            <label className="material-check-field">
              每行一个缺失项；必须来自上方三个现有等级之一
              <textarea
                rows={6}
                value={draft.missing_materials.join('\n')}
                onChange={(event) =>
                  updateList('missing_materials', event.target.value)
                }
              />
            </label>
          </section>

          <section className="material-check-panel" aria-labelledby="do-not-invent-title">
            <h2 id="do-not-invent-title">do_not_invent / 禁止编造</h2>
            <label className="material-check-field">
              每行一个禁止编造项
              <textarea
                rows={6}
                value={draft.do_not_invent.join('\n')}
                onChange={(event) =>
                  updateList('do_not_invent', event.target.value)
                }
              />
            </label>
          </section>

          <section className="material-check-panel" aria-labelledby="material-confirm-title">
            <h2 id="material-confirm-title">建议缺失人工确认</h2>
            <label>
              <input
                type="checkbox"
                checked={recommendedMissingConfirmed}
                onChange={(event) => {
                  setRecommendedMissingConfirmed(event.target.checked)
                  setDraft((current) => ({
                    ...current,
                    can_continue: false,
                  }))
                  setConfirmationAttempted(false)
                }}
              />{' '}
              我已阅读并确认建议材料缺失
            </label>
          </section>
        </fieldset>

        {draftIssues.length > 0 && (
          <div className="material-check-notice" role="alert">
            <strong>材料字段不完整</strong>
            <ul className="material-check-list">
              {draftIssues.map((issue) => (
                <li key={issue}>{issue}</li>
              ))}
            </ul>
          </div>
        )}

        <div className="material-check-actions">
          <button
            type="button"
            onClick={() => setSaveMessage('本地草稿已保存到页面内存')}
          >
            保存本地草稿
          </button>
          <button type="submit" aria-disabled={!canConfirm}>
            尝试人工确认材料检查
          </button>
          <span>{saveMessage}</span>
          <span>
            本地检查状态：
            {draft.can_continue ? '已确认可继续' : '未确认，不推进状态'}
          </span>
        </div>

        {confirmationAttempted && confirmationIssues.length > 0 && (
          <div className="material-check-notice" role="alert">
            <strong>确认失败，不推进状态</strong>
            <ul className="material-check-list">
              {confirmationIssues.map((issue) => (
                <li key={issue}>{issue}</li>
              ))}
            </ul>
          </div>
        )}

        {draft.can_continue && (
          <p className="material-check-success" role="status">
            fixture 材料检查已人工确认；共享 workflow 仍保持 report_confirmed。
          </p>
        )}
      </form>

      <details className="material-check-debug">
        <summary>Fixture / debug 信息</summary>
        <p>{materialCheckFixtureSource}</p>
        <pre>
          {JSON.stringify(
            {
              context: materialCheckContextFixture,
              workflow: materialCheckWorkflowFixture,
              material_check: draft,
              confirmation_issues: confirmationIssues,
              contract_gaps: materialCheckContractGaps,
            },
            null,
            2,
          )}
        </pre>
      </details>

      <span hidden aria-hidden="true">
        This page is a route placeholder. No business logic implemented.
      </span>
    </section>
  )
}
