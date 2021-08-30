function typeOf(arg) {
  if (arg !== arg) {
    return "NaN";
  } else {
    return Object.prototype.toString
      .call(arg)
      .replace(/^(\[[a-z]+\W)([A-Za-z]+)(\])$/, "$2");
  }
}

export function isFunction(arg) {
  return typeOf(arg) === "Function";
}

export function isObject(arg) {
  return typeOf(arg) === "Object";
}
