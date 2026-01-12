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

const banner = document.getElementById('banner');
if (banner) {
    const metaOgType = document.querySelector('meta[property="og:type"]');
    // 判断是否为文章页
    if (metaOgType && metaOgType.content === "article") {
        const random_banner = imgs[Math.floor(Math.random() * imgs.length)];
        banner.style.background = `url(${random_banner}) center center / cover no-repeat`;
        console.log("随机文章背景已设置：", random_banner);
    }
}
