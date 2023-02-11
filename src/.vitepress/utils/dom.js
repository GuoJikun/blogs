export function findBrothersElement(el) {
  const parent = el.parentElement || el.parentNode;
  const children = parent.children || parent.childNodes;
  return [...children].filter((c) => {
    return c.nodeType === 1;
  });
}
