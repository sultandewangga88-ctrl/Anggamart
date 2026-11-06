// Data dummy: akun demo dan contoh pesanan.
// Dibuat otomatis SEKALI per browser (supaya penguji bisa langsung mencoba).

(function () {
  if (store.get("seeded", false)) return;

  const DEMO = {
    email: "demo@anggamart.com",
    name: "Pengguna Demo",
    pw: "demo123",
  };

  // 1. Akun demo
  const users = store.get("users", {});
  users[DEMO.email] = users[DEMO.email] || { name: DEMO.name, pw: DEMO.pw };
  store.set("users", users);

  // 2. Contoh pesanan (harga dihitung dari data produk)
  const hargaAkhir = (p) => Math.round((p.price * (100 - p.disc)) / 100);

  const buatPesanan = (id, hariLalu, kirim, bayar, daftar, batal) => {
    const items = daftar.map(([pid, q]) => {
      const p = PRODUCTS.find((x) => x.id === pid);
      return { id: pid, n: p.n, q, p: hargaAkhir(p) };
    });
    const sub = items.reduce((s, i) => s + i.p * i.q, 0);
    const n = items.reduce((s, i) => s + i.q, 0);
    const ship = sub >= 100000 || kirim === "ambil" ? 0 : 10000;
    return {
      id,
      t: Date.now() - hariLalu * 86400000,
      email: DEMO.email,
      nama: DEMO.name,
      hp: "081234567890",
      alamat: "Jl. Contoh No. 1, Tembalang, Semarang",
      kirim,
      bayar,
      sub,
      n,
      disc: 0,
      ship,
      total: sub + ship,
      items,
      ...(batal ? { cancel: true } : {}),
    };
  };

  const contoh = [
    buatPesanan("AM10000003", 1, "kurir", "COD (bayar di tempat)", [[7, 6], [8, 4], [12, 3]], true),
    buatPesanan("AM10000002", 3, "ambil", "E-Wallet", [[2, 1], [3, 1], [9, 2]]),
    buatPesanan("AM10000001", 7, "kurir", "Transfer Bank", [[1, 10], [4, 1], [5, 2]]),
  ];

  store.set("orders", [...contoh, ...store.get("orders", [])]);
  store.set("seeded", true);
})();