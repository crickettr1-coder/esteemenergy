(() => {
  const grid = document.querySelector('.blog-grid');
  if (!grid) return;
  const empty = document.createElement('div');
  empty.id = 'blog-empty-state-live';
  empty.className = 'blog-empty-state';
  empty.innerHTML = '<h3>No articles found</h3><p>Try a different search or category.</p>';
  const pageSize = 12;
  let posts = [];
  let filtered = [];
  let page = 1;
  let category = 'All Articles';
  let query = '';
  const pagination = document.createElement('nav');
  pagination.className = 'blog-pagination';
  pagination.setAttribute('aria-label', 'Blog pagination');
  const status = document.createElement('p');
  status.className = 'blog-pagination-status';
  const categoryMatch = (post) => category === 'All Articles' || post.category === category;
  const matches = (post) => !query || `${post.title} ${post.excerpt} ${post.categories} ${post.tags}`.toLowerCase().includes(query);
  const dateLabel = (value) => {
    if (!value) return 'Solar guide';
    const date = new Date(value.replace(' ', 'T'));
    return Number.isNaN(date.getTime()) ? value : date.toLocaleDateString('en-AU', { day: 'numeric', month: 'short', year: 'numeric' });
  };
  const card = (post, index) => {
    const article = document.createElement('article');
    article.className = 'blog-card is-visible';
    article.dataset.reveal = '';
    article.dataset.revealDelay = String(index % 3);
    const title = typeof post.title === 'string' && post.title.trim() ? post.title : 'Solar energy guide';
    article.innerHTML = `<div class="blog-card-visual"><img src="${post.image || '/assets/blogs/solar-panel-closeup.jpg'}" alt="Solar image for ${title.replace(/"/g, '&quot;')}" loading="lazy" ></div><div class="blog-card-content"><div class="blog-card-meta"><span class="blog-tag">${post.category || 'Solar Systems'}</span><span>${dateLabel(post.date)}</span></div><h3><a href="${post.url}">${title}</a></h3><p class="blog-card-excerpt">${post.excerpt || 'Explore practical solar guidance from Esteem Energy.'}</p><div class="blog-card-footer"><span style="font-size:12px;color:var(--blog-muted);">${post.author || 'Esteem Energy'}</span><a class="blog-read-link" href="${post.url}"><span>Read Article</span><span class="blog-read-arrow" aria-hidden="true">→</span></a></div></div>`;
    return article;
  };
  const render = () => {
    filtered = posts.filter((post) => categoryMatch(post) && matches(post));
    const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
    page = Math.min(page, totalPages);
    const start = (page - 1) * pageSize;
    grid.replaceChildren(...(filtered.slice(start, start + pageSize).map(card)));
    if (!filtered.length) grid.append(empty); else empty.remove();
    status.textContent = filtered.length ? `Showing ${start + 1}â€“${Math.min(start + pageSize, filtered.length)} of ${filtered.length} articles` : 'No articles match your search.';
    pagination.replaceChildren();
    const previous = document.createElement('button'); previous.type = 'button'; previous.textContent = 'Previous'; previous.disabled = page === 1; previous.addEventListener('click', () => { page--; render(); window.scrollTo({ top: grid.offsetTop - 120, behavior: 'smooth' }); }); pagination.append(previous);
    for (let i = 1; i <= totalPages; i++) { const button = document.createElement('button'); button.type = 'button'; button.textContent = String(i); button.className = i === page ? 'is-active' : ''; button.setAttribute('aria-label', `Page ${i}`); button.setAttribute('aria-current', i === page ? 'page' : 'false'); button.addEventListener('click', () => { page = i; render(); window.scrollTo({ top: grid.offsetTop - 120, behavior: 'smooth' }); }); pagination.append(button); }
    const next = document.createElement('button'); next.type = 'button'; next.textContent = 'Next'; next.disabled = page === totalPages; next.addEventListener('click', () => { page++; render(); window.scrollTo({ top: grid.offsetTop - 120, behavior: 'smooth' }); }); pagination.append(next);
  };
  document.querySelectorAll('[data-category-filter]').forEach((button) => button.addEventListener('click', () => { category = button.dataset.categoryFilter; page = 1; render(); }));
  const search = document.getElementById('blog-search');
  search?.addEventListener('input', () => { query = search.value.trim().toLowerCase(); page = 1; render(); });
  grid.insertAdjacentElement('afterend', status); status.insertAdjacentElement('afterend', pagination);
  fetch('./posts.json').then((response) => response.json()).then((data) => { posts = data; render(); }).catch(() => { status.textContent = 'Blog articles are temporarily unavailable.'; });
})();
