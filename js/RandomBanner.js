const imgs = [
  "/img/banner/1.webp",
  "/img/banner/2.webp",
  "/img/banner/3.webp",
  "/img/banner/4.webp",
  "/img/banner/5.webp",
  "/img/banner/6.webp",
  "/img/banner/7.webp",
  "/img/banner/8.webp",
  "/img/banner/9.webp",
  "/img/banner/10.webp",
  "/img/banner/11.webp",
  "/img/banner/12.webp",
  "/img/banner/13.webp",
];

document.addEventListener("DOMContentLoaded", () => {
  const bg = document.getElementById("bg-layer");
  if (!bg) return;

  const random = imgs[Math.floor(Math.random() * imgs.length)];
  bg.style.backgroundImage = `url(${random})`;
});
