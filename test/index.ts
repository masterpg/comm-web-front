(async () => {
  mocha.setup({ ui: 'tdd' })

  await Promise.all([import('./location')])

  mocha.run()
})()
