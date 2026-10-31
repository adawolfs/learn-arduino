// GENERATED from the fresh immutable deployment. Edit the recovery recipe, not this file.
import {
  boardSpecifications as l,
  ledColourControl as u,
  obstacleControls as d,
  colourPresets as f,
  noteFrequencies as p,
  pianoMelodies as m,
  formatArrayRows as h,
  lessons as ee,
} from "./lesson-data.js";
import { powerPins as ot, pinSignal as A } from "./signals.js";
import {
  audioContext as N,
  continuousVoice as P,
  unlockAudio as yt,
  playTone as bt,
  continuousTone as xt,
  stopTone as St,
} from "./audio.js";
import { iconPaths as fe, renderIcon as b } from "./icons.js";
import {
  svgNamespace as pe,
  ringMargin as me,
  createSvg as x,
  calloutAnchor as he,
  leaderApproach as ge,
  CalloutLayer as _e,
} from "./callouts.js";
import {
  infoTabs as S,
  renderInfoTab as ve,
  LessonInfo as ye,
} from "./lesson-info.js";
import {
  keywords as be,
  constants as xe,
  tokenMarker as Se,
  tokenPattern as Ce,
  rtlPattern as we,
  escapeHtml as C,
  highlightLine as Te,
  highlightSketch as Ee,
} from "./sketch-highlight.js";
import { serialMinimumHeight as w, CodePanel as De } from "./code-panel.js";
import {
  thumbnailWidths as Oe,
  lessonCardWidths as ke,
  navigationIcon as Ae,
  LessonNavigation as je,
} from "./lesson-navigation.js";
import {
  svgNamespace as Be,
  inspectorMargin as Ve,
  interactionHints as He,
  formatParameter as Ue,
  ComponentInspector as We,
} from "./inspector.js";
import { languageName as Me, Sidebar as Ne } from "./sidebar.js";
import { ViewControls as Pe } from "./view-controls.js";
import {
  partColours as Fe,
  fallbackColours as Ie,
  mapWidth as Le,
  mapHeight as Re,
  Minimap as ze,
} from "./minimap.js";
import { labelFractions as Ke, SignalOverlay as qe } from "./signal-overlay.js";
import { LoadingScreen as Ge } from "./loader.js";
import {
  circuits as at,
  symbolWidths as ct,
  rowGap as j,
  wireGap as lt,
  boardWidth as ut,
  leftMargin as dt,
  rightMargin as ft,
  pwmPins as pt,
  resolveValue as mt,
  escapeAttribute as M,
  pinLabel as ht,
  renderSymbol as gt,
  renderCircuit as _t,
  signalStrength as st,
  Schematic as vt,
  T,
  E,
  D,
  it,
  rt,
  $e,
  Je,
  O,
  tt,
  k,
  nt,
  Ze,
  Ye,
  et,
  Xe,
  Qe,
} from "./schematic.js";
import {
  createDefaultParameters as _,
  resolveOptionCode as v,
  interpolateSketch as te,
} from "../sketch/template.js";
const __vite__mapDeps = () => [];
import {
  a as e,
  i as t,
  n,
  o as r,
  r as i,
  s as a,
  t as o,
} from "./localization.js";
var s = Object.defineProperty,
  c = (e, t) => {
    let n = {};
    for (var r in e)
      s(n, r, {
        get: e[r],
        enumerable: !0,
      });
    return (
      t ||
        s(n, Symbol.toStringTag, {
          value: `Module`,
        }),
      n
    );
  };
