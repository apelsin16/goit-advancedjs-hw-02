import"./assets/styles-DhHlbY1N.js";import{i as m}from"./assets/vendor-BbbuE1sJ.js";const s=document.querySelector(".form"),r=({status:o,delay:e})=>new Promise((i,t)=>{setTimeout(()=>{o==="fulfilled"?i(`✅ Fulfilled promise in ${e}ms`):t(`❌ Rejected promise in ${e}ms`)},e)});s.addEventListener("submit",o=>{o.preventDefault();const e=s.elements.state.value,i=Number(s.elements.delay.value);r({status:e,delay:i}).then(t=>{m.success({message:t,timeout:3e3,position:"topRight"})}).catch(t=>{m.error({message:t,timeout:3e3,position:"topRight"})}),s.reset()});
//# sourceMappingURL=2-snackbar.js.map
