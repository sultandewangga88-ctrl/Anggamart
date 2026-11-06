// Fitur: riwayat dan status pesanan

function status(o) {
  if (o.cancel) return "Dibatalkan";
  const m = (Date.now() - o.t) / 60000;
  const last = o.kirim === "ambil" ? "Siap diambil" : "Dalam pengiriman";
  return m < 1 ? "Diproses" : m < 3 ? "Dikemas" : m < 6 ? last : "Selesai";
}

function orderList() {
  const mine = user ? orders.filter((o) => o.email === user.email) : [];
  if (!user) return account("Masuk untuk melihat riwayat pesanan.");
  modal(
    `<h2>Pesanan saya</h2>${
      mine.length
        ? mine
            .map(
              (
                o,
              ) => `<div class="ord">
    <div class="row">
    <b>${o.id}</b>
    <span class="st">${status(o)}</span>
    </div>
    <small>${new Date(o.t).toLocaleString("id-ID")} · ${o.kirim === "ambil" ? "Ambil di toko" : "Kurir"} · ${esc(o.bayar)}</small>
    <ul>${o.items.map((i) => `<li>${i.n} × ${i.q}</li>`).join("")}</ul>
    <div class="row tot">
    <span>Total</span>
    <span>${rp(o.total)}</span>
    </div>
    <button class="link" data-act="again" data-id="${o.id}">Beli lagi</button>${status(o) === "Diproses" ? `<button class="link r" data-act="cancel" data-id="${o.id}">Batalkan</button>` : ""}</div>`,
            )
            .join("")
        : `<p class="empty">Belum ada pesanan.</p>`
    }`,
  );
}
