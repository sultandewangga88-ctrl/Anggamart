// Tampilan katalog: kartu produk, kategori, promo hari ini

function card(p) {
  const q = cart[p.id] || 0;
  return `<article class="card">
    <button class="heart ${wish.includes(p.id) ? "on" : ""}" data-act="w" data-id="${p.id}" aria-label="Favorit">♥</button>
    <div class="pic" data-act="det" data-id="${p.id}">${p.e}${p.disc ? `<span class="off">-${p.disc}%</span>` : ""}</div>
    <h3 data-act="det" data-id="${p.id}">${p.n}</h3>
    <small>${p.u}</small>
    <div class="pr">
    <b>${rp(price(p))}</b>${p.disc ? `<s>${rp(p.price)}</s>` : ""}</div>
    ${
      q
        ? `<div class="step">
    <button data-act="dec" data-id="${p.id}">−</button>
    <span>${q}</span>
    <button data-act="inc" data-id="${p.id}">+</button>
    </div>`
        : `<button class="add" data-act="inc" data-id="${p.id}">Tambah</button>`
    }
  </article>`;
}

function renderGrid() {
  let list = PRODUCTS.filter(
    (p) =>
      (view.cat === "Semua" || p.cat === view.cat) &&
      p.n.toLowerCase().includes(view.q.toLowerCase()),
  );
  const s = view.sort;
  if (s === "lo") list.sort((a, b) => price(a) - price(b));
  if (s === "hi") list.sort((a, b) => price(b) - price(a));
  if (s === "disc") list.sort((a, b) => b.disc - a.disc);
  if (s === "az") list.sort((a, b) => a.n.localeCompare(b.n));
  $("#title").textContent = view.q
    ? `Hasil untuk "${view.q}"`
    : view.cat === "Semua"
      ? "Semua produk"
      : view.cat;
  $("#grid").innerHTML = list.length
    ? list.map(card).join("")
    : `<p class="empty">Produk tidak ditemukan. Coba kata kunci lain.</p>`;
}

function renderCats() {
  $("#cats").innerHTML = ["Semua", ...CATEGORIES]
    .map(
      (c) =>
        `<button class="${c === view.cat ? "on" : ""}" data-act="cat" data-id="${c}">${c}</button>`,
    )
    .join("");
}

function renderFlash() {
  $("#flash").innerHTML = [...PRODUCTS]
    .sort((a, b) => b.disc - a.disc)
    .slice(0, 3)
    .map(
      (p) =>
        `<div class="fl" data-act="det" data-id="${p.id}">
    <span>${p.e}</span>
    <div>${p.n}<br>
    <b>${rp(price(p))}</b>
    <s>${rp(p.price)}</s>
    </div>
    <em>-${p.disc}%</em>
    </div>`,
    )
    .join("");
}
