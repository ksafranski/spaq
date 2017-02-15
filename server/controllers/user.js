const user = {
  get: () => Promise.resolve().then(() => {
    return true
  }),
  post: () => Promise.resolve().then(() => {
    return true
  }),
  put: () => Promise.resolve().then(() => {
    return true
  }),
  delete: () => Promise.resolve().then(() => {
    return true
  })
}

module.exports = user
