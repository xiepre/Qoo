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
  CopyPlus,
} from 'lucide-react';
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

const printCss = `
  @page {
    size: A4;
    margin: 12mm;
  }

  @media print {
    html, body {
      background: #fff !important;
      margin: 0 !important;
      padding: 0 !important;
    }

    body * {
      visibility: hidden;
    }

    #print-root, #print-root * {
      visibility: visible;
    }

    #print-root {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      background: #fff !important;
      padding: 0 !important;
      margin: 0 !important;
    }

    .no-print {
      display: none !important;
    }

    .print-card {
      box-shadow: none !important;
      border: none !important;
      padding: 0 !important;
      margin: 0 !important;
      background: #fff !important;
    }

    .print-table {
      width: 100% !important;
      min-width: 0 !important;
      border-collapse: collapse !important;
      table-layout: fixed !important;
    }

    .print-table th,
    .print-table td {
      border: 1px solid #cbd5e1 !important;
      padding: 8px !important;
      font-size: 12px !important;
      color: #000 !important;
      word-break: break-word;
    }

    .print-table th {
      background: #f8fafc !important;
    }

    .print-notes {
      margin-top: 16px !important;
      border: 1px solid #cbd5e1 !important;
      border-radius: 0 !important;
      padding: 12px !important;
      background: #fff !important;
      font-size: 12px !important;
      color: #000 !important;
      line-height: 1.8 !important;
    }

    .print-header {
      display: flex !important;
      justify-content: space-between !important;
      align-items: flex-start !important;
      gap: 16px !important;
      border-bottom: 1px solid #cbd5e1 !important;
      padding-bottom: 16px !important;
      margin-bottom: 16px !important;
    }

    .print-total {
      font-size: 18px !important;
      font-weight: 700 !important;
    }
  }
`;

function uniq(arr) {
  return [...new Set(arr)];
}

function money(n) {
  return `NT$ ${Number(n || 0).toLocaleString('zh-TW')}`;
}

function todayString() {
  return new Date().toISOString().slice(0, 10);
}

function todayCompact() {
  return todayString().replace(/-/g, '');
}

function buildNextQuoteNo(history) {
  const prefix = `Q${todayCompact()}-`;
  const sameDay = (history || []).filter((q) => String(q.quote_no || '').startsWith(prefix));
  let max = 0;

  sameDay.forEach((q) => {
    const no = String(q.quote_no || '').split('-').pop();
    const num = Number(no);
    if (!Number.isNaN(num) && num > max) max = num;
  });

  const next = String(max + 1).padStart(3, '0');
  return `${prefix}${next}`;
}

function makeRowId() {
  return typeof crypto !== 'undefined' && crypto.randomUUID
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random()}`;
}

function cloneRows(rows) {
  return (rows || []).map((row) => ({
    ...row,
    id: makeRowId(),
  }));
}

function downloadFile(data, filename, type = 'text/csv;charset=utf-8;') {
  const blob = new Blob(['\uFEFF' + data], { type });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

function escapeCsv(value) {
  const text = String(value ?? '');
  return `"${text.replace(/"/g, '""')}"`;
}

function buildCurrentQuotationCsv({ customer, quoteNo, date, rows, total }) {
  const lines = [];

  lines.push(['客戶名稱', customer || '']);
  lines.push(['報價單號', quoteNo || '']);
  lines.push(['日期', date || '']);
  lines.push([]);
  lines.push(['分類', '類型', '項目', '數量', '單價', '小計', '備註']);

  rows.forEach((row) => {
    lines.push([
      row.category || '',
      row.type || '',
      row.item || '',
      row.qty || 0,
      row.unitPrice || 0,
      row.subtotal || 0,
      row.note || '',
    ]);
  });

  lines.push([]);
  lines.push(['總計', '', '', '', '', total || 0, '']);

  return lines.map((row) => row.map(escapeCsv).join(',')).join('\n');
}

