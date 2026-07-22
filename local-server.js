const http = require("http");
const fs = require("fs");
const path = require("path");

const root = process.cwd();
const port = Number(process.env.PORT || 3000);

const routeMap = new Map([
  ["/about/", "pages/about/about/index.html"],
  ["/about-us/", "pages/about/about-us/index.html"],
  ["/contact-us/", "pages/contact/contact-us/index.html"],
  ["/pricing/", "pages/pricing/pricing/index.html"],
  ["/packages/", "pages/pricing/packages/index.html"],
  ["/products/", "pages/products/index.html"],
  ["/reviews/", "pages/reviews/index.html"],
  ["/gallery/", "pages/gallery/our-gallery/index.html"],
  ["/our-gallery/", "pages/gallery/our-gallery/index.html"],
  ["/privacy-policy/", "pages/privacy/privacy-policy/index.html"],
  ["/support-lounge/", "pages/support/support-lounge/index.html"],
  ["/blogs/", "blogs/index.html"],
  ["/about/about.css", "pages/about/about/about.css"],
  ["/about/about.js", "pages/about/about/about.js"],
  ["/pricing/pricing.css", "pages/pricing/pricing/pricing.css"],
  ["/pricing/pricing.js", "pages/pricing/pricing/pricing.js"],
  ["/contact-us/contact-us.css", "pages/contact/contact-us/contact-us.css"],
  ["/contact-us/contact-us.js", "pages/contact/contact-us/contact-us.js"],
  ["/products/products.css", "pages/products/products.css"],
  ["/products/6-6-kw-solar-system/product.css", "pages/products/6-6-kw-solar-system/product.css"],
  ["/products/6-6-kw-solar-system/product.js", "pages/products/6-6-kw-solar-system/product.js"],
  ["/blog-post.css", "blogs/blog-post.css"],
  ["/blog-post.js", "blogs/blog-post.js"],
]);

function addCanonicalRoutes(directory) {
  if (!fs.existsSync(directory)) return;
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const file = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      addCanonicalRoutes(file);
      continue;
    }
    if (entry.name !== "index.html") continue;
    const html = fs.readFileSync(file, "utf8");
    const match = html.match(/<link\b[^>]*rel=["']canonical["'][^>]*href=["']([^"']+)["']/i);
    if (!match) continue;
    try {
      const url = new URL(match[1], "http://local.test");
      const publicPath = url.pathname.endsWith("/") ? url.pathname : `${url.pathname}/`;
      if (!publicPath.startsWith("/blogs/") && !publicPath.startsWith("/blog/")) {
        routeMap.set(publicPath, path.relative(root, file));
      }
    } catch {}
  }
}

addCanonicalRoutes(path.join(root, "catalog"));
addCanonicalRoutes(path.join(root, "services"));
addCanonicalRoutes(path.join(root, "locations"));
addCanonicalRoutes(path.join(root, "campaigns"));

function resolveRoute(requestPath) {
  if (requestPath === "/") return "index.html";
  if (routeMap.has(requestPath)) return routeMap.get(requestPath);
  if (!requestPath.endsWith("/") && routeMap.has(`${requestPath}/`)) {
    return routeMap.get(`${requestPath}/`);
  }
  const slug = requestPath.replace(/^\//, "").replace(/\/$/, "");
  const article = path.join("blogs", "articles", slug, "index.html");
  if (fs.existsSync(path.join(root, article))) return article;
  return requestPath.replace(/^\//, "");
}

const mime = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".avif": "image/avif",
  ".svg": "image/svg+xml",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
};

http.createServer((request, response) => {
  const pathname = decodeURIComponent(new URL(request.url, "http://local.test").pathname);
  const relative = resolveRoute(pathname);
  const file = path.resolve(root, relative);
  if (!file.startsWith(`${root}${path.sep}`) && file !== path.join(root, "index.html")) {
    response.writeHead(403);
    response.end("Forbidden");
    return;
  }
  fs.stat(file, (error, stats) => {
    if (error || !stats.isFile()) {
      response.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
      response.end("Not found");
      return;
    }
    response.writeHead(200, {
      "Content-Type": mime[path.extname(file).toLowerCase()] || "application/octet-stream",
      "Cache-Control": "no-store, no-cache, must-revalidate",
    });
    fs.createReadStream(file).pipe(response);
  });
}).listen(port, "127.0.0.1", () => {
  console.log(`Esteem Energy local server: http://127.0.0.1:${port}/`);
});
