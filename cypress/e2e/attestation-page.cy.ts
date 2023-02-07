export{}

describe('With sub auth', () => {
    beforeEach(() => {
        cy.visit('https://itest.dev-bmg.kz/ru')
        cy.auth(1)
        cy.visit('https://itest.dev-bmg.kz/ru/attestation')
    })

    it('Full attestation button', () => {
        cy.get('[href="/ru/attestation/russkaya-literatura"] > .subject-block__image > .subject-block__icon').click()
        cy.get('.study-class-select__bottom > .button-wrapper > .button').click()
        cy.get('#attestation-subject-test > .modal-dialog > .modal-content > .modal-body > .button-wrapper > [data-mode="ogn"]').should('contain.text', 'ОГН')
        cy.get('#attestation-subject-test > .modal-dialog > .modal-content > .modal-body > .button-wrapper > [data-mode="emn"]').should('contain.text', 'ЕМН')
        cy.get('#attestation-subject-test > .modal-dialog > .modal-content > .modal-body > .button-wrapper > [data-mode="ogn"]').click()
        cy.get('.test-container__study-subject > .__status').should('contain.text', 'Активен')
    });
})