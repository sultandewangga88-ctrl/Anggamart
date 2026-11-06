// Fitur: detail produk

function detail(id) {
  const p = P(id);
  modal(`<div class="det">
    <div class="big">${p.e}</div>
    <h2>${p.n}</h2>
    <p>
    <small>${p.cat} · ${p.u} · Stok ${p.stock}</small>
    </p>
  <div class="pr">
    <b>${rp(price(p))}</b>${p.disc ? `<s>${rp(p.price)}</s>` : ""}</div>
  <button class="primary" data-act="inc" data-id="${p.id}" data-close="1">Tambah ke keranjang</button>
    </div>`);
}
