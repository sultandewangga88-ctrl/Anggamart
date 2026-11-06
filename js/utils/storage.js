// Penyimpanan data di localStorage (awalan am_)

const store = {
  get(k, d) {
    try {
      return JSON.parse(localStorage.getItem("am_" + k)) ?? d;
    } catch {
      return d;
    }
  },
  set(k, v) {
    localStorage.setItem("am_" + k, JSON.stringify(v));
  },
};
