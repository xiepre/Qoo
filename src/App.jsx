import React, { useState } from 'react';
import { Calculator, Download, Plus, Trash2 } from 'lucide-react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  "https://giumltqfcdnheyxionlb.supabase.co",
  "sb_publishable_GL-FpcqD2yhs_ncXYbQUaw_MqA6JaMn"
);

const PRICE_DATA = [
  ['看板', '一般平面', '基礎', 4000, '每米'],
  ['看板', '一般平面', '層次(線板)', 650, '加價'],
  ['看板', '一般平面', '燈帶壓克力', 1300, '加價'],
  ['看板', '一般平面', '間接光', 1300, '加價'],
  ['看板', '一般平面', '燈箱字(含壓克力)', 2600, '加價'],
  ['看板', '圓弧', '基礎', 5500, '每米'],
  ['看板', '圓弧', '層次(線板)', 1300, '加價'],
  ['看板', '圓弧', '燈帶壓克力', 3300, '加價'],
  ['看板', '圓弧', '間接光', 3300, '加價'],
  ['看板', '圓弧', '燈箱字(含壓克力)', 2600, '加價'],

  ['背牆', '一般平面(單面)', 'H350-400', 4600, '每米；背牆若有層次，一米+2000-3600'],
  ['背牆', '一般平面(單面)', 'H244-350', 4000, '每米；背牆若有層次，一米+2000-3600'],
  ['背牆', '一般平面(單面)', 'H244', 3300, '每米；背牆若有層次，一米+2000-3600'],
  ['背牆', '圓弧(單面)', 'H350-400', 7800, '每米'],
  ['背牆', '圓弧(單面)', 'H244-350', 6500, '每米'],
  ['背牆', '圓弧(單面)', 'H244', 5200, '每米'],
  ['背牆', '附加項目', '木門附鎖', 3000, '每組'],
  ['背牆', '附加項目', '外封無接縫帆布', 2500, '每米'],

  ['展櫃', '一般平面', '基礎', 8000, '每米'],
  ['展櫃', '一般平面', '層次(線板)', 650, '加價'],
  ['展櫃', '一般平面', '燈帶壓克力', 1300, '加價'],
  ['展櫃', '一般平面', '間接光', 1300, '加價'],
  ['展櫃', '一般平面', '燈箱字(含壓克力)', 2600, '加價'],
  ['展櫃', '一般平面', '抽屜', 1300, '加價'],
  ['展櫃', '一般平面', '開門附鎖', 2600, '加價'],
  ['展櫃', '一般平面', '雙層吧台', 4000, '加價'],
  ['展櫃', '圓弧', '基礎', 11000, '每米'],
  ['展櫃', '圓弧', '層次(線板)', 1300, '加價'],
  ['展櫃', '圓弧', '燈帶壓克力', 2600, '加價'],
  ['展櫃', '圓弧', '間接光', 1600, '加價'],
  ['展櫃', '圓弧', '燈箱字(含壓克力)', 3300, '加價'],
  ['展櫃', '圓弧', '抽屜', 2000, '加價'],
  ['展櫃', '圓弧', '雙層吧台', 5200, '加價'],

  ['天花板', '一般平面', '基礎', 5200, '每坪'],
  ['天花板', '一般平面', '層次(線板)', 650, '加價'],
  ['天花板', '一般平面', '燈帶壓克力', 1300, '加價'],
  ['天花板', '一般平面', '間接光', 1300, '加價'],

  ['地台', '一般平面(塑膠地磚)', '基礎', 5200, '每坪'],
  ['地台', '一般平面(塑膠地磚)', '燈帶壓克力', 1300, '加價'],
  ['地台', '一般平面(塑膠地磚)', '間接光', 1300, '加價'],
  ['地台', '一般平面(塑膠地磚)', '特殊地磚', 1300, '每坪加價'],

  ['配件', '電視掛板', '四分板', 650, ''],
  ['配件', '層板', '平層板 深度30', 1300, ''],
  ['配件', '層板', '斜層板(含檔板) 深度30', 2600, ''],
  ['配件', '蓋板', '平面 H10*D50', 2000, ''],
  ['配件', '蓋板', '雙層階梯 D100', 4000, ''],

  ['展示物', '柵欄式屏風', '30*30一支 H350-400', 5200, ''],
  ['展示物', '柵欄式屏風', '30*30一支 H350-250', 4600, ''],
  ['展示物', '柵欄式屏風', '30*30一支 H250-244', 4000, ''],
  ['展示物', '強化玻璃罩 8mm', '四面罩+一面門 50*100*H50', 12000, '請注意玻璃支撐問題'],
  ['展示物', '強化玻璃罩 8mm', '四面罩+一面門 50*150*H50', 16000, '請注意玻璃支撐問題'],
  ['展示物', '強化玻璃罩 8mm', '五面罩 50*50*50', 6000, '請注意玻璃支撐問題'],
  ['展示物', '壓克力罩 5mm', '四面罩+一面門 50*100*H50', 11000, '請注意壓克力支撐問題'],
  ['展示物', '壓克力罩 5mm', '四面罩+一面門 50*150*H50', 13000, '請注意壓克力支撐問題'],
  ['展示物', '壓克力罩 5mm', '五面罩 50*50*50', 66000, '請注意壓克力支撐問題'],
  ['展示物', '壓克力罩 8mm', '四面罩+一面門 50*100*H50', 15000, '請注意壓克力支撐問題'],
  ['展示物', '壓克力罩 8mm', '四面罩+一面門 50*150*H50', 20000, '請注意壓克力支撐問題'],
  ['展示物', '壓克力罩 8mm', '五面罩 50*50*50', 5000, '請注意壓克力支撐問題'],
  ['展示物', '黑色鐵網(直角)', '3*6尺', 1800, '3*4尺 NT$1,800'],
  ['展示物', '鋼柱(直徑5CM)', '單支', 4000, ''],

  ['服務', '代安裝', '產品代安裝費', 3000, '30分鐘'],
  ['服務', '外場', '出車費及加班費', 0, '另計'],
  ['服務', '高空作業', '4M以上高空作業費', 0, '另計'],
  ['服務', '懸吊作業', '懸吊作業費用', 0, '另計'],
];

