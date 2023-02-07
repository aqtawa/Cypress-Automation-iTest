export{}

describe('Functional testing', () => {
    beforeEach(() => {
        cy.visit('https://itest.dev-bmg.kz/ru/subscribe')

    })

    it('Subscription options buttons', () => {
        cy.get('[data-id="301"]').click()
        cy.get('[data-id="301"]').should('have.class', 'is-active')
        cy.get('[data-id="302"]').click()
        cy.get('[data-id="302"]').should('have.class', 'is-active')
        cy.get('[data-id="301"]').should('not.have.class', 'is-active')
        cy.get('[data-id="303"]').click()
        cy.get('[data-id="303"]').should('have.class', 'is-active')
        cy.get('[data-id="304"]').click()
        cy.get('[data-id="304"]').should('have.class', 'is-active')
    });

    it('Pay options buttons', () => {
        cy.get('[data-id="304"]').click()
        cy.get('[data-pay-type="epay"]').click()
        cy.get('[data-pay-type="epay"]').should('have.class', 'is-active')

        cy.get('[data-pay-type="qiwi_terminal"]').click()
        cy.get('[data-pay-type="qiwi_terminal"]').should('have.class', 'is-active')

        cy.get('[data-pay-type="qiwi_wallet"]').click()
        cy.get('[data-pay-type="qiwi_wallet"]').should('have.class', 'is-active')

        cy.get('[data-pay-type="kaspi"]').click()
        cy.get('[data-pay-type="kaspi"]').should('have.class', 'is-active')

        cy.get('[data-pay-type="kassa24"]').click()
        cy.get('[data-pay-type="kassa24"]').should('have.class', 'is-active')
         
        cy.get('[data-pay-type="balance"]').click()
        cy.get('[data-pay-type="balance"]').should('have.class', 'is-active')
        cy.get('#required-subscribe > .modal-dialog > .modal-content > .modal-header > .modal-title').should('be.visible')
    });
})