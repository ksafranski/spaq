const api = {
  controller: {
    test: {
      getAllFoos: () => Promise.resolve({
        Items: [ { name: 'foo' }, { name: 'bar' } ],
        LastEvaluatedKey: 1,
        TotalRecords: 2
      }),
      postFoo: () => Promise.resolve({ name: 'foo' }),
      getFoo: () => Promise.resolve({ name: 'foo' }),
      updateFoo: () => Promise.resolve({ name: 'foo' }),
      deleteFoo: () => Promise.reject(new Error('fail'))
    }
  }
}

module.exports = api