var g = i(ee);
var ne = 1672,
  re = 941,
  ie = [
    {
      a: `tl`,
      p: [
        [90, 410],
        [90, 104],
        [99, 95],
        [624, 95],
        [655, 63],
        [736, 63],
        [771, 28],
        [884, 28],
        [912, 0],
      ],
    },
    {
      a: `tl`,
      p: [
        [627, 88],
        [737, 88],
      ],
      end: `circle`,
    },
    {
      a: `tl`,
      p: [
        [750, 82],
        [785, 47],
        [893, 47],
        [940, 0],
      ],
    },
    {
      a: `tl`,
      p: [
        [108, 151],
        [108, 118],
        [116, 110],
        [540, 110],
        [552, 98],
      ],
    },
    {
      a: `tl`,
      p: [
        [60, 0],
        [60, 40],
        [76, 56],
      ],
    },
    {
      a: `tl`,
      p: [
        [90, 410],
        [113, 433],
        [113, 455],
      ],
      end: `circle`,
    },
    {
      a: `tl`,
      p: [
        [100, 405],
        [100, 395],
      ],
      start: `circle`,
    },
    {
      a: `tl`,
      p: [
        [136, 300],
        [136, 525],
        [96, 565],
        [96, 610],
        [72, 634],
      ],
    },
    {
      a: `tl`,
      p: [
        [112, 382],
        [124, 394],
        [124, 402],
      ],
      start: `circle`,
    },
    {
      a: `tl`,
      p: [
        [108, 492],
        [108, 520],
        [81, 547],
        [81, 600],
        [72, 609],
      ],
    },
    {
      a: `tl`,
      p: [
        [118, 585],
        [118, 545],
        [150, 513],
        [150, 470],
      ],
      end: `circle`,
    },
    {
      a: `bl`,
      p: [
        [0, 735],
        [64, 671],
        [64, 610],
        [72, 602],
      ],
    },
    {
      a: `bl`,
      p: [
        [0, 780],
        [30, 750],
        [30, 700],
        [45, 685],
      ],
    },
    {
      a: `bl`,
      p: [
        [0, 868],
        [72, 796],
      ],
    },
    {
      a: `bl`,
      p: [
        [106, 735],
        [143, 760],
        [226, 760],
        [266, 800],
        [1424, 800],
      ],
    },
    {
      a: `bl`,
      p: [
        [1436, 800],
        [1536, 800],
        [1596, 860],
        [1672, 860],
      ],
      start: `circle`,
    },
    {
      a: `bl`,
      p: [
        [200, 760],
        [218, 742],
        [218, 720],
      ],
      end: `circle`,
    },
    {
      a: `br`,
      p: [
        [1590, 924],
        [1622, 892],
        [1672, 892],
      ],
      start: `circle`,
    },
    {
      a: `br`,
      p: [
        [1636, 880],
        [1636, 870],
        [1652, 854],
        [1672, 854],
      ],
      start: `circle`,
    },
    {
      a: `br`,
      p: [
        [1592, 830],
        [1556, 830],
        [1536, 850],
        [1536, 941],
      ],
    },
    {
      a: `br`,
      p: [
        [1500, 941],
        [1500, 912],
        [1520, 892],
      ],
    },
    {
      a: `br`,
      p: [
        [1652, 941],
        [1652, 924],
        [1640, 912],
      ],
      end: `circle`,
    },
    {
      a: `tr`,
      p: [
        [1068, 81],
        [1086, 81],
        [1138, 19],
        [1150, 19],
      ],
      start: `circle`,
    },
    {
      a: `tr`,
      p: [
        [1620, 74],
        [1640, 94],
        [1640, 104],
        [1660, 124],
        [1660, 262],
      ],
      end: `circle`,
    },
    {
      a: `tr`,
      p: [
        [1650, 64],
        [1672, 86],
      ],
    },
    {
      a: `tr`,
      p: [
        [1590, 104],
        [1600, 114],
        [1600, 160],
      ],
    },
    {
      a: `tr`,
      p: [
        [1636, 84],
        [1636, 92],
        [1652, 108],
        [1652, 112],
      ],
    },
    {
      a: `tr`,
      p: [
        [1595, 104],
        [1595, 108],
        [1580, 108],
        [1582, 104],
      ],
    },
    {
      a: `tr`,
      p: [
        [1672, 300],
        [1666, 306],
        [1666, 470],
      ],
    },
    {
      a: `br`,
      p: [
        [1652, 520],
        [1652, 790],
        [1630, 812],
      ],
    },
  ],
  ae = [
    {
      a: `tl`,
      s: [
        [925, 37, 11, 0.95],
        [1056, 22, 9, 0.45],
        [1068, 28, 7, 0.35],
        [1076, 22, 14, 0.75],
        [1063, 36, 13, 0.6],
        [1083, 36, 8, 0.5],
      ],
    },
    {
      a: `tr`,
      s: [
        [1612, 22, 13, 0.6],
        [1628, 20, 15, 0.8],
        [1645, 22, 10, 0.5],
        [1614, 36, 9, 0.45],
        [1630, 37, 12, 0.7],
        [1622, 49, 10, 0.55],
        [1640, 52, 9, 0.75],
        [1631, 64, 8, 0.85],
      ],
    },
    {
      a: `tl`,
      s: [
        [214, 350, 8, 0.45],
        [100, 678, 11, 0.6],
        [87, 694, 13, 0.55],
        [104, 698, 8, 0.4],
        [98, 712, 8, 0.45],
      ],
    },
    {
      a: `bl`,
      s: [
        [243, 760, 9, 0.5],
        [36, 815, 11, 0.6],
        [27, 830, 9, 0.5],
        [44, 830, 8, 0.45],
        [22, 844, 8, 0.4],
        [16, 912, 9, 0.5],
      ],
    },
    {
      a: `br`,
      s: [
        [1625, 808, 12, 0.6],
        [1640, 818, 13, 0.8],
        [1626, 824, 10, 0.55],
        [1652, 812, 9, 0.5],
        [1645, 832, 9, 0.7],
        [1510, 919, 8, 0.6],
      ],
    },
  ],
  y = `http://www.w3.org/2000/svg`;
