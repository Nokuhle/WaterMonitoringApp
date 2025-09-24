// Mock Chart.js
class Chart {
  constructor(ctx, config) {
    this.ctx = ctx
    this.config = config
  }
  update() {}
  destroy() {}
}
global.Chart = Chart

// Mock DOM elements
global.document = {
  getElementById: jest.fn(() => ({
    getContext: jest.fn(() => ({})),
    classList: { add: jest.fn(), remove: jest.fn() }
  })),
  querySelector: jest.fn(),
  querySelectorAll: jest.fn()
}