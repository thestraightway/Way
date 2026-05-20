document.querySelectorAll('.panel-head').forEach((button)=>{button.addEventListener('click',()=>{const panel=button.closest('.panel');panel.classList.toggle('open');});});
const searchInput=document.getElementById('searchInput');
searchInput.addEventListener('input',()=>{const q=searchInput.value.trim().toLowerCase();document.querySelectorAll('.panel').forEach(panel=>{const text=(panel.innerText+' '+panel.dataset.search).toLowerCase();panel.hidden=q && !text.includes(q);});});
