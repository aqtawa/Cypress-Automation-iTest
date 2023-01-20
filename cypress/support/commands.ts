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
      authSub(value: any): Chainable<JQuery<HTMLElement>>
      authNoSub(value: any): Chainable<JQuery<HTMLElement>>
    }
  }
}

// To use cy selectors easly
Cypress.Commands.add("getByData", (selector) => {
  return cy.get(`[data-test=${selector}]`)
})

Cypress.Commands.add("authSub", () => {
  // click on auth button
  cy.get('.login-panel__enter > span').contains('Войти').click()
  // enter the phone as login
  cy.get('#phone').type('7756456689')
  // enter password
  cy.get('.password-block > .c-input').type('123456A')
  // click login button
  cy.get('#auth-form > .c-button').click()
  // check auth
  cy.get('.login-panel__enter > span').should('not.contain', 'Войти')
})

Cypress.Commands.add("authNoSub", () => {
  // click on auth button
  cy.get('.login-panel__enter > span').contains('Войти').click()
  // enter the phone as login
  cy.get('#phone').type('7073201781')
  // enter password
  cy.get('.password-block > .c-input').type('123456A')
  // click login button
  cy.get('#auth-form > .c-button').click()
  // check auth
  cy.get('.login-panel__enter > span').should('not.contain', 'Войти')
})

