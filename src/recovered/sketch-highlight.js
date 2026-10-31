// GENERATED from the fresh immutable deployment. Edit the recovery recipe, not this file.
var be = new Set([
  `void`,
  `int`,
  `long`,
  `const`,
  `for`,
  `if`,
  `else`,
  `while`,
  `return`,
  `unsigned`,
  `bool`,
  `float`,
  `char`,
  `byte`,
  `sizeof`,
  `Servo`,
]);
var xe = new Set([
  `HIGH`,
  `LOW`,
  `INPUT`,
  `OUTPUT`,
  `INPUT_PULLUP`,
  `LED_BUILTIN`,
  `A0`,
  `true`,
  `false`,
]);
var Se = ``;
var Ce =
  /(\/\/.*$)|("(?:[^"\\]|\\.)*")|\u0001(\w+)\u0002|(\b\d+\b)|([A-Za-z_]\w*)(\s*\()?|([^\w"/\u0001]+|\/)/gm;
var we = /[\u0590-\u08ff]/;
var C = (e) =>
  e.replace(/&/g, `&amp;`).replace(/</g, `&lt;`).replace(/>/g, `&gt;`);
function Te(e, t) {
  let n = /^(\s*)(#\w+)(.*)$/.exec(e);
  if (n)
    return `${n[1]}<span class="kw">${n[2]}</span><span class="str">${C(n[3])}</span>`;
  let r = ``;
  Ce.lastIndex = 0;
  let i;
  for (; (i = Ce.exec(e));) {
    let [, e, n, a, o, s, c, l] = i;
    if (e) {
      let [, t, n] = /^(\/\/\s*)(.*)$/.exec(e);
      r += `<span class="cm">${t}${we.test(n) ? `<bdi dir="rtl">${C(n)}</bdi>` : C(n)}</span>`;
    } else if (n) r += `<span class="str">${C(n)}</span>`;
    else if (a)
      r += `<button type="button" class="param" data-param="${a}" title="Click to change">${C(String(t[a] ?? ``))}</button>`;
    else if (o) r += `<span class="num">${o}</span>`;
    else if (s) {
      let e = `id`;
      (be.has(s) || xe.has(s)
        ? (e = `kw`)
        : c && s !== `setup` && s !== `loop` && (e = `fn`),
        (r += `<span class="${e}">${s}</span>${c ? C(c) : ``}`));
    } else l && (r += C(l));
    i[0] === `` && Ce.lastIndex++;
  }
  return r;
}
function Ee(e, t = {}) {
  return e
    .replace(/\{\{(\w+)\}\}/g, `${Se}$1\u0002`)
    .split(
      `
`,
    )
    .map(
      (e, n) =>
        `<span class="line"><span class="ln">${n + 1}</span>${Te(e, t) || ` `}</span>`,
    )
    .join(``);
}
export {
  be as keywords,
  xe as constants,
  Se as tokenMarker,
  Ce as tokenPattern,
  we as rtlPattern,
  C as escapeHtml,
  Te as highlightLine,
  Ee as highlightSketch,
};
