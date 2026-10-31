// GENERATED from the fresh immutable deployment. Edit the recovery recipe, not this file.
var Fe = {
  board: [`#4a5d99`, `#26324d`],
  breadboard: [`#efe7d6`, `#b9a993`],
  car: [`#e3604b`, `#8c3426`],
  sensor: [`#3a56a0`, `#22325e`],
  motor: [`#cfc9bf`, `#7c766d`],
  lights: [`#2c3242`, `#141a2c`],
};
var Ie = [`#8e8a84`, `#4f535b`];
var Le = 176;
var Re = 118;
var ze = class {
  constructor(e, { onMove: t }) {
    ((this.root = e),
      (this.onMove = t),
      (this.canvas = e.querySelector(`canvas`)),
      (this.ctx = this.canvas.getContext(`2d`)),
      (this.frame = null),
      (this.visible = !1),
      (this.ratio = 0));
    let n = (e) => {
        if (!this.frame) return null;
        let t = this.canvas.getBoundingClientRect(),
          n = ((e.clientX - t.left) / t.width) * Le,
          r = ((e.clientY - t.top) / t.height) * Re,
          { c: i, right: a, away: o, s, ox: c, oy: l } = this.frame,
          u = (n - c) / s,
          d = (r - l) / s;
        return {
          x: i.x + a.x * u - o.x * d,
          z: i.z + a.z * u - o.z * d,
        };
      },
      r = !1;
    (e.addEventListener(`pointerdown`, (t) => {
      (t.preventDefault(), (r = !0), e.setPointerCapture(t.pointerId));
      let i = n(t);
      i && this.onMove(i, !1);
    }),
      e.addEventListener(`pointermove`, (e) => {
        if (!r) return;
        let t = n(e);
        t && this.onMove(t, !0);
      }));
    let i = () => {
      r = !1;
    };
    (e.addEventListener(`pointerup`, i),
      e.addEventListener(`pointercancel`, i));
  }
  setVisible(e) {
    e !== this.visible &&
      ((this.visible = e), this.root.classList.toggle(`is-on`, e));
  }
  resize(e) {
    let t = Math.min(3, Math.max(1, e));
    t !== this.ratio &&
      ((this.ratio = t),
      (this.canvas.width = Math.round(Le * t)),
      (this.canvas.height = Math.round(Re * t)));
  }
  draw(e) {
    if (!this.visible) return;
    let t = this.ctx,
      n = e.controls,
      { right: r, away: i } = n.axes(),
      a = e.footprints(),
      o = `${e.lessonId}|${n.view.azimuth.toFixed(3)}|${a.length}`;
    if (!this.frame || this.fitKey !== o || e.tweens.active) {
      this.fitKey = o;
      let e = 1 / 0,
        t = -1 / 0,
        n = 1 / 0,
        s = -1 / 0,
        c = 0,
        l = 0;
      for (let e of a) ((c += (e.x0 + e.x1) / 2), (l += (e.z0 + e.z1) / 2));
      let u = {
          x: c / a.length,
          z: l / a.length,
        },
        d = (e, t) => [
          (e - u.x) * r.x + (t - u.z) * r.z,
          -((e - u.x) * i.x + (t - u.z) * i.z),
        ];
      for (let r of a)
        for (let [i, a] of [
          [r.x0, r.z0],
          [r.x1, r.z0],
          [r.x1, r.z1],
          [r.x0, r.z1],
        ]) {
          let [r, o] = d(i, a);
          ((e = Math.min(e, r)),
            (t = Math.max(t, r)),
            (n = Math.min(n, o)),
            (s = Math.max(s, o)));
        }
      let f = Math.min(152 / (t - e + 44), 94 / (s - n + 44));
      this.frame = {
        c: u,
        right: r,
        away: i,
        s: f,
        ox: Le / 2 - ((e + t) / 2) * f,
        oy: Re / 2 - ((n + s) / 2) * f,
      };
    }
    let { c: s, s: c, ox: l, oy: u } = this.frame,
      d = (e, t) => [
        (e - s.x) * r.x + (t - s.z) * r.z,
        -((e - s.x) * i.x + (t - s.z) * i.z),
      ],
      f = (e, t) => {
        let [n, r] = d(e, t);
        return [l + n * c, u + r * c];
      };
    (t.setTransform(this.ratio, 0, 0, this.ratio, 0, 0),
      t.clearRect(0, 0, Le, Re),
      (t.strokeStyle = `rgba(190, 168, 138, 0.35)`),
      (t.lineWidth = 0.75));
    let p = (e, n) => {
      (t.beginPath(), t.moveTo(...e), t.lineTo(...n), t.stroke());
    };
    for (let e = Math.floor((s.x - 260) / 20) * 20; e <= s.x + 260; e += 20)
      p(f(e, s.z - 260), f(e, s.z + 260));
    for (let e = Math.floor((s.z - 260) / 20) * 20; e <= s.z + 260; e += 20)
      p(f(s.x - 260, e), f(s.x + 260, e));
    for (let e of a) {
      let [n, r] = Fe[e.kind] ?? Ie,
        i = [
          [e.x0, e.z0],
          [e.x1, e.z0],
          [e.x1, e.z1],
          [e.x0, e.z1],
        ].map(([e, t]) => f(e, t));
      (t.beginPath(),
        i.forEach((e, n) => (n ? t.lineTo(...e) : t.moveTo(...e))),
        t.closePath(),
        (t.fillStyle = n),
        t.fill(),
        (t.strokeStyle = r),
        (t.lineWidth = 1.2),
        t.stroke());
    }
    let { w: m, h } = e.size,
      ee = [
        [0, 0],
        [m, 0],
        [m, h],
        [0, h],
      ].map(([e, t]) => {
        let r = n.groundAt(e, t);
        return f(r.x, r.z);
      });
    (t.beginPath(),
      ee.forEach((e, n) => (n ? t.lineTo(...e) : t.moveTo(...e))),
      t.closePath(),
      (t.fillStyle = `rgba(26, 163, 161, 0.12)`),
      t.fill(),
      (t.strokeStyle = `#1aa3a1`),
      (t.lineWidth = 1.6),
      t.stroke());
    let g = n.view.target,
      [_, te] = f(g.x, g.z);
    ((t.fillStyle = `#1aa3a1`),
      t.beginPath(),
      t.arc(_, te, 2.4, 0, Math.PI * 2),
      t.fill());
    let [v, ne] = f(s.x, s.z - 1),
      [re, ie] = f(s.x, s.z),
      ae = Math.atan2(ne - ie, v - re);
    (t.save(),
      t.translate(161, 15),
      t.rotate(ae + Math.PI / 2),
      (t.fillStyle = `#e0523f`),
      t.beginPath(),
      t.moveTo(0, -7),
      t.lineTo(4, 3),
      t.lineTo(-4, 3),
      t.closePath(),
      t.fill(),
      t.restore());
  }
};
export {
  Fe as partColours,
  Ie as fallbackColours,
  Le as mapWidth,
  Re as mapHeight,
  ze as Minimap,
};
