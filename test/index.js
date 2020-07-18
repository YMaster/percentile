const test = require('ava')
const Perentile = require('../commonjs/percentile')

const test_data_1 = [2, 3, 5, 5, 5, 7, 20, 21]
const test_data_2 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]

const PList = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]

test('test data_1', (t) => {
  const percentile = new Perentile(test_data_1)
  // percentile.init(test_data_1)

  var incs = percentile.incValues(PList)
  var excs = percentile.excValues(PList)

  t.deepEqual(incs, [2, 2.7, 3.8, 5, 5, 5, 5.4, 6.8, 14.8, 20.3, 21])
  t.deepEqual(excs, ['#NUM!', '#NUM!', 2.8, 4.4, 5, 5, 5.8, 10.9, 20.2, '#NUM!', '#NUM!'])

  t.pass()
})

test('test data_2', (t) => {
  const percentile = new Perentile(test_data_2)
  // percentile.init(test_data_2)

  var incs = percentile.incValues(PList)
  var excs = percentile.excValues(PList)

  t.deepEqual(incs, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11])
  t.deepEqual(excs, ['#NUM!', 1.2, 2.4, 3.6, 4.8, 6, 7.2, 8.4, 9.6, 10.8, '#NUM!'])

  t.pass()
})

test('test once_data', (t) => {

  const percentile = new Perentile()

  var data_1_incs = percentile.incsOnce(test_data_1, PList)
  var data_1_excs = percentile.excsOnce(test_data_1, PList)
  var data_2_incs = percentile.incsOnce(test_data_2, PList)
  var data_2_excs = percentile.excsOnce(test_data_2, PList)

  t.deepEqual(data_1_incs, [2, 2.7, 3.8, 5, 5, 5, 5.4, 6.8, 14.8, 20.3, 21])
  t.deepEqual(data_1_excs, ['#NUM!', '#NUM!', 2.8, 4.4, 5, 5, 5.8, 10.9, 20.2, '#NUM!', '#NUM!'])
  t.deepEqual(data_2_incs, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11])
  t.deepEqual(data_2_excs, ['#NUM!', 1.2, 2.4, 3.6, 4.8, 6, 7.2, 8.4, 9.6, 10.8, '#NUM!'])

  t.pass()
})

test('test once_not_recover_init', (t) => {

  const percentile = new Perentile(test_data_1)

  var data_1_incs = percentile.incValues(PList)
  t.deepEqual(data_1_incs, [2, 2.7, 3.8, 5, 5, 5, 5.4, 6.8, 14.8, 20.3, 21])

  var data_2_incs = percentile.incsOnce(test_data_2, PList)
  t.deepEqual(data_2_incs, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11])
  var data_2_incs = percentile.excsOnce(test_data_2, PList)
  t.deepEqual(data_2_incs, ['#NUM!', 1.2, 2.4, 3.6, 4.8, 6, 7.2, 8.4, 9.6, 10.8, '#NUM!'])

  data_1_incs = percentile.incValues(PList)
  t.deepEqual(data_1_incs, [2, 2.7, 3.8, 5, 5, 5, 5.4, 6.8, 14.8, 20.3, 21])
  var data_1_excs = percentile.excValues(PList)
  t.deepEqual(data_1_excs, ['#NUM!', '#NUM!', 2.8, 4.4, 5, 5, 5.8, 10.9, 20.2, '#NUM!', '#NUM!'])

  t.pass()
})