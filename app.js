// ========= PERSONALIZE =========
const FROM_NAME = "Jerry";
const LOVE_LETTER = `
I just wanted to remind you how much you mean to me.

I like the way you make things feel easy.
Even when life is noisy, you feel like calm.

I’m not just trying to be romantic today…
I genuinely choose you — again and again. 💗
`.trim();

const YOUTUBE_LINK =
  "https://www.youtube.com/results?search_query=Rutshelle+Guillaume+feat.+Ka%C3%AF+-+Tolere+w+(Official+Music+Video)";
// ==============================

const screens = ["s1","s2","s3","s4","s5","s6","s7","s8","s9","s10"];
const show = (id) => {
  screens.forEach(s => document.getElementById(s).classList.remove("active"));
  document.getElementById(id).classList.add("active");
};

// Background floating hearts
const heartsLayer = document.querySelector(".hearts");
function spawnBgHearts(){
  heartsLayer.innerHTML = "";
  const count = 22;
  for(let i=0;i<count;i++){
    const h = document.createElement("div");
    h.textContent = Math.random() < 0.5 ? "💗" : "❤️";
    h.style.position = "absolute";
    h.style.left = Math.random()*100 + "vw";
    h.style.top = (105 + Math.random()*70) + "vh";
    h.style.fontSize = (14 + Math.random()*26) + "px";
    h.style.opacity = (0.12 + Math.random()*0.28).toFixed(2);
    const dur = 10 + Math.random()*12;
    const delay = Math.random()*7;
    h.style.animation = `floatUp ${dur}s linear ${delay}s infinite`;
    heartsLayer.appendChild(h);
  }
  if(!document.getElementById("floatUpStyle")){
    const st = document.createElement("style");
    st.id = "floatUpStyle";
    st.textContent = `
      @keyframes floatUp{
        from{ transform: translateY(0) rotate(0deg); }
        to{ transform: translateY(-190vh) rotate(25deg); }
      }
    `;
    document.head.appendChild(st);
  }
}
spawnBgHearts();
window.addEventListener("resize", spawnBgHearts);

// Buttons
const toQuestion = document.getElementById("toQuestion");
const toAsk = document.getElementById("toAsk");
const btnYes = document.getElementById("btnYes");
const btnNo = document.getElementById("btnNo");
const backToQuestion = document.getElementById("backToQuestion");
const toFlowers = document.getElementById("toFlowers");
const toAskAgain = document.getElementById("toAskAgain");
const finalYes = document.getElementById("finalYes");
const restart = document.getElementById("restart");

const openLetter = document.getElementById("openLetter");
const openSong = document.getElementById("openSong");
const openFlowers = document.getElementById("openFlowers");

const fromNameEl = document.getElementById("fromName");
fromNameEl.textContent = FROM_NAME;

const letterBox = document.getElementById("letterBox");
const songLink = document.getElementById("songLink");
songLink.href = YOUTUBE_LINK;

// Generic back buttons using data-back
document.querySelectorAll("[data-back]").forEach(btn=>{
  btn.addEventListener("click", () => show(btn.dataset.back));
});

// Scene navigation
toQuestion.addEventListener("click", () => show("s2"));
toAsk.addEventListener("click", () => show("s3"));

// YES path
btnYes.addEventListener("click", () => {
  confettiBurst();
  show("s5"); // go to explain after YES (smooth story)
});

// NO path (Option B: delay)
btnNo.addEventListener("click", () => {
  // dramatic pause
  btnNo.textContent = "Wait… 😶";
  btnNo.disabled = true;

  // subtle dim effect
  document.body.style.filter = "brightness(0.92)";

  setTimeout(() => {
    document.body.style.filter = "";
    btnNo.textContent = "NO 🙃";
    btnNo.disabled = false;

    // show crying consequence screen
    show("s4");
  }, 900);
});

// From crying scene back to question
backToQuestion.addEventListener("click", () => show("s3"));

// Continue story
toFlowers.addEventListener("click", () => show("s6"));
toAskAgain.addEventListener("click", () => show("s7"));

// Final YES = celebration + gifts
finalYes.addEventListener("click", () => {
  confettiBurst(90);
  show("s8");
});

// Gift menu
openLetter.addEventListener("click", () => {
  show("s9");
  typeWriter(LOVE_LETTER, letterBox);
});
openSong.addEventListener("click", () => show("s10"));
openFlowers.addEventListener("click", () => show("s6"));

// Restart
restart.addEventListener("click", () => {
  confettiBurst(40);
  show("s1");
});

// Typewriter
let twTimer = null;
function typeWriter(text, el){
  clearInterval(twTimer);
  el.textContent = "";
  let i = 0;
  twTimer = setInterval(() => {
    el.textContent += text[i] || "";
    i++;
    if(i >= text.length) clearInterval(twTimer);
  }, 18);
}

// Confetti (DOM)
function confettiBurst(n = 60){
  for(let i=0;i<n;i++){
    const c = document.createElement("div");
    c.className = "conf";
    c.textContent = Math.random() < 0.5 ? "✨" : "💗";
    c.style.left = (50 + (Math.random()*20-10)) + "vw";
    c.style.top = (42 + (Math.random()*20-10)) + "vh";
    c.style.fontSize = (12 + Math.random()*22) + "px";

    const x = (Math.random()*2-1) * 240;
    const y = -120 - Math.random()*260;
    const rot = (Math.random()*2-1) * 180;

    c.animate(
      [
        { transform:`translate(0,0) rotate(0deg)`, opacity:1 },
        { transform:`translate(${x}px, ${y}px) rotate(${rot}deg)`, opacity:0 }
      ],
      { duration: 900 + Math.random()*700, easing:"cubic-bezier(.2,.8,.2,1)" }
    );

    document.body.appendChild(c);
    setTimeout(()=>c.remove(), 1700);
  }
}