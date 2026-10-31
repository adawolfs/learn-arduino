/** Create a fresh parameter map, preserving the lesson's original value types. */
export function createDefaultParameters(lesson) {
  return Object.fromEntries(
    (lesson.params ?? []).map((parameter) => [parameter.key, parameter.value]),
  );
}

/** Resolve option-code fields first; option values use strict equality. */
export function resolveOptionCode(lesson, values) {
  return lesson.code.replace(
    /\{\{(\w+)\.(\w+)\}\}/g,
    (_token, key, field) =>
      lesson.params
        ?.find((parameter) => parameter.key === key)
        ?.options?.find((option) => option.value === values[key])?.code?.[
        field
      ] ?? "",
  );
}

/** Produce the plain sketch copied by the recovered code controller. */
export function interpolateSketch(lesson, values) {
  return resolveOptionCode(lesson, values).replace(
    /\{\{(\w+)\}\}/g,
    (_token, key) => String(values[key] ?? ""),
  );
}
