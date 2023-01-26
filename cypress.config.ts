export default{
  projectId: 'IhRG9B', // cypress sorry
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: 'https://itest.dev-bmg.kz/ru',
    screenshotsFolder: 'cypress/screenshots',
    screenshotOnRunFailure: true,
    videosFolder: 'cypress/videos',
    videoCompression: false,
    video: true,
    videoUploadOnPasses: true,
    downloadsFolder: 'cypress/downloads',
    viewportWidth: 1000,
    viewportHeight: 660,
    waitForAnimations: true,
    scrollBehavior: 'center'
  },
};