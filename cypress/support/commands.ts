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
      EntBlocksCheck(): Chainable<JQuery<HTMLElement>>
      AttestationBlocksCheck(): Chainable<JQuery<HTMLElement>>
    }
  }
}

// To use cy selectors easly
Cypress.Commands.add("getByData", (selector) => {
  return cy.get(`[data-test=${selector}]`)
})
// cy.auth(1) -subscription on, cy.auth(2) -without subscription
Cypress.Commands.add("auth", (i) => {
  cy.visit('/')
  // with subscription
  if (i === 1) {
    // click on auth button
    cy.get('.login-panel__enter > i').click({force:true})
    // enter the phone as login
    cy.get('#login').type('7756456689')
    // enter password
    cy.get('#password').type('123456A')
    // click login button
    cy.get('.ol-form-field > .ol-btn').click()
    cy.testActiveCheck()
    // check auth
    cy.get('.login-panel__enter > span').should('not.contain', 'Войти')
  }
// without subscription
  if (i === 0) {
    // click on auth button
    cy.get('.login-panel__enter > i').click()
    // enter the phone as login
    cy.get('#login').type('7073201781')
    // enter password
    cy.get('#password').type('123456A')
    // click login button
    cy.get('.ol-form-field > .ol-btn').click()
    // check auth
    cy.get('.login-panel__enter > span').should('not.contain', 'Войти')
  }
})

Cypress.Commands.add('testActiveCheck', () => {
  cy.get("body").then($body => {
    if ($body.find(".test-container").length > 0) {   
      cy.get('.test-container__end').dblclick({force:true})
      cy.get('#test-end > .modal-dialog > .modal-content > .modal-footer > .button_theme_orange').click()
      cy.wait(2000)
    }
  })
})

Cypress.Commands.add('EntBlocksCheck', () => {
  for (let i = 0; i < 15; i++) {
    cy.get(':nth-child(7) > .title-inner > .title > span').contains('ЕНТ')
        cy.get('.subject-block__bg').eq(i).click({force:true})
        cy.location('pathname').should('contain', '/ru/ent/')
        cy.get('.footer-top > .footer-inner').should('be.visible')
        cy.go("back")
  }
})

Cypress.Commands.add('AttestationBlocksCheck', () => {
  for (let i = 16; i < 30; i++) {
    cy.get('.subject-block__bg').eq(i).click({force:true})
    cy.location('pathname').should('contain', '/ru/attestation/')
    cy.get('.footer-top > .footer-inner').should('be.visible')
    cy.go("back")
  }
})
