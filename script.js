/* script.js */
// Conteúdo de narração padrão (pode ser modificado dinamicamente)
const narrationTexts = {
  hero: document.getElementById('hero-desc')?.textContent || "",
  sobre: document.querySelector('#sobre p')?.textContent || ""
};

// Atualiza o ano do rodapé
document.getElementById('ano').textContent = new Date().getFullYear();

// Menu mobile toggle
const menuToggle = document.querySelector('.menu-toggle');
const navList = document.getElementById('main-nav');
if(menuToggle){
  menuToggle.addEventListener('click', ()=>{
    const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-expanded', String(!expanded));
    if(navList.style.display === 'block') navList.style.display = '';
    else navList.style.display = 'block';
  });
}

// Funções de SpeechSynthesis
let synth = window.speechSynthesis;
let currentUtterance = null;

function speak(text){
  if(!text) return;
  stopSpeaking();
  currentUtterance = new SpeechSynthesisUtterance(text);
  currentUtterance.lang = 'pt-BR';
  // Ajustes de voz/velocidade podem ser alterados aqui
  currentUtterance.rate = 1.0;
  currentUtterance.pitch = 1.0;
  synth.speak(currentUtterance);
}

function stopSpeaking(){
  if(synth && synth.speaking){
    synth.cancel();
  }
  currentUtterance = null;
}

// Botões de controlar áudio
const btnPlay = document.getElementById('play-audio');
const btnStop = document.getElementById('stop-audio');

btnPlay?.addEventListener('click', ()=>{
  // lê primeiro o hero e depois o resumo sobre
  const full = (narrationTexts.hero || '') + '\n' + (narrationTexts.sobre || '');
  speak(full);
});

btnStop?.addEventListener('click', ()=>{
  stopSpeaking();
});

// Botões de leitura em cards
const readBtns = document.querySelectorAll('.read-btn');
readBtns.forEach(btn=>{
  btn.addEventListener('click', (e)=>{
    const targetSel = btn.getAttribute('data-target');
    const target = document.querySelector(targetSel);
    if(target) speak(target.textContent);
  });
});

// Acessibilidade: permite pausar com ESC
window.addEventListener('keydown', (e)=>{
  if(e.key === 'Escape') stopSpeaking();
});

// Caso o VLibras leve tempo pra carregar, adicionamos aria-live para informar o usuário
(function addVlibrasNotice(){
  const notice = document.createElement('div');
  notice.setAttribute('aria-live','polite');
  notice.className = 'sr-only';
  notice.style.position = 'absolute';
  notice.style.left = '-9999px';
  notice.textContent = 'O widget de Libras pode demorar alguns segundos para carregar.';
  document.body.appendChild(notice);
})();

// Ano automático no rodapé
document.getElementById("ano").textContent = new Date().getFullYear();

// Botão de voltar ao topo
const btnTopo = document.getElementById("btn-topo");
window.addEventListener("scroll", () => {
  btnTopo.style.display = window.scrollY > 400 ? "block" : "none";
});
btnTopo.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});