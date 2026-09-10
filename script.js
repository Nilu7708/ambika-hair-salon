const $=s=>document.querySelector(s);
document.querySelector(".menu").addEventListener("click",()=>document.querySelector(".site-header").classList.toggle("nav-open"));
$("#year").textContent=new Date().getFullYear();
$("#phoneLink").textContent=SALON.displayPhone;
$("#phoneLink").href="tel:"+SALON.phone;
$("#addressText").innerHTML=`<a href="${SALON.mapUrl}" target="_blank" rel="noopener">${SALON.address}</a>`;
$("#whatsappLink").href=`https://wa.me/${SALON.phone}`;
const today=new Date(); $("#date").min=today.toISOString().split("T")[0];

$("#bookingForm").addEventListener("submit",e=>{
  e.preventDefault();
  const name=$("#name").value.trim(), phone=$("#phone").value.trim(), service=$("#service").value;
  const date=$("#date").value, time=$("#time").value, message=$("#message").value.trim();
  const text=`${SALON.whatsappMessageIntro}

Name: ${name}
Phone: ${phone}
Service: ${service}
Date: ${date}
Time: ${time}${message?`\nMessage: ${message}`:""}`;
  const url=`https://wa.me/${SALON.phone}?text=${encodeURIComponent(text)}`;
  $("#formNote").textContent="Opening WhatsApp…";
  window.open(url,"_blank","noopener");
});