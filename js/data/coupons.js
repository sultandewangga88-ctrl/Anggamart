// Data kupon promo

// Kupon: pct = persen (max potongan), flat = nominal, ship = gratis ongkir
const COUPONS = {
  HEMAT10: {
    type: "pct",
    v: 10,
    max: 20000,
    min: 50000,
    info: "Diskon 10% (maks Rp20.000), min. belanja Rp50.000",
  },
  BARU25: {
    type: "flat",
    v: 25000,
    min: 150000,
    info: "Potongan Rp25.000, min. belanja Rp150.000",
  },
  ONGKIRGRATIS: {
    type: "ship",
    v: 0,
    min: 30000,
    info: "Gratis ongkir, min. belanja Rp30.000",
  },
};
