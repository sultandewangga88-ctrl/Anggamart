// Fungsi bantu umum: selector, format rupiah, escape HTML

const $ = (s) => document.querySelector(s);

const rp = (n) => "Rp" + Math.round(n).toLocaleString("id-ID");

const esc = (s) =>
  String(s).replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        c
      ],
  );
