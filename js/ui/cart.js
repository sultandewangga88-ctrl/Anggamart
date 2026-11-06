// Keranjang: hitung total, kupon, panel keranjang

function totals(pickup) {
  let sub = 0,
    n = 0;
  for (const id in cart) {
    sub += price(P(id)) * cart[id];
    n += cart[id];
  }
  if (coupon && sub < coupon.min) coupon = null;
  let disc = 0,
    ship = !sub || sub >= 100000 || pickup ? 0 : 10000;
  if (coupon) {
    if (coupon.type === "pct")
      disc = Math.min(Math.round((sub * coupon.v) / 100), coupon.max);
    if (coupon.type === "flat") disc = coupon.v;
    if (coupon.type === "ship") ship = 0;
  }
  return { sub, n, disc, ship, total: sub - disc + ship };
}

function renderCart() {
  const t = totals(),
    ids = Object.keys(cart);
  $("#drawer").innerHTML =
    `<div class="dh">
    <h2>Keranjang</h2>
    <button data-act="close">✕</button>
    </div>
  <div class="di">${
    ids.length
      ? ids
          .map((id) => {
            const p = P(id);
            return `<div class="ci">
    <span class="em">${p.e}</span>
    <div>
    <b>${p.n}</b>
    <br>
    <small>${rp(price(p))} × ${cart[id]}</small>
    </div>
    <div class="step sm">
    <button data-act="dec" data-id="${id}">−</button>
    <span>${cart[id]}</span>
    <button data-act="inc" data-id="${id}">+</button>
    </div>
    </div>`;
          })
          .join("")
      : `<p class="empty">Keranjang masih kosong. Pilih produk dulu.</p>`
  }</div>
  ${
    ids.length
      ? `<div class="df">
    <div class="cp">
    <input id="cin" placeholder="Kode kupon" value="${coupon ? coupon.code : ""}">
    <button data-act="coupon">Pakai</button>
    </div>
    <div class="row">
    <span>Subtotal</span>
    <span>${rp(t.sub)}</span>
    </div>
    ${t.disc ? `<div class="row g">
    <span>Diskon kupon</span>
    <span>−${rp(t.disc)}</span>
    </div>` : ""}
    <div class="row">
    <span>Ongkir</span>
    <span>${t.ship ? rp(t.ship) : "Gratis"}</span>
    </div>
    <div class="row tot">
    <span>Total</span>
    <span>${rp(t.total)}</span>
    </div>
    <button class="primary" data-act="checkout">Checkout</button>
    <button class="link" data-act="clear">Kosongkan keranjang</button>
    </div>`
      : ""
  }`;
}

function openCart() {
  renderCart();
  $("#drawer").classList.add("open");
}

function applyCoupon() {
  const code = $("#cin").value.trim().toUpperCase(),
    c = COUPONS[code];
  if (!c) return toast("Kupon tidak ditemukan");
  if (totals().sub < c.min) return toast("Belum memenuhi syarat: " + c.info);
  coupon = { ...c, code };
  renderCart();
  toast("Kupon " + code + " dipakai");
}
