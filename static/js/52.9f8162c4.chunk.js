"use strict";(self.webpackChunkMonitor_Dashboard=self.webpackChunkMonitor_Dashboard||[]).push([[52],{52:(e,r,d)=>{d.r(r),d.d(r,{default:()=>l});d(43);var i=d(464),o=d(192),n=d(579);const t=i.Ay.div`
  width: 100%;
  height: 600px;
  overflow: hidden;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background-color: #fff;
  margin-bottom: 20px;
`,x=i.Ay.div`
  display: flex;
  padding: 10px;
  font-weight: bold;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  font-size: 1rem;

  @media (max-width: 768px) {
    font-size: 0.875rem;
    padding: 8px;
  }
`,s=i.Ay.div`
  display: flex;
  padding: 10px;
  border-bottom: 1px solid #f0f0f0;
  transition: background-color 0.2s;
  box-sizing: border-box;

  &:nth-child(even) {
    background-color: #f9f9f9;
  }

  &:hover {
    background-color: #f1f1f1;
  }

  @media (max-width: 768px) {
    font-size: 0.875rem;
    padding: 8px;
  }
`,a=i.Ay.div`
  flex: 1;
  padding: 0 10px;
  word-break: break-word;
  box-sizing: border-box;

  &:first-child {
    flex: 0.5;
  }

  @media (max-width: 768px) {
    padding: 0 5px;
  }
`,l=e=>{let{deviceData:r}=e;return(0,n.jsxs)(t,{children:[(0,n.jsxs)(x,{children:[(0,n.jsx)(a,{children:"ID"}),(0,n.jsx)(a,{children:"Name"}),(0,n.jsx)(a,{children:"Runtime"}),(0,n.jsx)(a,{children:"Temperature"}),(0,n.jsx)(a,{children:"Power"}),(0,n.jsx)(a,{children:"Production Rate"}),(0,n.jsx)(a,{children:"Error Rate"})]}),(0,n.jsx)(o.Y1,{height:600,itemCount:r.length,itemSize:50,width:"100%",children:e=>{let{index:d,style:i}=e;const o=r[d];return(0,n.jsxs)(s,{style:{...i,display:"flex"},children:[" ",(0,n.jsx)(a,{children:o.id}),(0,n.jsx)(a,{children:o.name}),(0,n.jsx)(a,{children:o.runtime}),(0,n.jsx)(a,{children:o.temperature}),(0,n.jsx)(a,{children:o.power}),(0,n.jsx)(a,{children:o.productionRate}),(0,n.jsx)(a,{children:o.errorRate})]})}})]})}}}]);
//# sourceMappingURL=52.9f8162c4.chunk.js.map