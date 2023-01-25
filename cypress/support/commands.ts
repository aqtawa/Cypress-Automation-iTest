/// <reference types="cypress" />
export{}
Cypress.on('uncaught:exception', (err, runnable) => {
  // returning false here prevents Cypress from
  // failing the test
  return false
})


// To avoid TS type-errors
declare global {
  namespace Cypress {
    interface Chainable {
      getByData(value: any): Chainable<JQuery<HTMLElement>>
      auth(value: any): Chainable<JQuery<HTMLElement>>
      testActiveCheck(): Chainable<JQuery<HTMLElement>>
    }
  }
}

// To use cy selectors easly
Cypress.Commands.add("getByData", (selector) => {
  return cy.get(`[data-test=${selector}]`)
})
// auth(1)-subscription on | auth(2)-without subscription
Cypress.Commands.add("auth", (i) => {
  // with subscription
  if (i === 1) {
    // click on auth button
    cy.get('.login-panel__enter > i').click()
    // enter the phone as login
    cy.get('#phone').type('7756456689')
    // enter password
    cy.get('.password-block > .c-input').type('123456A')
    // click login button
    cy.get('#auth-form > .c-button').click()
    // check auth
    cy.get('.login-panel__enter > span').should('not.contain', 'Войти')
  }
// without subscription
  if (i === 0) {
    // click on auth button
    cy.get('.login-panel__enter > i').click()
    // enter the phone as login
    cy.get('#phone').type('7073201781')
    // enter password
    cy.get('.password-block > .c-input').type('123456A')
    // click login button
    cy.get('#auth-form > .c-button').click()
    // check auth
    cy.get('.login-panel__enter > span').should('not.contain', 'Войти')
  }
})

Cypress.Commands.add('testActiveCheck', () => {
  cy.get("body").then($body => {
    if ($body.find(".test-container").length > 0) {   
      cy.get('.test-container__end').dblclick({force:true})
      cy.get('#test-end > .modal-dialog > .modal-content > .modal-footer > .button_theme_orange').click()
      cy.wait(3000)
    }
  })
})