const defaults = ["Makan bakso","Nonton film","Jalan-jalan","Belajar","Main game","Istirahat"];
const palette = ["#9B82FF","#FF8A76","#F5C96A","#56C9B2","#70A7FF","#E78ACB","#A8D66D","#F39B58","#65C6E8","#C18BFF"];
let items = [...defaults], rotation = 0, spinning = false, history = [];
const canvas = document.getElementById("wheel"), ctx = canvas.getContext("2d");
const $ = id => document.getElementById(id);
const list = $("itemList"), spinBtn = $("spinBtn");
const norm = a => ((a % (Math.PI*2)) + Math.PI*2) % (Math.PI*2);

function drawWheel(){
  const size=canvas.width, c=size/2, r=size/2-8; ctx.clearRect(0,0,size,size);
  if(!items.length){ctx.beginPath();ctx.arc(c,c,r,0,Math.PI*2);ctx.fillStyle="#333c5b";ctx.fill();ctx.fillStyle="#fff";ctx.textAlign="center";ctx.font="bold 23px sans-serif";ctx.fillText("Tambah pilihan",c,c);return}
  const slice=Math.PI*2/items.length;
  items.forEach((item,i)=>{
    const start=rotation+i*slice-Math.PI/2, end=start+slice;
    ctx.beginPath();ctx.moveTo(c,c);ctx.arc(c,c,r,start,end);ctx.closePath();ctx.fillStyle=palette[i%palette.length];ctx.fill();
    ctx.strokeStyle="rgba(255,255,255,.75)";ctx.lineWidth=3;ctx.stroke();
    ctx.save();ctx.translate(c,c);ctx.rotate(start+slice/2);ctx.textAlign="right";ctx.textBaseline="middle";
    const maxWidth=r*.66;let label=item;if(label.length>20)label=label.slice(0,18)+"…";
    ctx.fillStyle="#172039";ctx.font=`700 ${Math.max(14,Math.min(22,230/items.length))}px DM Sans, sans-serif`;
    while(ctx.measureText(label).width>maxWidth && label.length>4)label=label.slice(0,-2)+"…";
    ctx.fillText(label,r-25,0);ctx.restore();
  });
  ctx.beginPath();ctx.arc(c,c,r,0,Math.PI*2);ctx.strokeStyle="rgba(255,255,255,.8)";ctx.lineWidth=7;ctx.stroke();
}
function renderList(){
  list.innerHTML="";
  items.forEach((item,i)=>{
    const li=document.createElement("li");li.className="item-row";
    const dot=document.createElement("span");dot.className="item-color";dot.style.background=palette[i%palette.length];
    const name=document.createElement("span");name.className="item-name";name.textContent=item;
    const del=document.createElement("button");del.className="remove-item";del.textContent="×";del.title="Hapus pilihan";del.setAttribute("aria-label",`Hapus ${item}`);
    del.onclick=()=>{if(spinning)return;if(items.length<=2){toast("Minimal harus ada 2 pilihan.");return}items.splice(i,1);renderAll()};
    li.append(dot,name,del);list.append(li);
  });
  $("itemCount").textContent=`${items.length} ITEM`;
}
function renderAll(){renderList();drawWheel()}
function toast(message){const t=$("toast");t.textContent=message;t.classList.add("show");clearTimeout(toast.timer);toast.timer=setTimeout(()=>t.classList.remove("show"),2200)}
function addItem(){const input=$("newItem"),value=input.value.trim();if(!value)return toast("Tulis pilihan terlebih dahulu.");if(items.length>=20)return toast("Maksimal 20 pilihan.");if(items.some(x=>x.toLowerCase()===value.toLowerCase()))return toast("Pilihan tersebut sudah ada.");items.push(value);input.value="";renderAll();input.focus()}
$("addBtn").addEventListener("click",addItem);$("newItem").addEventListener("keydown",e=>{if(e.key==="Enter")addItem()});
$("shuffleBtn").onclick=()=>{if(spinning)return;for(let i=items.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[items[i],items[j]]=[items[j],items[i]]}renderAll();toast("Urutan pilihan berhasil diacak.")};
$("resetBtn").onclick=()=>{if(spinning)return;items=[...defaults];renderAll();toast("Daftar pilihan dikembalikan.")};
function addHistory(value){history.unshift({value,time:new Date().toLocaleTimeString("id-ID",{hour:"2-digit",minute:"2-digit"})});history=history.slice(0,12);renderHistory()}
function renderHistory(){const box=$("historyList");box.innerHTML="";if(!history.length){box.innerHTML='<div class="empty-history">Belum ada hasil. Yuk, putar roda!</div>';return}history.forEach((h,i)=>{const row=document.createElement("div");row.className="history-entry";const num=document.createElement("span");num.className="history-number";num.textContent=String(i+1).padStart(2,"0");const val=document.createElement("span");val.className="history-value";val.textContent=h.value;const time=document.createElement("span");time.className="history-time";time.textContent=h.time;row.append(num,val,time);box.append(row)})}
function spin(){
  if(spinning)return;if(items.length<2)return toast("Tambahkan minimal 2 pilihan.");
  spinning=true;spinBtn.disabled=true;spinBtn.textContent="✦  RODA SEDANG BERPUTAR...";
  const slice=Math.PI*2/items.length, winner=Math.floor(Math.random()*items.length);
  // The pointer is at the top (-90 degrees); align the center of the chosen slice there.
  const target=norm(-Math.PI/2-(winner+.5)*slice);
  const current=norm(rotation),delta=norm(target-current),extra=(5+Math.floor(Math.random()*3))*Math.PI*2;
  const start=rotation,finish=rotation+extra+delta,duration=4800+Math.random()*700,started=performance.now();
  function frame(now){const t=Math.min(1,(now-started)/duration),ease=1-Math.pow(1-t,5);rotation=start+(finish-start)*ease;drawWheel();if(t<1){requestAnimationFrame(frame)}else{rotation=norm(finish);drawWheel();const result=items[winner];$("resultText").textContent=result;addHistory(result);spinning=false;spinBtn.disabled=false;spinBtn.innerHTML='<span>✦</span> PUTAR SEKARANG <span class="button-arrow">↗</span>';toast("Hasilnya: "+result)}}
  requestAnimationFrame(frame);
}
spinBtn.addEventListener("click",spin);document.addEventListener("keydown",e=>{if(e.code==="Space"&&e.target.tagName!=="INPUT"){e.preventDefault();spin()}});
$("clearHistory").onclick=()=>{history=[];renderHistory();toast("Riwayat berhasil dihapus.")};
$("copyResult").onclick=async()=>{const result=$("resultText").textContent;if(result==="Hasil akan muncul di sini")return toast("Belum ada hasil untuk disalin.");try{await navigator.clipboard.writeText(result);toast("Hasil berhasil disalin.")}catch{toast("Browser tidak mengizinkan salin otomatis.")}};
renderAll();renderHistory();
