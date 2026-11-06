// Notifikasi singkat di bawah layar

function toast(msg) {
  const t = $("#toast");
  t.textContent = msg;
  t.className = "show";
  clearTimeout(toast.id);
  toast.id = setTimeout(() => (t.className = ""), 2200);
}
