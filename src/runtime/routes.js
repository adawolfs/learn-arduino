/** Resolve a deployed locale path without mistaking a repository prefix for it. */
export function relativeAppPath(pathname, base = "/") {
  const prefix = base.endsWith("/") ? base : base + "/";
  if (prefix === "/") return pathname;
  if (pathname === prefix.slice(0, -1)) return "/";
  return pathname.startsWith(prefix)
    ? "/" + pathname.slice(prefix.length)
    : pathname;
}
export function localePath(code, base = "/", search = "", hash = "") {
  const prefix = base.endsWith("/") ? base : base + "/";
  return prefix + (code === "en" ? "" : code + "/") + search + hash;
}
