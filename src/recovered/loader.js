// GENERATED from the fresh immutable deployment. Edit the recovery recipe, not this file.
import { a as e } from "./localization.js";
var Ge = class {
  constructor(e) {
    ((this.root = e),
      (this.fill = e?.querySelector(`.loader-fill`)),
      (this.label = e?.querySelector(`.loader-step`)),
      (this.value = 0),
      (this.closed = !e));
  }
  step(e, t) {
    this.closed ||
      (e && (this.label.textContent = e),
      t > this.value &&
        ((this.value = t), (this.fill.style.transform = `scaleX(${t})`)));
  }
  done() {
    return this.closed
      ? Promise.resolve()
      : ((this.closed = !0),
        this.step(e(`Ready`), 1),
        document.documentElement.classList.remove(`is-loading`),
        this.root.classList.add(`is-done`),
        new Promise((e) => {
          let t = () => {
              (this.root.remove(), e());
            },
            n =
              parseFloat(getComputedStyle(this.root).transitionDuration) *
                1e3 || 0;
          setTimeout(t, n + 50);
        }));
  }
  fail(e) {
    this.root &&
      ((this.closed = !0),
      this.root.classList.add(`is-failed`),
      (this.label.textContent = e));
  }
};
export { Ge as LoadingScreen };
