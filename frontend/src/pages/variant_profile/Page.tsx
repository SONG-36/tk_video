import { useMemo, useState, type FormEvent } from 'react'
import { useLocation, useParams } from 'react-router'
import { canEnterPage, getBlockedReason } from '../../state/workflowGuards'
import type { ProductProfileDetails } from '../../types/profile'
import { pageByKey } from '../pageMeta'
import {
  editableBasicBooleanFields,
  getVariantProfileDraftIssues,
  riskBooleanFields,
  sellingPointOptions,
  sizeOptions,
  unresolvedTierFields,
  variantProfileContextFixture,
  variantProfileContractBlockers,
  variantProfileFixture,
  variantProfileFixtureSource,
  variantProfileWorkflowFixture,
} from './fixture'
import './Page.css'

type EditableBooleanField =
  | (typeof editableBasicBooleanFields)[number][0]
  | (typeof riskBooleanFields)[number][0]

interface BooleanFieldProps {
  field: EditableBooleanField
  label: string
  value: boolean
  onChange: (field: EditableBooleanField, value: boolean) => void
}

function BooleanField({ field, label, value, onChange }: BooleanFieldProps) {
  return (
    <fieldset className="variant-profile-fieldset">
      <legend>{label}</legend>
      <div className="variant-profile-radio-row">
        <label>
          <input
            type="radio"
            name={field}
            checked={value}
            onChange={() => onChange(field, true)}
          />{' '}
          是
        </label>
        <label>
          <input
            type="radio"
            name={field}
            checked={!value}
            onChange={() => onChange(field, false)}
          />{' '}
          否
        </label>
      </div>
    </fieldset>
  )
}