function oe(e, t, n, r, i) {
  return [e.includes(`r`) ? t + r : t, e.includes(`b`) ? n + i : n];
}
function se(e, t, n) {
  let r = t - ne,
    i = n - re;
  (e.setAttribute(`viewBox`, `0 0 ${t} ${n}`), e.replaceChildren());
  let a = document.createElementNS(y, `g`),
    o = document.createElementNS(y, `g`),
    s = document.createElementNS(y, `g`);
  for (let e of ie) {
    let t = e.p.map(([t, n]) => oe(e.a, t, n, r, i));
    if (t.length > 1 && (t[0][0] !== t[1][0] || t[0][1] !== t[1][1])) {
      let e = document.createElementNS(y, `path`);
      (e.setAttribute(`d`, `M` + t.map((e) => e.join(` `)).join(` L`)),
        a.append(e));
    }
    for (let [n, r, i] of [
      [`start`, t[0], t[1]],
      [`end`, t[t.length - 1], t[t.length - 2]],
    ]) {
      if (e[n] !== `circle`) continue;
      let t = r[0] - i[0],
        a = r[1] - i[1],
        s = Math.hypot(t, a) || 1,
        c = document.createElementNS(y, `circle`);
      (c.setAttribute(`cx`, r[0] + (t / s) * 5.5),
        c.setAttribute(`cy`, r[1] + (a / s) * 5.5),
        c.setAttribute(`r`, 5.5),
        o.append(c));
    }
  }
  for (let e of ae)
    for (let [t, n, a, o] of e.s) {
      let [c, l] = oe(e.a, t, n, r, i),
        u = document.createElementNS(y, `rect`);
      (u.setAttribute(`x`, c),
        u.setAttribute(`y`, l),
        u.setAttribute(`width`, a),
        u.setAttribute(`height`, a),
        u.setAttribute(`rx`, 1),
        u.setAttribute(`opacity`, o),
        u.setAttribute(`class`, `pix`),
        s.append(u));
    }
  e.append(a, o, s);
}
var ce = (e) => String(e).padStart(2, `0`),
  le = new Set([`ko`]);
function ue(e) {
  try {
    return le.has(n)
      ? new Intl.DateTimeFormat(n, {
          year: `numeric`,
          month: `2-digit`,
          day: `2-digit`,
        }).format(e)
      : new Intl.DateTimeFormat(n, {
          month: `short`,
          day: `2-digit`,
          year: `numeric`,
        })
          .format(e)
          .replace(/\./g, ``)
          .toLocaleUpperCase(n);
  } catch {
    return e.toDateString().toUpperCase();
  }
}
function de(e, t) {
  let n = () => {
    let n = new Date();
    ((e.textContent = ue(n)),
      (t.textContent = `${ce(n.getHours())}:${ce(n.getMinutes())}:${ce(n.getSeconds())}`));
  };
  (n(), setInterval(n, 1e3));
}
var Ct = c({}),
  wt = 1672,
  Tt = 941,
  Et = 0.8,
  Dt = 1280,
  Ot = 0.62,
  kt = {
    x: 10,
    y: 70,
  },
  At = 180 / Math.PI,
  F = (e) => document.querySelector(e);
r(document.body);
var I = F(`#app`),
  L = F(`#stage`),
  R = F(`#rig`),
  z = F(`#tip`),
  B = 1,
  V = !1,
  jt = !1,
  Mt = 0.85,
  Nt = g.find((e) => `#${e.id}` === location.hash),
  H = {
    lesson: Nt ?? g[0],
    running: `idle`,
    settings: Ft(),
    saved: Pt(`learn-arduino:values`, {}),
    values: {},
  };
