/**
 * 洗牌算法
 * http://rosettacode.org/wiki/Knuth_shuffle
 */
export function shuffle (list) {
  // 复制列表，防止对原始列表进行操作
  const arr = list.slice()

  for (let i = 0; i < arr.length; i++) {
    // 获取索引范围内的随机值
    const j = getRandomInt(i)

    swap(arr, i, j)
  }

  return arr
}

function getRandomInt (max) {
  return Math.floor(Math.random() * (max + 1))
}

/**
 * 元素交换
 */
function swap (arr, i, j) {
  const item = arr[i]
  arr[i] = arr[j]
  arr[j] = item
}
