// GENERATED from the fresh immutable deployment. Edit the recovery recipe, not this file.
var ot = new Set([`5V`, `3V3`, `VIN`]);
function A(e, t) {
  if (ot.has(e))
    return {
      kind: `power`,
      text: e === `3V3` ? `3.3 V` : `5 V`,
      flow: 0.45,
      into: !1,
    };
  if (/^GND/.test(e))
    return {
      kind: `gnd`,
      text: `GND`,
      flow: 0,
      into: !0,
    };
  let n = t?.[e];
  if (!n) return null;
  let r = n.v;
  if (n.mode === `pullup`) {
    let e = r > 0.5;
    return {
      kind: e ? `high` : `low`,
      text: e ? `HIGH` : `LOW`,
      flow: e ? 0 : 0.25,
      into: !1,
    };
  }
  let i = n.mode === `in` || n.mode === `analog`,
    a;
  a =
    n.mode === `pwm`
      ? r <= 0
        ? `LOW`
        : r >= 1
          ? `HIGH`
          : `PWM ${Math.round(r * 100)}%`
      : n.mode === `out` || (n.mode === `in` && !n.text)
        ? r > 0.5
          ? `HIGH`
          : `LOW`
        : (n.text ?? (r > 0.5 ? `HIGH` : `LOW`));
  let o = i ? (n.mode === `analog` ? 0.12 + 0.2 * r : r * 0.3) : r;
  return {
    kind: n.mode === `analog` ? `analog` : r > 0.02 ? `high` : `low`,
    text: a,
    flow: o,
    into: i,
  };
}
export { ot as powerPins, A as pinSignal };
