# Esteem Energy content-migration audit

Audit date: 2026-07-16. Scope was public, unauthenticated content only. No production files, pages, redirects, forms, APIs, environment variables, deployments, or GitHub state were changed.

## Counts from the audit inventory

- Live URL records: **44**, representing **43 distinct live URLs**. This includes content URLs, public archive/pagination URLs, a query permalink, and one URL whose exact status could not be independently confirmed. One duplicate `/solar-panel-battery` record is intentionally retained for duplicate-risk analysis.
- Individual blog posts recorded: **13** (7 live/search-confirmed posts plus 6 local imported posts whose live equivalents were not independently confirmed).
- Blog categories found: **1** (`/category/blog/`; category metadata was not exposed by the accessible extraction).
- Local HTML pages found: **28** total, of which **24** are current project pages/templates and **4** are archived/reference HTML files.
- Pages already designed: **10 live URL records** map to current local routes with meaningful page templates/content, covering home, about, product landing, four system pages, gallery, pricing, residential, installation, battery, reviews, and blog archive. The project itself contains **16 designed page/template routes** when local-only routes are included.
- Pages incomplete or placeholder: **4** current routes: contact, packages shell, 13.2kW capacity mismatch, and battery/content parity areas.
- Missing local equivalents: **20** live/content URLs in the mapping require a later implementation or canonical decision. This count includes publicly discovered system-size, product, support/legal, gallery alias, and blog URLs; it excludes archive aliases that map to the local blog template.
- Duplicate or duplicate-risk URLs: **6** high-risk live URL records, chiefly `/packages` vs `/pricing`, `/category/blog/` vs `/blogs/`, 13.3 vs 13.2kW, `/solar-panel-battery` vs `/battery-storage/`, gallery aliases, and the retained duplicate `/solar-panel-battery` record.
- Media assets requiring migration or verification: **2** current live assets are not present locally and require later migration; **23** asset records were audited, including old-domain captures, local assets, and variants.

## Source and completeness findings

No WordPress XML/WXR export, database export, sitemap file, REST export, or media backup was found in the project. The project contains archived old-site HTML and media captures, which supplied secondary URL and asset evidence.

The live domain was accessible through browser-backed search/open. Direct shell HTTP requests and the requested browser CLI were unavailable in this environment, so I could not independently fetch the live XML sitemap, REST API, robots.txt, or programmatically follow every archive page. Search evidence exposed `/blogs/page/26/`, indicating a much larger blog corpus than the seven individually confirmed current posts. Therefore this is a documented **partial public inventory**, not a claim that every live post has been enumerated.

Before full migration, obtain a fresh WordPress WXR export plus uploads/media backup, or enable access to the live sitemap and REST API. Then crawl all sitemap URLs, all blog pagination, category/tag archives, and canonical/redirect chains and reconcile them against these files.

## Local project findings

The current project is a static HTML site with page-per-directory routes and custom blog templates. It includes six local blog posts, four system-size routes, an about page, pricing/packages, products, battery, residential, installation, gallery, reviews, contact, and homepage. The contact page contains a non-solar placeholder title/H1 and needs content review. The local 13.2kW page should not be treated as the live 13.3kW page without a content/canonical decision. Several local blog routes use `/blogs/...`, while live evidence also uses `/blog/...` and top-level post slugs.

## Recommended implementation stages

1. Obtain WXR, uploads backup, sitemap/API access, and a complete canonical URL export.
2. Re-run URL/status/canonical/metadata audit and resolve duplicate namespaces before building.
3. Preserve live URLs by default; approve only intentional changes and then implement tested 301s, canonical updates, sitemap updates, and internal-link updates.
4. Import missing page families, product pages, system-size pages, support/legal pages, locations, and all blog posts with media/alt text.
5. Reconcile local templates, forms, structured data, internal links, and broken/placeholder links.
6. Run a staging crawl and browser/accessibility/SEO verification; deploy only after redirect and content parity sign-off.

## Files created

- `migration/content-inventory.csv`
- `migration/page-mapping.csv`
- `migration/blog-post-inventory.csv`
- `migration/media-inventory.csv`
- `migration/redirect-plan.csv`
- `migration/migration-summary.md`
