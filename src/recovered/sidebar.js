// GENERATED from the fresh immutable deployment. Edit the recovery recipe, not this file.
import { n, a as e } from "./localization.js";
import { renderIcon as b } from "./icons.js";
function Me(e) {
  try {
    let t = new Intl.DisplayNames([n], {
      type: `language`,
    }).of(e);
    return t ? t[0].toLocaleUpperCase(n) + t.slice(1) : ``;
  } catch {
    return ``;
  }
}
var Ne = class {
  constructor(e, t, n) {
    ((this.root = e), (this.flyout = t), (this.api = n), (this.open = null));
    let { languages: r, current: i } = n.language(),
      a = e.querySelector(`[data-nav="language"]`);
    if (a) {
      let e = r.find((e) => e.code === i);
      ((a.querySelector(`.side-label`).textContent = e?.short ?? e?.name ?? ``),
        (a.querySelector(`.side-code`).textContent = i.toUpperCase()));
    }
    ((this.toggleBtn = e.querySelector(`.side-toggle`)),
      this.toggleBtn.addEventListener(`click`, () =>
        this.setExpanded(!e.classList.contains(`is-open`)),
      ));
    for (let t of e.querySelectorAll(`[data-nav]`))
      t.addEventListener(`click`, (e) => {
        (e.preventDefault(), this.act(t.dataset.nav, t));
      });
    document.addEventListener(`pointerdown`, (e) => {
      this.open &&
        (e.target.closest(`.flyout`) ||
          e.target.closest(`[data-nav]`) ||
          this.close());
    });
  }
  setExpanded(t) {
    (this.root.classList.toggle(`is-open`, t),
      this.toggleBtn.setAttribute(`aria-expanded`, String(t)),
      this.toggleBtn.setAttribute(
        `aria-label`,
        e(t ? `Collapse sidebar` : `Expand sidebar`),
      ),
      this.flyout.classList.toggle(`beside-open`, t));
  }
  act(e, t) {
    e === `home`
      ? (this.close(), this.api.home())
      : e === `run`
        ? (this.close(), this.api.toggleRun())
        : this.open === e
          ? this.close()
          : this.show(e, t);
  }
  setActive(e, t) {
    this.root
      .querySelector(`[data-nav="${e}"]`)
      ?.parentElement.classList.toggle(`is-on`, t);
  }
  close() {
    this.open &&
      (this.setActive(this.open, !1),
      (this.open = null),
      this.flyout.classList.remove(`is-open`));
  }
  refresh() {
    this.open && this.show(this.open, null, !0);
  }
  show(e, t, n = !1) {
    (this.open && this.open !== e && this.setActive(this.open, !1),
      (this.open = e),
      this.setActive(e, !0));
    let r = this.flyout;
    ((r.dataset.kind = e),
      (r.innerHTML = this[`render_${e}`]()),
      t &&
        r.style.setProperty(
          `--top`,
          `${Math.max(40, Math.min(t.parentElement.offsetTop - 6, this.root.offsetHeight - r.offsetHeight - 16))}px`,
        ),
      this.bind(e),
      n || (r.classList.remove(`is-open`), r.offsetWidth),
      r.classList.add(`is-open`));
  }
  render_lessons() {
    let { lessons: t, current: n, done: r } = this.api.state();
    return `
      <header><h2>${e(`Lessons`)}</h2><span>${e(`{done}/{total} done`, {
        done: r.size,
        total: t.length,
      })}</span></header>
      <ol class="fly-list">${t
        .map(
          (e, t) => `
        <li><button data-lesson="${e.id}" class="${e.id === n ? `is-current` : ``}">
          <span class="fly-num">${r.has(e.id) ? b(`check`) : t + 1}</span>
          <span class="fly-text"><b>${e.title}</b><small>${e.heading}</small></span>
        </button></li>`,
        )
        .join(``)}</ol>`;
  }
  render_parts() {
    let t = this.api.parts();
    return `
      <header><h2>${e(`Components`)}</h2><span>${e(`{n} in view`, {
        n: t.length,
      })}</span></header>
      <ul class="fly-list">${t
        .map(
          (e, t) => `
        <li><button data-part="${t}">
          <span class="fly-num">${b(`focus`)}</span>
          <span class="fly-text"><b>${e.name}</b><small>${e.desc ?? ``}</small></span>
        </button></li>`,
        )
        .join(``)}</ul>`;
  }
  render_settings() {
    let t = this.api.settings(),
      n = (e, n, r) => `
      <li><label class="switch">
        <span class="fly-text"><b>${n}</b><small>${r}</small></span>
        <input type="checkbox" data-setting="${e}" ${t[e] ? `checked` : ``} />
        <span class="switch-track"><span></span></span>
      </label></li>`,
      { languages: r, current: i } = this.api.language();
    return `
      <header><h2>${e(`Settings`)}</h2></header>
      <ul class="fly-list">
        <li class="fly-lang"><label>
          <span class="fly-text"><b>${e(`Language`)}</b><small>${e(`Lessons, labels and code comments`)}</small></span>
          <select data-language aria-label="${e(`Language`)}">${r.map((e) => `<option value="${e.code}"${e.code === i ? ` selected` : ``}>${e.name}</option>`).join(``)}</select>
        </label></li>
        ${n(`labels`, e(`Callout labels`), e(`Cards and pointers around the 3D view`))}
        ${n(`flow`, e(`Current flow`), e(`Moving dots and HIGH / LOW on the wires while a sketch runs`))}
        ${n(`grid`, e(`Floor grid`), e(`The faint grid under the board`))}
        ${n(`autoRotate`, e(`Turntable`), e(`Turn a quarter every few seconds when idle`))}
        ${n(`sound`, e(`Sound`), e(`Let the buzzer play out loud`))}
        ${n(`reducedMotion`, e(`Reduce motion`), e(`Near-instant transitions`))}
      </ul>
      <button class="fly-reset" data-reset>${e(`Reset progress`)}</button>`;
  }
  render_language() {
    let { languages: t, current: n } = this.api.language();
    return `
      <header><h2>${e(`Language`)}</h2></header>
      <ul class="fly-list">${t
        .map((e) => {
          let t = Me(e.tag ?? e.code);
          return `
        <li><button data-lang="${e.code}" class="${e.code === n ? `is-current` : ``}"${e.code === n ? ` aria-current="true"` : ``}>
          <span class="fly-num">${e.code === n ? b(`check`) : e.code.toUpperCase()}</span>
          <span class="fly-text"><b lang="${e.tag ?? e.code}">${e.name}</b>${t && t !== e.name ? `<small>${t}</small>` : ``}</span>
        </button></li>`;
        })
        .join(``)}</ul>`;
  }
  bind(e) {
    let t = this.flyout;
    if (
      (e === `lessons` &&
        t.querySelectorAll(`[data-lesson]`).forEach((e) =>
          e.addEventListener(`click`, () => {
            (this.close(), this.api.selectLesson(e.dataset.lesson));
          }),
        ),
      e === `parts`)
    ) {
      let e = this.api.parts();
      t.querySelectorAll(`[data-part]`).forEach((t) =>
        t.addEventListener(`click`, () =>
          this.api.focusPart(e[Number(t.dataset.part)]),
        ),
      );
    }
    (e === `settings` &&
      (t
        .querySelectorAll(`[data-setting]`)
        .forEach((e) =>
          e.addEventListener(`change`, () =>
            this.api.setSetting(e.dataset.setting, e.checked),
          ),
        ),
      t
        .querySelector(`[data-language]`)
        .addEventListener(`change`, (e) =>
          this.api.setLanguage(e.target.value),
        ),
      t.querySelector(`[data-reset]`).addEventListener(`click`, () => {
        (this.api.resetProgress(), this.refresh());
      })),
      e === `language` &&
        t.querySelectorAll(`[data-lang]`).forEach((e) =>
          e.addEventListener(`click`, () => {
            (this.close(), this.api.setLanguage(e.dataset.lang));
          }),
        ));
  }
};
export { Me as languageName, Ne as Sidebar };