function buildAllQuotationsCsv(history) {
  const lines = [];
  lines.push([
    '客戶名稱',
    '報價單號',
    '日期',
    '分類',
    '類型',
    '項目',
    '數量',
    '單價',
    '小計',
    '備註',
    '報價總計',
  ]);

  history.forEach((quotation) => {
    const items = Array.isArray(quotation.items) ? quotation.items : [];

    if (items.length === 0) {
      lines.push([
        quotation.customer || '',
        quotation.quote_no || '',
        quotation.date || '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        quotation.total || 0,
      ]);
      return;
    }

    items.forEach((row) => {
      lines.push([
        quotation.customer || '',
        quotation.quote_no || '',
        quotation.date || '',
        row.category || '',
        row.type || '',
        row.item || '',
        row.qty || 0,
        row.unitPrice || 0,
        row.subtotal || 0,
        row.note || '',
        quotation.total || 0,
      ]);
    });
  });

  return lines.map((row) => row.map(escapeCsv).join(',')).join('\n');
}

export default function App() {
  const [customer, setCustomer] = useState('');
  const [date, setDate] = useState(todayString());
  const [quoteNo, setQuoteNo] = useState(`Q${todayCompact()}-001`);

  const [category, setCategory] = useState('');
  const [type, setType] = useState('');
  const [item, setItem] = useState('');
  const [qty, setQty] = useState(1);

  const [rows, setRows] = useState([]);
  const [history, setHistory] = useState([]);
  const [historySearch, setHistorySearch] = useState('');

  const [editingId, setEditingId] = useState(null);
  const [saving, setSaving] = useState(false);
  const [loadingHistory, setLoadingHistory] = useState(false);
  const [tab, setTab] = useState('editor');

  const categories = useMemo(() => uniq(PRICE_DATA.map(([c]) => c)), []);
  const types = useMemo(
    () => uniq(PRICE_DATA.filter(([c]) => c === category).map(([, t]) => t)),
    [category]
  );
  const items = useMemo(
    () => uniq(PRICE_DATA.filter(([c, t]) => c === category && t === type).map(([, , i]) => i)),
    [category, type]
  );

  const selected = useMemo(
    () => PRICE_DATA.find(([c, t, i]) => c === category && t === type && i === item),
    [category, type, item]
  );

  const unitPrice = selected?.[3] || 0;
  const note = selected?.[4] || '';
  const subtotal = Number(qty || 0) * Number(unitPrice || 0);
  const total = rows.reduce((sum, row) => sum + Number(row.subtotal || 0), 0);

  const filteredHistory = useMemo(() => {
    const keyword = historySearch.trim().toLowerCase();
    if (!keyword) return history;

    return history.filter((q) => {
      const customerText = String(q.customer || '').toLowerCase();
      const quoteText = String(q.quote_no || '').toLowerCase();
      return customerText.includes(keyword) || quoteText.includes(keyword);
    });
  }, [history, historySearch]);

  function resetSelectors(nextCategory = '') {
    setCategory(nextCategory);
    setType('');
    setItem('');
  }

  function resetForm(newQuoteNo) {
    setCustomer('');
    setDate(todayString());
    setCategory('');
    setType('');
    setItem('');
    setQty(1);
    setRows([]);
    setEditingId(null);
    setHistorySearch('');

    if (newQuoteNo) setQuoteNo(newQuoteNo);
    else setQuoteNo(buildNextQuoteNo(history));
  }

  function addRow() {
    if (!selected || !qty) return;

    setRows((prev) => [
      ...prev,
      {
        id: makeRowId(),
        category,
        type,
        item,
        qty: Number(qty),
        unitPrice: Number(unitPrice),
        subtotal: Number(subtotal),
        note,
      },
    ]);

    setItem('');
    setQty(1);
  }

  function removeRow(id) {
    setRows((prev) => prev.filter((row) => row.id !== id));
  }

  async function loadHistory() {
    try {
      setLoadingHistory(true);
      const { data, error } = await supabase
        .from('quotations')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error(error);
        alert('讀取歷史報價失敗');
        return [];
      }

      const list = data || [];
      setHistory(list);

      if (!editingId) {
        setQuoteNo(buildNextQuoteNo(list));
      }

      return list;
    } catch (err) {
      console.error(err);
      alert('讀取歷史報價失敗');
      return [];
    } finally {
      setLoadingHistory(false);
    }
  }

  async function saveQuotation() {
    if (!customer || rows.length === 0) {
      alert('請先輸入客戶名稱並加入至少一筆報價項目');
      return;
    }

    try {
      setSaving(true);

      const payload = {
        customer,
        quote_no: quoteNo,
        date,
        items: rows,
        total,
      };

      let error;

      if (editingId) {
        ({ error } = await supabase.from('quotations').update(payload).eq('id', editingId));
      } else {
        ({ error } = await supabase.from('quotations').insert([payload]));
      }

      if (error) {
        console.error(error);
        alert(editingId ? '更新失敗' : '儲存失敗');
        return;
      }

      alert(editingId ? '更新成功' : '儲存成功');

      const { data: refreshedData, error: refreshError } = await supabase
        .from('quotations')
        .select('*')
        .order('created_at', { ascending: false });

      if (!refreshError) {
        const refreshedList = refreshedData || [];
        setHistory(refreshedList);
        resetForm(buildNextQuoteNo(refreshedList));
      } else {
        const refreshedList = await loadHistory();
        resetForm(buildNextQuoteNo(refreshedList));
      }

      setTab('editor');
    } catch (err) {
      console.error(err);
      alert(editingId ? '更新失敗' : '儲存失敗');
    } finally {
      setSaving(false);
    }
  }

  function loadQuotation(q) {
    setCustomer(q.customer || '');
    setQuoteNo(q.quote_no || '');
    setDate(q.date || todayString());
    setRows(Array.isArray(q.items) ? cloneRows(q.items) : []);
    setEditingId(q.id);
    setCategory('');
    setType('');
    setItem('');
    setQty(1);
    setTab('editor');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function duplicateQuotationToNewCustomer(source) {
    const sourceRows = Array.isArray(source)
      ? source
      : Array.isArray(source?.items)
        ? source.items
        : rows;

    if (!sourceRows || sourceRows.length === 0) {
      alert('這張報價沒有可複製的項目');
      return;
    }

    const ok = window.confirm('要用這張報價建立「新客戶報價」嗎？會保留項目並清空客戶名稱。');
    if (!ok) return;

    setCustomer('');
    setQuoteNo(buildNextQuoteNo(history));
    setDate(todayString());
    setRows(cloneRows(sourceRows));
    setEditingId(null);
    setCategory('');
    setType('');
    setItem('');
    setQty(1);
    setTab('editor');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  async function deleteQuotation(id) {
    const ok = window.confirm('確定刪除此筆報價？');
    if (!ok) return;

    try {
      const { error } = await supabase.from('quotations').delete().eq('id', id);
      if (error) {
        console.error(error);
        alert('刪除失敗');
        return;
      }

      if (editingId === id) {
        resetForm();
      }

      await loadHistory();
      alert('刪除成功');
    } catch (err) {
      console.error(err);
      alert('刪除失敗');
    }
  }

  function exportPdf() {
    setTab('preview');
    setTimeout(() => {
      window.print();
    }, 250);
  }

  function downloadCurrentQuotation() {
    if (rows.length === 0) {
      alert('目前沒有可下載的報價內容');
      return;
    }

    const ok = window.confirm(`確定要下載目前報價「${quoteNo}」嗎？`);
    if (!ok) return;

    const csv = buildCurrentQuotationCsv({
      customer,
      quoteNo,
      date,
      rows,
      total,
    });

    downloadFile(csv, `${quoteNo || 'quotation'}.csv`);
  }

  function downloadAllQuotations() {
    if (history.length === 0) {
      alert('目前沒有歷史報價可匯出');
      return;
    }

    const ok = window.confirm(`確定要匯出全部報價資料嗎？共 ${history.length} 筆`);
    if (!ok) return;

    const csv = buildAllQuotationsCsv(history);
    downloadFile(csv, `all_quotations_${Date.now()}.csv`);
  }

  useEffect(() => {
    loadHistory();
  }, []);

  return (
    <div style={page}>
      <style>{printCss}</style>

      <div style={container}>
        <div style={topBar} className="no-print">
          <div style={titleWrap}>
            <div>
              <h1 style={title}>好帥報價系統</h1>
            </div>
          </div>

          <div style={buttonGroup}>
            <button
              onClick={() => resetForm(buildNextQuoteNo(history))}
              style={buttonOutline}
              type="button"
            >
              <RotateCcw size={16} style={{ marginRight: 6 }} />
              清空
            </button>

            <button
              onClick={() => duplicateQuotationToNewCustomer(rows)}
              style={buttonOutline}
              type="button"
              disabled={rows.length === 0}
            >
              <CopyPlus size={16} style={{ marginRight: 6 }} />
              另存新客戶
            </button>

            <button onClick={saveQuotation} disabled={saving} style={buttonPrimary} type="button">
              <Save size={16} style={{ marginRight: 6 }} />
              {saving ? '儲存中...' : editingId ? '更新報價' : '儲存報價'}
            </button>

            <button onClick={exportPdf} style={buttonPrimary} type="button">
              <Download size={16} style={{ marginRight: 6 }} />
              列印 / 匯出 PDF
            </button>

            <button onClick={downloadCurrentQuotation} style={buttonPrimary} type="button">
              <FileDown size={16} style={{ marginRight: 6 }} />
              下載此報價
            </button>

            <button onClick={downloadAllQuotations} style={buttonOutline} type="button">
              <Database size={16} style={{ marginRight: 6 }} />
              匯出全部
            </button>
          </div>
        </div>

        <div style={tabRow} className="no-print">
          <button
            onClick={() => setTab('editor')}
            style={tab === 'editor' ? tabActive : tabStyle}
            type="button"
          >
            <Calculator size={16} style={{ marginRight: 6 }} />
            報價編輯
          </button>
          <button
            onClick={() => setTab('preview')}
            style={tab === 'preview' ? tabActive : tabStyle}
            type="button"
          >
            正式報價單
          </button>
        </div>

        {tab === 'editor' && (
          <div className="no-print">
            {editingId && (
              <div style={warningBox}>
                ⚠️ 目前為編輯模式，按下「更新報價」會覆蓋原本資料。
              </div>
            )}

            <div style={card}>
              <h2 style={cardTitle}>基本資料</h2>

              <div style={grid3}>
                <div>
                  <label style={label}>客戶名稱</label>
                  <input
                    style={input}
                    value={customer}
                    onChange={(e) => setCustomer(e.target.value)}
                    placeholder="請輸入客戶名稱"
                  />
                </div>

                <div>
                  <label style={label}>報價單號</label>
                  <input
                    style={input}
                    value={quoteNo}
                    onChange={(e) => setQuoteNo(e.target.value)}
                  />
                </div>

                <div>
                  <label style={label}>日期</label>
                  <input
                    style={input}
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div style={twoCol}>
              <div style={card}>
                <h2 style={cardTitle}>新增報價項目</h2>

                <div style={grid4}>
                  <div>
                    <label style={label}>分類</label>
                    <select
                      style={input}
                      value={category}
                      onChange={(e) => resetSelectors(e.target.value)}
                    >
                      <option value="">請選擇分類</option>
                      {categories.map((v) => (
                        <option key={v} value={v}>
                          {v}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label style={label}>類型</label>
                    <select
                      style={input}
                      value={type}
                      onChange={(e) => {
                        setType(e.target.value);
                        setItem('');
                      }}
                      disabled={!category}
                    >
                      <option value="">請選擇類型</option>
                      {types.map((v) => (
                        <option key={v} value={v}>
                          {v}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label style={label}>項目</label>
                    <select
                      style={input}
                      value={item}
                      onChange={(e) => setItem(e.target.value)}
                      disabled={!type}
                    >
                      <option value="">請選擇項目</option>
                      {items.map((v) => (
                        <option key={v} value={v}>
                          {v}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label style={label}>數量</label>
                    <input
                      style={input}
                      type="number"
                      min="0"
                      step="1"
                      value={qty}
                      onChange={(e) => setQty(Number(e.target.value))}
                    />
                  </div>
                </div>

                <div style={grid3}>
                  <div style={statCard}>
                    <div style={statLabel}>單價</div>
                    <div style={statValue}>{money(unitPrice)}</div>
                  </div>

                  <div style={statCard}>
                    <div style={statLabel}>小計</div>
                    <div style={statValue}>{money(subtotal)}</div>
                  </div>

                  <div style={statCard}>
                    <div style={statLabel}>備註</div>
                    <div style={{ color: '#334155', lineHeight: 1.7 }}>{note || '—'}</div>
                  </div>
                </div>

                <button onClick={addRow} disabled={!selected || !qty} style={buttonPrimary} type="button">
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
                  <div style={{ fontSize: '32px', fontWeight: 700 }}>{money(total)}</div>
                </div>

                <div
                  style={{
                    ...statCard,
                    marginTop: '16px',
                    fontSize: '14px',
                    color: '#475569',
                    lineHeight: 1.8,
                  }}
                >
                  {NOTES.map((n, i) => (
                    <div key={i}>
                      {i + 1}. {n}
                    </div>
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
                        <td colSpan="8" style={emptyTd}>
                          尚未加入任何項目
                        </td>
                      </tr>
                    ) : (
                      rows.map((row) => (
                        <tr key={row.id}>
                          <td style={td}>{row.category}</td>
                          <td style={td}>{row.type}</td>
                          <td style={td}>{row.item}</td>
                          <td style={td}>{row.qty}</td>
                          <td style={td}>{money(row.unitPrice)}</td>
                          <td style={{ ...td, fontWeight: 700 }}>{money(row.subtotal)}</td>
                          <td style={td}>{row.note || '—'}</td>
                          <td style={td}>
                            <button onClick={() => removeRow(row.id)} style={iconButton} type="button">
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

            <div style={{ ...card, marginTop: '24px' }}>
              <div style={historyHeader}>
                <h2 style={{ ...cardTitle, marginBottom: 0 }}>歷史報價</h2>

                <div style={historyToolbar}>
                  <div style={searchWrap}>
                    <Search size={16} style={{ color: '#64748b' }} />
                    <input
                      style={searchInput}
                      placeholder="搜尋客戶 / 報價單號"
                      value={historySearch}
                      onChange={(e) => setHistorySearch(e.target.value)}
                    />
                  </div>

                  <button onClick={loadHistory} style={buttonOutline} type="button">
                    {loadingHistory ? '讀取中...' : '重新整理'}
                  </button>
                </div>
              </div>

              <div style={{ marginTop: '16px' }}>
                {loadingHistory ? (
                  <div style={{ color: '#64748b' }}>讀取中...</div>
                ) : filteredHistory.length === 0 ? (
                  <div style={{ color: '#64748b' }}>尚無歷史報價</div>
                ) : (
                  filteredHistory.map((q) => (
                    <div key={q.id} style={historyCard}>
                      <div>
                        <div style={{ fontWeight: 700, fontSize: '18px' }}>{q.customer || '未命名客戶'}</div>
                        <div style={mutedLine}>報價單號：{q.quote_no || '—'}</div>
                        <div style={mutedLine}>日期：{q.date || '—'}</div>
                        <div style={mutedLine}>項目數：{Array.isArray(q.items) ? q.items.length : 0}</div>
                        <div
                          style={{
                            color: '#0f172a',
                            marginTop: '8px',
                            fontWeight: 700,
                            fontSize: '20px',
                          }}
                        >
                          {money(q.total)}
                        </div>
                      </div>

                      <div style={historyActionGroup}>
                        <button onClick={() => loadQuotation(q)} style={buttonPrimary} type="button">
                          載入
                        </button>

                        <button onClick={() => duplicateQuotationToNewCustomer(q)} style={buttonOutline} type="button">
                          新客戶
                        </button>

                        <button onClick={() => deleteQuotation(q.id)} style={buttonDanger} type="button">
                          刪除
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        )}

        {tab === 'preview' && (
          <div id="print-root" style={card} className="print-card">
            <div style={previewHeader} className="print-header">
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
              <table style={table} className="print-table">
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
                  {rows.length === 0 ? (
                    <tr>
                      <td colSpan="6" style={emptyTd}>
                        尚未加入任何項目
                      </td>
                    </tr>
                  ) : (
                    rows.map((row) => (
                      <tr key={row.id}>
                        <td style={td}>{row.category}</td>
                        <td style={td}>{row.type}</td>
                        <td style={td}>{row.item}</td>
                        <td style={td}>{row.qty}</td>
                        <td style={td}>{money(row.unitPrice)}</td>
                        <td style={{ ...td, fontWeight: 700 }}>{money(row.subtotal)}</td>
                      </tr>
                    ))
                  )}
                </tbody>

                <tfoot>
                  <tr>
                    <td colSpan="4" style={td}></td>
                    <td style={{ ...td, textAlign: 'right', fontWeight: 700 }}>總計</td>
                    <td style={{ ...td, fontSize: '24px', fontWeight: 700 }} className="print-total">
                      {money(total)}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>

            <div
              className="print-notes"
              style={{
                ...statCard,
                marginTop: '24px',
                fontSize: '14px',
                color: '#475569',
                lineHeight: 1.8,
              }}
            >
              {NOTES.map((n, i) => (
                <div key={i}>
                  {i + 1}. {n}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

const page = {
  minHeight: '100vh',
  background: '#f8fafc',
  padding: '24px',
};

const container = {
  maxWidth: '1280px',
  margin: '0 auto',
};

const topBar = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  gap: '16px',
  marginBottom: '24px',
  flexWrap: 'wrap',
};

const titleWrap = {
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
};

const title = {
  fontSize: '32px',
  fontWeight: 700,
  margin: 0,
  color: '#0f172a',
};

const buttonGroup = {
  display: 'flex',
  gap: '12px',
  flexWrap: 'wrap',
};

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
  background: '#fff',
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

const buttonDanger = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '12px 16px',
  borderRadius: '12px',
  border: 'none',
  background: '#e11d48',
  color: '#fff',
  cursor: 'pointer',
  fontSize: '14px',
  fontWeight: 600,
};

const tabRow = {
  display: 'flex',
  gap: '12px',
  marginBottom: '24px',
  flexWrap: 'wrap',
};

const tabStyle = {
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
  ...tabStyle,
  background: '#0f172a',
  color: '#fff',
  border: '1px solid #0f172a',
};

const warningBox = {
  marginBottom: '16px',
  padding: '14px 16px',
  borderRadius: '14px',
  background: '#fff7ed',
  border: '1px solid #fdba74',
  color: '#9a3412',
  fontWeight: 600,
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

const twoCol = {
  display: 'grid',
  gridTemplateColumns: '1.2fr 0.8fr',
  gap: '24px',
  marginTop: '24px',
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

const historyHeader = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  gap: '16px',
  flexWrap: 'wrap',
};

const historyToolbar = {
  display: 'flex',
  gap: '12px',
  alignItems: 'center',
  flexWrap: 'wrap',
};

const searchWrap = {
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  border: '1px solid #cbd5e1',
  borderRadius: '12px',
  padding: '0 12px',
  background: '#fff',
};

const searchInput = {
  border: 'none',
  outline: 'none',
  padding: '12px 0',
  minWidth: '220px',
  fontSize: '14px',
  background: 'transparent',
};

const historyCard = {
  border: '1px solid #e2e8f0',
  borderRadius: '16px',
  padding: '16px',
  marginBottom: '12px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  gap: '16px',
  flexWrap: 'wrap',
  background: '#fff',
};

const historyActionGroup = {
  display: 'flex',
  gap: '10px',
  flexWrap: 'wrap',
};

const mutedLine = {
  color: '#64748b',
  marginTop: '4px',
};

const previewHeader = {
  display: 'flex',
  justifyContent: 'space-between',
  gap: '16px',
  borderBottom: '1px solid #e2e8f0',
  paddingBottom: '24px',
  marginBottom: '24px',
  flexWrap: 'wrap',
};
