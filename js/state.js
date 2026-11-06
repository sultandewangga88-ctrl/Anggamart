// State aplikasi: keranjang, favorit, akun, pesanan, filter

let cart = store.get("cart", {}),
  wish = store.get("wish", []),
  user = store.get("user", null),
  orders = store.get("orders", []),
  coupon = null,
  view = { cat: "Semua", q: "", sort: "default" };

const P = (id) => PRODUCTS.find((p) => p.id == id);

const price = (p) => Math.round((p.price * (100 - p.disc)) / 100);

const save = () => {
  store.set("cart", cart);
  store.set("wish", wish);
  store.set("orders", orders);
  store.set("user", user);
};