H.values = qt(H.lesson);
function Pt(e, t) {
  try {
    return JSON.parse(localStorage.getItem(e) ?? `null`) ?? t;
  } catch {
    return t;
  }
}
function Ft() {
  let e = {
    labels: !0,
    grid: !0,
    autoRotate: !1,
    sound: !0,
    reducedMotion:
      window.matchMedia?.(`(prefers-reduced-motion: reduce)`).matches ?? !1,
    flow: !0,
    schematic: !1,
  };
  try {
    return {
      ...e,
      ...JSON.parse(localStorage.getItem(`learn-arduino:settings`) ?? `{}`),
    };
  } catch {
    return e;
  }
}
function It() {
  try {
    localStorage.setItem(`learn-arduino:settings`, JSON.stringify(H.settings));
  } catch {}
}
function Lt() {
  let e = document.documentElement.clientWidth || window.innerWidth,
    t = document.documentElement.clientHeight || window.innerHeight,
    n = Math.min(e / wt, t / Tt);
  if (
    (n < Et && (n = Math.min(e / Dt, t / Tt, Et)),
    (V = n < Ot || e / t < 0.95),
    document.documentElement.classList.toggle(`compact`, V),
    V)
  ) {
    ((B = 1),
      (I.style.width = ``),
      (I.style.height = ``),
      (I.style.transform = ``),
      Rt());
    return;
  }
  B = n;
  let r = e / B,
    i = t / B;
  ((I.style.width = `${r}px`),
    (I.style.height = `${i}px`),
    (I.style.transform = `scale(${B})`),
    se(F(`#traces`), r, i),
    Rt());
}
function Rt() {
  let e = F(`.side-lang`);
  if (!e) return;
  let t =
    !V &&
    F(`.credit-side`).offsetTop -
      (parseFloat(getComputedStyle(e).top) + e.offsetHeight) <
      24;
  e.classList.toggle(`is-cramped`, t);
}
(Lt(), de(F(`#clock-date`), F(`#clock-time`)));
var U = new ye(F(`.info-card`), {
    onExpand: (e) => e && G.toggleExpanded(!1),
  }),
  W = new je(F(`#lesson-list`), g, {
    onSelect: (e) => Q(e),
  }),
  G = new De(F(`.code-card`), {
    onRun: () => en(),
    onStop: () => tn(),
    onParam: (e) => Qt(e),
    onExpand: (e) => {
      (e && U.toggleExpanded(!1), U.setCovered(e));
    },
  }),
  K = null,
  zt = 300,
  Bt = null,
  Vt = 0,
  q = new We(F(`#inspector`), {
    svg: F(`#insp-lines`),
    onParam: (e, t) => Xt(e, t),
    onFocus: () => K?.selection && K.focusGroup(K.selection.group),
    onClose: () => K?.select(null),
    onRun: () => en(),
  }),
  J = new _e({
    rig: R,
    svg: F(`#leaders`),
    tags: F(`#tags`),
    onFocus: (e) => {
      K &&
        (e.anchor.startsWith(`part:`) && K.parts.has(e.anchor.slice(5))
          ? K.select(e.anchor.slice(5))
          : K.focusAnchor(e.anchor));
    },
  }),
  Ht = new ze(F(`#minimap`), {
    onMove: (e, t) => {
      if (!K) return;
      let n = K.controls;
      t
        ? (n.stopAnimation(),
          n.view.target.set(e.x, 0, e.z),
          n.clampTarget(),
          K.touch())
        : n.animateTo(
            {
              target: [e.x, 0, e.z],
            },
            {
              duration: 420,
            },
          );
    },
  }),
  Y = new Pe(F(`#viewbar`), {
    onTurn: (e) => K?.controls.turn(e),
    onZoom: (e) => K?.controls.zoomBy(e),
    onReset: () => K?.resetView(),
    onToggle: (e, t) => Kt(e, t),
  });
(Y.setToggle(`flow`, H.settings.flow),
  Y.setToggle(`schematic`, H.settings.schematic));
var Ut = new qe(F(`#signals`)),
  X = new vt(F(`#schematic`), {
    onHover: (e) => K?.hoverPart(e),
    onSelect: (e) => K?.select(e),
    onClose: () => Kt(`schematic`, !1),
  }),
  Wt = () => {},
  Z = new Ne(F(`.sidebar`), F(`#flyout`), {
    home: () => {
      (Q(g[0].id), K?.resetView());
    },
    toggleRun: () => (H.running === `idle` ? en() : tn()),
    state: () => ({
      lessons: g,
      current: H.lesson.id,
      done: W.done,
    }),
    selectLesson: (e) => Q(e),
    parts: () => nn(),
    focusPart: (e) => {
      e.group && K && (K.focusGroup(e.group), K.select(e.group));
    },
    settings: () => H.settings,
    setSetting: (e, t) => Kt(e, t),
    language: () => ({
      languages: o,
      current: n,
    }),
    setLanguage: (e) => t(e),
    resetProgress: () => {
      W.done.clear();
      try {
        localStorage.removeItem(`learn-arduino:done`);
      } catch {}
      (W.paintDone(), Gt());
    },
  });
