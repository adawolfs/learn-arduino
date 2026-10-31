// GENERATED from the fresh immutable deployment. Edit the recovery recipe, not this file.
var Pe = class {
  constructor(e, { onTurn: t, onZoom: n, onReset: r, onToggle: i }) {
    ((this.root = e),
      (this.needle = e.querySelector(`.compass-needle`)),
      (this.resetBtn = e.querySelector(`[data-view="reset"]`)),
      e
        .querySelector(`[data-view="left"]`)
        .addEventListener(`click`, () => t(-1)),
      e
        .querySelector(`[data-view="right"]`)
        .addEventListener(`click`, () => t(1)),
      e
        .querySelector(`[data-view="out"]`)
        .addEventListener(`click`, () => n(1 / 1.35)),
      e
        .querySelector(`[data-view="in"]`)
        .addEventListener(`click`, () => n(1.35)),
      this.resetBtn.addEventListener(`click`, () => r()),
      (this.toggles = {}));
    for (let t of e.querySelectorAll(`button.toggle`))
      ((this.toggles[t.dataset.view] = t),
        t.addEventListener(`click`, () =>
          i?.(t.dataset.view, t.getAttribute(`aria-pressed`) !== `true`),
        ));
    this.hint = e.querySelector(`.view-hint`);
  }
  startHint() {
    this.hintTimer ||
      this.hint?.classList.contains(`is-gone`) ||
      (this.hintTimer = setTimeout(() => this.dismissHint(), 9e3));
  }
  dismissHint() {
    (clearTimeout(this.hintTimer), this.hint?.classList.add(`is-gone`));
  }
  setToggle(e, t) {
    let n = this.toggles[e];
    n &&
      (n.setAttribute(`aria-pressed`, String(t)),
      n.classList.toggle(`is-on`, t));
  }
  update(e, t) {
    ((this.needle.style.transform = `rotate(${-e}deg)`),
      this.root.classList.toggle(`is-away`, !t));
  }
};
export { Pe as ViewControls };
