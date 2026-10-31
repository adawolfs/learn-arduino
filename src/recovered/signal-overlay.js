// GENERATED from the fresh immutable deployment. Edit the recovery recipe, not this file.
var Ke = [0.5, 0.42, 0.58, 0.34, 0.66, 0.27, 0.73, 0.2, 0.8];
var qe = class {
  constructor(e) {
    ((this.root = e), (this.items = new Map()));
  }
  update(e, t = []) {
    let n = e.flowOn ? e.signals : null;
    if (!n) {
      this.hide();
      return;
    }
    let { w: r, h: i } = e.size,
      a = t.filter((e) => !e.poly),
      o = new Set();
    for (let t of n) {
      if (!t.text) continue;
      o.add(t.id);
      let n = this.items.get(t.id);
      if (!n) {
        let e = document.createElement(`span`);
        ((e.className = `sig`),
          (e.innerHTML = `<i></i><b></b>`),
          this.root.append(e),
          (n = {
            el: e,
            text: null,
            kind: null,
            size: null,
            t: null,
          }),
          this.items.set(t.id, n));
      }
      (n.text !== t.text &&
        ((n.el.lastChild.textContent = t.text),
        (n.text = t.text),
        (n.size = null)),
        n.kind !== t.kind &&
          ((n.el.className = `sig is-${t.kind}`), (n.kind = t.kind)),
        n.el.style.setProperty(`--c`, t.color ?? `#24304a`),
        (n.size ??= {
          w: n.el.offsetWidth,
          h: n.el.offsetHeight,
        }));
      let { w: s, h: c } = n.size,
        l = n.t === null ? Ke : [n.t, ...Ke.filter((e) => e !== n.t)],
        u = null;
      for (let n of l) {
        let o = e.wirePoint(t.id, n);
        if (!o) break;
        let [l, d] = e.projectPoint(o),
          f = {
            x0: l - s / 2,
            y0: d - c / 2,
            x1: l + s / 2,
            y1: d + c / 2,
          };
        if (
          !(f.x0 < 4 || f.y0 < 4 || f.x1 > r - 4 || f.y1 > i - 4) &&
          !a.some(
            (e) =>
              f.x0 < e.x1 + 3 &&
              e.x0 < f.x1 + 3 &&
              f.y0 < e.y1 + 2 &&
              e.y0 < f.y1 + 2,
          )
        ) {
          u = {
            t: n,
            r: f,
          };
          break;
        }
      }
      (n.el.classList.toggle(`is-on`, !!u),
        u &&
          ((n.t = u.t),
          a.push(u.r),
          (n.el.style.transform = `translate(${Math.round(u.r.x0)}px, ${Math.round(u.r.y0)}px)`)));
    }
    for (let [e, t] of this.items)
      o.has(e) || (t.el.remove(), this.items.delete(e));
  }
  hide() {
    if (this.items.size) {
      for (let e of this.items.values()) e.el.remove();
      this.items.clear();
    }
  }
};
export { Ke as labelFractions, qe as SignalOverlay };