document.addEventListener(`visibilitychange`, () => {
  document.hidden && St();
});
function Gt() {
  let e = W.done.size,
    t = g.length;
  ((F(`#progress-count`).textContent = `${e}/${t}`),
    (F(`#progress-fill`).style.width = `${(e / t) * 100}%`),
    F(`.progress-track`).setAttribute(`aria-valuenow`, String(e)),
    F(`.progress-track`).setAttribute(`aria-valuemax`, String(t)));
}
Gt();
function Kt(e, t) {
  ((H.settings[e] = t),
    It(),
    e === `labels` && J.setVisible(t),
    e === `grid` && K?.setGrid(t),
    e === `autoRotate` && K && (K.autoRotate = t),
    e === `flow` && (K?.setFlow(t), Y.setToggle(`flow`, t), Z.refresh()),
    e === `schematic` &&
      (X.setOpen(t),
      Y.setToggle(`schematic`, t),
      Wt({
        glide: !0,
      })),
    e === `reducedMotion` &&
      (K?.setReducedMotion(t),
      document.documentElement.classList.toggle(`reduce-motion`, t)));
}
function qt(e) {
  let t = _(e),
    n = H.saved[e.id] ?? {};
  for (let r of e.params ?? []) {
    if (!(r.key in n)) continue;
    let e = n[r.key];
    r.type === `range` && typeof e == `number`
      ? (t[r.key] = Math.min(r.max, Math.max(r.min, e)))
      : ((r.type === `toggle` && typeof e == `boolean`) ||
          r.options?.some((t) => t.value === e)) &&
        (t[r.key] = e);
  }
  return (e.constrain?.(t), t);
}
var Jt = 0;
function Yt() {
  ((H.saved[H.lesson.id] = {
    ...H.values,
  }),
    !Jt &&
      (Jt = setTimeout(() => {
        Jt = 0;
        try {
          localStorage.setItem(`learn-arduino:values`, JSON.stringify(H.saved));
        } catch {}
      }, 400)));
}
function Xt(e, t, { fromSim: n = !1 } = {}) {
  let r = H.lesson,
    i = r.params?.find((t) => t.key === e);
  if (!i) return;
  let a = H.values,
    o = t;
  if (
    (i.type === `range` && (o = Math.min(i.max, Math.max(i.min, Number(t)))),
    i.type === `toggle` && (o = !!t),
    a[e] === o)
  )
    return;
  let s = {
    ...a,
  };
  ((a[e] = o), r.constrain?.(a, e), K?.updateParams(a));
  let c = v(r, a),
    l = (e) => c.includes(`{{${e}}}`) || r.code.includes(`{{${e}.`),
    u = Object.keys(a).filter((e) => a[e] !== s[e] && l(e));
  (u.length && G.update(a, u),
    K?.selection && K.selection.group.userData.part !== q.sel?.info
      ? Zt()
      : q.sync(a),
    n || (Yt(), X.setValues(a)));
}
function Zt() {
  let e = K?.selection;
  if ((rn(null), !e)) {
    (q.close(), G.mark([]));
    return;
  }
  let t = e.id ? (H.lesson.params ?? []).filter((t) => t.part === e.id) : [],
    n = e.id ? K.parts.get(e.id)?.spec.interact : null,
    r = n ? (n.squeeze ? `squeeze` : n.type) : null;
  (q.open(
    {
      id: e.id,
      info: e.group.userData.part,
      interact: r,
      live: !r && t.length > 0,
    },
    t,
    H.values,
  ),
    G.mark(t.map((e) => e.key)),
    K.touch(),
    q.dock === `bottom` &&
      !K.controls.grab &&
      requestAnimationFrame(() => K.revealSelection(q.footprint)));
}
function Qt(e) {
  let t = H.lesson.params?.find((t) => t.key === e);
  t && K && (K.select(t.part), q.pulse(e));
}
function Q(e) {
  let t = g.find((t) => t.id === e) ?? g[0];
  t === H.lesson
    ? K?.resetView()
    : (tn(),
      (H.lesson = t),
      (H.values = qt(t)),
      W.setActive(t.id),
      U.setLesson(t),
      G.setLesson(t, H.values),
      X.setLesson(t, H.values),
      X.isOpen &&
        Wt({
          hold: !0,
        }),
      J.show(t, {
        delay: H.settings.reducedMotion ? 0 : 1e3,
      }),
      K?.setLesson(t.id, {
        values: H.values,
      }),
      Z.refresh(),
      history.replaceState(null, ``, `#${t.id}`),
      (document.title = $t(t)));
}
function $t(t) {
  return `${t.title} · ${e(`Learn Arduino`)}`;
}
async function en() {
  if (!K) return;
  (yt(),
    (H.running = `uploading`),
    G.setState(`uploading`),
    q.setRunning(!0),
    Z.setActive(`run`, !0));
  let e = H.lesson;
  (await K.runSketch(e.sim, {
    out: (e) => G.log(e),
    trace: (e) => G.trace(e),
  })) &&
    e === H.lesson &&
    ((H.running = `running`),
    G.setState(`running`),
    W.complete(e.id) && (Gt(), Z.refresh()));
}
function tn() {
  (K?.stopSim(),
    G.trace(null),
    H.running !== `idle` && G.log(e(`Stopped.`)),
    (H.running = `idle`),
    G.setState(`idle`),
    q.setRunning(!1),
    Z.setActive(`run`, !1));
}
function nn() {
  if (!K) return [];
  let e = [];
  for (let { group: t } of K.parts.values())
    t.userData.part &&
      !t.userData.wire &&
      e.push({
        ...t.userData.part,
        group: t,
      });
  let t = [
    `dip`,
    `usb`,
    `jack`,
    `reset`,
    `digitalA`,
    `power`,
    `analog`,
    `qfn`,
    `crystal`,
  ];
  K.board.traverse((n) => {
    let r = n.userData.part;
    r &&
      t.includes(r.key) &&
      !e.some((e) => e.name === r.name) &&
      e.push({
        ...r,
        group: n,
      });
  });
  let n = (e) => (e.key ? t.indexOf(e.key) + 100 : 0);
  return e.sort((e, t) => n(e) - n(t)).slice(0, 12);
}
function rn(e, t) {
  if ((e && K?.selection?.group.userData.part === e && (e = null), !e || !t)) {
    z.classList.remove(`is-on`);
    return;
  }
  ((z.querySelector(`b`).textContent = e.name),
    (z.querySelector(`span`).textContent = e.desc ?? ``));
  let n = on(t.x, t.y),
    r = n.x > L.offsetWidth - 260;
  ((z.style.transform = `translate(${n.x + (r ? -16 : 16)}px, ${n.y + 18}px) translateX(${r ? `-100%` : `0`})`),
    z.classList.add(`is-on`));
}
function an() {
  let e = L.getBoundingClientRect(),
    t = [],
    n = (n, r = !1) => {
      let i = n.getBoundingClientRect();
      if (!i.width || !i.height) return;
      let a = getComputedStyle(n);
      a.display === `none` ||
        (!r && (a.visibility === `hidden` || Number(a.opacity) < 0.3)) ||
        t.push({
          x0: (i.left - e.left) / B,
          y0: (i.top - e.top) / B,
          x1: (i.right - e.left) / B,
          y1: (i.bottom - e.top) / B,
        });
    };
  return (
    !R.classList.contains(`is-free`) && !R.classList.contains(`is-off`)
      ? (document
          .querySelectorAll(`.callout:not(.is-leaving)`)
          .forEach((e) => n(e, !0)),
        document.querySelectorAll(`.leaders .leader path`).forEach((e) => {
          let n =
            (e.getAttribute(`d`) ?? ``).match(/-?\d+(\.\d+)?/g)?.map(Number) ??
            [];
          for (let e = 0; e + 3 < n.length; e += 2)
            t.push({
              poly: [
                [n[e], n[e + 1]],
                [n[e + 2], n[e + 3]],
              ],
            });
        }))
      : document
          .querySelectorAll(`.tags.is-free .tag:not(.is-hidden)`)
          .forEach((e) => n(e, !0)),
    document
      .querySelectorAll(
        `.viewbar, .minimap, .inspector, .brand, .status, .schematic`,
      )
      .forEach((e) => n(e)),
    t
  );
}
function on(e, t) {
  let n = L.getBoundingClientRect();
  return {
    x: (e - n.left) / B,
    y: (t - n.top) / B,
  };
}
(U.setLesson(H.lesson),
  G.setLesson(H.lesson, H.values),
  X.setLesson(H.lesson, H.values),
  X.setOpen(H.settings.schematic),
  W.setActive(H.lesson.id),
  Nt ? (document.title = $t(Nt)) : (document.title = e(document.title)),
  J.setVisible(H.settings.labels),
  document.documentElement.classList.toggle(
    `reduce-motion`,
    H.settings.reducedMotion,
  ));
