import React, { useState } from 'react';
import { Calculator, Download, Plus, Trash2 } from 'lucide-react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  "https://giumltqfcdnheyxionlb.supabase.co",
  "sb_publishable_GL-FpcqD2yhs_ncXYbQUaw_MqA6JaMn"
);

const PRICE_DATA = [
  ['看板','一般平面','基礎',4000,'每米'],
  ['看板','一般平面','層次(線板)',650,'加價'],
  ['看板','一般平面','燈帶壓克力',1300,'加價'],
  ['看板','圓弧','基礎',5500,'每米']
];

const unique = (arr) => [...new Set(arr)];
const money = (n) => `NT$ ${Number(n||0).toLocaleString()}`;

export default function App() {
  const [customer, setCustomer] = useState('');
  const [date, setDate] = useState(new Date().toISOString().slice(0,10));
  const [quoteNo, setQuoteNo] = useState(`Q${Date.now()}`);
  const [category, setCategory] = useState('');
  const [type, setType] = useState('');
  const [item, setItem] = useState('');
  const [qty, setQty] = useState(1);
  const [rows, setRows] = useState([]);
  const [history, setHistory] = useState([]);

  const categories = unique(PRICE_DATA.map(([c])=>c));
  const types = unique(PRICE_DATA.filter(([c])=>c===category).map(([,t])=>t));
  const items = unique(PRICE_DATA.filter(([c,t])=>c===category&&t===type).map(([, ,i])=>i));

  const selected = PRICE_DATA.find(([c,t,i])=>c===category&&t===type&&i===item);
  const price = selected?.[3]||0;
  const subtotal = price * qty;
  const total = rows.reduce((a,b)=>a+b.subtotal,0);

  function addRow(){
    if(!selected) return;
    setRows([...rows,{
      id: crypto.randomUUID(),
      category,type,item,
      qty,
      unitPrice:price,
      subtotal
    }]);
  }

  function removeRow(id){
    setRows(rows.filter(r=>r.id!==id));
  }

  async function saveQuotation(){
    if(!customer || rows.length===0){
      alert('請填寫資料');
      return;
    }

    const {error} = await supabase.from('quotations').insert([{
      customer,
      quote_no:quoteNo,
      date,
      items:rows,
      total
    }]);

    if(error){
      alert('儲存失敗');
      console.error(error);
    }else{
      alert('儲存成功');
      loadHistory();
    }
  }

  async function loadHistory(){
    const {data,error} = await supabase
      .from('quotations')
      .select('*')
      .order('created_at',{ascending:false});

    if(!error) setHistory(data);
  }

  function loadQuotation(q){
    setCustomer(q.customer);
    setQuoteNo(q.quote_no);
    setDate(q.date);
    setRows(q.items || []);
  }

  useEffect(()=>{
    loadHistory();
  },[]);

  return (
    <div style={{padding:20}}>

      <h1>報價系統</h1>

      <input placeholder="客戶" value={customer} onChange={e=>setCustomer(e.target.value)} />
      <br/>

      <select onChange={e=>setCategory(e.target.value)}>
        <option>分類</option>
        {categories.map(v=><option key={v}>{v}</option>)}
      </select>

      <select onChange={e=>setType(e.target.value)}>
        <option>類型</option>
        {types.map(v=><option key={v}>{v}</option>)}
      </select>

      <select onChange={e=>setItem(e.target.value)}>
        <option>項目</option>
        {items.map(v=><option key={v}>{v}</option>)}
      </select>

      <input type="number" value={qty} onChange={e=>setQty(e.target.value)} />

      <button onClick={addRow}>
        <Plus size={14}/> 加入
      </button>

      <h3>明細</h3>

      {rows.map(r=>(
        <div key={r.id}>
          {r.item} x {r.qty} = {money(r.subtotal)}
          <button onClick={()=>removeRow(r.id)}>
            <Trash2 size={14}/>
          </button>
        </div>
      ))}

      <h2>總計：{money(total)}</h2>

      <button onClick={saveQuotation}>儲存報價</button>
      <button onClick={()=>window.print()}>
        <Download size={14}/> PDF
      </button>

      <hr/>

      <h2>歷史報價</h2>

      {history.map(q=>(
        <div key={q.id} style={{border:'1px solid #ccc',margin:10,padding:10}}>
          <div>{q.customer}</div>
          <div>{q.quote_no}</div>
          <div>{money(q.total)}</div>
          <button onClick={()=>loadQuotation(q)}>載入</button>
        </div>
      ))}

    </div>
  );
}
