function lastUpdate() {
    fetch('/sitemap.xml')
    .then(response => response.text())
    .then(str => (new window.DOMParser()).parseFromString(str, "text/xml"))
    .then(data => {
        const lastmodDates = Array.from(data.querySelectorAll('url > lastmod')).map(node => new Date(node.textContent));
        if (!lastmodDates.length) return;
        const mostRecentDate = new Date(Math.max(...lastmodDates));
        const now = new Date();
        const diffTime = Math.abs(now - mostRecentDate);
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
        const el = document.getElementById('sidebar-site-update');
        if(el) el.innerText = diffDays === 0 ? '今天' : diffDays + '天前';
    });
}

function updateSidebar() {
    const mapping = {
        'sidebar-word-count': 'g-total-word-id',
        'sidebar-post-count': 'g-total-posts-id',
        'sidebar-site-age': 'time-day',
        'sidebar-site-pv': 'vercount_value_site_pv',
        'sidebar-site-uv': 'vercount_value_site_uv'
    };
    for (const [sidebarId, sourceId] of Object.entries(mapping)) {
        const sidebarEl = document.getElementById(sidebarId);
        const sourceEl = document.getElementById(sourceId);
        if (sidebarEl && sourceEl) {
            sidebarEl.innerText = sidebarId === 'sidebar-site-age' ? sourceEl.innerText + '天' : sourceEl.innerText;
        }
    }
    lastUpdate();
}

function createSidebar() {
    const main = document.querySelector('main') || document.body;

    const sideCol = document.createElement('div');
    sideCol.id = 'custom-sidebar';
    sideCol.style.position = 'sticky';
    sideCol.style.top = '2rem';
    sideCol.style.width = '200px';
    sideCol.style.padding = '1rem';
    sideCol.style.marginLeft = 'auto';
    sideCol.style.border = '1px solid #ddd';
    sideCol.style.borderRadius = '8px';
    sideCol.style.backgroundColor = '#f9f9f9';
    sideCol.style.fontSize = '0.9rem';
    sideCol.style.lineHeight = '1.5';
    sideCol.style.color = '#333';

    sideCol.innerHTML = `
        <div><strong>站点统计</strong></div>
        <div>文章总数: <span id="sidebar-post-count"></span></div>
        <div>全站字数: <span id="sidebar-word-count"></span></div>
        <div>总访问量: <span id="sidebar-site-pv"></span></div>
        <div>总访客数: <span id="sidebar-site-uv"></span></div>
        <div>建站时长: <span id="sidebar-site-age"></span></div>
        <div>上次更新: <span id="sidebar-site-update"></span></div>
    `;

    main.appendChild(sideCol);
    updateSidebar();
}

// 只在文章页显示侧边栏
if (document.querySelector('meta[property="og:type"][content="article"]')) {
    document.addEventListener('DOMContentLoaded', createSidebar);
}