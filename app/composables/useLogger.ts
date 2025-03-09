export function useLogger(enabled = true) {
  const disabled = false
  const empty = (..._args: any[]) => {
    return
  }
  const allowed = computed(() => import.meta.env.DEV && enabled && !disabled)

  const l = allowed.value ? console.log : empty
  const t = allowed.value ? console.trace : empty
  const d = allowed.value ? console.debug : empty
  const e = allowed.value ? console.error : empty
  const w = allowed.value ? console.warn : empty
  const i = allowed.value ? console.info : empty

  // when use as useLogger()('hello world') should just use the i logger

  return Object.assign(i, {
    l,
    i,
    w,
    e,
    t,
    d
  })
  // return {
  //   l,
  //   i,
  //   w,
  //   e,
  //   t,
  //   d
  // }
}
