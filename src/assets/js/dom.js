/**
 * 添加 ClassName
 */
export function addClass (el, className) {
  if (!el.classList.contains(className)) {
    el.classList.add(className)
  }
}

/**
 * 移除 ClassName
 */
export function removeClass (el, className) {
  el.classList.remove(className)
}
