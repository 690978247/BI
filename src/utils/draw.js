const DK = {t: 'n', b: 's', l: 'w', r: 'e'} // 上下左右 对应的 东南西北
export const convertPointStyle = (point, defaultStyle, directionKey = DK) => {
  const pos = defaultStyle
  const height = pos.height
  const width = pos.width
  let hasT = /t/.test(point)
  let hasB = /b/.test(point)
  let hasL = /l/.test(point)
  let hasR = /r/.test(point)
  let newLeft = 0
  let newTop = 0
  if (point.length === 2) {
    newLeft = hasL ? 0 : width
    newTop = hasT ? 0 : height
  } else {
    // !#zh 上下点，宽度固定在中间
    if (hasT || hasB) {
      newLeft = width / 2
      newTop = hasT ? 0 : height
    }
    // !#zh 左右点，高度固定在中间
    if (hasL || hasR) {
      newLeft = hasL ? 0 : width
      newTop = height / 2
    }
  }
  const style = {
    marginLeft: (hasL || hasR) ? '-5px' : 0,
    marginTop: (hasT || hasB) ? '-4px' : 0,
    left: `${newLeft}px`,
    top: `${newTop}px`,
    cursor: point.split('').reverse().map(m => directionKey[m]).join('') + '-resize'
  }
  return style
}