const imgs = [
    // paths to your banner images
    "/img/banner/1.png",
    "/img/banner/2.png",
    "/img/banner/3.png",
    "/img/banner/4.png",
    "/img/banner/5.png",
    "/img/banner/6.png",
    "/img/banner/7.png",
    "/img/banner/8.png",
    "/img/banner/9.png",
    "/img/banner/10.png",
    "/img/banner/11.png",
    "/img/banner/12.png",
    "/img/banner/13.png",
]

const random_banner = imgs[Math.floor(Math.random() * imgs.length)];
const banner = document.getElementById('banner');
if (banner) {
    const metaOgType = document.querySelector('meta[property="og:type"]');
    console.log(" metaOgType.content: ", metaOgType ? metaOgType.content : "not found");
    if (metaOgType && metaOgType.content === "article") { //判断是否为文章页
        const background = banner.style.background;
        if (background.includes("/img/banner/random.webp")) { // 特殊判断规则
            banner.style.background = `url(${random_banner}) center center / cover no-repeat`;
        }
    }
}