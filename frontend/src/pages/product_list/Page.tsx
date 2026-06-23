import { useState } from 'react'
import { useLocation } from 'react-router'
import { blockers, filterProducts, fixtureSource, productListFixture } from './fixture'
import './Page.css'

export default function ProductListPage() {
  const location = useLocation(); const [query, setQuery] = useState(''); const [message, setMessage] = useState('尚未执行本地操作')
  const products = filterProducts(productListFixture, query)
  return <section className="local-form-page product-list-page" data-page="product_list">
    <header><h1>商品列表页</h1><p><strong>Page key:</strong> product_list</p><p><strong>Current route:</strong> {location.pathname}</p></header>
    <div className="local-panel"><h2>商品库 fixture</h2><label className="local-field">本地筛选<input value={query} onChange={(e) => setQuery(e.target.value)} /></label>
      <table className="local-table"><thead><tr><th>商品/ID</th><th>平台/市场</th><th>类目/分类</th><th>状态</th><th>缺失/更新时间</th><th>操作入口</th></tr></thead><tbody>{products.map((p) => <tr key={p.product_series_id}><td>{p.product_name}<br />{p.product_series_id}</td><td>{p.target_platform}<br />{p.target_market}</td><td>{p.platform_category}<br />{p.classification}</td><td>{p.status}</td><td>{p.missing_material_count}<br />{p.updated_at}</td><td><div className="local-actions">{['继续处理','查看报告','查看任务包','查看输出结果'].map((a)=><button type="button" key={a} onClick={()=>setMessage(`${a}：仅本地占位`)}>{a}</button>)}</div></td></tr>)}</tbody></table>
    </div>
    <div className="local-actions"><button type="button" onClick={()=>setMessage('列表草稿已保存到页面内存')}>保存本地草稿</button><button type="button" onClick={()=>setMessage('列表 fixture 已人工确认，不推进 workflow')}>尝试人工确认</button><span>{message}</span></div>
    <aside className="local-alert"><strong>阻断提示</strong><ul className="local-list">{blockers.map(b=><li key={b}>{b}</li>)}</ul></aside>
    <details className="local-debug"><summary>Fixture / debug 信息</summary><p>{fixtureSource}</p><pre>{JSON.stringify({query,products,blockers},null,2)}</pre></details>
  </section>
}
