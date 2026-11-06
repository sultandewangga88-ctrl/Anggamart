// Menyimpan data lalu menggambar ulang tampilan

function badges() {
  $("#cc").textContent = Object.values(cart).reduce((a, b) => a + b, 0);
  $("#wc").textContent = wish.length;
  $("#accBtn").textContent = user ? user.name.split(" ")[0] : "Masuk";
}

function refresh() {
  save();
  badges();
  renderGrid();
  if ($("#drawer").classList.contains("open")) renderCart();
}
