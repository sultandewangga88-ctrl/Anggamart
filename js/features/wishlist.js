// Fitur: daftar favorit

function wishlist() {
  modal(
    `<h2>Favorit</h2>${
      wish.length
        ? wish
            .map((id) => {
              const p = P(id);
              return `<div class="ci">
    <span class="em">${p.e}</span>
    <div>
    <b>${p.n}</b>
    <br>
    <small>${rp(price(p))}</small>
    </div>
    <button class="add" data-act="inc" data-id="${id}">Tambah</button>
    </div>`;
            })
            .join("")
        : `<p class="empty">Belum ada favorit. Tekan ♥ pada produk.</p>`
    }`,
  );
}
