import { useState } from 'react'
import { useLocation, useParams } from 'react-router'
import { context, fixtureSource, getIssues, getSingleVariantNotice, initialRows } from './fixture'
import './Page.css'

export default function VariantDifferenceCheckPage() {
  const location = useLocation()
  const params = useParams()
  const [rows, setRows] = useState(initialRows)
  const [confirmed, setConfirmed] = useState(false)
  const [message, setMessage] = useState('未确认')
  const issues = getIssues(rows, confirmed)

  return <section className="local-form-page variant-difference-check-page" data-page="variant_difference_check">
    <header>
      <h1>型号差异判断页</h1>
      <p><strong>Page key:</strong> variant_difference_check</p>
      <p><strong>Current route:</strong> {location.pathname}</p>
      <p>product_series_id：{params.productSeriesId} / fixture：{context.product_series_id} / 上游：{context.status}</p>
    </header>
    <p className="local-alert">{getSingleVariantNotice(1)} 当前 fixture 为两个型号，需要逐项判断共享与隔离。</p>
    <table className="local-table">
      <thead><tr><th>比较项</th><th>sku_001</th><th>sku_002</th><th>影响内容</th><th>隔离</th></tr></thead>
      <tbody>{rows.map((row, index) => <tr key={row.field}>
        <td>{row.field}</td><td>{row.sku_001}</td><td>{row.sku_002}</td><td>{row.affects_content ? '是' : '否'}</td>
        <td><input type="checkbox" checked={row.isolated} onChange={(event) => setRows(rows.map((item, itemIndex) => itemIndex === index ? { ...item, isolated: event.target.checked } : item))} /></td>
      </tr>)}</tbody>
    </table>
    <p>共享字段：{rows.filter((row) => !row.isolated).map((row) => row.field).join('、') || '无'}</p>
    <p>隔离字段：{rows.filter((row) => row.isolated).map((row) => row.field).join('、')}</p>
    <p>是否分别制作视频：{rows.some((row) => row.affects_content && row.isolated) ? '是' : '否'}</p>
    <label><input type="checkbox" checked={confirmed} onChange={(event) => setConfirmed(event.target.checked)} /> 人工确认差异判断</label>
    <div className="local-actions">
      <button type="button" onClick={() => setMessage('草稿已保存到页面内存')}>保存本地草稿</button>
      <button type="button" onClick={() => setMessage(issues.length ? `确认失败：${issues.join(' ')}` : '差异已本地确认，不推进 workflow')}>尝试确认</button>
      <span>{message}</span>
    </div>
    {issues.length > 0 && <p className="local-alert">阻断：{issues.join(' ')}</p>}
    <details className="local-debug"><summary>Fixture / debug 信息</summary><p>{fixtureSource}</p><pre>{JSON.stringify({ rows, confirmed, issues }, null, 2)}</pre></details>
  </section>
}
