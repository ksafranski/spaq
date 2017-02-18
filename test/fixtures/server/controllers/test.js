const test = {
  getAllFoos: () => Promise.resolve({
    Items: [ { name: 'foo' }, { name: 'bar' } ],
    LastEvaluatedKey: 1,
    TotalRecords: 2
  }),
  postFoo: () => Promise.resolve({ name: 'foo' }),
  getFoo: () => Promise.resolve(),
  updateFoo: () => Promise.resolve({ name: 'foo' }),
  deleteFoo: () => Promise.resolve('Ok')
}

module.exports = test