export default function VariantProfilePage() {
  const location = useLocation()
  const params = useParams<{
    productSeriesId: string
    variantId: string
  }>()
  const [draft, setDraft] = useState<ProductProfileDetails>(() => ({
    ...variantProfileFixture.product_profile,
    selling_point_types: [
      ...variantProfileFixture.product_profile.selling_point_types,
    ],
  }))
  const [confirmationAttempted, setConfirmationAttempted] = useState(false)
  const [locallyConfirmed, setLocallyConfirmed] = useState(false)

  const entryAllowed = canEnterPage(
    'variant_profile',
    variantProfileWorkflowFixture,
  )
  const guardBlockedReason = getBlockedReason(
    'variant_profile',
    variantProfileWorkflowFixture,
  )
  const routeMatchesFixture =
    params.productSeriesId ===
      variantProfileContextFixture.product_series_id &&
    params.variantId === variantProfileContextFixture.selected_variant_id
  const draftIssues = useMemo(
    () => getVariantProfileDraftIssues(draft),
    [draft],
  )
  const hasContractBlockers = variantProfileContractBlockers.some(Boolean)
  const canConfirm =
    entryAllowed &&
    routeMatchesFixture &&
    draftIssues.length === 0 &&
    !hasContractBlockers

  const updateBoolean = (
    field: EditableBooleanField,
    value: boolean,
  ) => {
    setDraft((current) => ({ ...current, [field]: value }))
    setLocallyConfirmed(false)
  }

  const toggleSellingPoint = (sellingPoint: string) => {
    setDraft((current) => ({
      ...current,
      selling_point_types: current.selling_point_types.includes(sellingPoint)
        ? current.selling_point_types.filter((item) => item !== sellingPoint)
        : [...current.selling_point_types, sellingPoint],
    }))
    setLocallyConfirmed(false)
  }

  const handleConfirm = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setConfirmationAttempted(true)
    setLocallyConfirmed(canConfirm)
  }

  return (
    <section className="variant-profile-page" data-page="variant_profile">
      <header>
        <h1>{pageByKey.variant_profile.title}</h1>
        <p>
          <strong>Page key:</strong> variant_profile
        </p>
        <p>
          <strong>Current route:</strong> {location.pathname}
        </p>
      </header>

      <section className="variant-profile-context" aria-labelledby="context-title">
        <h2 id="context-title">目标型号上下文</h2>
        <dl>
          <dt>product_series_id</dt>
          <dd>{variantProfileContextFixture.product_series_id}</dd>
          <dt>商品系列</dt>
          <dd>{variantProfileContextFixture.product_series_name}</dd>
          <dt>selected_variant_id</dt>
          <dd>{variantProfileContextFixture.selected_variant_id}</dd>
          <dt>目标型号</dt>
          <dd>{variantProfileContextFixture.variant_name}</dd>
          <dt>卖家 SKU</dt>
          <dd>{variantProfileContextFixture.seller_sku}</dd>
          <dt>当前 mock 状态</dt>
          <dd>{variantProfileWorkflowFixture.status}</dd>
        </dl>
      </section>

      {entryAllowed && routeMatchesFixture ? (
        <p className="variant-profile-success" role="status">
          页面进入闸门已通过；当前输入仅保存在页面本地状态。
        </p>
      ) : (
        <p className="variant-profile-notice" role="alert">
          阻断：
          {guardBlockedReason ??
            '当前路由 ID 与 fixture 的 selected_variant_id 上下文不一致。'}
        </p>
      )}

      <aside className="variant-profile-notice" aria-labelledby="contract-title">
        <strong id="contract-title">正式确认阻断</strong>
        <ul className="variant-profile-issue-list">
          {variantProfileContractBlockers.map((blocker) => (
            <li key={blocker}>{blocker}</li>
          ))}
        </ul>
        <p>本页不实现三档到布尔值的临时映射，也不自创合规字段。</p>
      </aside>

      <form onSubmit={handleConfirm}>
        <fieldset
          className="variant-profile-panel"
          disabled={!entryAllowed || !routeMatchesFixture}
        >
          <legend>型号级商品画像本地草稿</legend>

          <div className="variant-profile-field">
            <label htmlFor="profile-size">商品体积</label>
            <select
              id="profile-size"
              value={draft.size}
              onChange={(event) => {
                setDraft((current) => ({
                  ...current,
                  size: event.target.value,
                }))
                setLocallyConfirmed(false)
              }}
            >
              {sizeOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          <section className="variant-profile-panel" aria-labelledby="tier-title">
            <h2 id="tier-title">三档字段：仅展示，等待契约裁决</h2>
            <div className="variant-profile-field-grid">
              {unresolvedTierFields.map((field) => (
                <div className="variant-profile-field" key={field.key}>
                  <strong>{field.label}</strong>
                  <span>
                    当前 Schema fixture：{draft[field.key] ? 'true' : 'false'}
                  </span>
                  <span>设计选项：{field.designOptions.join(' / ')}</span>
                </div>
              ))}
            </div>
          </section>

          <section className="variant-profile-panel" aria-labelledby="basic-title">
            <h2 id="basic-title">基础画像</h2>
            <div className="variant-profile-field-grid">
              {editableBasicBooleanFields.map(([field, label]) => (
                <BooleanField
                  key={field}
                  field={field}
                  label={label}
                  value={draft[field]}
                  onChange={updateBoolean}
                />
              ))}
            </div>
          </section>

          <section className="variant-profile-panel" aria-labelledby="risk-title">
            <h2 id="risk-title">风险画像</h2>
            <div className="variant-profile-field-grid">
              {riskBooleanFields.map(([field, label]) => (
                <BooleanField
                  key={field}
                  field={field}
                  label={label}
                  value={draft[field]}
                  onChange={updateBoolean}
                />
              ))}
            </div>
            <p className="variant-profile-notice">
              认证或合规要求：设计中存在，但当前 Schema 无字段，本页不采集。
            </p>
          </section>

          <fieldset className="variant-profile-fieldset">
            <legend>主要卖点类型（至少选择一个）</legend>
            <div className="variant-profile-checkbox-grid">
              {sellingPointOptions.map((sellingPoint) => (
                <label key={sellingPoint}>
                  <input
                    type="checkbox"
                    checked={draft.selling_point_types.includes(sellingPoint)}
                    onChange={() => toggleSellingPoint(sellingPoint)}
                  />{' '}
                  {sellingPoint}
                </label>
              ))}
            </div>
          </fieldset>
        </fieldset>

        {draftIssues.length > 0 && (
          <div className="variant-profile-notice" role="alert">
            <strong>草稿字段不完整</strong>
            <ul className="variant-profile-issue-list">
              {draftIssues.map((issue) => (
                <li key={issue}>{issue}</li>
              ))}
            </ul>
          </div>
        )}

        <div className="variant-profile-actions">
          <button type="submit" aria-disabled={!canConfirm}>
            人工确认画像
          </button>
          <span>
            本地确认状态：{locallyConfirmed ? '已确认' : '未确认，不推进状态'}
          </span>
        </div>

        {confirmationAttempted && !canConfirm && (
          <p className="variant-profile-notice" role="alert">
            确认失败：请先解决页面显示的字段或设计契约阻断项。
          </p>
        )}
      </form>

      <details className="variant-profile-debug">
        <summary>Fixture / debug 信息</summary>
        <p>{variantProfileFixtureSource}</p>
        <pre>
          {JSON.stringify(
            {
              context: variantProfileContextFixture,
              workflow: variantProfileWorkflowFixture,
              draft,
              contract_blockers: variantProfileContractBlockers,
            },
            null,
            2,
          )}
        </pre>
      </details>
    </section>
  )
}
