import storage from 'good-storage'

/**
 * 保存元素到数组，
 * @param key 存储数据的 key
 * @param item 待存储的值
 * @param compare 外部传入的元素比对函数
 */
export function save (key, item, compare) {
  // 尝试获取数据，没有则返回空数组
  const items = storage.get(key, [])

  // 当前没有数据
  if (items.length === 0) {
    // 重置初始化时的第一个元素
    items[0] = item
    // 更新缓存中的数据
    storage.set(key, items)

    return items
  }

  // 元素已存在
  const existItem = items.find(compare)
  if (existItem) {
    return items
  }

  // 新元素添加到第一个
  items.unshift(item)
  // 更新缓存中的数据
  storage.set(key, items)

  return items
}

export function remove (key, compare) {
  const items = storage.get(key)

  // 元素不存在
  const index = items.findIndex(compare)
  if (index === -1) {
    return items
  }

  // 删除该元素
  items.splice(index, 1)
  // 更新缓存中的数据
  storage.set(key, items)

  return items
}
