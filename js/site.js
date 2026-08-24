/* ============================================================
   Site renderer — data-driven from content.json
   Render, then init: theme, scroll-spy, reveal, rail drag.
   ============================================================ */

(async function () {
    'use strict';

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const esc = (s) => String(s ?? '');

    let d;
    try {
        const res = await fetch('content.json?v=20260824-card-header-fix', { cache: 'no-store' });
        d = await res.json();
    } catch (err) {
        console.error('content.json failed to load — serve over HTTP, not file://', err);
        return;
    }

    /* ---------- helpers ---------- */
    const tag = (t) => `<span class="tag tag-${esc(t.tone)}">${esc(t.label)}</span>`;
    const faIco = (cls, extra = '') =>
        cls ? `<i class="${esc(cls)}${extra ? ' ' + extra : ''}" aria-hidden="true"></i>` : '';
    const imgIco = (src, cls = 'i8') => {
        if (!src) return '';
        const ink = /(?:^|\/)(x|github|medium)\.(?:svg|png)$/i.test(src) ? ' brand-ink' : '';
        const bleed = cls.includes('logo-mark') &&
            /(?:log-icon|emergent|outskill-mark|catalyst-logo)\.(?:png|svg)$/i.test(src)
            ? ' logo-bleed' : '';
        const themed = cls.includes('logo-mark') && /log-2026-light\.png$/i.test(src) ? ' logo-log' : '';
        const assetClass = cls.includes('logo-mark')
            ? (/(?:masters-union)\.(?:gif|png|webp)$/i.test(src) ? ' logo-masters-union'
                : /outskill\.(?:png|webp|svg)$/i.test(src) ? ' logo-outskill'
                : /cursor-logo\.(?:png|webp|svg)$/i.test(src) ? ' logo-cursor'
                : /tigergraph-(?:user|orange)\.(?:jpg|png|webp|svg)$/i.test(src) ? ' logo-tigergraph'
                : '')
            : '';
        return `<img class="${cls}${ink}${bleed}${themed}${assetClass}" src="${esc(src)}" alt="" width="48" height="48" decoding="async">`;
    };
    const tile = (it) => {
        const style = it.iconBg
            ? ` style="background:${esc(it.iconBg)};color:${esc(it.iconColor || '#4F378B')}"`
            : '';
        return `<div class="icon-tile"${style}>${it.fa ? faIco(it.fa) : imgIco(it.icon)}</div>`;
    };

    const cardMarkRow = (it) => {
        const supporting = (Array.isArray(it.brandIcons) ? it.brandIcons : []).filter(Boolean)
            .map((icon) => imgIco(icon, 'i8 logo-mark')).join('');
        const primary = tile(it);
        return `<div class="card-mark-row">${it.brandFirst ? supporting + primary : primary + supporting}</div>`;
    };

    const btn = (l) =>
        `<a class="btn btn-${esc(l.style || 'line')}" href="${esc(l.url)}" target="_blank" rel="noreferrer">${l.fa ? faIco(l.fa) : imgIco(l.icon, 'i8 i8-btn')}${esc(l.label)}</a>`;

    const socialIcon = (s) =>
        `<a href="${esc(s.url)}" target="_blank" rel="noreferrer" aria-label="${esc(s.label)}">${imgIco(s.icon, 'i8 i8-social')}</a>`;

    /* ---------- nav dock ---------- */
    document.getElementById('dock').innerHTML =
        d.nav.map((n) =>
            `<a href="#${esc(n.id)}" class="dock-item" data-tip="${esc(n.tip)}" data-sec="${esc(n.id)}" aria-label="${esc(n.tip)}">${faIco(n.fa)}</a>`
        ).join('') +
        `<span class="dock-sep"></span>
         <button class="dock-item" id="themeToggle" data-tip="Theme" aria-label="Toggle theme"><i class="fas fa-moon" id="themeIcon" aria-hidden="true"></i></button>`;

    /* ---------- hero ---------- */
    const p = d.profile;
    document.getElementById('home').innerHTML = `
        <div class="section-inner hero-grid">
            <div class="hero-main">
                <h1 class="display hero-name">${esc(p.name)}</h1>
                <p class="hero-role">${esc(p.role)}</p>
                <p class="body hero-bio">${esc(p.bio)}</p>
                <div class="hero-ctas">${p.ctas.map(btn).join('')}</div>
                <div class="hero-socials">${p.socials.map(socialIcon).join('')}</div>
            </div>
            <div class="hero-portrait-wrap">
                <img class="hero-portrait" src="assets/profile.jpg" alt="Portrait of ${esc(p.name)}" width="320" height="320" style="width:min(320px,72vw);height:min(320px,72vw);object-fit:cover;flex:none">
            </div>
        </div>`;

    /* ---------- about ---------- */
    const a = d.about;
    document.getElementById('about').innerHTML = `
        <div class="section-inner">
            <header class="section-head reveal">
                <span class="eyebrow">${esc(a.tag)}</span>
                <h2 class="h2">${esc(a.title)}</h2>
            </header>
            <div class="about-grid">
                <div class="card about-card reveal">
                    ${a.body.map((para) => `<p class="body">${esc(para)}</p>`).join('')}
                </div>
                <div class="about-side">
                    <div class="card about-card reveal">
                        <h3 class="h3">Current focus</h3>
                        <ul class="focus-list">
                            ${a.focus.map((f) => `<li><strong>${esc(f.k)}</strong>${esc(f.v)}</li>`).join('')}
                        </ul>
                    </div>
                    <div class="card about-card reveal">
                        <h3 class="h3">Signals</h3>
                        <div class="tag-row">${a.signals.map(tag).join('')}</div>
                    </div>
                </div>
            </div>
        </div>`;

    /* ---------- work ---------- */
    const w = d.work;
    document.getElementById('work').innerHTML = `
        <div class="section-inner">
            <header class="section-head reveal">
                <span class="eyebrow">${esc(w.tag)}</span>
                <h2 class="h2">${esc(w.title)}</h2>
                <p class="lede">${esc(w.lede)}</p>
            </header>
            <div class="work-grid">
                ${w.featured.map((f) => `
                    <article class="card card-feature reveal">
                        <span class="org-pill">${esc(f.org)}</span>
                        ${cardMarkRow(f)}
                        <h3 class="h3">${esc(f.name)}</h3>
                        <p>${esc(f.desc)}</p>
                        <div class="tag-row">${f.tags.map(tag).join('')}</div>
                        <div class="card-actions">${(f.links || (f.url ? [{ label: 'Source', url: f.url, style: 'solid' }] : [])).map(btn).join('')}</div>
                    </article>`).join('')}
            </div>
            <div class="rail-head reveal">
                <span class="rail-title">More projects</span>
                <div class="rail-nav">
                    <button class="rail-btn" data-rail-prev aria-label="Scroll left">${faIco('fas fa-chevron-left')}</button>
                    <button class="rail-btn" data-rail-next aria-label="Scroll right">${faIco('fas fa-chevron-right')}</button>
                </div>
            </div>
            <div class="rail" id="workRail">
                ${w.archive.map((it) => `
                    <a class="rail-item" href="${esc(it.url)}" target="_blank" rel="noreferrer">
                        <span class="row">
                            ${tile(it)}
                            ${faIco('fas fa-arrow-up-right-from-square', 'arrow')}
                        </span>
                        <span class="name">${esc(it.name)}</span>
                        <span class="desc">${esc(it.desc)}</span>
                        <span class="tag-row">${it.tags.map(tag).join('')}</span>
                    </a>`).join('')}
            </div>
        </div>`;

    /* ---------- labs ---------- */
    const l = d.labs;
    document.getElementById('labs').innerHTML = `
        <div class="section-inner">
            <header class="section-head reveal">
                <span class="eyebrow">${esc(l.tag)}</span>
                <h2 class="h2">${esc(l.title)}</h2>
                <p class="lede">${esc(l.lede)}</p>
            </header>
            <div class="labs-grid">
                ${l.items.map((o) => `
                    <article class="card card-feature lab-card reveal">
                        <div class="lab-head">
                            ${o.fa ? `<div class="org-logo org-logo-icon"${o.iconBg ? ` style="background:${esc(o.iconBg)};color:${esc(o.iconColor || '#4F378B')}"` : ''}>${faIco(o.fa)}</div>` : `<img class="org-logo ${esc(o.logoClass || '')}" src="${esc(o.logo)}" alt="${esc(o.name)} logo" loading="lazy">`}
                            <div>
                                <h3 class="h3">${esc(o.name)}</h3>
                                <span class="meta">${esc(o.role)}</span>
                            </div>
                        </div>
                        <p class="body-sm">${esc(o.desc)}</p>
                        <div class="tag-row">${o.tags.map(tag).join('')}</div>
                        <div class="card-actions">
                            <a class="btn btn-line" href="${esc(o.url)}" target="_blank" rel="noreferrer">${esc(o.actionLabel || "Organization")}</a>
                        </div>
                    </article>`).join('')}
            </div>
        </div>`;

    /* ---------- research ---------- */
    const r = d.research;
    document.getElementById('research').innerHTML = `
        <div class="section-inner">
            <header class="section-head reveal">
                <span class="eyebrow">${esc(r.tag)}</span>
                <h2 class="h2">${esc(r.title)}</h2>
                <p class="lede">${esc(r.lede)}</p>
            </header>
            <article class="card card-feature research-feature reveal">
                <span class="org-pill">${esc(r.featured.org)}</span>
                ${cardMarkRow(r.featured)}
                <h3 class="h3">${esc(r.featured.name)}</h3>
                <p>${esc(r.featured.desc)}</p>
                <span class="meta mono">${esc(r.featured.note)}</span>
                <div class="card-actions">${r.featured.links.map(btn).join('')}</div>
            </article>
            <div class="pub-list reveal">
                ${r.list.map((pub) => `
                    <a class="pub-item" href="${esc(pub.url)}" target="_blank" rel="noreferrer">
                        <span class="meta">${esc(pub.year)}</span>
                        <span class="pub-title">${esc(pub.title)}
                            <span class="pub-sub">${esc(pub.sub)}</span>
                        </span>
                        ${faIco('fas fa-arrow-up-right-from-square', 'arrow')}
                    </a>`).join('')}
            </div>
        </div>`;

    /* ---------- blogs ---------- */
    const b = d.blogs;
    document.getElementById('blogs').innerHTML = `
        <div class="section-inner">
            <header class="section-head reveal">
                <span class="eyebrow">${esc(b.tag)}</span>
                <h2 class="h2">${esc(b.title)}</h2>
                <p class="lede">${esc(b.lede)}</p>
            </header>
            <div class="blog-grid">
                ${b.posts.map((post) => `
                    <a class="blog-card reveal" href="${esc(post.url)}" target="_blank" rel="noreferrer">
                        <div class="blog-cover" style="background-image:url('${esc(post.image)}');"></div>
                        <div class="blog-body">
                            <span class="u-date">${esc(post.date)}</span>
                            <h3 class="h3">${esc(post.title)}</h3>
                            <p>${esc(post.sub)}</p>
                            <span class="blog-more">Read on Medium ${faIco('fas fa-arrow-up-right-from-square')}</span>
                        </div>
                    </a>`).join('')}
            </div>
            <div class="creative-links reveal">
                <a class="btn btn-solid" href="${esc(b.profile)}" target="_blank" rel="noreferrer">${imgIco('assets/icons/color--medium-logo.png', 'i8 i8-btn')} All posts on Medium</a>
            </div>
        </div>`;

    /* ---------- updates ---------- */
    const u = d.updates;
    document.getElementById('updates').innerHTML = `
        <div class="section-inner">
            <header class="section-head reveal">
                <span class="eyebrow">${esc(u.tag)}</span>
                <h2 class="h2">${esc(u.title)}</h2>
                <p class="lede">${esc(u.lede)}</p>
            </header>
            <div class="work-grid updates-featured">
                ${(u.featured || []).map((t) => `
                    <a class="card card-feature update-feature reveal" href="${esc(t.url || '#')}" ${t.url ? 'target="_blank" rel="noreferrer"' : ''}>
                        <span class="logo-row">
                            ${t.fa ? tile(t) : imgIco(t.icon, 'i8 logo-mark')}
                            ${[t.icon2, ...(Array.isArray(t.icons) ? t.icons : [])].filter(Boolean).map((icon) => imgIco(icon, 'i8 logo-mark')).join('')}
                        </span>
                        <span class="u-date">${esc(t.date)}</span>
                        <h3 class="h3">${esc(t.title)}</h3>
                        <p>${esc(t.desc)}</p>
                    </a>`).join('')}
            </div>
            <div class="rail-head reveal">
                <span class="rail-title">More events</span>
                <div class="rail-nav">
                    <button class="rail-btn" data-rail-prev aria-label="Scroll left">${faIco('fas fa-chevron-left')}</button>
                    <button class="rail-btn" data-rail-next aria-label="Scroll right">${faIco('fas fa-chevron-right')}</button>
                </div>
            </div>
            <div class="rail updates-rail">
                ${u.items.map((t) => `
                    <a class="rail-item update-rail-item" href="${esc(t.url || '#')}" ${t.url ? 'target="_blank" rel="noreferrer"' : ''}>
                        <span class="logo-row">
                            ${t.fa ? tile(t) : imgIco(t.icon, 'i8 logo-mark')}
                            ${t.icon2 ? imgIco(t.icon2, 'i8 logo-mark') : ''}
                        </span>
                        <span class="u-date">${esc(t.date)}</span>
                        <span class="name">${esc(t.title)}</span>
                        <span class="desc">${esc(t.desc)}</span>
                    </a>`).join('')}
            </div>
        </div>`;

    /* ---------- creative ---------- */
    const c = d.creative;
    const creativeCard = (card) => {
        if (card.type === 'spotify') {
            return `
                <div class="card creative-card reveal">
                    <div>
                        <h3 class="h3">${esc(card.title)}</h3>
                        <p class="meta">${esc(card.sub)}</p>
                    </div>
                    <div class="spotify-frame">
                        <iframe src="${esc(card.embed)}" height="152" frameborder="0"
                            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                            loading="lazy" title="${esc(card.title)} on Spotify"></iframe>
                    </div>
                </div>`;
        }
        if (card.type === 'video') {
            return `
                <div class="card creative-card reveal">
                    <div>
                        <h3 class="h3">${esc(card.title)}</h3>
                        <p class="meta">${esc(card.sub)}</p>
                    </div>
                    <a class="video-card" href="${esc(card.url)}" target="_blank" rel="noreferrer">
                        <div class="video-thumb" style="background-image:url('${esc(card.thumb)}');">
                            <div class="video-overlay">
                                <span class="play">${faIco('fas fa-play')}</span>
                                <div><strong>Watch on YouTube</strong><span>Open the full video directly</span></div>
                            </div>
                        </div>
                    </a>
                </div>`;
        }
        return `
            <div class="card creative-card reveal">
                ${card.fa || card.icon ? tile(card) : ''}
                <h3 class="h3">${esc(card.title)}</h3>
                <p class="body-sm">${esc(card.desc)}</p>
            </div>`;
    };

    document.getElementById('creative').innerHTML = `
        <div class="section-inner">
            <header class="section-head reveal">
                <span class="eyebrow">${esc(c.tag)}</span>
                <h2 class="h2">${esc(c.title)}</h2>
                <p class="lede">${esc(c.lede)}</p>
            </header>
            <div class="creative-grid">${c.cards.map(creativeCard).join('')}</div>
            <div class="creative-links reveal">
                ${c.links.map((li) =>
                    `<a class="btn btn-${esc(li.style)}" href="${esc(li.url)}" target="_blank" rel="noreferrer">${imgIco(li.icon, 'i8 i8-btn')}${esc(li.label)}</a>`
                ).join('')}
            </div>
        </div>`;

    /* ---------- connect ---------- */
    const cn = d.connect;
    document.getElementById('connect').innerHTML = `
        <div class="section-inner">
            <header class="section-head reveal">
                <span class="eyebrow">${esc(cn.tag)}</span>
                <h2 class="h2">${esc(cn.title)}</h2>
                <p class="lede">${esc(cn.lede)}</p>
            </header>
            <div class="connect-grid">
                ${cn.items.map((it) => `
                    <a class="connect-card reveal ${it.primary ? 'primary' : ''}" href="${esc(it.url)}" ${it.url.startsWith('mailto:') ? '' : 'target="_blank" rel="noreferrer"'}>
                        <span class="c-icon">${imgIco(it.icon)}</span>
                        <span class="c-name">${esc(it.name)}</span>
                        <span class="c-handle">${esc(it.handle)}</span>
                    </a>`).join('')}
            </div>
        </div>`;

    /* ---------- footer ---------- */
    document.getElementById('footer').innerHTML = `<span class="meta">${esc(d.footer)}</span>`;

    /* ================= behaviors ================= */

    /* Theme */
    const html = document.documentElement;
    const themeIcon = document.getElementById('themeIcon');
    const applyThemeIcon = () => {
        const dark = html.getAttribute('data-theme') === 'dark';
        themeIcon.className = dark ? 'fas fa-sun' : 'fas fa-moon';
    };
    if (localStorage.getItem('theme') === 'dark') html.setAttribute('data-theme', 'dark');
    applyThemeIcon();
    document.getElementById('themeToggle').addEventListener('click', () => {
        const dark = html.getAttribute('data-theme') === 'dark';
        html.setAttribute('data-theme', dark ? 'light' : 'dark');
        localStorage.setItem('theme', dark ? 'light' : 'dark');
        applyThemeIcon();
    });

    /* Scroll-spy */
    const dockItems = [...document.querySelectorAll('.dock-item[data-sec]')];
    const sections = [...document.querySelectorAll('main section[id]')];
    let ticking = false;
    const spy = () => {
        ticking = false;
        const pos = window.scrollY + window.innerHeight * 0.35;
        let current = sections[0]?.id;
        for (const s of sections) if (pos >= s.offsetTop) current = s.id;
        dockItems.forEach((i) => i.classList.toggle('active', i.dataset.sec === current));
    };
    window.addEventListener('scroll', () => {
        if (!ticking) { ticking = true; requestAnimationFrame(spy); }
    }, { passive: true });
    spy();

    /* Reveal on scroll — never leave the page blank */
    const revealEls = [...document.querySelectorAll('.reveal')];
    const showVisible = () => {
        const vh = window.innerHeight;
        revealEls.forEach((el) => {
            const r = el.getBoundingClientRect();
            if (r.top < vh + 120 && r.bottom > -80) el.classList.add('in');
        });
    };
    showVisible();
    if (reduced || !('IntersectionObserver' in window)) {
        revealEls.forEach((el) => el.classList.add('in'));
    } else {
        const io = new IntersectionObserver((entries) => {
            entries.forEach((e) => {
                if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
            });
        }, { threshold: 0.01, rootMargin: '80px 0px 80px 0px' });
        revealEls.forEach((el) => { if (!el.classList.contains('in')) io.observe(el); });
        setTimeout(() => revealEls.forEach((el) => el.classList.add('in')), 1800);
    }

    /* Rail arrow buttons + drag-to-scroll (desktop), links stay clickable */
    document.querySelectorAll('.rail').forEach((rail) => {
        const step = () => Math.min(rail.clientWidth * 0.85, 420);
        rail.parentElement.querySelector('[data-rail-prev]')?.addEventListener('click', () =>
            rail.scrollBy({ left: -step(), behavior: reduced ? 'auto' : 'smooth' }));
        rail.parentElement.querySelector('[data-rail-next]')?.addEventListener('click', () =>
            rail.scrollBy({ left: step(), behavior: reduced ? 'auto' : 'smooth' }));
    });

    if (!reduced) {
        document.querySelectorAll('.rail').forEach((rail) => {
            let down = false, startX = 0, startScroll = 0, moved = 0;
            rail.addEventListener('pointerdown', (e) => {
                if (e.pointerType !== 'mouse') return;
                down = true; moved = 0;
                startX = e.clientX; startScroll = rail.scrollLeft;
            });
            rail.addEventListener('pointermove', (e) => {
                if (!down) return;
                const dx = e.clientX - startX;
                moved = Math.max(moved, Math.abs(dx));
                rail.scrollLeft = startScroll - dx;
            });
            const end = (e) => {
                if (!down) return;
                down = false;
                if (moved > 6) {
                    const stop = (ev) => { ev.preventDefault(); ev.stopPropagation(); };
                    rail.addEventListener('click', stop, { capture: true, once: true });
                }
            };
            rail.addEventListener('pointerup', end);
            rail.addEventListener('pointercancel', end);
            rail.addEventListener('pointerleave', end);
        });
    }
})();
