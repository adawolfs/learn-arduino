// GENERATED from the fresh immutable deployment. Edit the recovery recipe, not this file.
import { a as e } from "./localization.js";
import { renderIcon as b } from "./icons.js";
var Oe = {
  board: 124,
  led: 72,
  button: 84,
  pot: 78,
  rgb: 72,
  lamp: 84,
  sensor: 96,
  buzzer: 74,
  motor: 104,
  servo: 96,
  gears: 92,
  dryer: 96,
  wheel: 96,
  plant: 76,
  piano: 96,
};
var ke = {
  board: 316,
  blink: 249,
  button: 268,
  knob: 254,
  rgb: 248,
  light: 252,
  sensor: 282,
  sound: 262,
  piano: 250,
  motor: 300,
  heat: 268,
  servo: 280,
  stepper: 290,
  plant: 268,
  project: 286,
};
var Ae = (e) =>
  `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="${e}" /></svg>`;
var je = class {
  constructor(t, n, { onSelect: r }) {
    ((this.list = t),
      (this.section = t.closest(`.lessons`)),
      (this.lessons = n),
      (this.done = new Set(this.load())),
      (t.innerHTML = n
        .map(
          (t, n) => `
        <li class="lesson" role="button" tabindex="0" data-id="${t.id}" style="--w: ${ke[t.id] ?? 260}; --tw: ${Oe[t.thumb] ?? 96}" aria-label="${e(
          `Lesson {n}: {title}`,
          {
            n: n + 1,
            title: t.title,
          },
        )}">
          <img class="lesson-thumb" data-thumb="${t.thumb}" alt="" />
          <span class="lesson-title">${t.cardTitle}</span>
          <span class="lesson-done" aria-hidden="true">${b(`check`)}</span>
          <svg class="chev" viewBox="0 0 24 24" aria-hidden="true"><path d="m9 5.5 6.5 6.5L9 18.5" /></svg>
        </li>`,
        )
        .join(``)),
      (this.items = [...t.children]));
    for (let e of this.items) {
      let t = () => {
        this.dragged || r(e.dataset.id);
      };
      (e.addEventListener(`click`, t),
        e.addEventListener(`keydown`, (e) => {
          (e.key === `Enter` || e.key === ` `) && (e.preventDefault(), t());
        }));
    }
    (this.paintDone(), this.setupScroll());
  }
  get rtl() {
    return getComputedStyle(this.list).direction === `rtl`;
  }
  get pos() {
    let e = this.list;
    return this.rtl
      ? e.scrollWidth - e.clientWidth + e.scrollLeft
      : e.scrollLeft;
  }
  scrollToPos(e, t) {
    let n = this.list;
    n.scrollTo({
      left: this.rtl ? e - (n.scrollWidth - n.clientWidth) : e,
      behavior: t,
    });
  }
  setupScroll() {
    let t = this.list,
      n = this.section,
      r = document.createElement(`button`);
    ((r.className = `lesson-step prev`),
      r.setAttribute(
        `aria-label`,
        this.rtl ? e(`More lessons`) : e(`Earlier lessons`),
      ),
      (r.innerHTML = Ae(`m15 5.5-6.5 6.5 6.5 6.5`)));
    let i = document.createElement(`button`);
    ((i.className = `lesson-step next`),
      i.setAttribute(
        `aria-label`,
        this.rtl ? e(`Earlier lessons`) : e(`More lessons`),
      ),
      (i.innerHTML = Ae(`m9 5.5 6.5 6.5L9 18.5`)),
      n.append(r, i));
    let a = (e) =>
      t.scrollBy({
        left: e * t.clientWidth * 0.7,
        behavior: `smooth`,
      });
    (r.addEventListener(`click`, () => a(-1)),
      i.addEventListener(`click`, () => a(1)));
    let o = () => {
      let e = t.scrollWidth - t.clientWidth,
        r = this.pos;
      (n.classList.toggle(`can-left`, r > 2),
        n.classList.toggle(`can-right`, r < e - 2));
    };
    (t.addEventListener(`scroll`, o, {
      passive: !0,
    }),
      window.addEventListener(`resize`, o),
      requestAnimationFrame(o),
      (this.edges = o),
      t.addEventListener(
        `wheel`,
        (e) => {
          if (t.scrollWidth <= t.clientWidth) return;
          let n = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
          n &&
            (e.preventDefault(),
            (t.scrollLeft +=
              (this.rtl ? -1 : 1) * (e.deltaMode === 1 ? n * 16 : n)));
        },
        {
          passive: !1,
        },
      ));
    let s = null;
    (t.addEventListener(`pointerdown`, (e) => {
      e.pointerType === `mouse` &&
        e.button === 0 &&
        ((s = {
          x: e.clientX,
          left: t.scrollLeft,
          moved: !1,
        }),
        (this.dragged = !1));
    }),
      window.addEventListener(`pointermove`, (e) => {
        if (!s) return;
        let n = t.getBoundingClientRect().width / t.offsetWidth || 1,
          r = (e.clientX - s.x) / n;
        (!s.moved &&
          Math.abs(r) > 5 &&
          ((s.moved = !0), t.classList.add(`is-dragging`)),
          s.moved && (t.scrollLeft = s.left - r));
      }),
      window.addEventListener(`pointerup`, () => {
        s &&
          ((this.dragged = s.moved),
          (s = null),
          t.classList.remove(`is-dragging`),
          setTimeout(() => {
            this.dragged = !1;
          }, 0));
      }));
  }
  reveal(e, t = !0) {
    let n = this.list,
      r = n.scrollWidth - n.clientWidth,
      i = e.offsetLeft - n.offsetLeft + (this.rtl ? r : 0),
      a = i + e.offsetWidth,
      o = this.pos,
      s = null;
    (i - 40 < o
      ? (s = i - 40)
      : a + 40 > o + n.clientWidth && (s = a + 40 - n.clientWidth),
      s !== null &&
        this.scrollToPos(Math.max(0, Math.min(r, s)), t ? `smooth` : `auto`));
  }
  load() {
    try {
      return JSON.parse(localStorage.getItem(`learn-arduino:done`) ?? `[]`);
    } catch {
      return [];
    }
  }
  setActive(e) {
    for (let t of this.items) {
      let n = t.dataset.id === e;
      (t.classList.toggle(`is-active`, n),
        t.setAttribute(`aria-current`, n ? `step` : `false`),
        n && requestAnimationFrame(() => this.reveal(t, this.revealed)));
    }
    this.revealed = !0;
  }
  complete(e) {
    if (this.done.has(e)) return !1;
    this.done.add(e);
    try {
      localStorage.setItem(
        `learn-arduino:done`,
        JSON.stringify([...this.done]),
      );
    } catch {}
    return (this.paintDone(e), !0);
  }
  paintDone(e) {
    for (let t of this.items)
      (t.classList.toggle(`is-done`, this.done.has(t.dataset.id)),
        t.dataset.id === e &&
          (t.classList.remove(`just-done`),
          t.offsetWidth,
          t.classList.add(`just-done`)));
  }
};
export {
  Oe as thumbnailWidths,
  ke as lessonCardWidths,
  Ae as navigationIcon,
  je as LessonNavigation,
};
