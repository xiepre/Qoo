import React, { useState, useEffect } from 'react';
import { Calculator, Download, Plus, Trash2 } from 'lucide-react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  "https://giumltqfcdnheyxionlb.supabase.co",
  "sb_publishable_GL-FpcqD2yhs_ncXYbQUaw_MqA6JaMn"
);

const PRICE_DATA = [
  ['看板','一般平面','基礎',4000],
  ['看板','圓弧','基礎',5500],
];

const unique = (arr) => [...new Set(arr)];
const money = (n) => `NT$ ${Number(n||0).toLocaleString()}`;

export default function App() {

  const [customer,setCustomer]=useState('');
  const [quoteNo,setQuoteNo]=useState(`Q${Date.now()}`);
  const [date,setDate]=useState(new Date().toISOString().slice(0,10));

  const [category,setCategory]=useState('');
  const [type,setType]=useState('');
  const [item,setItem]=useState('');
  const [qty,setQty]=useState(1);

  const [rows,setRows]=useState([]);
  const [history,setHistory]=useState([]);

  const [editingId,setEditingId]=useState(null); // ⭐編輯用

  const categories=unique(PRICE_DATA.map(([c])=>c));
  const types=unique(PRICE_DATA.filter(([c])=>c===category).map(([,t])=>t));
  const items=unique(PRICE_DATA.filter(([c,t])=>c===category&&t===type).map(([, ,i])=>i));

  const selected=PRICE_DATA.find(([c,t,i])=>c===category&&t===type&&i===item);
  const price=selected?.[3]||0;
  const subtotal=price*qty;
  const total=rows.reduce((a,b)=>a+b.subtotal,0);

  function addRow(){
    if(!selected)return;
    setRows([...rows,{
      id:crypto.randomUUID(),
      category,type,item,
      qty,
      unitPrice:price,
      subtotal
    }]);
  }

  function removeRow(id){
    setRows(rows.filter(r=>r.id!==id));
  }

  // ⭐ 儲存 or 更新
  async function saveQuotation(){

    if(!customer || rows.length===0){
      alert('請填資料');
      return;
    }

    if(editingId){
      // 更新
      const {error}=await supabase
        .from('quotations')
        .update({
          customer,
          quote_no:quoteNo,
          date,
          items:rows,
          total
        })
        .eq('id',editingId);

      if(error){
        alert('更新失敗');
        return;
      }

      alert('更新成功');
      setEditingId(null);

    }else{
      // 新增
      const {error}=await supabase.from('quotations').insert([{
        customer,
        quote_no:quoteNo,
        date,
        items:rows,
        total
      }]);

      if(error){
        alert('儲存失敗');
        return;
      }

      alert('儲存成功');
    }

    loadHistory();
  }

  async function loadHistory(){
    const {data}=await supabase
      .from('quotations')
      .select('*')
      .order('created_at',{ascending:false});

    setHistory(data||[]);
  }

  // ⭐ 載入（同時進入編輯模式）
  function loadQuotation(q){
    setCustomer(q.customer);
    setQuoteNo(q.quote_no);
    setDate(q.date);
    setRows(q.items || []);
    setEditingId(q.id);
  }

  // ⭐ 刪除
  async function deleteQuotation(id){
    if(!confirm('確定刪除?'))return;

    await supabase
      .from('quotations')
      .delete()
      .eq('id',id);

    loadHistory();
  }

  useEffect(()=>{
    loadHistory();
  },[]);

  return (
    <div style={{padding:20}}>

      <h1>完整報價系統</h1>

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

      <button onClick={addRow}>加入</button>

      <h3>明細</h3>
      {rows.map(r=>(
        <div key={r.id}>
          {r.item} x {r.qty} = {money(r.subtotal)}
          <button onClick={()=>removeRow(r.id)}>刪</button>
        </div>
      ))}

      <h2>總計：{money(total)}</h2>

      <button onClick={saveQuotation}>
        {editingId ? '更新報價' : '儲存報價'}
      </button>

      <hr/>

      <h2>歷史報價</h2>

      {history.map(q=>(
        <div key={q.id} style={{border:'1px solid #ccc',margin:10,padding:10}}>
          <div>{q.customer}</div>
          <div>{q.quote_no}</div>
          <div>{money(q.total)}</div>

          <button onClick={()=>loadQuotation(q)}>編輯</button>
          <button onClick={()=>deleteQuotation(q.id)}>刪除</button>
        </div>
      ))}

    </div>
  );
}
