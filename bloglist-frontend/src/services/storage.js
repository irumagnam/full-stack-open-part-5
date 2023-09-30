const add = (key, value) => {
  window.localStorage.setItem(key, value)
}

const remove = (key) => {
  window.localStorage.removeItem(key)
}

const get = (key) => {
  return window.localStorage.getItem(key)
}

export default {
  add,
  remove,
  get,
}