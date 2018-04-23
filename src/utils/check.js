const checkInter = (l, r, L, R) => {
  if (l >= L && r < R) return true
  if (l >= L && l < R) return true
  if (r >= L && r < R) return true
  if (L >= l && R < r) return true
  return false
}

export { checkInter }