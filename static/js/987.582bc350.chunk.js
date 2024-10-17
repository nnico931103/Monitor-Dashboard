"use strict";(self.webpackChunksmart_dashboard=self.webpackChunksmart_dashboard||[]).push([[987],{987:(t,e,a)=>{a.r(e),a.d(e,{default:()=>h});var r=a(43),n=a(145),d=a(464),l=a(579);const i=d.Ay.div`
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  background-color: #fff;
  text-align: center;
  overflow: hidden;
  max-width: 100%;
`,s=d.Ay.h3`
  margin-bottom: 10px;
  font-size: 1.2rem;
  color: #333;
`,o=t=>{let{data:e,chartType:a,dataKey:d,label:o,width:c=700,height:p=350,maxValue:h=1/0}=t;const x=(0,r.useRef)(null),[m,u]=(0,r.useState)({width:c,height:p}),y=()=>{var t;null!==(t=x.current)&&void 0!==t&&t.parentElement&&u({width:x.current.parentElement.offsetWidth,height:p})};return(0,r.useEffect)((()=>(y(),window.addEventListener("resize",y),()=>{window.removeEventListener("resize",y)})),[]),(0,r.useEffect)((()=>{if(!x.current)return;const t=n.Ltv(x.current);t.selectAll("*").remove();const r=20,l=30,i=50,s=60,o=m.width-s-l,c=m.height-r-i,p=t.append("g").attr("transform",`translate(${s},${r})`),u=n.exT(n.dM).domain([0,n.T9B(e,(t=>t[d]))||0]),y=n.i2o(e,(t=>t[d]));if("bar"===a){const t=n.WH().range([0,o]).domain(e.map((t=>t.name))).padding(.1),a=n.m4Y().range([c,0]).domain([0,n.T9B(e,(t=>t[d]))||0]).nice();p.append("g").attr("transform",`translate(0,${c})`).call(n.l78(t)).selectAll("text").attr("transform","rotate(-45)").style("text-anchor","end").style("font-size",o<600?"11px":"12px"),p.append("g").call(n.V4s(a)),p.selectAll(".bar").data(e).enter().append("rect").attr("x",(e=>t(e.name))).attr("y",(t=>a(t[d]))).attr("width",t.bandwidth()).attr("height",(t=>c-a(t[d]))).attr("fill",(t=>t[d]>h?"red":u(t[d]))).attr("opacity",.9),p.selectAll(".text").data(e).enter().append("text").attr("class","label").attr("x",(e=>t(e.name)+t.bandwidth()/2)).attr("y",(t=>a(t[d])-5)).attr("text-anchor","middle").style("font-size",o<600?"11px":"12px").text((t=>t[d])),void 0!==y&&p.append("line").attr("x1",0).attr("x2",o).attr("y1",a(y)).attr("y2",a(y)).attr("stroke","green").attr("stroke-width",2).attr("stroke-dasharray","5,5")}if("line"===a){const t=n.hqK().range([0,o]).domain(e.map((t=>t.name))),a=n.m4Y().range([c,0]).domain([0,n.T9B(e,(t=>t[d]))||0]).nice();p.append("g").attr("transform",`translate(0,${c})`).call(n.l78(t)).selectAll("text").attr("transform","rotate(-45)").style("text-anchor","end").style("font-size",o<600?"11px":"12px"),p.append("g").call(n.V4s(a));const r=n.n8j().x((e=>t(e.name))).y((t=>a(t[d]))).curve(n.nVG);p.append("path").datum(e).attr("fill","none").attr("stroke","#8884d8").attr("stroke-width",2).attr("d",r).attr("opacity",.7),p.selectAll(".dot").data(e).enter().append("circle").attr("cx",(e=>t(e.name))).attr("cy",(t=>a(t[d]))).attr("r",5).attr("fill",(t=>t[d]>h?"red":"#8884d8")),void 0!==y&&p.append("line").attr("x1",0).attr("x2",o).attr("y1",a(y)).attr("y2",a(y)).attr("stroke","green").attr("stroke-width",2).attr("stroke-dasharray","5,5")}}),[e,a,d,o,m,h]),(0,l.jsxs)(i,{children:[(0,l.jsx)(s,{children:o}),(0,l.jsx)("svg",{ref:x,width:"100%",height:m.height,viewBox:`0 0 ${m.width} ${m.height}`})]})},c=d.Ay.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  padding: 20px;
  gap: 20px;
`,p=(d.Ay.h2`
  text-align: center;
  color: #333;
  margin-bottom: 20px;
`,d.Ay.div`
  min-width: 300px;
  margin: 10px;
  flex: 1 1 calc(50% - 40px);
`),h=t=>{let{deviceData:e}=t;return(0,l.jsx)("div",{children:(0,l.jsxs)(c,{children:[(0,l.jsx)(p,{children:(0,l.jsx)(o,{data:e,chartType:"bar",dataKey:"runtime",label:"Runtime (hours)"})}),(0,l.jsx)(p,{children:(0,l.jsx)(o,{data:e,chartType:"line",dataKey:"temperature",label:"Temperature (\xb0C)",maxValue:70})}),(0,l.jsx)(p,{children:(0,l.jsx)(o,{data:e,chartType:"bar",dataKey:"power",label:"Power Consumption (kWh)",maxValue:70})}),(0,l.jsx)(p,{children:(0,l.jsx)(o,{data:e,chartType:"line",dataKey:"productionRate",label:"Production Rate (%)"})}),(0,l.jsx)(p,{children:(0,l.jsx)(o,{data:e,chartType:"bar",dataKey:"errorRate",label:"Error Rate (%)",maxValue:5})})]})})}}}]);
//# sourceMappingURL=987.582bc350.chunk.js.map