document.addEventListener("DOMContentLoaded", function() {
    if (!document.body.classList.contains("post")) return;

    const sidebar = document.getElementById("sidebar-related-posts");
    if (!sidebar) return;

    const category = document.querySelector("meta[name='category']");
    if (!category) return;

    const categoryName = category.getAttribute("content");

    if (!window.ALL_POSTS) return;

    const posts = window.ALL_POSTS.filter(post => 
        post.categories && post.categories.includes(categoryName) &&
        post.url !== window.location.pathname
    );

    if (posts.length === 0) return;

    const html = `
        <div class="sidebar-posts">
            <h3>更多 ${categoryName} 文章</h3>
            <ul>
                ${posts.map(p => `<li><a href="${p.url}">${p.title}</a></li>`).join('')}
            </ul>
        </div>
    `;
    sidebar.innerHTML = html;

    // 设置毛玻璃背景色，自动匹配白天/夜晚模式
    const isDark = document.documentElement.getAttribute("data-user-color-scheme") === "dark";

    // 配置文件颜色（可以直接从全局 JS 对象读取，也可以硬编码）
    const boardColor = isDark ? "#15172280" : "#ffffff80"; 

    sidebar.style.background = boardColor;
    sidebar.style.backdropFilter = "blur(10px)";
    sidebar.style.webkitBackdropFilter = "blur(10px)";
    sidebar.style.border = isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid rgba(255,255,255,0.4)";
});
