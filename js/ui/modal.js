// Jendela pop-up (modal) umum

function modal(html) {
  const m = $("#modal");
  m.innerHTML = `<div class="box">
    <button class="x" data-act="mclose">✕</button>${html}</div>`;
  m.hidden = false;
}

function closeModal() {
  $("#modal").hidden = true;
}
