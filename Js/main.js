const correctPIN = "05122023";

const dayInput = document.getElementById("day");
const monthInput = document.getElementById("month");
const yearInput = document.getElementById("year");
const unlockBtn = document.getElementById("unlockBtn");

// Validar PIN
function checkPIN() {
  const day = dayInput.value.padStart(2, '0');
  const month = monthInput.value.padStart(2, '0');
  const year = yearInput.value;

  const enteredPIN = day + month + year;

  if (enteredPIN === correctPIN) {
    document.getElementById("lockScreen").style.display = "none";
    document.getElementById("mainContent").style.display = "flex";

    // 🌼 Mostrar ramo después de 2.5s
    document.body.classList.remove('not-loaded');
    setTimeout(() => {
      document.querySelector('.ramo').classList.add('ramo--visible');
    }, 2500);

    // 💖 Activar función de "Te amo" flotante solo tras desbloquear
    activarTeAmo();
  } else {
    const heart = document.querySelector(".heart-lock");
    heart.style.animation = "shake 0.5s";

    setTimeout(() => {
      heart.style.animation = "heartbeat 1.5s infinite";
    }, 500);

    alert("Ups 😅 Esa no es la fecha correcta, inténtalo de nuevo 💕");
  }
}

// Inputs automáticos
dayInput.addEventListener("input", () => {
  if (dayInput.value.length === 2) monthInput.focus();
});
monthInput.addEventListener("input", () => {
  if (monthInput.value.length === 2) yearInput.focus();
});
[dayInput, monthInput, yearInput].forEach(input => {
  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") checkPIN();
  });
});
unlockBtn.addEventListener("click", checkPIN);

// Animación de error
const style = document.createElement('style');
style.innerHTML = `
@keyframes shake {
  0% { transform: translateX(0); }
  25% { transform: translateX(-10px); }
  50% { transform: translateX(10px); }
  75% { transform: translateX(-10px); }
  100% { transform: translateX(0); }
}`;
document.head.appendChild(style);

// Animación para abrir el sobre
const sobre = document.getElementById("sobre");
const tiempoJuntos = document.getElementById("tiempoJuntos");
sobre.addEventListener("click", () => {
  sobre.classList.toggle("abierto");

  if (sobre.classList.contains("abierto")) {
    tiempoJuntos.style.display = "block";
  } else {
    tiempoJuntos.style.display = "none";
  }
});

// -------------------------
// Función "Te amo" flotante
// -------------------------
function activarTeAmo() {
  const mainContent = document.getElementById("mainContent");

  mainContent.addEventListener("click", (e) => {
    if (e.target.closest(".sobre")) return; // no sobre el sobre

    const mensaje = document.createElement("div");
    mensaje.classList.add("te-amo");
    mensaje.textContent = "💖 Te amo 💖";

    mensaje.style.left = e.clientX + "px";
    mensaje.style.top = e.clientY + "px";
    mensaje.style.position = "absolute";

    document.body.appendChild(mensaje);

    setTimeout(() => mensaje.remove(), 1500);
  });
}

// -------------------------
// Contador de tiempo juntos
// -------------------------
const startDate = new Date(2023, 11, 5, 20, 30, 0);

function actualizarTiempo() {
  const now = new Date();
  let years = now.getFullYear() - startDate.getFullYear();
  let months = now.getMonth() - startDate.getMonth();
  let days = now.getDate() - startDate.getDate();
  let hours = now.getHours() - startDate.getHours();
  let minutes = now.getMinutes() - startDate.getMinutes();
  let seconds = now.getSeconds() - startDate.getSeconds();

  if (seconds < 0) { seconds += 60; minutes--; }
  if (minutes < 0) { minutes += 60; hours--; }
  if (hours < 0) { hours += 24; days--; }
  if (days < 0) {
    const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
    days += prevMonth.getDate();
    months--;
  }
  if (months < 0) { months += 12; years--; }

  const campos = { years, months, days, hours, minutes, seconds };
  for (const id in campos) {
    const el = document.getElementById(id);
    if (el.textContent != campos[id]) {
      el.textContent = campos[id];
      el.parentElement.classList.add("update");
      setTimeout(() => el.parentElement.classList.remove("update"), 200);
    }
  }
}

setInterval(actualizarTiempo, 1000);
actualizarTiempo();
