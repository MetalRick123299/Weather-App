(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))i(e);new MutationObserver(e=>{for(const n of e)if(n.type==="childList")for(const s of n.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&i(s)}).observe(document,{childList:!0,subtree:!0});function c(e){const n={};return e.integrity&&(n.integrity=e.integrity),e.referrerpolicy&&(n.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?n.credentials="include":e.crossorigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function i(e){if(e.ep)return;e.ep=!0;const n=c(e);fetch(e.href,n)}})();const u=document.querySelector("#weatherText"),f=document.querySelector("#currentTemp"),h=document.querySelector("#feelsLike"),p=document.querySelector("#wind"),y=document.querySelector("#humidity"),l=document.querySelector("#inputPlace"),w=document.querySelector("#weatherButton"),a=document.querySelector("#unitChange"),m=document.querySelector("#error");let o="imperial";l.value="Miami";d();async function g(t,r){const c=await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${t}&units=${r}&appid=011427f50ff4734991646a7070537ded`);if(c.status===404)return console.log("City Not Found"),m.style="visibility: visible",!1;const i=await c.json();return console.log(i),i}async function d(){console.log(l.value);const t=await g(l.value,o);!t||(console.log(t.cod),m.style="visibility: hidden",u.firstElementChild.textContent=t.weather[0].description,u.lastElementChild.textContent=t.name,f.textContent=Math.round(t.main.temp),h.textContent=Math.round(t.main.feels_like),p.textContent=o==="imperial"?`Wind: ${Math.round(t.wind.speed)} MPH`:`Wind: ${Math.round(t.wind.speed)} MPS`,y.textContent=`Humidity: ${Math.round(t.main.humidity)}%`)}w.addEventListener("click",d);function C(){o==="imperial"?(o="metric",a.innerHTML="&#8451;"):(o="imperial",a.innerHTML="&#8457;"),console.log(o),l.value=u.lastElementChild.textContent,d()}a.addEventListener("click",C);
