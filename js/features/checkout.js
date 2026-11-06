// Fitur: checkout dan pembuatan pesanan

function checkout() {
  if (!user) return account("Masuk dulu untuk checkout.");
  $("#drawer").classList.remove("open");
  modal(`<h2>Checkout</h2>
    <form id="cf">
    <label>Nama penerima<input name="nama" required value="${esc(user.name)}">
    </label>
    <label>No. HP<input name="hp" required pattern="[0-9+]{9,15}" placeholder="08xxxxxxxxxx">
    </label>
    <label>Alamat lengkap<textarea name="alamat" required placeholder="Jalan, nomor, kelurahan, kota">
    </textarea>
    </label>
    <fieldset>
    <legend>Pengiriman</legend>
      <label class="r">
    <input type="radio" name="kirim" value="kurir" checked> Kurir Anggamart (1–2 jam)</label>
      <label class="r">
    <input type="radio" name="kirim" value="ambil"> Ambil di toko (gratis)</label>
    </fieldset>
    <label>Pembayaran<select name="bayar">
    <option>COD (bayar di tempat)</option>
    <option>Transfer Bank</option>
    <option>E-Wallet</option>
    <option>Kartu Kredit/Debit</option>
    </select>
    </label>
    <div id="sum">
    </div>
    <button class="primary">Buat pesanan</button>
    </form>`);
  sumUpdate();
}

function sumUpdate() {
  const f = $("#cf");
  if (!f) return;
  const t = totals(f.kirim.value === "ambil");
  $("#sum").innerHTML =
    `<div class="row">
    <span>Subtotal (${t.n} barang)</span>
    <span>${rp(t.sub)}</span>
    </div>${t.disc ? `<div class="row g">
    <span>Diskon</span>
    <span>−${rp(t.disc)}</span>
    </div>` : ""}<div class="row">
    <span>Ongkir</span>
    <span>${t.ship ? rp(t.ship) : "Gratis"}</span>
    </div>
    <div class="row tot">
    <span>Total bayar</span>
    <span>${rp(t.total)}</span>
    </div>`;
}

function placeOrder(f) {
  const d = Object.fromEntries(new FormData(f)),
    t = totals(d.kirim === "ambil");
  const o = {
    id: "AM" + Date.now().toString().slice(-8),
    t: Date.now(),
    email: user.email,
    ...d,
    ...t,
    items: Object.keys(cart).map((id) => ({
      id: +id,
      n: P(id).n,
      q: cart[id],
      p: price(P(id)),
    })),
  };
  o.items.forEach((i) => {
    P(i.id).stock = Math.max(0, P(i.id).stock - i.q);
  });
  orders.unshift(o);
  cart = {};
  coupon = null;
  refresh();
  modal(
    `<h2>Pesanan berhasil ✓</h2>
    <p>Nomor pesanan <b>${o.id}</b>
    <br>Total ${rp(o.total)} · ${esc(o.bayar)}</p>
    <button class="primary" data-act="orders">Lihat pesanan</button>`,
  );
}
