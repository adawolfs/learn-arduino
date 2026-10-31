// GENERATED from the fresh immutable deployment. Edit the recovery recipe, not this file.
import { a as e } from "./localization.js";
import { renderIcon as b } from "./icons.js";
var Be = `http://www.w3.org/2000/svg`;
var Ve = 16;
var He = {
  slide: () => e(`or drag it in the scene`),
  knob: () => e(`or drag around the knob`),
  press: () => e(`Hold it down in the scene`),
  squeeze: () => e(`Press it in the scene, then drag down to push harder`),
  tap: () => e(`or click a weight in the scene`),
};
function Ue(e, t) {
  return e.unit
    ? e.unit === `%` || e.unit === `°`
      ? `${t}${e.unit}`
      : `${t} ${e.unit}`
    : String(t);
}
var We = class {
  constructor(e, { svg: t, onParam: n, onFocus: r, onClose: i, onRun: a }) {
    ((this.root = e),
      (this.onParam = n),
      (this.onRun = a),
      (this.onFocus = r),
      (this.onClose = i),
      (this.side = 1),
      (this.top = 112),
      (this.dock = `corner`),
      (this.controls = new Map()),
      (this.leader = document.createElementNS(Be, `g`)),
      this.leader.setAttribute(`class`, `insp-leader`),
      (this.path = document.createElementNS(Be, `path`)),
      (this.end = document.createElementNS(Be, `circle`)),
      this.end.setAttribute(`r`, `4.6`),
      this.end.setAttribute(`class`, `dot-end`),
      this.leader.append(this.path, this.end),
      t.append(this.leader),
      e.addEventListener(`keydown`, (e) => {
        e.key === `Escape` && (e.stopPropagation(), this.onClose?.());
      }));
  }
  get isOpen() {
    return this.root.classList.contains(`is-on`);
  }
  open(t, n, r) {
    let i =
      this.isOpen &&
      this.sel &&
      (this.sel.id ?? this.sel.info) === (t.id ?? t.info);
    ((this.sel = t), (this.params = n));
    let a = this.root,
      o = a.contains(document.activeElement) ? document.activeElement : null,
      s = o?.closest(`.insp-row`)?.dataset.key,
      c = o ? [...(o.parentElement?.children ?? [])].indexOf(o) : -1,
      l = t.info ?? {},
      u = He[t.interact]?.();
    a.innerHTML = `
      <header class="insp-head">
        <h3>${l.name ?? e(`Part`)}</h3>
        <button class="insp-close" type="button" aria-label="${e(`Close`)}">${b(`close`)}</button>
      </header>
      ${l.desc ? `<p class="insp-desc">${l.desc}</p>` : ``}
      <div class="insp-rows"></div>
      <footer class="insp-foot">
        <button class="insp-focus" type="button">${b(`focus`)}<span>${e(`Zoom to it`)}</span></button>
        ${u ? `<span class="insp-hint">${u}</span>` : ``}
        ${t.live ? `<button class="insp-run" type="button">${b(`play`)}<span>${e(`Run to see it`)}</span></button>` : ``}
      </footer>`;
    let d = a.querySelector(`.insp-rows`);
    this.controls.clear();
    for (let e of n) d.append(this.row(e, r[e.key]));
    if (
      ((d.hidden = !n.length),
      a
        .querySelector(`.insp-close`)
        .addEventListener(`click`, () => this.onClose?.()),
      a
        .querySelector(`.insp-focus`)
        .addEventListener(`click`, () => this.onFocus?.()),
      a
        .querySelector(`.insp-run`)
        ?.addEventListener(`click`, () => this.onRun?.()),
      (this.size = null),
      (this.placed = !1),
      i || (a.classList.remove(`is-on`), a.offsetWidth),
      a.classList.add(`is-on`),
      this.leader.classList.add(`is-on`),
      s)
    ) {
      let e = a.querySelector(`.insp-row[data-key="${s}"]`);
      (
        e?.querySelector(`[role="radiogroup"]`)?.children[c] ??
        e?.querySelector(`input, button`)
      )?.focus({
        preventScroll: !0,
      });
    }
  }
  setRunning(e) {
    (this.root.classList.toggle(`is-running`, e), (this.size = null));
  }
  close() {
    ((this.sel = null),
      this.root.classList.remove(`is-on`),
      this.leader.classList.remove(`is-on`));
  }
  row(t, n) {
    let r = document.createElement(`div`);
    ((r.className = `insp-row is-${t.type}`), (r.dataset.key = t.key));
    let i = `insp-${t.key}`;
    if (t.type === `range`) {
      r.innerHTML = `
        <label for="${i}"><span>${t.label}</span><output></output></label>
        <input id="${i}" type="range" min="${t.min}" max="${t.max}" step="${t.step ?? 1}" />
        ${t.hint ? `<p class="insp-note">${t.hint}</p>` : ``}`;
      let e = r.querySelector(`input`),
        a = r.querySelector(`output`);
      (t.tint && e.style.setProperty(`--accent`, t.tint),
        e.addEventListener(`input`, () =>
          this.onParam?.(t.key, Number(e.value)),
        ));
      let o = (n) => {
        (document.activeElement !== e || Number(e.value) !== n) &&
          (e.value = n);
        let r = t.step ?? 1;
        ((a.textContent = Ue(t, +(Math.round(n / r) * r).toFixed(2))),
          e.style.setProperty(
            `--fill`,
            `${((n - t.min) / (t.max - t.min)) * 100}%`,
          ));
      };
      return (this.controls.set(t.key, o), o(n), r);
    }
    if (t.type === `toggle`) {
      r.innerHTML = `
        <label class="insp-switch"><input id="${i}" type="checkbox" role="switch" /><span class="track"><span class="knob"></span></span><span>${t.label}</span></label>`;
      let e = r.querySelector(`input`);
      e.addEventListener(`change`, () => this.onParam?.(t.key, e.checked));
      let a = (t) => {
        e.checked = !!t;
      };
      return (this.controls.set(t.key, a), a(n), r);
    }
    let a = t.type === `swatch`;
    r.innerHTML = `
      <div class="insp-label"><span>${t.label}</span>${a ? `<output></output>` : ``}</div>
      <div class="${a ? `swatches` : `seg`}" role="radiogroup" aria-label="${t.label}"></div>
      <p class="insp-note"></p>`;
    let o = r.querySelector(`[role="radiogroup"]`),
      s = r.querySelector(`.insp-note`),
      c = r.querySelector(`output`),
      l = t.options.map((e) => {
        let n = document.createElement(`button`);
        return (
          (n.type = `button`),
          n.setAttribute(`role`, `radio`),
          a
            ? ((n.className = `swatch`),
              n.style.setProperty(`--c`, e.color),
              n.setAttribute(`aria-label`, e.label),
              (n.title = e.label))
            : (n.textContent = e.label),
          n.addEventListener(`click`, () => this.onParam?.(t.key, e.value)),
          o.append(n),
          n
        );
      });
    o.addEventListener(`keydown`, (e) => {
      let n = {
        ArrowLeft: -1,
        ArrowUp: -1,
        ArrowRight: 1,
        ArrowDown: 1,
      }[e.key];
      if (!n) return;
      e.preventDefault();
      let r = l.indexOf(document.activeElement),
        i = (Math.max(0, r) + n + l.length) % l.length;
      (l[i].focus(), this.onParam?.(t.key, t.options[i].value));
    });
    let u = (n) => {
      let r = t.options.find((e) => e.value === n);
      (l.forEach((e, r) => {
        let i = t.options[r].value === n;
        (e.classList.toggle(`is-on`, i),
          e.setAttribute(`aria-checked`, String(i)));
      }),
        c && (c.textContent = r?.label ?? (a ? e(`Custom`) : ``)),
        (s.textContent = r?.note ?? ``),
        (s.hidden = !r?.note));
    };
    return (this.controls.set(t.key, u), u(n), r);
  }
  sync(e) {
    if (this.isOpen) {
      for (let [t, n] of this.controls) n(e[t]);
      this.size = null;
    }
  }
  pulse(e) {
    let t = this.root.querySelector(`.insp-row[data-key="${e}"]`);
    t &&
      (t.classList.remove(`is-pulse`),
      t.offsetWidth,
      t.classList.add(`is-pulse`),
      t.querySelector(`input, button`)?.focus({
        preventScroll: !0,
      }));
  }
  get footprint() {
    return this.isOpen && this.dock === `bottom`
      ? this.root.offsetHeight + 20
      : 0;
  }
  place(e, t, n) {
    if (!this.isOpen || !e) return;
    this.size ??= {
      w: this.root.offsetWidth,
      h: this.root.offsetHeight,
    };
    let { w: r, h: i } = this.size,
      a = Math.min(Ve, t / 30);
    if (this.dock === `bottom`) {
      let a = (t - r) / 2,
        o = n - i - 10;
      this.root.style.transform = `translate(${Math.round(a)}px, ${Math.round(o)}px)`;
      let s = Math.min(a + r - 30, Math.max(a + 30, e[0])),
        c = e[1] < o - 8;
      (this.path.setAttribute(
        `d`,
        c
          ? `M${s} ${o} L${s} ${Math.max(e[1] + 4, o - 22)} L${e[0]} ${e[1]}`
          : ``,
      ),
        this.end.setAttribute(`cx`, e[0]),
        this.end.setAttribute(`cy`, e[1]),
        this.leader.classList.toggle(
          `is-away`,
          !c || e[0] < -40 || e[0] > t + 40 || e[1] < -40,
        ));
      return;
    }
    let o = Math.max(a, Math.min(this.top, n - i - 58)),
      s = (e) => (e < 0 ? a : t - r - a),
      c = (t) => e[0] > s(t) - 24 && e[0] < s(t) + r + 24 && e[1] < o + i + 24;
    (this.lockSide
      ? (this.side = this.lockSide)
      : this.placed
        ? c(this.side) && !c(-this.side) && (this.side = -this.side)
        : (this.side = e[0] > t / 2 ? -1 : 1),
      (this.placed = !0));
    let l = s(this.side);
    this.root.style.transform = `translate(${Math.round(l)}px, ${Math.round(o)}px)`;
    let u = Math.min(l + r - 30, Math.max(l + 30, e[0])),
      d = o + i,
      f = Math.min(e[1] - 4, d + 26),
      p =
        e[1] > d + 8
          ? `M${u} ${d} L${u} ${f} L${e[0]} ${e[1]}`
          : `M${this.side < 0 ? l + r : l} ${o + i / 2} L${e[0]} ${e[1]}`;
    (this.path.setAttribute(`d`, p),
      this.end.setAttribute(`cx`, e[0]),
      this.end.setAttribute(`cy`, e[1]));
    let m = e[0] < -40 || e[1] < -40 || e[0] > t + 40 || e[1] > n + 40;
    this.leader.classList.toggle(`is-away`, m);
  }
};
export {
  Be as svgNamespace,
  Ve as inspectorMargin,
  He as interactionHints,
  Ue as formatParameter,
  We as ComponentInspector,
};