var $ = new Ge(F(`#loader`)),
  sn = 2e4,
  cn = e(
    `The 3D board is drawn with WebGL, which this browser has turned off. Turn on hardware acceleration in its settings, or try another browser — the lessons and their code still work.`,
  ),
  ln = !1;
function un() {
  ((ln = !0), (F(`#app`).inert = !1), $.done());
}
function dn() {
  !ln && K && (un(), setTimeout(() => J.release(), 180), Y.startHint());
}
function fn() {
  if (ln) return;
  L.classList.add(`no-webgl`);
  let t = document.createElement(`div`);
  ((t.className = `stage-note`),
    t.setAttribute(`role`, `note`),
    (t.innerHTML = `<b>${e(`3D view unavailable`)}</b><p>${cn}</p>`),
    L.append(t),
    un());
}
var pn = (e) =>
  new Promise((t) => {
    let n = () => (e-- > 0 ? requestAnimationFrame(n) : t());
    n();
  });
function mn(e) {
  return new e(F(`#board-canvas`), L, {
    toStage: on,
    onFrame: (e) => {
      J.update(e);
      let t = e.isHome();
      (J.setFree(!t || !!e.selection || jt),
        Y.update((e.view.azimuth - 36 / At) * At, t));
      let n = !V && !e.headingHome(),
        r = performance.now();
      n ? (Bt ??= r) : (Bt = null);
      let i = n && r - Bt >= zt;
      if (
        (Ht.setVisible(i),
        n &&
          !i &&
          !Vt &&
          (Vt = setTimeout(
            () => {
              ((Vt = 0), K && (K.dirty = !0));
            },
            zt - (r - Bt) + 16,
          )),
        Ht.draw(e),
        e.signals && e.flowOn)
      ) {
        let t = document.querySelector(`.readout.is-on`),
          n = an();
        if (t) {
          let e = L.getBoundingClientRect(),
            r = t.getBoundingClientRect();
          n.push({
            x0: (r.left - e.left) / B,
            y0: (r.top - e.top) / B,
            x1: (r.right - e.left) / B,
            y1: (r.bottom - e.top) / B,
          });
        }
        Ut.update(e, n);
      } else Ut.update(e, []);
      (X.update(e.levels),
        X.setActive(e.selection?.id ?? null, e.hoveredId),
        q.place(e.selectionScreen(), e.size.w, e.size.h));
    },
    onHover: (e, t) => rn(e, t),
    onSelect: () => Zt(),
    blockers: () => an(),
    onParam: (e, t, n) => Xt(e, t, n),
    sound: () => H.settings.sound,
  });
}
async function hn() {
  (setTimeout(dn, sn),
    $.step(e(`Loading fonts`), 0.08),
    await Promise.all([
      document.fonts.load(`700 40px "Barlow Semi Condensed"`),
      document.fonts.load(`600 40px "Barlow Semi Condensed"`),
      document.fonts.load(`500 40px "Barlow Semi Condensed"`),
    ]).catch(() => {}),
    $.step(e(`Loading the 3D view`), 0.18));
  let { BoardStage: t } = await a(
    async () => {
      let { BoardStage: e } = await import(`./scene.js`);
      return {
        BoardStage: e,
      };
    },
    __vite__mapDeps([0, 1, 2, 3]),
  );
  ($.step(e(`Building the board`), 0.32), await pn(2));
  try {
    K = mn(t);
  } catch (e) {
    (console.error(e), fn());
    return;
  }
  (K.setGrid(H.settings.grid),
    K.setFlow(H.settings.flow),
    (K.autoRotate = H.settings.autoRotate),
    K.setReducedMotion(H.settings.reducedMotion),
    (window.__app = {
      stage: K,
      selectLesson: Q,
      run: en,
      stop: tn,
      state: H,
      setParam: Xt,
      inspector: q,
      minimap: Ht,
    }));
  let n = ({ glide: e = !1, hold: t = e } = {}) => {
    let n = L.offsetWidth,
      r = L.offsetHeight;
    if (!n || !r) return;
    let i = Math.min(1, n / 1090, r / 800),
      a = X.isOpen;
    jt = V || i < Mt || a;
    let o = V ? 12 : 100,
      s = jt
        ? {
            w: n - 28,
            h: r - o - 70,
          }
        : null,
      c = jt ? n / 2 : n / 2 + kt.x * i,
      l = jt ? o + (r - o - 58) / 2 : r / 2 + kt.y * i,
      u = F(`#schematic`);
    if (a && !V) {
      let e = Math.round(Math.min(460, Math.max(300, n * 0.38))),
        t = X.size(e, r - 112 - 24),
        i = 16 + e + 12;
      ((s = {
        w: n - i - 20,
        h: r - o - 70,
      }),
        (c = i + (n - i) / 2),
        u.style.setProperty(`--sch-w`, `${e}px`),
        u.style.setProperty(`--sch-svg-h`, `${t.h - 54}px`),
        (u.style.height = `${t.h}px`),
        (u.style.left = `16px`),
        (u.style.top = `112px`));
    } else if (a) {
      let e = n - 20,
        t = X.size(e, Math.round(r * 0.48)),
        i = t.h + 60;
      ((s = {
        w: n - 28,
        h: Math.max(80, r - o - i - 16),
      }),
        (l = o + (r - o - i) / 2),
        u.style.setProperty(`--sch-w`, `${e}px`),
        u.style.setProperty(`--sch-svg-h`, `${t.h - 50}px`),
        (u.style.height = `${t.h}px`),
        (u.style.left = `10px`),
        (u.style.top = `${Math.round(r - i + 2)}px`));
    }
    q.lockSide = a && !V ? 1 : null;
    let d = K.isHome();
    ((R.style.left = `${c}px`),
      (R.style.top = `${l}px`),
      (R.style.transform = i < 1 ? `scale(${i})` : ``),
      (J.origin = {
        x: c,
        y: l,
      }),
      (J.scale = i),
      J.invalidate(),
      (q.top = V ? 12 : 112),
      (q.dock = V ? `bottom` : `corner`));
    let f = Math.min(2, Math.max(1.5, window.devicePixelRatio * B));
    (K.resize(n, r, c, l, f, i, s, {
      hold: t,
    }),
      Ht.resize(window.devicePixelRatio * B * 1.5),
      e ? K.resetView(900) : d && !t && K.controls.jumpTo(K.homeView()));
  };
  ((Wt = n),
    n(),
    window.addEventListener(`resize`, () => {
      (Lt(), n());
    }),
    new ResizeObserver(() => n()).observe(L),
    K.setLesson(H.lesson.id, {
      instant: !0,
      values: H.values,
    }),
    J.show(H.lesson, {
      hold: !0,
    }),
    L.addEventListener(`dblclick`, (e) => {
      if (e.target !== F(`#board-canvas`)) return;
      let t = K.pick(e.clientX, e.clientY);
      t && t.info.lift !== !1 ? K.focusGroup(t.group) : K.resetView();
    }),
    L.addEventListener(`pointerdown`, () => Y.dismissHint(), {
      once: !0,
    }),
    await pn(2),
    $.step(e(`Drawing the lessons`), 0.6));
  try {
    let { renderThumbnails: t } = await a(
      async () => {
        let { renderThumbnails: e } = await import(`./thumbnails.js`);
        return {
          renderThumbnails: e,
        };
      },
      __vite__mapDeps([4, 3, 1, 2]),
    );
    await t(document.querySelectorAll(`[data-thumb]`), {
      renderer: K.renderer,
      environment: K.scene.environment,
      board: K.board,
      onEach: (t, n) =>
        $.step(
          e(`Drawing the lessons · {n} / {total}`, {
            n: t,
            total: n,
          }),
          0.6 + (0.38 * t) / n,
        ),
    });
  } catch (e) {
    console.error(e);
  }
  (await pn(1), dn());
}
(window.addEventListener(`keydown`, (e) => {
  if (e.metaKey || e.ctrlKey || e.altKey || !ln) return;
  let t = document.activeElement?.tagName;
  if (t === `INPUT` || t === `TEXTAREA`) return;
  let n =
      t === `BUTTON` ||
      document.activeElement?.getAttribute(`role`) === `button`,
    r = K?.controls,
    i = e.key;
  if (i === `Escape`) {
    if (K?.selection) {
      K.select(null);
      return;
    }
    if ((Z.close(), U.expanded || G.expanded)) {
      (U.toggleExpanded(!1), G.toggleExpanded(!1));
      return;
    }
    K?.resetView();
  } else if (r) {
    if (i === `r` || i === `R` || i === `Home`) K.resetView();
    else if (i === `f` || i === `F`) Kt(`flow`, !H.settings.flow);
    else if (i === `c` || i === `C`) Kt(`schematic`, !H.settings.schematic);
    else if (/^[0-9]$/.test(i) && g[(Number(i) + 9) % 10])
      Q(g[(Number(i) + 9) % 10].id);
    else if (i === `[` || i === `]`) {
      let e = g.indexOf(H.lesson) + (i === `]` ? 1 : -1);
      g[e] && Q(g[e].id);
    } else if (i === ` ` && !n) H.running === `idle` ? en() : tn();
    else return;
    e.preventDefault();
  }
}),
  hn().catch((t) => {
    (console.error(t),
      $.fail(
        e(`Something went wrong while starting. Try reloading the page.`),
      ));
  }));
export { ot as a, m as c, xt as i, bt as n, A as o, St as r, p as s, Ct as t };
