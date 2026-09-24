/* Renders window.COLLECTIONS (assets/notes/collections.js) into the Notes page. */
(function () {
  const C = window.COLLECTIONS;
  if (!C) return;
  const esc = s => String(s == null ? '' : s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const $ = id => document.getElementById(id);

  /* ---- Books: a shelf of covers at their natural proportions ---- */
  const shelf = $('shelf-books');
  if (shelf) {
    shelf.innerHTML = C.books.map((b, i) => {
      const h = [210, 198, 216, 204, 212, 194, 206][i % 7];
      const meta = [b.author, b.year].filter(Boolean).join(' · ');
      const inner = `
        <span class="book-cover" style="--h:${h}px"><img src="${esc(b.cover)}" alt="Cover of ${esc(b.title)}" loading="lazy" decoding="async"></span>
        <span class="book-meta"><strong>${esc(b.title)}</strong>${b.subtitle ? `<em>${esc(b.subtitle)}</em>` : ''}<small>${esc(meta)}</small>${b.note ? `<p class="own-note">${esc(b.note)}</p>` : ''}</span>`;
      return b.link
        ? `<a class="book" href="${esc(b.link)}" target="_blank" rel="noopener">${inner}</a>`
        : `<div class="book" tabindex="0">${inner}</div>`;
    }).join('');
  }

  /* ---- Films & shows: posters at one height ---- */
  const cinema = $('shelf-films');
  if (cinema) {
    cinema.innerHTML = C.films.map(f => {
      const line = [f.year, f.type].filter(Boolean).join(' · ');
      const tags = (f.tags || []).map(t => `<span>${esc(t)}</span>`).join('');
      const inner = `
        <span class="poster"><img src="${esc(f.poster)}" alt="Poster for ${esc(f.title)}" loading="lazy" decoding="async"></span>
        <span class="film-meta"><strong>${esc(f.title)}</strong>${f.originalTitle ? `<em>${esc(f.originalTitle)}</em>` : ''}<small>${esc(line)}</small><span class="film-tags">${tags}</span>${f.note ? `<p class="own-note">${esc(f.note)}</p>` : ''}</span>`;
      return f.link
        ? `<a class="film" href="${esc(f.link)}" target="_blank" rel="noopener">${inner}</a>`
        : `<div class="film" tabindex="0">${inner}</div>`;
    }).join('');
  }

  /* ---- Thoughts: short fragments, then longer notes ---- */
  const fmt = d => { const t = new Date(d + 'T00:00:00'); return isNaN(t) ? esc(d) : t.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }); };
  const frag = $('thought-fragments');
  if (frag) {
    if (C.thoughts.length) {
      frag.innerHTML = C.thoughts.map(t => `
        <article class="thought">
          <time datetime="${esc(t.date)}">${fmt(t.date)}</time>
          <p>${esc(t.text)}</p>
          ${(t.tags || []).length ? `<div class="thought-tags">${t.tags.map(x => `<span>${esc(x)}</span>`).join('')}</div>` : ''}
        </article>`).join('');
    } else {
      frag.remove();
    }
  }
  const longer = $('thought-longer');
  if (longer) {
    longer.innerHTML = C.longer.map(n => {
      const body = `
        <span class="stamp">${esc(n.status)}</span>
        <h3>${esc(n.title)}</h3>
        <p>${esc(n.summary)}</p>
        ${(n.tags || []).length ? `<div class="thought-tags">${n.tags.map(x => `<span>${esc(x)}</span>`).join('')}</div>` : ''}`;
      return n.link ? `<a class="thought long" href="${esc(n.link)}">${body}</a>` : `<article class="thought long">${body}</article>`;
    }).join('');
  }

  /* ---- Photographs: editorial masonry + lightbox ---- */
  const gal = $('photo-grid');
  if (gal) {
    gal.innerHTML = C.photos.map((p, i) => {
      const when = p.date ? new Date(p.date + 'T00:00:00').toLocaleDateString('en-US', { year: 'numeric', month: 'long' }) : '';
      const cap = [p.caption, p.place, when].filter(Boolean).join(' · ');
      return `<button class="photo" type="button" data-i="${i}" aria-label="Open photograph${when ? ', ' + esc(when) : ''}">
        <img src="${esc(p.src)}" width="${p.w}" height="${p.h}" alt="${esc(p.caption || 'Photograph')}" loading="lazy" decoding="async">
        <span class="photo-cap">${esc(cap)}</span>
      </button>`;
    }).join('');

    const box = $('lightbox');
    if (box && typeof box.showModal === 'function') {
      const img = box.querySelector('img'), cap = box.querySelector('.lb-cap');
      let cur = 0;
      const show = i => {
        cur = (i + C.photos.length) % C.photos.length;
        const p = C.photos[cur];
        img.src = p.src; img.alt = p.caption || 'Photograph';
        const when = p.date ? new Date(p.date + 'T00:00:00').toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : '';
        cap.textContent = [p.caption, p.place, when, p.camera && p.lens ? `${p.camera} · ${p.lens}` : ''].filter(Boolean).join('  ·  ');
      };
      gal.addEventListener('click', e => { const b = e.target.closest('.photo'); if (!b) return; show(+b.dataset.i); box.showModal(); });
      box.querySelector('.lb-prev').addEventListener('click', () => show(cur - 1));
      box.querySelector('.lb-next').addEventListener('click', () => show(cur + 1));
      box.querySelector('.lb-close').addEventListener('click', () => box.close());
      box.addEventListener('click', e => { if (e.target === box) box.close(); });
      box.addEventListener('keydown', e => { if (e.key === 'ArrowLeft') show(cur - 1); if (e.key === 'ArrowRight') show(cur + 1); });
    }
  }

  /* Rendered content should still fade in with the rest of the page */
  document.dispatchEvent(new CustomEvent('collections:rendered'));
})();
