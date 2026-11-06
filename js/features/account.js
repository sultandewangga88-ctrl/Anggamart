// Fitur: masuk / daftar akun

function account(msg) {
  if (user)
    return modal(
      `<h2>Akun saya</h2>
    <p>
    <b>${esc(user.name)}</b>
    <br>${esc(user.email)}</p>
    <p>
    <small>${orders.filter((o) => o.email === user.email).length} pesanan tercatat</small>
    </p>
    <button class="primary" data-act="logout">Keluar</button>`,
    );
  modal(`<h2>Masuk / Daftar</h2>${msg ? `<p class="warn">${msg}</p>` : ""}<form id="af">
    <label>Nama<input name="name" required placeholder="Isi jika baru mendaftar">
    </label>
    <label>Email<input name="email" type="email" required>
    </label>
    <label>Kata sandi<input name="pw" type="password" minlength="4" required>
    </label>
    <button class="primary">Lanjut</button>
    </form>
    <p>
    <small>Email baru otomatis terdaftar. Data hanya tersimpan di browser ini.</small>
    </p>`);
}
