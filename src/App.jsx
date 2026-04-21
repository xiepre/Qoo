import React, { useEffect, useMemo, useState } from 'react';
import {
  Calculator,
  Download,
  Plus,
  Trash2,
  Save,
  RotateCcw,
  Search,
  FileDown,
  Database,
} from 'lucide-react';
import { createClient } from '@supabase/supabase-js';

/* 🔴 填入你自己的 */
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
];

const NOTES = [
  '價格含基本施工',
  '未稅報價',
];

const printCss = `
@media print {
  body * { visibility: hidden; }
  #print-root, #print-root * { visibility: visible; }
  #print-root { position:absolute; left:0; top:0; width:100%; }
  .no-print { display:none !important; }
}
`;

function uniq(arr) {
  return [...new Set(arr)];
}

function money(n) {
  return `NT$ ${Number(n || 0).toLocaleString()}`;
}

function today() {
  return new Date().toISOString().slice(0, 10);
}

export default function App() {
  const [customer, setCustomer] = useState('');
  const [quoteNo, setQuoteNo] = useState(`Q${Date.now()}`);
  const [date, setDate] = useState(today());

  const [category, setCategory] = useState('');
  const [type, setType] = useState('');
  const [item, setItem] = useState('');
  const [qty, setQty] = useState(1);

  const [rows, setRows] = useState([]);
  const [history, setHistory] = useState([]);

  const categories = uniq(PRICE_DATA.map(([c]) => c));
  const types = uniq(PRICE_DATA.filter(([c]) => c === category).map(([, t]) => t));
  const items = uniq(PRICE_DATA.filter(([c, t]) => c === category && t === type).map(([, , i]) => i));

  const selected = PRICE_DATA.find(([c, t, i]) => c === category && t === type && i === item);

  const unitPrice = selected?.[3] || 0;
  const subtotal = qty * unitPrice;
  const total = rows.reduce((sum, r) => sum + r.subtotal, 0);

  function addRow() {
    if (!selected) return;
    setRows([...rows, {
      id: crypto.randomUUID(),
      category,
      type,
      item,
      qty,
      unitPrice,
      subtotal
    }]);
  }

  function removeRow(id) {
    setRows(rows.filter(r => r.id !== id));
  }

  async function save() {
    await supabase.from('quotations').insert([{
      customer,
      quote_no: quoteNo,
      date,
      items: rows,
      total
    }]);
    load();
  }

  async function load() {
    const { data } = await supabase.from('quotations').select('*').order('created_at', { ascending:false });
    setHistory(data || []);
  }

  function exportPdf() {
    window.print();
  }

  /* ===== 下載功能 ===== */

  function downloadFile(data, filename) {
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
  }

  function downloadCurrent() {
    downloadFile(JSON.stringify({
      customer,
      quote_no: quoteNo,
      date,
      items: rows,
      total
    }, null, 2), `${quoteNo}.json`);
  }

  function downloadAll() {
    downloadFile(JSON.stringify(history, null, 2), `all_${Date.now()}.json`);
  }

  useEffect(() => {
    load();
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <style>{printCss}</style>

      <h1>報價系統</h1>

      <div className="no-print">
        <input placeholder="客戶" value={customer} onChange={e=>setCustomer(e.target.value)} />
        <input value={quoteNo} onChange={e=>setQuoteNo(e.target.value)} />
        <input type="date" value={date} onChange={e=>setDate(e.target.value)} />

        <hr />

        <select onChange={e=>setCategory(e.target.value)}>
          <option>分類</option>
          {categories.map(c=> <option key={c}>{c}</option>)}
        </select>

        <select onChange={e=>setType(e.target.value)}>
          <option>類型</option>
          {types.map(t=> <option key={t}>{t}</option>)}
        </select>

        <select onChange={e=>setItem(e.target.value)}>
          <option>項目</option>
          {items.map(i=> <option key={i}>{i}</option>)}
        </select>

        <input type="number" value={qty} onChange={e=>setQty(Number(e.target.value))} />

        <button onClick={addRow}>加入</button>

        <hr />

        <button onClick={save}>儲存</button>
        <button onClick={exportPdf}>PDF</button>
        <button onClick={downloadCurrent}>下載此筆</button>
        <button onClick={downloadAll}>下載全部</button>
      </div>

      <div id="print-root">
        <h2>報價單</h2>
        <p>{customer}</p>
        <p>{quoteNo}</p>

        <table border="1" width="100%">
          <thead>
            <tr>
              <th>分類</th>
              <th>項目</th>
              <th>數量</th>
              <th>單價</th>
              <th>小計</th>
            </tr>
          </thead>
          <tbody>
            {rows.map(r=>(
              <tr key={r.id}>
                <td>{r.category}</td>
                <td>{r.item}</td>
                <td>{r.qty}</td>
                <td>{money(r.unitPrice)}</td>
                <td>{money(r.subtotal)}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <h3>總計：{money(total)}</h3>

        {NOTES.map((n,i)=> <div key={i}>{n}</div>)}
      </div>

      <hr />

      <h2>歷史</h2>
      {history.map(h=>(
        <div key={h.id}>
          {h.customer} - {money(h.total)}
        </div>
      ))}
    </div>
  );
}
