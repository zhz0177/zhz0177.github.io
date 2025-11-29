function lastUpdate() {
    fetch('/sitemap.xml')
        .then(resp => resp.text())
        .then(str => (new DOMParser()).parseFromString(str, "text/xml"))
        .then(xml => {
            const dates = Array.from(xml.querySelectorAll('url > lastmod')).map(n => new Date(n.textContent));
            if (!dates.length) return;
            const latest = new Date(Math.max(...dates));
            const diff = Math.floor(Math.abs(new Date() - latest) / (1000*60*60*24));
            const el = document.getElementById('sidebar-site-update');
            if(el) el.innerText = diff === 0 ? '今天' : diff + '天前';
        });
}

function updateSidebar() {
    const map = {
        'sidebar-post-count': 'g-total-posts-id',
        'sidebar-word-count': 'g-total-word-id',
        'sidebar-site-pv': 'vercount_value_site_pv',
        'sidebar-site-uv': 'vercount_value_site_uv',
        'sidebar-site-age': 'time-day'
    };
    Object.entries(map).forEach(([sidebarId, sourceId]) => {
        const s = document.getElementById(sidebarId);
        const t = document.getElementById(sourceId);
        if(s && t) s.innerText = sidebarId==='sidebar-site-age' ? t.innerText + '天' : t.innerText;
    });
    lastUpdate();
}

function createSidebar() {
    const main = document.querySelector('main') || document.body;
    if(!main) return;

    const sideBar = document.createElement('aside');
    sideBar.id = 'site-stats';

    const items = [
        ['文章总数', 'sidebar-post-count'],
        ['全站字数', 'sidebar-word-count'],
        ['总访问量', 'sidebar-site-pv'],
        ['总访客数', 'sidebar-site-uv'],
        ['建站时长', 'sidebar-site-age'],
        ['上次更新', 'sidebar-site-update']
    ];

    items.forEach(([label, id]) => {
        const div = document.createElement('div');
        div.className = 'sidebar-element';
        div.innerHTML = `<span>${label}</span><span id="${id}"></span>`;
        sideBar.appendChild(div);
    });

    // 插入文章前
    main.insertBefore(sideBar, main.firstChild);

    updateSidebar();

    // 响应式隐藏
    const resizeFn = () => {
        sideBar.style.display = window.innerWidth < 992 ? 'none' : 'block';
    };
    window.addEventListener('resize', resizeFn);
    resizeFn();
}

// 仅在文章页执行
if(document.querySelector('meta[property="og:type"][content="article"]')){
    document.addEventListener('DOMContentLoaded', createSidebar);
}
