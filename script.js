const packages = {
  "Free Fire": [{name:"100 Diamonds",price:1200},{name:"310 Diamonds",price:3500},{name:"520 Diamonds",price:5700}],
  "PUBG Mobile": [{name:"60 UC",price:1500},{name:"325 UC",price:7200},{name:"660 UC",price:14000}],
  "Call of Duty Mobile": [{name:"80 CP",price:1300},{name:"420 CP",price:6000},{name:"880 CP",price:11500}],
  "FC Mobile": [{name:"100 FC Points",price:1100},{name:"500 FC Points",price:4800},{name:"1,000 FC Points",price:9000}],
  "Roblox": [{name:"400 Robux",price:2500},{name:"800 Robux",price:4900},{name:"1,700 Robux",price:9800}]
};
const gameSelect=document.querySelector('#gameSelect');
const packageSelect=document.querySelector('#packageSelect');
const priceLabel=document.querySelector('#price');
const formatNaira=value=>'₦'+Number(value).toLocaleString('en-NG');
function updatePackages(){
  const list=packages[gameSelect.value]||[];
  packageSelect.innerHTML='<option value="">Choose a package</option>';
  list.forEach((item,index)=>{const option=document.createElement('option');option.value=String(index);option.textContent=item.name;packageSelect.appendChild(option);});
  updatePrice();
}
function updatePrice(){const item=packages[gameSelect.value]?.[Number(packageSelect.value)];priceLabel.textContent=item?formatNaira(item.price):'₦0';}
gameSelect.addEventListener('change',updatePackages);
packageSelect.addEventListener('change',updatePrice);
document.querySelectorAll('.game-card').forEach(card=>card.addEventListener('click',()=>{gameSelect.value=card.dataset.game;updatePackages();document.querySelector('#topup').scrollIntoView({behavior:'smooth'});}));
const modal=document.querySelector('#orderModal');
function closeModal(){modal.classList.remove('show');modal.setAttribute('aria-hidden','true');}
document.querySelector('#orderForm').addEventListener('submit',event=>{
  event.preventDefault();
  const game=gameSelect.value, item=packages[game]?.[Number(packageSelect.value)], playerId=document.querySelector('#playerId').value.trim();
  if(!game||!item||!playerId){return;}
  document.querySelector('#receiptGame').textContent=game;
  document.querySelector('#receiptPackage').textContent=item.name;
  document.querySelector('#receiptId').textContent=playerId;
  document.querySelector('#receiptPrice').textContent=formatNaira(item.price);
  modal.classList.add('show');modal.setAttribute('aria-hidden','false');
});
document.querySelector('#modalClose').addEventListener('click',closeModal);
document.querySelector('#modalDone').addEventListener('click',closeModal);
modal.addEventListener('click',event=>{if(event.target===modal)closeModal();});
document.addEventListener('keydown',event=>{if(event.key==='Escape')closeModal();});
const menuToggle=document.querySelector('#menuToggle'),nav=document.querySelector('#nav');
menuToggle.addEventListener('click',()=>{const open=nav.classList.toggle('open');menuToggle.setAttribute('aria-expanded',String(open));});
nav.querySelectorAll('a').forEach(link=>link.addEventListener('click',()=>{nav.classList.remove('open');menuToggle.setAttribute('aria-expanded','false');}));
