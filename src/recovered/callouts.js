// GENERATED from the fresh immutable deployment. Edit the recovery recipe, not this file.
import { renderIcon as b } from "./icons.js";
var pe = `http://www.w3.org/2000/svg`;
var me = 7;
function x(e, t = {}) {
  let n = document.createElementNS(pe, e);
  for (let [e, r] of Object.entries(t)) n.setAttribute(e, r);
  return n;
}
function he(e, t, n) {
  let r = e.ring ? me : 0,
    i = e.at * n;
  switch (e.side) {
    case `top`:
      return [t.x + i, t.y - r];
    case `left`:
      return [t.x - +!e.ring, t.y + i];
    case `right`:
      return [t.x + t.w + +!e.ring, t.y + i];
    default:
      return [t.x + i, t.y + t.h + r];
  }
}
function ge(e, t, n, r) {
  let i = (e.leg ?? 30) * r;
  if (e.approach === `above`) return [n[0], n[1] - i];
  switch (e.side) {
    case `top`:
      return [t[0], t[1] - i];
    case `left`:
      return [t[0] - i, t[1]];
    case `right`:
      return [t[0] + i, t[1]];
    default:
      return [t[0], t[1] + i];
  }
}
var _e = class {
  constructor({ rig: e, svg: t, tags: n, onFocus: r }) {
    ((this.rig = e),
      (this.svg = t),
      (this.tags = n),
      (this.onFocus = r),
      (this.origin = {
        x: 0,
        y: 0,
      }),
      (this.scale = 1),
      (this.sets = []),
      (this.current = null),
      (this.free = !1),
      (this.hidden = !1),
      (this.floats = new Map()),
      (this.readout = document.createElement(`div`)),
      (this.readout.className = `readout`),
      n.append(this.readout));
  }
  show(e, { delay: t = 0, hold: n = !1 } = {}) {
    for (let e of this.sets) this.retire(e);
    let r = {
      lesson: e,
      items: [],
      aligned: !1,
      root: x(`g`, {
        class: `leader-set is-hidden`,
      }),
    };
    this.svg.append(r.root);
    for (let t of e.callouts) {
      let e = document.createElement(`article`);
      ((e.className = `callout is-hidden`),
        (e.tabIndex = 0),
        e.style.setProperty(`--x`, `${t.x}px`),
        e.style.setProperty(`--y`, `${t.y}px`),
        e.style.setProperty(`--w`, `${t.w}px`));
      let n = [`callout-icon`, t.tall ? `tall` : ``, t.wide ? `wide` : ``].join(
        ` `,
      );
      ((e.innerHTML = `${b(t.icon, n)}<div><h3>${t.title}</h3><p>${t.body}</p></div>`),
        this.rig.append(e));
      let i = x(`g`, {
          class: `leader`,
        }),
        a = x(`path`);
      i.append(a);
      let o = null;
      t.ring &&
        ((o = x(`circle`, {
          r: 4.6,
          class: `dot-end`,
        })),
        i.append(o));
      let s = (e) => {
          let t = x(`g`, {
            class: `hotspot`,
          });
          return (
            t.append(
              x(`circle`, {
                r: e + 6,
                class: `dot-hit`,
              }),
              x(`circle`, {
                r: e,
                class: `dot-halo`,
              }),
              x(`circle`, {
                r: e - 1.2,
                class: `dot-anchor`,
              }),
            ),
            i.append(t),
            t
          );
        },
        c = t.via ? s(7.2) : null,
        l = s(7.6);
      (t.anchor.startsWith(`part:`) && l.classList.add(`is-passive`),
        r.root.append(i));
      let u = document.createElement(`button`);
      ((u.className = `tag is-hidden`),
        (u.innerHTML = `<span>${t.title}</span>`),
        this.tags.append(u));
      let d = {
          c: t,
          card: e,
          g: i,
          path: a,
          ring: o,
          via: c,
          dot: l,
          tag: u,
          size: null,
        },
        f = () => this.onFocus?.(t);
      (e.addEventListener(`click`, f),
        e.addEventListener(`keydown`, (e) => {
          (e.key === `Enter` || e.key === ` `) && (e.preventDefault(), f());
        }),
        l.addEventListener(`click`, f),
        u.addEventListener(`click`, f));
      for (let t of [e, l, u])
        (t.addEventListener(`pointerenter`, () => i.classList.add(`is-hot`)),
          t.addEventListener(`pointerleave`, () =>
            i.classList.remove(`is-hot`),
          ));
      r.items.push(d);
    }
    (this.sets.push(r), (this.current = r));
    let i = () => {
      this.current === r &&
        (r.root.classList.remove(`is-hidden`),
        r.items.forEach((e, t) => {
          ((e.card.style.transitionDelay = `${t * 60}ms`),
            e.card.classList.remove(`is-hidden`),
            e.tag.classList.remove(`is-hidden`));
        }));
    };
    ((this.held = null),
      n ? (this.held = i) : t ? setTimeout(i, t) : requestAnimationFrame(i));
  }
  release() {
    let e = this.held;
    ((this.held = null), e?.());
  }
  retire(e) {
    e.root.classList.add(`is-hidden`);
    for (let t of e.items)
      ((t.card.style.transitionDelay = `0ms`),
        t.card.classList.add(`is-leaving`),
        t.tag.classList.add(`is-hidden`));
    setTimeout(() => {
      e.root.remove();
      for (let t of e.items) (t.card.remove(), t.tag.remove());
      this.sets = this.sets.filter((t) => t !== e);
    }, 420);
  }
  setFree(e) {
    e !== this.free &&
      ((this.free = e),
      this.rig.classList.toggle(`is-free`, e),
      this.svg.classList.toggle(`is-free`, e),
      this.tags.classList.toggle(`is-free`, e));
  }
  setVisible(e) {
    this.hidden = !e;
    for (let t of [this.rig, this.svg, this.tags])
      t.classList.toggle(`is-off`, !e);
  }
  layoutTags(e, t, n, r = []) {
    let i = [],
      a = e.map(({ a: e }) => e),
      o = (e) =>
        r.every(
          (t) =>
            e.x >= t.x1 + 3 ||
            t.x0 >= e.x + e.w + 3 ||
            e.y >= t.y1 + 3 ||
            t.y0 >= e.y + e.h + 3,
        ),
      s = (e, r) =>
        e.x >= 0 &&
        e.y >= 0 &&
        e.x + e.w <= t &&
        e.y + e.h <= n &&
        o(e) &&
        i.every(
          (t) =>
            e.x >= t.x + t.w + 4 ||
            t.x >= e.x + e.w + 4 ||
            e.y >= t.y + t.h + 3 ||
            t.y >= e.y + e.h + 3,
        ) &&
        a.every(
          (t) =>
            t === r ||
            t[0] < e.x - 9 ||
            t[0] > e.x + e.w + 9 ||
            t[1] < e.y - 9 ||
            t[1] > e.y + e.h + 9,
        );
    e.sort((e, t) => e.a[1] - t.a[1]);
    for (let { it: t, a: n } of e) {
      t.tagSize?.w ||
        (t.tagSize = {
          w: t.tag.offsetWidth,
          h: t.tag.offsetHeight,
        });
      let { w: e, h: r } = t.tagSize,
        a = [
          [n[0] + 13, n[1] - 13],
          [n[0] - 13 - e, n[1] - 13],
          [n[0] + 8, n[1] - r - 11],
          [n[0] + 8, n[1] + 11],
          [n[0] - 8 - e, n[1] - r - 11],
          [n[0] - 8 - e, n[1] + 11],
          [n[0] - e / 2, n[1] - r - 30],
          [n[0] + 30, n[1] - r - 22],
          [n[0] - 30 - e, n[1] - r - 22],
          [n[0] - e / 2, n[1] + 30],
        ],
        c = (t) => ({
          x: a[t][0],
          y: a[t][1],
          w: e,
          h: r,
        }),
        l = 0;
      (s(c(0), n) ||
        (l =
          t.tagSpot && s(c(t.tagSpot), n)
            ? t.tagSpot
            : Math.max(
                0,
                a.findIndex((e, t) => s(c(t), n)),
              )),
        (t.tagSpot = l),
        i.push(c(l)),
        t.tag.classList.toggle(`is-through`, !o(c(l))),
        (t.tag.style.transform = `translate(${a[l][0]}px, ${a[l][1]}px)`));
    }
  }
  invalidate() {
    for (let e of this.sets) {
      e.aligned = !1;
      for (let t of e.items) t.size = null;
    }
  }
  update(e) {
    let { w: t, h: n } = e.size,
      r = [];
    for (let i of this.sets) {
      if (!i.aligned && i === this.current && e.isHome()) {
        for (let t of i.items) {
          if (!t.c.via) continue;
          let n = e.anchor(t.c.via);
          if (!n) continue;
          let [r] = e.project(n);
          (t.card.style.setProperty(
            `--x`,
            `${(r - this.origin.x) / this.scale - t.c.at}px`,
          ),
            (t.size = null));
        }
        i.aligned = !0;
      }
      for (let a of i.items) {
        let o = e.anchor(a.c.anchor);
        if (!o) {
          ((a.g.style.display = `none`), (a.tag.style.display = `none`));
          continue;
        }
        a.g.style.display = ``;
        let s = e.project(o);
        a.size ??= {
          w: a.card.offsetWidth,
          h: a.card.offsetHeight,
          x: a.card.offsetLeft,
          y: a.card.offsetTop,
        };
        let c = this.scale,
          l = {
            x: this.origin.x + a.size.x * c,
            y: this.origin.y + a.size.y * c,
            w: a.size.w * c,
            h: a.size.h * c,
          },
          u = he(a.c, l, c),
          d;
        if (a.c.via) {
          let t = e.anchor(a.c.via),
            n = t ? e.project(t) : u;
          ((d = `M${u[0]} ${u[1]} L${n[0]} ${n[1]} L${s[0]} ${s[1]}`),
            a.via?.setAttribute(`transform`, `translate(${n[0]} ${n[1]})`));
        } else {
          let e = ge(a.c, u, s, c);
          d = `M${u[0]} ${u[1]} L${e[0]} ${e[1]} L${s[0]} ${s[1]}`;
        }
        (a.path.setAttribute(`d`, d),
          a.ring &&
            (a.ring.setAttribute(`cx`, u[0]), a.ring.setAttribute(`cy`, u[1])),
          a.dot.setAttribute(`transform`, `translate(${s[0]} ${s[1]})`));
        let f = s[0] > 0 && s[1] > 0 && s[0] < t && s[1] < n;
        ((a.dot.style.display = f ? `` : `none`),
          (a.tag.style.display = f ? `` : `none`),
          f && i === this.current
            ? r.push({
                it: a,
                a: s,
              })
            : (a.tag.style.transform = `translate(${s[0] + 13}px, ${s[1] - 13}px)`));
      }
    }
    this.layoutTags(r, t, n, this.free && r.length ? e.pressRects() : []);
    let i = new Set(e.floats ?? []);
    for (let [e, t] of this.floats)
      i.has(e) || (t.remove(), this.floats.delete(e));
    let a = performance.now();
    for (let t of i) {
      let n = this.floats.get(t);
      n ||
        ((n = document.createElement(`span`)),
        (n.className = `float-note`),
        (n.textContent = t.text),
        n.style.setProperty(`--c`, t.color),
        this.tags.append(n),
        this.floats.set(t, n));
      let r = Math.min(1, (a - t.born) / t.life),
        [i, o] = e.projectPoint(t.position);
      ((n.style.transform = `translate(${i}px, ${o - 46 * r}px) translate(-50%, -100%) scale(${0.8 + 0.2 * Math.min(1, r * 5)})`),
        (n.style.opacity = String(Math.min(1, r * 6) * (1 - r ** 4))));
    }
    let o = e.readoutState;
    if (o) {
      let [t, n] = e.projectPoint(o.position);
      ((this.readout.textContent = o.text),
        (this.readout.style.transform = `translate(${t}px, ${n}px) translate(-50%, -50%)`),
        this.readout.classList.add(`is-on`));
    } else this.readout.classList.remove(`is-on`);
  }
};
export {
  pe as svgNamespace,
  me as ringMargin,
  x as createSvg,
  he as calloutAnchor,
  ge as leaderApproach,
  _e as CalloutLayer,
};
