// GENERATED from the fresh immutable deployment. Edit the recovery recipe, not this file.
import {
  resolveOptionCode as v,
  interpolateSketch as te,
} from "../sketch/template.js";
import { highlightSketch as Ee } from "./sketch-highlight.js";
import { renderIcon as b } from "./icons.js";
import { a as e } from "./localization.js";
var w = 92;
var De = class {
  constructor(e, { onRun: t, onStop: n, onParam: r, onExpand: i }) {
    ((this.root = e),
      (this.code = e.querySelector(`code`)),
      (this.pre = e.querySelector(`pre`)),
      (this.copyBtn = e.querySelector(`.btn-copy`)),
      (this.expandBtn = e.querySelector(`.btn-expand`)),
      (this.runBtn = e.querySelector(`.btn-run`)),
      (this.consoleEl = e.querySelector(`.console`)),
      (this.lines = e.querySelector(`.console-lines`)),
      (this.status = e.querySelector(`.console-status`)),
      (this.state = `idle`),
      (this.onRun = t),
      (this.onStop = n),
      (this.onExpand = i),
      this.copyBtn.addEventListener(`click`, () => this.copy()),
      this.expandBtn.addEventListener(`click`, () => this.toggleExpanded()),
      this.runBtn.addEventListener(`click`, () => this.toggle()),
      e
        .querySelector(`.console-close`)
        .addEventListener(`click`, () => this.onStop()),
      (this.wrap = e.querySelector(`.code-wrap`)),
      (this.grip = e.querySelector(`.console-grip`)),
      this.resizable(),
      this.code.addEventListener(`click`, (e) => {
        let t = e.target.closest(`.param`);
        t && r?.(t.dataset.param);
      }));
  }
  setLesson(e, t) {
    ((this.lesson = e),
      (this.values = t),
      (this.marked = []),
      this.pre.classList.add(`is-out`),
      clearTimeout(this.swapTimer),
      (this.swapTimer = setTimeout(() => {
        (this.paint(),
          (this.pre.scrollTop = 0),
          this.pre.classList.remove(`is-out`));
      }, 180)),
      this.setState(`idle`));
  }
  paint() {
    let e = v(this.lesson, this.values);
    if (((this.code.innerHTML = Ee(e, this.values)), this.marked?.length))
      for (let e of this.code.querySelectorAll(`.param`))
        e.classList.toggle(`is-marked`, this.marked.includes(e.dataset.param));
    return (this.markTrace(!1), e);
  }
  trace(e) {
    ((this.traced = e), this.markTrace(!0));
  }
  markTrace(e) {
    let t = [...this.code.querySelectorAll(`.line`)];
    for (let e of t) e.classList.remove(`is-running`);
    if (!this.traced) return;
    let { text: n, nth: r } = this.traced,
      i = t.filter((e) => e.textContent.replace(/^\d+/, ``).includes(n)),
      a = i[Math.min(r, i.length - 1)];
    a &&
      (a.classList.add(`is-running`), e && this.reveal(a, this.consoleCover()));
  }
  resizable() {
    let e = `console-height`,
      t = null;
    try {
      t = Number(localStorage.getItem(e)) || null;
    } catch {}
    ((this.consoleH = t ?? w), this.setConsoleHeight(this.consoleH, !1));
    let n = () => {
        try {
          localStorage.setItem(e, String(Math.round(this.consoleH)));
        } catch {}
      },
      r = this.consoleEl.querySelector(`.console-head`),
      i = null,
      a = (e) => {
        e.button !== 0 ||
          e.target.closest(`button`) ||
          document.documentElement.classList.contains(`compact`) ||
          (e.preventDefault(),
          (i = {
            y: e.clientY,
            h: this.consoleEl.offsetHeight,
            target: e.currentTarget,
            id: e.pointerId,
          }),
          i.target.setPointerCapture(e.pointerId),
          this.root.classList.add(`is-sizing`));
      },
      o = (e) => {
        i &&
          e.pointerId === i.id &&
          this.setConsoleHeight(i.h + (i.y - e.clientY));
      },
      s = (e) => {
        i &&
          e.pointerId === i.id &&
          ((i = null), this.root.classList.remove(`is-sizing`), n());
      };
    for (let e of [this.grip, r])
      (e.addEventListener(`pointerdown`, a),
        e.addEventListener(`pointermove`, o),
        e.addEventListener(`pointerup`, s),
        e.addEventListener(`pointercancel`, s));
    (this.grip.addEventListener(`dblclick`, () => {
      (this.setConsoleHeight(w), n());
    }),
      this.grip.addEventListener(`keydown`, (e) => {
        let t = {
          ArrowUp: 16,
          ArrowDown: -16,
          PageUp: 64,
          PageDown: -64,
        }[e.key];
        t &&
          (e.preventDefault(),
          e.stopPropagation(),
          this.setConsoleHeight(this.consoleEl.offsetHeight + t),
          n());
      }),
      new ResizeObserver(() =>
        this.setConsoleHeight(this.consoleH, !1),
      ).observe(this.wrap));
  }
  setConsoleHeight(e, t = !0) {
    let n = this.wrap.clientHeight - 48;
    t && (this.consoleH = Math.max(w, Math.min(e, n)));
    let r = document.documentElement.classList.contains(`compact`)
      ? w
      : Math.round(Math.max(Math.min(w, n), Math.min(this.consoleH, n)));
    (this.root.style.setProperty(`--console-h`, `${r}px`),
      this.grip.setAttribute(`aria-valuemin`, String(w)),
      this.grip.setAttribute(
        `aria-valuemax`,
        String(Math.max(w, Math.round(n))),
      ),
      this.grip.setAttribute(`aria-valuenow`, String(r)),
      t && this.traced && this.markTrace(!0));
  }
  consoleCover() {
    return this.consoleEl.classList.contains(`is-open`)
      ? Math.max(
          0,
          this.pre.offsetTop + this.pre.offsetHeight - this.consoleEl.offsetTop,
        )
      : 0;
  }
  update(e, t) {
    if (!this.lesson || this.pre.classList.contains(`is-out`)) return;
    this.values = e;
    let n = [...this.code.querySelectorAll(`.line`)].map((e) =>
      e.textContent.replace(/^\d+/, ``),
    );
    this.paint();
    let r = [...this.code.querySelectorAll(`.line`)],
      i = new Set(n),
      a = null;
    for (let e of r)
      i.has(e.textContent.replace(/^\d+/, ``)) ||
        (e.classList.add(`is-new`), (a ??= e));
    let o = [...this.code.querySelectorAll(`.param`)].filter((e) =>
      [t].flat().includes(e.dataset.param),
    );
    for (let e of o) e.classList.add(`is-flash`);
    this.reveal(o[0] ?? a);
  }
  mark(e) {
    for (let t of this.code.querySelectorAll(`.param`))
      t.classList.toggle(`is-marked`, e.includes(t.dataset.param));
    this.marked = e;
    let t = e.find((e) => this.code.querySelector(`.param[data-param="${e}"]`));
    t && this.reveal(this.code.querySelector(`.param[data-param="${t}"]`));
  }
  reveal(e, t = 0) {
    if (!e) return;
    let n = e.closest(`.line`) ?? e,
      r = n.offsetTop,
      { scrollTop: i } = this.pre,
      a = this.pre.clientHeight - t;
    r < i + 8
      ? this.pre.scrollTo({
          top: Math.max(0, r - 30),
          behavior: `smooth`,
        })
      : r + n.offsetHeight > i + a - 8 &&
        this.pre.scrollTo({
          top: r + n.offsetHeight - a + 30,
          behavior: `smooth`,
        });
  }
  toggle() {
    this.state === `idle` ? this.onRun() : this.onStop();
  }
  get expanded() {
    return this.root.classList.contains(`is-expanded`);
  }
  toggleExpanded(t) {
    let n = t ?? !this.expanded;
    n !== this.expanded &&
      (this.root.classList.toggle(`is-expanded`, n),
      (this.expandBtn.innerHTML = b(n ? `collapse` : `expand`)),
      this.expandBtn.setAttribute(
        `aria-label`,
        e(n ? `Collapse code` : `Expand code`),
      ),
      (this.expandBtn.title = e(n ? `Collapse code` : `Expand code`)),
      this.expandBtn.setAttribute(`aria-expanded`, String(n)),
      this.onExpand?.(n));
  }
  setState(t) {
    ((this.state = t), (this.root.dataset.state = t));
    let n = t !== `idle`;
    ((this.runBtn.innerHTML = b(n ? `stop` : `play`)),
      this.runBtn.setAttribute(
        `aria-label`,
        e(n ? `Stop sketch` : `Run sketch`),
      ),
      this.runBtn.classList.toggle(`is-busy`, t === `uploading`),
      this.consoleEl.classList.toggle(`is-open`, n),
      (this.grip.tabIndex = n ? 0 : -1),
      (this.status.textContent = e(
        t === `uploading`
          ? `Uploading`
          : t === `running`
            ? `Running`
            : `Stopped`,
      )),
      t === `uploading` && (this.lines.innerHTML = ``));
  }
  log(e) {
    let t = document.createElement(`div`);
    for (
      t.textContent = e, this.lines.append(t);
      this.lines.children.length > 40;
    )
      this.lines.firstChild.remove();
    this.lines.scrollTop = this.lines.scrollHeight;
  }
  async copy() {
    let e = this.lesson
      ? te(this.lesson, this.values ?? {}).replace(/[\u200e\u200f\u2060]/g, ``)
      : ``;
    try {
      await navigator.clipboard.writeText(e);
    } catch {
      let t = document.createElement(`textarea`);
      ((t.value = e),
        document.body.append(t),
        t.select(),
        document.execCommand(`copy`),
        t.remove());
    }
    ((this.copyBtn.innerHTML = b(`check`)),
      this.copyBtn.classList.add(`is-done`),
      clearTimeout(this.copyTimer),
      (this.copyTimer = setTimeout(() => {
        ((this.copyBtn.innerHTML = b(`copy`)),
          this.copyBtn.classList.remove(`is-done`));
      }, 1600)));
  }
};
export { w as serialMinimumHeight, De as CodePanel };
