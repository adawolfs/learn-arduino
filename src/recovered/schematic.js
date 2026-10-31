// GENERATED from the fresh immutable deployment. Edit the recovery recipe, not this file.
import { a as e } from "./localization.js";
import { pinSignal as A } from "./signals.js";
var T = (e, t) => ({
  t: `R`,
  label: e,
  part: t,
});
var E = (e, t, n) => ({
  t: `LED`,
  color: e,
  part: t,
  label: n,
});
var Je = (e) => ({
  t: `BTN`,
  part: e,
});
var Ye = (e) => ({
  t: `BUZ`,
  part: e,
});
var Xe = (e, t) => ({
  t: `M`,
  label: e,
  part: t,
});
var Ze = (e) => ({
  t: `LDR`,
  part: e,
});
var Qe = (e) => ({
  t: `FSR`,
  part: e,
});
var D = () => ({
  t: `GND`,
});
var O = (e = `5V`) => ({
  t: `VCC`,
  label: e,
});
var $e = (e, t = !1) => ({
  t: `NODE`,
  ...e,
  follow: t,
});
var et = (e, t) => ({
  t: `Q`,
  part: e,
  ...t,
});
var tt = (e) => ({
  t: `POT`,
  part: e,
});
var nt = (e, t) => ({
  t: `BUS`,
  key: e,
  label: t,
});
var k = {
  red: `#e8392e`,
  yellow: `#f2c23a`,
  green: `#3fbf6a`,
  blue: `#3d7be0`,
  white: `#f2efe6`,
};
var rt = (e) => k[e.color] ?? k.red;
var it = (e) => (e.ohms >= 1e3 ? `${e.ohms / 1e3} kΩ` : `${e.ohms} Ω`);
var at = {
  board: {
    note: e(`The LED marked L, on the board itself`),
    pins: [`D13`],
    rows: {
      D13: [T(`1 kΩ`, null), E(`#f0a53a`, null, `L`), D()],
    },
  },
  blink: {
    pins: [`D13`],
    rows: {
      D13: [T(it, `resistor`), E(rt, `led`), D()],
    },
  },
  button: {
    pins: [`D2`, `D13`],
    rows: {
      D2: [
        $e(
          {
            up: [Je(`button`), O()],
            down: [T(`10 kΩ`, `pulldown`), D()],
          },
          !0,
        ),
      ],
      D13: [T(`220 Ω`, `resistor`), E(rt, `led`), D()],
    },
  },
  knob: {
    pins: [`A0`, `D9`],
    rows: {
      A0: [tt(`pot`)],
      D9: [T(`220 Ω`, `resistor`), E(rt, `led`), D()],
    },
  },
  rgb: {
    pins: [`D9`, `D10`, `D11`],
    rows: {
      D9: [T(`220 Ω`, `r-red`), E(k.red, `rgb`), nt(`k`, e(`common`))],
      D10: [T(`220 Ω`, `r-green`), E(k.green, `rgb`), nt(`k`)],
      D11: [T(`220 Ω`, `r-blue`), E(k.blue, `rgb`), nt(`k`)],
    },
  },
  light: {
    pins: [`A0`, `D9`],
    rows: {
      A0: [
        $e({
          up: [Ze(`ldr`), O()],
          down: [T(`10 kΩ`, `pulldown`), D()],
        }),
      ],
      D9: [T(`220 Ω`, `resistor`), E(k.yellow, `led`), D()],
    },
  },
  sensor: {
    pins: [`5V`, `D9`, `D10`, `GND`],
    blocks: [
      {
        part: `sensor`,
        title: `HC-SR04`,
        pins: [
          [`VCC`, `5V`],
          [`TRIG`, `D9`],
          [`ECHO`, `D10`],
          [`GND`, `GND`],
        ],
      },
    ],
  },
  sound: {
    pins: [`D8`],
    rows: {
      D8: [Ye(`buzzer`), D()],
    },
  },
  piano: {
    note: e(`Pulled up inside the Uno: HIGH until a key is pressed`),
    pins: [`D2`, `D3`, `D4`, `D5`, `D6`, `D7`, `D8`, `D9`, `D10`],
    rows: {
      ...Object.fromEntries(
        [0, 1, 2, 3, 4, 5, 6, 7].map((t) => [
          `D${2 + t}`,
          [Je(`key${t}`), nt(`rail`, e(`GND rail`))],
        ]),
      ),
      D10: [Ye(`buzzer`), D()],
    },
  },
  motor: {
    pins: [`D6`],
    rows: {
      D6: [
        T(`1 kΩ`, `r1k`),
        et(`transistor`, {
          up: [Xe(`M`, `motor`), O()],
          down: [D()],
        }),
      ],
    },
  },
  heat: {
    pins: [`5V`, `A0`, `GND`, `D6`],
    blocks: [
      {
        part: `tmp36`,
        title: `TMP36`,
        pins: [
          [`+Vs`, `5V`],
          [`OUT`, `A0`],
          [`GND`, `GND`],
        ],
      },
    ],
    rows: {
      D6: [
        T(`1 kΩ`, `r1k`),
        et(`transistor`, {
          up: [Xe(e(`FAN`), `fan`), O()],
          down: [D()],
        }),
      ],
    },
  },
  servo: {
    pins: [`D9`, `5V`, `GND`],
    blocks: [
      {
        part: `servo`,
        title: e(`SERVO`),
        pins: [
          [`SIG`, `D9`],
          [`+`, `5V`],
          [`−`, `GND`],
        ],
      },
    ],
  },
  stepper: {
    pins: [`D2`, `D8`, `D9`, `D10`, `D11`, `5V`, `GND`],
    rows: {
      D2: [
        $e(
          {
            up: [Je(`button`), O()],
            down: [T(`10 kΩ`, `pulldown`), D()],
          },
          !0,
        ),
      ],
    },
    blocks: [
      {
        part: `driver`,
        title: `ULN2003`,
        pins: [
          [`IN1`, `D8`],
          [`IN2`, `D9`],
          [`IN3`, `D10`],
          [`IN4`, `D11`],
          [`+`, `5V`],
          [`−`, `GND`],
        ],
        motor: {
          part: `stepper`,
          label: e(`STEPPER`),
        },
      },
    ],
  },
  plant: {
    pins: [`5V`, `A0`, `GND`, `3V3`, `SCL`, `SDA`],
    blocks: [
      {
        part: `soil`,
        title: e(`SOIL SENSOR`),
        pins: [
          [`VCC`, `5V`],
          [`AOUT`, `A0`],
          [`GND`, `GND`],
        ],
      },
      {
        part: `oled`,
        title: `OLED`,
        pins: [
          [`VCC`, `3V3`],
          [`SCL`, `SCL`],
          [`SDA`, `SDA`],
          [`GND`, null],
        ],
      },
    ],
  },
  force: {
    pins: [`A0`, `D8`, `D9`, `5V`, `GND`],
    rows: {
      A0: [
        $e({
          up: [Qe(`fsr`), O()],
          down: [T(it, `pulldown`), D()],
        }),
      ],
      D8: [Ye(`buzzer`), D()],
    },
    blocks: [
      {
        part: `meter`,
        title: e(`SERVO`),
        pins: [
          [`SIG`, `D9`],
          [`+`, `5V`],
          [`−`, `GND`],
        ],
      },
    ],
  },
  project: {
    pins: [`5V`, `D9`, `D10`, `GND`, `D4`, `D3`, `D2`],
    blocks: [
      {
        part: `sensor`,
        title: `HC-SR04`,
        pins: [
          [`VCC`, `5V`],
          [`TRIG`, `D9`],
          [`ECHO`, `D10`],
          [`GND`, `GND`],
        ],
      },
      {
        part: `lights`,
        title: e(`LIGHTS`),
        pins: [
          [`R`, `D4`],
          [`Y`, `D3`],
          [`G`, `D2`],
          [`GND`, null],
        ],
      },
    ],
  },
};
function st(e, t = !0) {
  let n = 0;
  for (let t of Object.values(e ?? {}))
    t.mode !== `in` &&
      t.mode !== `analog` &&
      (n = Math.max(n, t.mode === `pullup` ? (t.v > 0.5 ? 0 : 0.25) : t.v));
  return Math.max(n, t ? 0.3 : 0);
}
var ct = {
  R: 52,
  LED: 40,
  BTN: 44,
  BUZ: 40,
  M: 36,
  LDR: 52,
  FSR: 52,
};
var j = 18;
var lt = 10;
var ut = 86;
var dt = 152;
var ft = 104;
var pt = new Set([`D3`, `D5`, `D6`, `D9`, `D10`, `D11`]);
var mt = (e, t) => (typeof e == `function` ? e(t) : e);
var M = (e) =>
  String(e)
    .replace(/&/g, `&amp;`)
    .replace(/</g, `&lt;`)
    .replace(/"/g, `&quot;`);
var ht = (e) => (pt.has(e) ? `~${e}` : e);
function gt(e, t) {
  switch (e.t) {
    case `R`:
      return `<path d="M0 0H8L11 -6L17 6L23 -6L29 6L35 -6L41 6L44 0H52"/>`;
    case `LED`:
      return `<path d="M0 0H12M28 0H40M28 -9V9"/><path class="fillable" d="M12 -9L12 9L27 0Z" style="fill:${M(mt(e.color, t))}"/><path d="M19 -12l6 -6m0 0h-4m4 0v4M25 -9l6 -6m0 0h-4m4 0v4"/>`;
    case `BTN`:
      return `<path d="M0 0H12M32 0H44M10 -8H34M22 -8V-15M17 -15H27"/><circle class="solid" cx="12" cy="0" r="2.2"/><circle class="solid" cx="32" cy="0" r="2.2"/>`;
    case `BUZ`:
      return `<path d="M0 0H12M28 0H40M12 -9V9M28 -9V9"/><rect x="15" y="-7" width="10" height="14" rx="1"/><path d="M13 -14q7 -6 14 0"/>`;
    case `M`:
      return `<path d="M0 0H4M32 0H36"/><circle cx="18" cy="0" r="14"/>`;
    case `LDR`:
      return `<path d="M0 0H10M42 0H52"/><circle cx="26" cy="0" r="16"/><path d="M14 0L16 -4L19 4L22 -4L25 4L28 -4L31 4L34 -4L36 0"/><path d="M4 -24l7 7m0 0v-4m0 4h-4M12 -28l7 7m0 0v-4m0 4h-4"/>`;
    case `FSR`:
      return `<path d="M0 0H8L11 -6L17 6L23 -6L29 6L35 -6L41 6L44 0H52"/><path d="M26 -25V-11m0 0-4 -4.5m4 4.5 4 -4.5M19 -25H33"/>`;
    default:
      return ``;
  }
}
function _t(e, t) {
  let n = [],
    r = [],
    i = 0,
    a = 0,
    o = (e, t) => {
      ((i = Math.max(i, e)), (a = Math.max(a, t)));
    },
    s = (e, t, i, a, s) => {
      let c = `M${e} ${t}L${i} ${a}`;
      if ((o(Math.max(e, i), Math.max(t, a)), !s)) {
        n.push(`<path class="w" d="${c}"/>`);
        return;
      }
      let l = r.length;
      (r.push(s),
        n.push(
          `<path class="w" data-n="${l}" d="${c}"/><path class="flow" data-n="${l}" d="${s.rev ? `M${i} ${a}L${e} ${t}` : c}"/>`,
        ));
    },
    c = (e, t, r, i = ``, a = `middle`) => {
      (n.push(
        `<text class="${i}" x="${e}" y="${t}" text-anchor="${a}">${M(r)}</text>`,
      ),
        o(a === `start` ? e + r.length * 6.5 : e + r.length * 3.3, t + 4));
    },
    l = (e, t) => {
      (n.push(
        `<path class="w" d="M${e} ${t}V${t + 6}M${e - 9} ${t + 6}H${e + 9}M${e - 6} ${t + 10}H${e + 6}M${e - 3} ${t + 14}H${e + 3}"/>`,
      ),
        o(e + 9, t + 15));
    },
    u = (e, t, r) => {
      (n.push(
        `<path class="w" d="M${e} ${t}V${t - 10}M${e - 8} ${t - 10}H${e + 8}"/>`,
      ),
        c(e, t - 15, r, `net`));
    },
    d = (e, t) => n.push(`<circle class="solid" cx="${e}" cy="${t}" r="2.6"/>`),
    f = (e, r, i, a = 0) => {
      let s = ct[e.t],
        l = a
          ? `translate(${r} ${i}) rotate(${a * 90})`
          : `translate(${r} ${i})`,
        u = `<rect class="hit" x="-2" y="-16" width="${s + 4}" height="32"/>`;
      n.push(
        `<g class="sym" data-part="${M(e.part ?? ``)}"><g transform="${l}">${u}${gt(e, t)}</g>`,
      );
      let d = a ? r : r + s / 2,
        f = a ? i + (a * s) / 2 : i;
      (e.t === `M` &&
        n.push(
          `<text class="sym-t" x="${d}" y="${f + 4.5}" text-anchor="middle">M</text>`,
        ),
        n.push(`</g>`));
      let p =
        e.t === `M`
          ? e.label === `M`
            ? null
            : e.label
          : e.label
            ? mt(e.label, t)
            : null;
      (p &&
        (a
          ? c(r + 16, f + 4, p, `val`, `start`)
          : c(d, i - (e.t === `LED` ? 22 : 13), p, `val`)),
        o(a ? r + 16 : r + s, a ? Math.max(i, i + a * s) : i + 16));
    },
    p = (e, t, n, r, i) => {
      let a = n;
      for (let n of e ?? [])
        n.t === `VCC`
          ? u(t, a, n.label)
          : n.t === `GND`
            ? (s(t, a, t, a + 4, i), l(t, a + 4))
            : (s(t, a, t, a + r * j, {
                ...i,
                rev: r < 0,
              }),
              (a += r * j),
              f(n, t, a, r),
              (a += r * ct[n.t]));
    },
    m = (e) =>
      (e ?? []).reduce(
        (e, t) => e + (t.t === `GND` ? 20 : t.t === `VCC` ? 26 : j + ct[t.t]),
        0,
      ),
    h = e.pins.map((t) => ({
      pin: t,
      chain: e.rows?.[t] ?? [],
      block: null,
    }));
  for (let t of e.blocks ?? [])
    for (let [, e] of t.pins) {
      let n = h.find((t) => t.pin === e);
      n && (n.block = t);
    }
  for (let e of h) {
    ((e.up = 12), (e.down = 12));
    for (let t of e.chain)
      t.t === `NODE`
        ? ((e.up = Math.max(e.up, m(t.up) + 4)),
          (e.down = Math.max(e.down, m(t.down) + 4)))
        : t.t === `Q`
          ? ((e.up = Math.max(e.up, 16 + m(t.up))),
            (e.down = Math.max(e.down, 16 + m(t.down))))
          : t.t === `POT`
            ? ((e.up = Math.max(e.up, 52)), (e.down = Math.max(e.down, 46)))
            : t.t === `GND`
              ? (e.down = Math.max(e.down, 24))
              : t.t === `LED`
                ? (e.up = Math.max(e.up, t.label ? 28 : 20))
                : (t.t === `R` || t.t === `BTN`) && (e.up = Math.max(e.up, 18));
  }
  let ee = 0;
  h.forEach((e, t) => {
    if (t === 0) ee = 36 + e.up;
    else {
      let n = h[t - 1],
        r = n.block !== e.block && (n.block || e.block) ? 30 : 0;
      ee +=
        Math.max(e.block && n.block === e.block ? 26 : 40, n.down + e.up + 10) +
        r;
    }
    e.y = ee;
  });
  let g = (e) => ({
      role: e === `5V` ? `power` : /^GND/.test(e) ? `gnd` : `sig`,
      pin: e,
      pinDir: !0,
      rev: /^GND/.test(e),
    }),
    _ = new Map();
  for (let e of h) {
    let t = g(e.pin),
      r = dt;
    s(96, e.y, dt, e.y, t);
    for (let i of e.chain)
      if (ct[i.t])
        (s(r, e.y, r + j, e.y, t), (r += j), f(i, r, e.y), (r += ct[i.t]));
      else if (i.t === `GND`)
        (s(r, e.y, r + j, e.y, t),
          (r += j),
          s(r, e.y, r, e.y + 4, t),
          l(r, e.y + 4));
      else if (i.t === `NODE`) {
        (s(r, e.y, r + j, e.y, t), (r += j), d(r, e.y));
        let n = i.follow ? e.pin : null;
        (p(
          i.up,
          r,
          e.y,
          -1,
          i.follow
            ? {
                role: `sig`,
                pin: e.pin,
                pinDir: !1,
              }
            : {
                role: `power`,
                follow: n,
              },
        ),
          p(
            i.down,
            r,
            e.y,
            1,
            i.follow
              ? {
                  role: `sig`,
                  pin: e.pin,
                  pinDir: !1,
                }
              : {
                  role: `gnd`,
                  follow: n,
                },
          ));
      } else
        i.t === `Q`
          ? (s(r, e.y, r + j, e.y, t),
            (r += j),
            n.push(
              `<g class="sym" data-part="${M(i.part)}"><g transform="translate(${r} ${e.y})"><rect class="hit" x="-2" y="-18" width="34" height="36"/><circle class="ring" cx="16" cy="0" r="16"/><path d="M0 0H10M10 -10V10M10 -5L24 -14V-16M10 5L24 14V16"/><path class="solid" d="M24 14l-7 -0.6 3.4 -5.2z"/></g></g>`,
            ),
            p(i.up, r + 24, e.y - 16, -1, {
              role: `power`,
              follow: e.pin,
            }),
            p(i.down, r + 24, e.y + 16, 1, {
              role: `gnd`,
              follow: e.pin,
            }),
            (r += 32))
          : i.t === `POT`
            ? (s(r, e.y, r + j, e.y, t),
              (r += j),
              n.push(
                `<g class="sym" data-part="${M(i.part)}"><g transform="translate(${r} ${e.y})"><rect class="hit" x="-2" y="-28" width="30" height="56"/><path d="M0 0H12M18 -26V-18L12 -15L24 -9L12 -3L24 3L12 9L24 15L18 18V26"/><path class="solid" d="M13 0l-6 -3.6v7.2z"/></g></g>`,
              ),
              c(r + 30, e.y + 4, `10 kΩ`, `val`, `start`),
              p(
                [
                  {
                    t: `VCC`,
                    label: `5V`,
                  },
                ],
                r + 18,
                e.y - 26,
                -1,
                {
                  role: `power`,
                },
              ),
              s(r + 18, e.y + 26, r + 18, e.y + 30, {
                role: `gnd`,
              }),
              l(r + 18, e.y + 30),
              (r += 30))
            : i.t === `BUS` &&
              (_.has(i.key) ||
                _.set(i.key, {
                  rows: [],
                  label: i.label,
                }),
              _.get(i.key).rows.push({
                r: e,
                x: r,
                net: t,
              }));
    e.end = r;
  }
  for (let e of _.values()) {
    let t = Math.max(...e.rows.map((e) => e.x)) + j;
    for (let n of e.rows) s(n.x, n.r.y, t, n.r.y, n.net);
    let n = e.rows.map((e) => e.r.y).sort((e, t) => e - t),
      r = n[0],
      i = n[n.length - 1];
    for (let e = 0; e < n.length - 1; e++)
      (s(t, n[e], t, n[e + 1], {
        role: `gnd`,
      }),
        d(t, n[e + 1]));
    (s(t, i, t, i + 10, {
      role: `gnd`,
    }),
      l(t, i + 10),
      e.label && c(t + 6, r - 6, e.label, `note`, `start`));
  }
  for (let t of e.blocks ?? []) {
    let e = h.filter((e) => e.block === t),
      r = Math.max(216, ...e.map((e) => e.end + 40)),
      i = e[0]?.y ?? 40,
      a = t.pins.map(([e, t]) => {
        let n = h.find((e) => e.pin === t),
          r = n ? n.y : i + 26;
        return (
          (i = r),
          {
            label: e,
            pin: t,
            r: n,
            y: r,
          }
        );
      }),
      u = Math.min(...a.map((e) => e.y)) - 26,
      d = Math.max(...a.map((e) => e.y)) + 14;
    for (let e of a)
      e.r
        ? s(e.r.end, e.y, r, e.y, g(e.pin))
        : (s(r, e.y, r - 16, e.y, {
            role: `gnd`,
            rev: !0,
          }),
          s(r - 16, e.y, r - 16, e.y + 4, {
            role: `gnd`,
          }),
          l(r - 16, e.y + 4));
    (n.push(
      `<g class="sym block" data-part="${M(t.part)}"><rect class="box" x="${r}" y="${u}" width="${ft}" height="${d - u}" rx="5"/>`,
    ),
      n.push(
        `<text class="block-t" x="${r + ft / 2}" y="${u + 15}" text-anchor="middle">${M(t.title)}</text>`,
      ));
    for (let e of a)
      n.push(
        `<text class="pin-t" x="${r + 7}" y="${e.y + 4}">${M(e.label)}</text>`,
      );
    if ((n.push(`</g>`), o(r + ft, d), t.motor)) {
      let e = (u + d) / 2,
        i = r + ft + 46;
      for (let t = -2; t <= 2; t++)
        s(r + ft, e + t * 6, i - 18 + Math.abs(t) * 1.6, e + t * 6);
      (n.push(
        `<g class="sym" data-part="${M(t.motor.part)}"><rect class="hit" x="${i - 22}" y="${e - 22}" width="44" height="44"/><circle class="box" cx="${i}" cy="${e}" r="19"/><text class="sym-t" x="${i}" y="${e + 5}" text-anchor="middle">M</text></g>`,
      ),
        c(i, e + 34, t.motor.label, `val`),
        o(i + 24, e + 36));
    }
  }
  let te = h[0].y - 30,
    v = Math.max(a - 6, h[h.length - 1].y + 20);
  n.unshift(
    `<g class="board"><rect class="box" x="${lt}" y="${te}" width="${ut}" height="${v - te}" rx="6"/><text class="block-t" x="53" y="${te + 15}" text-anchor="middle">ARDUINO</text>${h.map((e) => `<text class="pin-t" x="89" y="${e.y + 4}" text-anchor="end">${M(ht(e.pin))}</text><circle class="solid" cx="96" cy="${e.y}" r="2.2"/>`).join(``)}</g>`,
  );
  for (let e of h)
    n.push(
      `<text class="pinval" data-pin="${M(e.pin)}" x="101" y="${e.y - 6}"></text>`,
    );
  e.note && c(lt, v + 22, e.note, `note`, `start`);
  let ne = Math.ceil(i + 14),
    re = Math.ceil(Math.max(a, v) + (e.note ? 34 : 12));
  return {
    svg: `<svg class="sch" viewBox="0 0 ${ne} ${re}" preserveAspectRatio="xMidYMin meet" xmlns="http://www.w3.org/2000/svg">${n.join(``)}</svg>`,
    w: ne,
    h: re,
    nets: r,
  };
}
var vt = class {
  constructor(t, { onHover: n, onSelect: r, onClose: i } = {}) {
    ((this.root = t),
      (this.onHover = n),
      (this.onSelect = r),
      (t.innerHTML = `
      <header class="sch-head">
        <h3>${e(`Schematic`)}</h3>
        <span class="sch-lesson"></span>
        <button class="sch-close" type="button" aria-label="${e(`Close schematic`)}"><svg viewBox="0 0 24 24"><path d="m7 7 10 10M17 7 7 17"/></svg></button>
      </header>
      <div class="sch-body"></div>`),
      (this.body = t.querySelector(`.sch-body`)),
      (this.title = t.querySelector(`.sch-lesson`)),
      t.querySelector(`.sch-close`).addEventListener(`click`, () => i?.()),
      this.body.addEventListener(`pointerover`, (e) => {
        let t = e.target.closest(`.sym`)?.dataset.part || null;
        t !== this.hot && ((this.hot = t), this.onHover?.(t));
      }),
      this.body.addEventListener(`pointerleave`, () => {
        ((this.hot = null), this.onHover?.(null));
      }),
      this.body.addEventListener(`click`, (e) => {
        let t = e.target.closest(`.sym`)?.dataset.part;
        t && this.onSelect?.(t);
      }),
      (this.open = !1),
      (this.active = {}),
      (this.state = []));
  }
  get isOpen() {
    return this.open;
  }
  setOpen(e) {
    if (e === this.open) return;
    this.open = e;
    let t = this.root;
    (t.classList.toggle(`is-on`, e),
      t.classList.toggle(`is-closing`, !e),
      e ||
        (t.addEventListener(
          `animationend`,
          () => t.classList.remove(`is-closing`),
          {
            once: !0,
          },
        ),
        setTimeout(() => t.classList.remove(`is-closing`), 400)),
      e && this.render());
  }
  setLesson(e, t) {
    ((this.lesson = e), (this.values = t), this.open && this.render());
  }
  setValues(e) {
    ((this.values = e), this.open && this.render());
  }
  render() {
    if (!this.lesson) return;
    let e = at[this.lesson.id];
    ((this.title.textContent = this.lesson.title),
      e
        ? ((this.drawn = _t(e, this.values ?? {})),
          (this.body.innerHTML = this.drawn.svg),
          (this.wires = [...this.body.querySelectorAll(`.w[data-n]`)]),
          (this.flows = [...this.body.querySelectorAll(`.flow`)]),
          (this.pinvals = [...this.body.querySelectorAll(`.pinval`)]),
          (this.state = []),
          (this.active = {}))
        : ((this.body.innerHTML = `<p class="sch-none">No circuit in this lesson.</p>`),
          (this.drawn = null)));
  }
  size(e, t) {
    if (!this.drawn)
      return {
        w: e,
        h: 80,
      };
    let n = Math.min(
      1.5,
      (e - 24) / this.drawn.w,
      (t - 40 - 16) / this.drawn.h,
    );
    return {
      w: e,
      h: Math.round(54 + this.drawn.h * n),
    };
  }
  update(e) {
    if (!this.open || !this.drawn) return;
    let t = this.drawn.nets,
      n = e ? st(e) : 0;
    t.forEach((t, r) => {
      let i = ``,
        a = 0,
        o = !!t.rev;
      if (e) {
        if (t.role === `sig`) {
          let n = A(t.pin, e);
          ((i = n?.kind ?? `low`),
            (a = n?.flow ?? 0),
            t.pinDir && n?.into && (o = !o));
        } else
          t.role === `power`
            ? ((i = `power`),
              (a = t.follow ? (A(t.follow, e)?.flow ?? 0) : 0.4))
            : ((i = `gnd`), (a = t.follow ? (A(t.follow, e)?.flow ?? 0) : n));
      }
      let s = a > 0.02,
        c = `${i}|${s ? (Math.round(a * 10) / 10).toFixed(1) : 0}|${o}`;
      if (this.state[r] === c) return;
      this.state[r] = c;
      let l = this.wires[r],
        u = this.flows[r];
      (l.setAttribute(`class`, `w${i ? ` is-${i}` : ``}`),
        u.setAttribute(`class`, `flow${s ? ` is-on` : ``}`),
        (u.style.animationDuration = s
          ? `${(22 / (14 + 70 * a)).toFixed(2)}s`
          : ``),
        (u.style.animationDirection = o ? `reverse` : ``));
    });
    for (let t of this.pinvals) {
      let n = e ? A(t.dataset.pin, e) : null,
        r = n && !/^GND/.test(t.dataset.pin) ? n.text : ``;
      (t.textContent !== r && (t.textContent = r),
        t.setAttribute(`class`, `pinval${n ? ` is-${n.kind}` : ``}`));
    }
  }
  setActive(e, t) {
    if (
      this.open &&
      this.drawn &&
      (this.active.selected !== e || this.active.hot !== t)
    ) {
      this.active = {
        selected: e,
        hot: t,
      };
      for (let n of this.body.querySelectorAll(`.sym`)) {
        let r = n.dataset.part;
        (n.classList.toggle(`is-sel`, !!r && r === e),
          n.classList.toggle(`is-hot`, !!r && r === t && r !== e));
      }
    }
  }
};
export {
  at as circuits,
  ct as symbolWidths,
  j as rowGap,
  lt as wireGap,
  ut as boardWidth,
  dt as leftMargin,
  ft as rightMargin,
  pt as pwmPins,
  mt as resolveValue,
  M as escapeAttribute,
  ht as pinLabel,
  gt as renderSymbol,
  _t as renderCircuit,
  st as signalStrength,
  vt as Schematic,
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
};