const NOTES = [
  '看板、背牆、天花板價格含展場用壁紙；展櫃價格含一般貼皮；若使用其他材質需另加費用。',
  '價格皆含展覽館內進撤場費用。',
  '產品代安裝費用 NT$3,000 / 30分鐘，此服務僅限有木作結構的攤位使用。',
  '外場出車費及加班費另計。',
  '4M以上高空作業費用另計。',
  '懸吊作業費用另計。',
  '單價為未稅金額。',
];

function unique(arr) {
  return [...new Set(arr)];
}

function formatCurrency(value) {
  return `NT$ ${Number(value || 0).toLocaleString('zh-TW')}`;
}

export default function App() {
  const [customer, setCustomer] = useState('');
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [quoteNo, setQuoteNo] = useState(`Q${new Date().toISOString().slice(0, 10).replace(/-/g, '')}-001`);
  const [category, setCategory] = useState('');
  const [type, setType] = useState('');
  const [item, setItem] = useState('');
  const [qty, setQty] = useState(1);
  const [rows, setRows] = useState([]);
  const [activeTab, setActiveTab] = useState('editor');
  const [saving, setSaving] = useState(false);

  const categories = unique(PRICE_DATA.map(([c]) => c));
  const types = unique(PRICE_DATA.filter(([c]) => c === category).map(([, t]) => t));
  const items = unique(PRICE_DATA.filter(([c, t]) => c === category && t === type).map(([, , i]) => i));

  const selected = PRICE_DATA.find(([c, t, i]) => c === category && t === type && i === item);
  const unitPrice = selected?.[3] || 0;
  const note = selected?.[4] || '';
  const subtotal = Number(qty || 0) * unitPrice;
  const total = rows.reduce((sum, row) => sum + row.subtotal, 0);

  function resetSelectors(nextCategory = '') {
    setCategory(nextCategory);
    setType('');
    setItem('');
  }

  function addRow() {
    if (!selected || !qty) return;

    setRows((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        category,
        type,
        item,
        qty: Number(qty),
        unitPrice,
        subtotal,
        note,
      },
    ]);

    setItem('');
    setQty(1);
  }

  function removeRow(id) {
    setRows((prev) => prev.filter((row) => row.id !== id));
  }

  async function saveQuotation() {
    if (!customer || rows.length === 0) {
      alert('請先輸入客戶名稱並加入至少一筆報價項目');
      return;
    }

    try {
      setSaving(true);

      const { error } = await supabase.from('quotations').insert([
        {
          customer,
          quote_no: quoteNo,
          date,
          items: rows,
          total,
        },
      ]);

      if (error) {
        alert('儲存失敗');
        console.error(error);
      } else {
        alert('儲存成功');
      }
    } catch (err) {
      alert('儲存失敗');
      console.error(err);
    } finally {
      setSaving(false);
    }
  }

  function exportPdf() {
    window.print();
  }

  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc', padding: '24px' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '16px', marginBottom: '24px', flexWrap: 'wrap' }}>
          <div>
            <h1 style={{ fontSize: '32px', fontWeight: 700, margin: 0 }}>展場報價系統</h1>
            <p style={{ color: '#64748b', marginTop: '8px' }}>正式版 Web App</p>
          </div>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <button onClick={() => window.location.reload()} style={buttonOutline}>
              重置
            </button>
            <button onClick={saveQuotation} disabled={saving} style={buttonPrimary}>
              {saving ? '儲存中...' : '儲存報價'}
            </button>
            <button onClick={exportPdf} style={buttonPrimary}>
              <Download size={16} style={{ marginRight: 6 }} />
              列印 / 匯出 PDF
            </button>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
          <button onClick={() => setActiveTab('editor')} style={activeTab === 'editor' ? tabActive : tab}>
            <Calculator size={16} style={{ marginRight: 6 }} />
            報價編輯
          </button>
          <button onClick={() => setActiveTab('preview')} style={activeTab === 'preview' ? tabActive : tab}>
            正式報價單
          </button>
        </div>

        {activeTab === 'editor' && (
          <>
            <div style={card}>
              <h2 style={cardTitle}>基本資料</h2>
              <div style={grid3}>
                <div>
                  <label style={label}>客戶名稱</label>
                  <input style={input} value={customer} onChange={(e) => setCustomer(e.target.value)} placeholder="請輸入客戶名稱" />
                </div>
                <div>
                  <label style={label}>報價單號</label>
                  <input style={input} value={quoteNo} onChange={(e) => setQuoteNo(e.target.value)} />
                </div>
                <div>
                  <label style={label}>日期</label>
                  <input style={input} type="date" value={date} onChange={(e) => setDate(e.target.value)} />
                </div>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '24px', marginTop: '24px' }}>
              <div style={card}>
                <h2 style={cardTitle}>新增報價項目</h2>

                <div style={grid4}>
                  <div>
                    <label style={label}>分類</label>
                    <select style={input} value={category} onChange={(e) => resetSelectors(e.target.value)}>
                      <option value="">請選擇分類</option>
                      {categories.map((v) => (
                        <option key={v} value={v}>{v}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label style={label}>類型</label>
                    <select style={input} value={type} onChange={(e) => { setType(e.target.value); setItem(''); }} disabled={!category}>
                      <option value="">請選擇類型</option>
                      {types.map((v) => (
                        <option key={v} value={v}>{v}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label style={label}>項目</label>
                    <select style={input} value={item} onChange={(e) => setItem(e.target.value)} disabled={!type}>
                      <option value="">請選擇項目</option>
                      {items.map((v) => (
                        <option key={v} value={v}>{v}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label style={label}>數量</label>
                    <input style={input} type="number" min="0" step="1" value={qty} onChange={(e) => setQty(e.target.value)} />
                  </div>
                </div>

                <div style={grid3}>
                  <div style={statCard}>
                    <div style={statLabel}>單價</div>
                    <div style={statValue}>{formatCurrency(unitPrice)}</div>
                  </div>
                  <div style={statCard}>
                    <div style={statLabel}>小計</div>
                    <div style={statValue}>{formatCurrency(subtotal)}</div>
                  </div>
                  <div style={statCard}>
                    <div style={statLabel}>備註</div>
                    <div style={{ color: '#334155', lineHeight: 1.7 }}>{note || '—'}</div>
                  </div>
                </div>

                <button onClick={addRow} disabled={!selected || !qty} style={buttonPrimary}>
                  <Plus size={16} style={{ marginRight: 6 }} />
                  加入報價單
                </button>
              </div>

              <div style={card}>
                <h2 style={cardTitle}>報價摘要</h2>
                <div style={statCard}>
                  <div style={statLabel}>項目數</div>
                  <div style={statValue}>{rows.length}</div>
                </div>
                <div style={{ ...statCard, marginTop: '16px' }}>
                  <div style={statLabel}>總計（未稅）</div>
                  <div style={{ fontSize: '32px', fontWeight: 700 }}>{formatCurrency(total)}</div>
                </div>
                <div style={{ ...statCard, marginTop: '16px', fontSize: '14px', color: '#475569', lineHeight: 1.8 }}>
                  {NOTES.map((n, i) => (
                    <div key={i}>{i + 1}. {n}</div>
                  ))}
                </div>
              </div>
            </div>

            <div style={{ ...card, marginTop: '24px' }}>
              <h2 style={cardTitle}>報價明細</h2>
              <div style={{ overflowX: 'auto' }}>
                <table style={table}>
                  <thead>
                    <tr>
                      <th style={th}>分類</th>
                      <th style={th}>類型</th>
                      <th style={th}>項目</th>
                      <th style={th}>數量</th>
                      <th style={th}>單價</th>
                      <th style={th}>小計</th>
                      <th style={th}>備註</th>
                      <th style={th}>操作</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rows.length === 0 ? (
                      <tr>
                        <td colSpan="8" style={emptyTd}>尚未加入任何項目</td>
                      </tr>
                    ) : (
                      rows.map((row) => (
                        <tr key={row.id}>
                          <td style={td}>{row.category}</td>
                          <td style={td}>{row.type}</td>
                          <td style={td}>{row.item}</td>
                          <td style={td}>{row.qty}</td>
                          <td style={td}>{formatCurrency(row.unitPrice)}</td>
                          <td style={{ ...td, fontWeight: 700 }}>{formatCurrency(row.subtotal)}</td>
                          <td style={td}>{row.note || '—'}</td>
                          <td style={td}>
                            <button onClick={() => removeRow(row.id)} style={iconButton}>
                              <Trash2 size={16} />
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}

        {activeTab === 'preview' && (
          <div style={card}>
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: '16px', borderBottom: '1px solid #e2e8f0', paddingBottom: '24px', marginBottom: '24px' }}>
              <div>
                <h2 style={{ fontSize: '32px', fontWeight: 700, margin: 0 }}>正式報價單</h2>
                <div style={{ marginTop: '12px', color: '#475569', lineHeight: 1.8 }}>
                  <div>客戶名稱：{customer || '—'}</div>
                  <div>報價單號：{quoteNo}</div>
                  <div>日期：{date}</div>
                </div>
              </div>
              <div style={{ textAlign: 'right', color: '#64748b' }}>
                <div>展場木作 / 展示設備 / 報價系統</div>
                <div style={{ marginTop: '6px' }}>未稅報價</div>
              </div>
            </div>

            <div style={{ overflowX: 'auto' }}>
              <table style={table}>
                <thead>
                  <tr>
                    <th style={th}>分類</th>
                    <th style={th}>類型</th>
                    <th style={th}>項目</th>
                    <th style={th}>數量</th>
                    <th style={th}>單價</th>
                    <th style={th}>小計</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row) => (
                    <tr key={row.id}>
                      <td style={td}>{row.category}</td>
                      <td style={td}>{row.type}</td>
                      <td style={td}>{row.item}</td>
                      <td style={td}>{row.qty}</td>
                      <td style={td}>{formatCurrency(row.unitPrice)}</td>
                      <td style={{ ...td, fontWeight: 700 }}>{formatCurrency(row.subtotal)}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr>
                    <td colSpan="4" style={td}></td>
                    <td style={{ ...td, textAlign: 'right', fontWeight: 700 }}>總計</td>
                    <td style={{ ...td, fontSize: '24px', fontWeight: 700 }}>{formatCurrency(total)}</td>
                  </tr>
                </tfoot>
              </table>
            </div>

            <div style={{ ...statCard, marginTop: '24px', fontSize: '14px', color: '#475569', lineHeight: 1.8 }}>
              {NOTES.map((n, i) => (
                <div key={i}>{i + 1}. {n}</div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

const card = {
  background: '#ffffff',
  border: '1px solid #e2e8f0',
  borderRadius: '20px',
  padding: '24px',
  boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
};

const cardTitle = {
  fontSize: '20px',
  fontWeight: 700,
  marginBottom: '16px',
};

const label = {
  display: 'block',
  fontSize: '14px',
  color: '#334155',
  marginBottom: '8px',
  fontWeight: 600,
};

const input = {
  width: '100%',
  padding: '12px 14px',
  borderRadius: '12px',
  border: '1px solid #cbd5e1',
  fontSize: '14px',
  boxSizing: 'border-box',
};

const buttonPrimary = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '12px 16px',
  borderRadius: '12px',
  border: 'none',
  background: '#0f172a',
  color: '#fff',
  cursor: 'pointer',
  fontSize: '14px',
  fontWeight: 600,
};

const buttonOutline = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '12px 16px',
  borderRadius: '12px',
  border: '1px solid #cbd5e1',
  background: '#fff',
  color: '#0f172a',
  cursor: 'pointer',
  fontSize: '14px',
  fontWeight: 600,
};

const tab = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '10px 16px',
  borderRadius: '12px',
  border: '1px solid #cbd5e1',
  background: '#fff',
  color: '#0f172a',
  cursor: 'pointer',
  fontWeight: 600,
};

const tabActive = {
  ...tab,
  background: '#0f172a',
  color: '#fff',
  border: '1px solid #0f172a',
};

const statCard = {
  border: '1px solid #e2e8f0',
  borderRadius: '16px',
  padding: '16px',
  background: '#fff',
};

const statLabel = {
  fontSize: '14px',
  color: '#64748b',
  marginBottom: '8px',
};

const statValue = {
  fontSize: '28px',
  fontWeight: 700,
};

const grid3 = {
  display: 'grid',
  gap: '16px',
  gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
};

const grid4 = {
  display: 'grid',
  gap: '16px',
  gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
  marginBottom: '20px',
};

const table = {
  width: '100%',
  borderCollapse: 'collapse',
  minWidth: '900px',
};

const th = {
  textAlign: 'left',
  padding: '12px',
  background: '#f1f5f9',
  borderBottom: '1px solid #e2e8f0',
  fontSize: '14px',
};

const td = {
  padding: '12px',
  borderBottom: '1px solid #e2e8f0',
  verticalAlign: 'top',
  fontSize: '14px',
};

const emptyTd = {
  padding: '24px',
  textAlign: 'center',
  color: '#64748b',
};

const iconButton = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '36px',
  height: '36px',
  borderRadius: '10px',
  border: '1px solid #cbd5e1',
  background: '#fff',
  cursor: 'pointer',
};
