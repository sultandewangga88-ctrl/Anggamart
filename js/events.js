// Semua event listener (klik, submit, input, keyboard)

document.addEventListener("click", (e) => {
  const el = e.target.closest("[data-act]");
  if (e.target.id === "modal") return closeModal();
  if (!el) return;
  const a = el.dataset.act,
    id = el.dataset.id;
  if (a === "inc") {
    const p = P(id);
    if ((cart[id] || 0) >= p.stock) return toast("Stok tidak cukup");
    cart[id] = (cart[id] || 0) + 1;
    refresh();
    toast(p.n + " ditambahkan");
    if (el.dataset.close) closeModal();
  } else if (a === "dec") {
    cart[id]--;
    if (cart[id] <= 0) delete cart[id];
    refresh();
  } else if (a === "w") {
    wish = wish.includes(+id) ? wish.filter((x) => x !== +id) : [...wish, +id];
    refresh();
  } else if (a === "cat") {
    view.cat = id;
    view.q = "";
    $("#q").value = "";
    renderCats();
    renderGrid();
  } else if (a === "det") detail(id);
  else if (a === "cart") openCart();
  else if (a === "close") $("#drawer").classList.remove("open");
  else if (a === "mclose") closeModal();
  else if (a === "wish") wishlist();
  else if (a === "orders") orderList();
  else if (a === "acc") account();
  else if (a === "coupon") applyCoupon();
  else if (a === "clear") {
    cart = {};
    coupon = null;
    refresh();
  } else if (a === "checkout") checkout();
  else if (a === "logout") {
    user = null;
    refresh();
    closeModal();
    toast("Anda sudah keluar");
  } else if (a === "cancel") {
    orders.find((o) => o.id === id).cancel = true;
    save();
    orderList();
  } else if (a === "again") {
    orders
      .find((o) => o.id === id)
      .items.forEach((i) => (cart[i.id] = (cart[i.id] || 0) + i.q));
    refresh();
    closeModal();
    openCart();
  }
});

document.addEventListener("submit", (e) => {
  e.preventDefault();
  if (e.target.id === "cf") return placeOrder(e.target);
  if (e.target.id === "af") {
    const d = Object.fromEntries(new FormData(e.target)),
      users = store.get("users", {});
    const em = d.email.toLowerCase();
    if (users[em] && users[em].pw !== d.pw) return toast("Kata sandi salah");
    users[em] = users[em] || { name: d.name, pw: d.pw };
    store.set("users", users);
    user = { name: users[em].name, email: em };
    refresh();
    closeModal();
    toast("Selamat datang, " + user.name);
  }
});

document.addEventListener("change", (e) => {
  if (e.target.name === "kirim") sumUpdate();
});

$("#q").addEventListener("input", (e) => {
  view.q = e.target.value;
  renderGrid();
});

$("#sort").addEventListener("change", (e) => {
  view.sort = e.target.value;
  renderGrid();
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closeModal();
    $("#drawer").classList.remove("open");
  }
});
