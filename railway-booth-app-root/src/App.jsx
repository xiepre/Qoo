import React, { useMemo, useState } from 'react';
import { Calculator, Download, Plus, Trash2 } from 'lucide-react';

const PRICE_DATA = [
  ['看板','一般平面','基礎',4000,'每米'],
  ['看板','一般平面','層次(線板)',650,'加價'],
  ['看板','一般平面','燈帶壓克力',1300,'加價'],
  ['看板','一般平面','間接光',1300,'加價'],
  ['看板','一般平面','燈箱字(含壓克力)',2600,'加價'],
  ['看板','圓弧','基礎',5500,'每米'],
  ['看板','圓弧','層次(線板)',1300,'加價'],
  ['看板','圓弧','燈帶壓克力',3300,'加價'],
  ['看板','圓弧','間接光',3300,'加價'],
  ['看板','圓弧','燈箱字(含壓克力)',2600,'加價'],

  ['背牆','一般平面(單面)','H350-400',4600,'每米；背牆若有層次，一米+2000-3600'],
  ['背牆','一般平面(單面)','H244-350',4000,'每米；背牆若有層次，一米+2000-3600'],
  ['背牆','一般平面(單面)','H244',3300,'每米；背牆若有層次，一米+2000-3600'],
  ['背牆','圓弧(單面)','H350-400',7800,'每米'],
  ['背牆','圓弧(單面)','H244-350',6500,'每米'],
  ['背牆','圓弧(單面)','H244',5200,'每米'],
  ['背牆','附加項目','木門附鎖',3000,'每組'],
  ['背牆','附加項目','外封無接縫帆布',2500,'每米'],

  ['展櫃','一般平面','基礎',8000,'每米'],
  ['展櫃','一般平面','層次(線板)',650,'加價'],
  ['展櫃','一般平面','燈帶壓克力',1300,'加價'],
  ['展櫃','一般平面','間接光',1300,'加價'],
  ['展櫃','一般平面','燈箱字(含壓克力)',2600,'加價'],
  ['展櫃','一般平面','抽屜',1300,'加價'],
  ['展櫃','一般平面','開門附鎖',2600,'加價'],
  ['展櫃','一般平面','雙層吧台',4000,'加價'],
  ['展櫃','圓弧','基礎',11000,'每米'],
  ['展櫃','圓弧','層次(線板)',1300,'加價'],
  ['展櫃','圓弧','燈帶壓克力',2600,'加價'],
  ['展櫃','圓弧','間接光',1600,'加價'],
  ['展櫃','圓弧','燈箱字(含壓克力)',3300,'加價'],
  ['展櫃','圓弧','抽屜',2000,'加價'],
  ['展櫃','圓弧','雙層吧台',5200,'加價'],

  ['天花板','一般平面','基礎',5200,'每坪'],
  ['天花板','一般平面','層次(線板)',650,'加價'],
  ['天花板','一般平面','燈帶壓克力',1300,'加價'],
  ['天花板','一般平面','間接光',1300,'加價'],

  ['地台','一般平面(塑膠地磚)','基礎',5200,'每坪'],
  ['地台','一般平面(塑膠地磚)','燈帶壓克力',1300,'加價'],
  ['地台','一般平面(塑膠地磚)','間接光',1300,'加價'],
  ['地台','一般平面(塑膠地磚)','特殊地磚',1300,'每坪加價'],

  ['配件','電視掛板','四分板',650,''],
  ['配件','層板','平層板 深度30',1300,''],
  ['配件','層板','斜層板(含檔板) 深度30',2600,''],
  ['配件','蓋板','平面 H10*D50',2000,''],
  ['配件','蓋板','雙層階梯 D100',4000,''],

  ['展示物','柵欄式屏風','30*30一支 H350-400',5200,''],
  ['展示物','柵欄式屏風','30*30一支 H350-250',4600,''],
  ['展示物','柵欄式屏風','30*30一支 H250-244',4000,''],
  ['展示物','強化玻璃罩 8mm','四面罩+一面門 50*100*H50',12000,'請注意玻璃支撐問題'],
  ['展示物','強化玻璃罩 8mm','四面罩+一面門 50*150*H50',16000,'請注意玻璃支撐問題'],
  ['展示物','強化玻璃罩 8mm','五面罩 50*50*50',6000,'請注意玻璃支撐問題'],
  ['展示物','壓克力罩 5mm','四面罩+一面門 50*100*H50',11000,'請注意壓克力支撐問題'],
  ['展示物','壓克力罩 5mm','四面罩+一面門 50*150*H50',13000,'請注意壓克力支撐問題'],
  ['展示物','壓克力罩 5mm','五面罩 50*50*50',66000,'請注意壓克力支撐問題'],
  ['展示物','壓克力罩 8mm','四面罩+一面門 50*100*H50',15000,'請注意壓克力支撐問題'],
  ['展示物','壓克力罩 8mm','四面罩+一面門 50*150*H50',20000,'請注意壓克力支撐問題'],
  ['展示物','壓克力罩 8mm','五面罩 50*50*50',5000,'請注意壓克力支撐問題'],
  ['展示物','黑色鐵網(直角)','3*6尺',1800,'3*4尺 NT$1,800'],
  ['展示物','鋼柱(直徑5CM)','單支',4000,''],

  ['服務','代安裝','產品代安裝費',3000,'30分鐘'],
  ['服務','外場','出車費及加班費',0,'另計'],
  ['服務','高空作業','4M以上高空作業費',0,'另計'],
  ['服務','懸吊作業','懸吊作業費用',0,'另計'],
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

const currency = (n) => `NT$ ${Number(n || 0).toLocaleString('zh-TW')}`;
const unique = (arr) => [...new Set(arr)];

export default function App() {
  const [customer, setCustomer] = useState('');
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [quoteNo, setQuoteNo] = useState(`Q${new Date().toISOString().slice(0,10).replace(/-/g,'')}-001`);
  const [category, setCategory] = useState('');
  const [type, setType] = useState('');
  const [item, setItem] = useState('');
  const [qty, setQty] = useState(1);
  const [rows, setRows] = useState([]);

  const categories = unique(PRICE_DATA.map(([c]) => c));
  const types = unique(PRICE_DATA.filter(([c]) => c === category).map(([, t]) => t));
  const items = unique(PRICE_DATA.filter(([c, t]) => c === category && t === type).map(([, , i]) => i));
  const selected = PRICE_DATA.find(([c, t, i]) => c === category && t === type && i === item);
  const unitPrice = selected?.[3] || 0;
  const note = selected?.[4] || '';
  const subtotal = Number(qty || 0) * unitPrice;
  const total = rows.reduce((sum, row) => sum + row.subtotal, 0);

  function addRow() {
    if (!selected || !qty) return;
    setRows(prev => [...prev, {
      id: crypto.randomUUID(),
      category, type, item,
      qty: Number(qty),
      unitPrice,
      subtotal,
      note
    }]);
    setItem('');
    setQty(1);
  }

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8">
      <div className="mx-auto max-w-7xl space-y-6">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold">展場報價系統</h1>
            <p className="text-sm text-slate-500">Railway 可部署版</p>
          </div>
          <button onClick={() => window.print()} className="inline-flex items-center rounded-2xl bg-black px-4 py-2 text-white">
            <Download className="mr-2 h-4 w-4" />列印 / 匯出 PDF
          </button>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <input className="rounded-2xl border p-3" placeholder="客戶名稱" value={customer} onChange={e => setCustomer(e.target.value)} />
          <input className="rounded-2xl border p-3" value={quoteNo} onChange={e => setQuoteNo(e.target.value)} />
          <input className="rounded-2xl border p-3" type="date" value={date} onChange={e => setDate(e.target.value)} />
        </div>

        <div className="grid gap-6 xl:grid-cols-[1.1fr,0.9fr]">
          <div className="rounded-3xl bg-white p-6 shadow-sm">
            <div className="mb-4 flex items-center text-lg font-semibold"><Calculator className="mr-2 h-5 w-5" />新增報價項目</div>
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              <select className="rounded-2xl border p-3" value={category} onChange={e => { setCategory(e.target.value); setType(''); setItem(''); }}>
                <option value="">請選擇分類</option>
                {categories.map(v => <option key={v} value={v}>{v}</option>)}
              </select>
              <select className="rounded-2xl border p-3" value={type} onChange={e => { setType(e.target.value); setItem(''); }} disabled={!category}>
                <option value="">請選擇類型</option>
                {types.map(v => <option key={v} value={v}>{v}</option>)}
              </select>
              <select className="rounded-2xl border p-3" value={item} onChange={e => setItem(e.target.value)} disabled={!type}>
                <option value="">請選擇項目</option>
                {items.map(v => <option key={v} value={v}>{v}</option>)}
              </select>
              <input className="rounded-2xl border p-3" type="number" min="0" value={qty} onChange={e => setQty(e.target.value)} />
            </div>

            <div className="mt-4 grid gap-4 md:grid-cols-3">
              <div className="rounded-2xl border p-4"><div className="text-sm text-slate-500">單價</div><div className="mt-1 text-2xl font-bold">{currency(unitPrice)}</div></div>
              <div className="rounded-2xl border p-4"><div className="text-sm text-slate-500">小計</div><div className="mt-1 text-2xl font-bold">{currency(subtotal)}</div></div>
              <div className="rounded-2xl border p-4"><div className="text-sm text-slate-500">備註</div><div className="mt-1 text-sm text-slate-700">{note || '—'}</div></div>
            </div>

            <button onClick={addRow} disabled={!selected || !qty} className="mt-4 inline-flex items-center rounded-2xl bg-black px-4 py-2 text-white disabled:opacity-40">
              <Plus className="mr-2 h-4 w-4" />加入報價單
            </button>
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-sm">
            <div className="text-lg font-semibold">報價摘要</div>
            <div className="mt-4 rounded-2xl border p-4"><div className="text-sm text-slate-500">項目數</div><div className="mt-1 text-2xl font-bold">{rows.length}</div></div>
            <div className="mt-4 rounded-2xl border p-4"><div className="text-sm text-slate-500">總計（未稅）</div><div className="mt-1 text-3xl font-bold">{currency(total)}</div></div>
            <div className="mt-4 rounded-2xl border p-4 text-sm leading-7 text-slate-600">
              {NOTES.map((n, i) => <div key={i}>{i + 1}. {n}</div>)}
            </div>
          </div>
        </div>

        <div className="rounded-3xl bg-white p-6 shadow-sm">
          <div className="mb-4 text-lg font-semibold">報價明細</div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px] border-collapse text-sm">
              <thead>
                <tr className="border-b bg-slate-100 text-left">
                  <th className="p-3">分類</th>
                  <th className="p-3">類型</th>
                  <th className="p-3">項目</th>
                  <th className="p-3">數量</th>
                  <th className="p-3">單價</th>
                  <th className="p-3">小計</th>
                  <th className="p-3">備註</th>
                  <th className="p-3 print:hidden">操作</th>
                </tr>
              </thead>
              <tbody>
                {rows.length === 0 ? (
                  <tr><td className="p-6 text-center text-slate-500" colSpan="8">尚未加入任何項目</td></tr>
                ) : rows.map(row => (
                  <tr key={row.id} className="border-b align-top">
                    <td className="p-3">{row.category}</td>
                    <td className="p-3">{row.type}</td>
                    <td className="p-3">{row.item}</td>
                    <td className="p-3">{row.qty}</td>
                    <td className="p-3">{currency(row.unitPrice)}</td>
                    <td className="p-3 font-semibold">{currency(row.subtotal)}</td>
                    <td className="p-3 text-slate-600">{row.note || '—'}</td>
                    <td className="p-3 print:hidden">
                      <button onClick={() => setRows(prev => prev.filter(x => x.id !== row.id))} className="rounded-xl border p-2"><Trash2 className="h-4 w-4" /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="rounded-3xl bg-white p-6 shadow-sm">
          <div className="border-b pb-4">
            <h2 className="text-2xl font-bold">正式報價單</h2>
            <div className="mt-2 space-y-1 text-sm text-slate-600">
              <div>客戶名稱：{customer || '—'}</div>
              <div>報價單號：{quoteNo}</div>
              <div>日期：{date}</div>
            </div>
          </div>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full min-w-[760px] border-collapse text-sm">
              <thead>
                <tr className="border-y bg-slate-100 text-left">
                  <th className="p-3">分類</th>
                  <th className="p-3">類型</th>
                  <th className="p-3">項目</th>
                  <th className="p-3">數量</th>
                  <th className="p-3">單價</th>
                  <th className="p-3">小計</th>
                </tr>
              </thead>
              <tbody>
                {rows.map(row => (
                  <tr key={row.id} className="border-b">
                    <td className="p-3">{row.category}</td>
                    <td className="p-3">{row.type}</td>
                    <td className="p-3">{row.item}</td>
                    <td className="p-3">{row.qty}</td>
                    <td className="p-3">{currency(row.unitPrice)}</td>
                    <td className="p-3 font-semibold">{currency(row.subtotal)}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="bg-slate-50">
                  <td colSpan="4"></td>
                  <td className="p-3 text-right font-semibold">總計</td>
                  <td className="p-3 text-xl font-bold">{currency(total)}</td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
