const test = require('ava')
const Perentile = require('../dist/percentile')

const test_data_1 = [2, 3, 5, 5, 5, 7, 20, 21]
const test_data_2 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]

const PList = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]

test('test data_1', (t) => {
  const percentile = new Perentile(test_data_1)
  // percentile.init(test_data_1)

  // var vals = percentile.values(PList)
  var incs = percentile.incValues(PList)
  var excs = percentile.excValues(PList)

  // t.deepEqual(vals, [2, 2.7, 3.8, 5, 5, 5, 5.4, 6.8, 14.8, 20.3, 21])
  t.deepEqual(incs, [2, 2.7, 3.8, 5, 5, 5, 5.4, 6.8, 14.8, 20.3, 21])
  t.deepEqual(excs, ['#NUM!', '#NUM!', 2.8, 4.4, 5, 5, 5.8, 10.9, 20.2, '#NUM!', '#NUM!'])

  t.pass()
})

test('test data_2', (t) => {
  const percentile = new Perentile(test_data_2)
  // percentile.init(test_data_2)

  // var vals = percentile.values(PList)
  var incs = percentile.incValues(PList)
  var excs = percentile.excValues(PList)

  // t.deepEqual(vals, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11])
  t.deepEqual(incs, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11])
  t.deepEqual(excs, ['#NUM!', 1.2, 2.4, 3.6, 4.8, 6, 7.2, 8.4, 9.6, 10.8, '#NUM!'])

  t.pass()
})