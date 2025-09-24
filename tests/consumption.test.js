const { getChartData, getPieChartData } = require('../app/consumption-interactivity.js')

describe('Consumption Page', () => {
  test('Generates day chart data', () => {
    const data = getChartData('day')
    expect(data.labels.length).toBe(24)
    expect(data.datasets[0].data.length).toBe(24)
  })

  test('Calculates pie chart data', () => {
    const data = getPieChartData('week')
    expect(data.labels).toEqual(['Shower', 'Kitchen', 'Garden', 'Other'])
    expect(data.datasets[0].data.length).toBe(4)
  })
})