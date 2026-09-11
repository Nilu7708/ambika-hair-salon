const $=s=>document.querySelector(s);
const STORAGE_KEY='ambikaSalonCustomersV1';

function todayISO(){const d=new Date(); d.setHours(0,0,0,0); return d.toISOString().slice(0,10)}
function addDays(dateStr,days){const d=new Date(dateStr+'T00:00:00'); d.setDate(d.getDate()+Number(days)); return d.toISOString().slice(0,10)}
function fmt(dateStr){return new Date(dateStr+'T00:00:00').toLocaleDateString('en-IN',{day:'2-digit',month:'short',year:'numeric'})}
function loadCustomers(){try{return JSON.parse(localStorage.getItem(STORAGE_KEY)||'[]')}catch(e){return []}}
function saveCustomers(list){localStorage.setItem(STORAGE_KEY,JSON.stringify(list))}
function normalPhone(phone){let p=String(phone||'').replace(/\D/g,''); if(p.startsWith('0'))p=p.slice(1); if(p.length===10)p='91'+p; return p}
function reminderMessage(c){return `Hello ${c.name}, this is Ambika Hair Salon, Beed. It has been ${c.days} days since your last ${c.service.toLowerCase()} visit. Would you like to book your next appointment? Reply here and we will help you choose a time. Thank you!`}
function status(c){const t=todayISO(); if(c.reminderDate<t)return 'overdue'; if(c.reminderDate===t)return 'due'; return 'upcoming'}
function render(){
 const list=loadCustomers().sort((a,b)=>a.reminderDate.localeCompare(b.reminderDate));
 const q=($('#searchCustomers')?.value||'').toLowerCase().trim();
 const filtered=list.filter(c=>`${c.name} ${c.phone} ${c.service}`.toLowerCase().includes(q));
 const due=list.filter(c=>['due','overdue'].includes(status(c))).length;
 const upcoming=list.filter(c=>status(c)==='upcoming').length;
 $('#totalCustomers').textContent=list.length; $('#dueCustomers').textContent=due; $('#upcomingCustomers').textContent=upcoming;
 $('#emptyReminders').style.display=filtered.length?'none':'block';
 $('#reminderList').innerHTML=filtered.map(c=>{const st=status(c); const tag=st==='due'?'Due today':st==='overdue'?'Overdue':`Due ${fmt(c.reminderDate)}`; return `<div class="reminder-item ${st}"><div><h4>${escapeHtml(c.name)}</h4><p>${escapeHtml(c.service)} • ${escapeHtml(c.phone)}</p><p>Visit: ${fmt(c.visitDate)} • Reminder: <span class="date">${fmt(c.reminderDate)}</span></p>${c.notes?`<p>Note: ${escapeHtml(c.notes)}</p>`:''}<span class="tag ${st}">${tag} • ${c.days} days</span></div><div class="reminder-actions"><button class="wa-small" data-wa="${c.id}">WhatsApp</button><button class="done-small" data-done="${c.id}">Done</button><button class="delete-small" data-delete="${c.id}">Delete</button></div></div>`}).join('');
}
function escapeHtml(v){return String(v??'').replace(/[&<>'"]/g,x=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[x]))}

$('#y').textContent=new Date().getFullYear();
$('#cDate').value=todayISO();

$('#form').addEventListener('submit',e=>{e.preventDefault();let f=new FormData(e.target);let msg=`Hello Ambika Hair Salon!%0A%0ABooking request:%0AName: ${encodeURIComponent(f.get('name'))}%0APhone: ${encodeURIComponent(f.get('phone'))}%0AService: ${encodeURIComponent(f.get('service'))}%0ADate: ${encodeURIComponent(f.get('date'))}%0ATime: ${encodeURIComponent(f.get('time'))}%0ANote: ${encodeURIComponent(f.get('notes')||'None')}%0A%0APlease let me know the availability.`;window.open('https://wa.me/919765634194?text='+msg,'_blank')});

$('#customerForm').addEventListener('submit',e=>{e.preventDefault();const f=new FormData(e.target);const days=Number(f.get('days'));const c={id:Date.now().toString(),name:String(f.get('name')).trim(),phone:String(f.get('phone')).trim(),service:String(f.get('service')),visitDate:String(f.get('date')),days,reminderDate:addDays(String(f.get('date')),days),notes:String(f.get('notes')||'').trim()};const list=loadCustomers();list.push(c);saveCustomers(list);e.target.reset();$('#cDate').value=todayISO();alert(`Saved. Reminder date: ${fmt(c.reminderDate)}`);render()});
$('#searchCustomers').addEventListener('input',render);
$('#reminderList').addEventListener('click',e=>{const wa=e.target.dataset.wa,done=e.target.dataset.done,del=e.target.dataset.delete;let list=loadCustomers();if(wa){const c=list.find(x=>x.id===wa);if(c){window.open('https://wa.me/'+normalPhone(c.phone)+'?text='+encodeURIComponent(reminderMessage(c)),'_blank')}} if(done){const c=list.find(x=>x.id===done);if(c){c.completedAt=new Date().toISOString();c.reminderDate='9999-12-31';saveCustomers(list);render()}} if(del){if(confirm('Delete this customer reminder?')){saveCustomers(list.filter(x=>x.id!==del));render()}}});
$('#clearAll').addEventListener('click',()=>{if(confirm('Delete all saved customer reminders from this browser?')){localStorage.removeItem(STORAGE_KEY);render()}});
$('#exportBtn').addEventListener('click',()=>{const data=JSON.stringify(loadCustomers(),null,2);const blob=new Blob([data],{type:'application/json'});const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download='ambika-customer-reminders.json';a.click();setTimeout(()=>URL.revokeObjectURL(a.href),1000)});

// If the salon opens the dashboard, show a small prompt when reminders are due.
const dueOnOpen=loadCustomers().filter(c=>['due','overdue'].includes(status(c)));if(dueOnOpen.length){setTimeout(()=>{if(location.hash==='#reminders')alert(`${dueOnOpen.length} customer reminder${dueOnOpen.length>1?'s are':' is'} due. Open the Reminder List to contact them.`)},600)}
render();

if ('serviceWorker' in navigator) { window.addEventListener('load',()=>navigator.serviceWorker.register('./sw.js').catch(()=>{})); }
