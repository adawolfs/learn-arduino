// GENERATED from the fresh immutable deployment. Edit the recovery recipe, not this file.
import { a as e } from "./localization.js";
import { renderIcon as b } from "./icons.js";
var S = [`overview`, `pinout`, `example`, `specs`];
function ve(t, n) {
  switch (n) {
    case `pinout`:
      return `
        <h2>${e(`Pinout`)}</h2>
        <p class="sub">${t.id === `board` ? e(`How the Uno’s headers are grouped.`) : e(`How this circuit is wired.`)}</p>
        <table class="pin-table">
          <thead><tr><th>${e(`Pin`)}</th><th>${e(`Connects to`)}</th><th>${e(`What it does`)}</th></tr></thead>
          <tbody>${t.pinout.map(([e, t, n, r]) => `<tr><td><span class="wire-dot" style="--c:${r}"></span><code>${e}</code></td><td>${t}</td><td>${n}</td></tr>`).join(``)}</tbody>
        </table>`;
    case `example`:
      return `
        <h2>${e(`How the code works`)}</h2>
        <ol class="steps">${t.example.map((e) => `<li>${e}</li>`).join(``)}</ol>`;
    case `specs`:
      return `
        <h2>${e(`Specifications`)}</h2>
        <dl class="spec-grid">${t.specs.map(([e, t]) => `<div><dt>${e}</dt><dd>${t}</dd></div>`).join(``)}</dl>`;
    default:
      return `
        <h2>${t.heading}</h2>
        <p class="lede">${t.lede}</p>
        <ul class="features">${t.features.map(([e, t]) => `<li><span class="feature-icon">${b(e)}</span><span>${t}</span></li>`).join(``)}</ul>`;
  }
}
var ye = class {
  constructor(e, { onExpand: t } = {}) {
    ((this.root = e),
      (this.onExpand = t),
      (this.tabs = [...e.querySelectorAll(`[role="tab"]`)]),
      (this.content = e.querySelector(`.info-content`)),
      (this.expandBtn = e.querySelector(`.expand`)),
      (this.tab = `overview`),
      (this.lesson = null),
      this.tabs.forEach((e, t) => {
        ((e.dataset.tab = S[t]),
          e.addEventListener(`click`, () => this.setTab(S[t])),
          e.addEventListener(`keydown`, (e) => {
            if (e.key !== `ArrowRight` && e.key !== `ArrowLeft`) return;
            let n =
              (t + (e.key === `ArrowRight` ? 1 : S.length - 1)) % S.length;
            (this.setTab(S[n]), this.tabs[n].focus());
          }));
      }),
      this.expandBtn.addEventListener(`click`, () => this.toggleExpanded()));
  }
  setLesson(e) {
    ((this.lesson = e), this.paint(!0));
  }
  setTab(e) {
    e !== this.tab && ((this.tab = e), this.paint(!1));
  }
  paint(e) {
    this.tabs.forEach((e) => {
      let t = e.dataset.tab === this.tab;
      (e.classList.toggle(`is-active`, t),
        e.setAttribute(`aria-selected`, String(t)),
        (e.tabIndex = t ? 0 : -1));
    });
    let t = this.content;
    (t.classList.remove(`is-in`),
      t.classList.add(`is-out`),
      clearTimeout(this.timer),
      (this.timer = setTimeout(
        () => {
          ((t.innerHTML = ve(this.lesson, this.tab)),
            (t.scrollTop = 0),
            t.classList.remove(`is-out`),
            t.offsetWidth,
            t.classList.add(`is-in`));
        },
        e ? 220 : 120,
      )));
  }
  get expanded() {
    return this.root.classList.contains(`is-expanded`);
  }
  toggleExpanded(t) {
    let n = t ?? !this.expanded;
    if (n === this.expanded) return;
    (this.root.classList.toggle(`is-expanded`, n),
      (this.expandBtn.innerHTML = b(n ? `collapse` : `expand`)),
      this.expandBtn.setAttribute(
        `aria-label`,
        e(n ? `Collapse panel` : `Expand panel`),
      ));
    let r = document.querySelector(`.code-card`);
    (r?.classList.toggle(`is-covered`, n),
      r && (r.inert = n),
      this.onExpand?.(n));
  }
  setCovered(e) {
    (this.root.classList.toggle(`is-covered`, e), (this.root.inert = e));
  }
};
export { S as infoTabs, ve as renderInfoTab, ye as LessonInfo };
