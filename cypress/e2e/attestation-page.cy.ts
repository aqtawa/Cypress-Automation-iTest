export{}

describe('With sub auth', () => {
    beforeEach(() => {
        cy.auth(1)
        cy.visit('/attestation')
    })
    context('Web version', () => {
        it('Full attestation button', () => {
            cy.get('[href="/ru/attestation/russkaya-literatura"] > .subject-block__image > .subject-block__icon').click()
            cy.get('.study-class-select__bottom > .button-wrapper > .button').click()
            cy.get('#attestation-subject-test > .modal-dialog > .modal-content > .modal-body > .button-wrapper > [data-mode="ogn"]').should('contain.text', 'ОГН')
            cy.get('#attestation-subject-test > .modal-dialog > .modal-content > .modal-body > .button-wrapper > [data-mode="emn"]').should('contain.text', 'ЕМН')
            cy.get('#attestation-subject-test > .modal-dialog > .modal-content > .modal-body > .button-wrapper > [data-mode="ogn"]').click()
            cy.get('.test-container__study-subject > .__status').should('contain.text', 'Активен')
        });
    });
    context('Mobile version', () => {
        beforeEach(() => {
            cy.viewport('iphone-6')
        });
        it('Full attestation button', () => {
            cy.get('[href="/ru/attestation/russkaya-literatura"] > .subject-block__image > .subject-block__icon').click()
            cy.get('.study-class-select__bottom > .button-wrapper > .button').click()
            cy.get('#attestation-subject-test > .modal-dialog > .modal-content > .modal-body > .button-wrapper > [data-mode="ogn"]').should('contain.text', 'ОГН')
            cy.get('#attestation-subject-test > .modal-dialog > .modal-content > .modal-body > .button-wrapper > [data-mode="emn"]').should('contain.text', 'ЕМН')
            cy.get('#attestation-subject-test > .modal-dialog > .modal-content > .modal-body > .button-wrapper > [data-mode="ogn"]').click()
            cy.get('.test-container__study-subject > .__status').should('contain.text', 'Активен')
        });
    });
    
})

describe('Without sub auth', () => {
    beforeEach(() => {
        cy.auth(0)
        cy.visit('/attestation')
    })
    context('Web version', () => {
        it('Full attestation button', () => {
            cy.get('[href="/ru/attestation/russkaya-literatura"] > .subject-block__image > .subject-block__icon').click()
            cy.get('.study-class-select__bottom > .button-wrapper > .button').click()
            cy.get('#attestation-subject-test > .modal-dialog > .modal-content > .modal-body > .button-wrapper > [data-mode="ogn"]').click()
            cy.get('#required-subscribe > .modal-dialog > .modal-content > .modal-header > .modal-title').should('contain.text', 'Необходима активная подписка')
        });
    });
    context('Mobile version', () => {
        beforeEach(() => {
            cy.viewport('iphone-6')
        });
        it('Full attestation button', () => {
            cy.get('[href="/ru/attestation/russkaya-literatura"] > .subject-block__image > .subject-block__icon').click()
            cy.get('.study-class-select__bottom > .button-wrapper > .button').click()
            cy.get('#attestation-subject-test > .modal-dialog > .modal-content > .modal-body > .button-wrapper > [data-mode="ogn"]').click()
            cy.get('#required-subscribe > .modal-dialog > .modal-content > .modal-header > .modal-title').should('contain.text', 'Необходима активная подписка')
        });
    });

    
})

describe('No auth', () => {
    beforeEach(() => {
        cy.visit('/attestation')
    });
    context('Web version', () => {
        it('Full attestation button', () => {
            cy.get('[href="/ru/attestation/russkaya-literatura"] > .subject-block__image > .subject-block__icon').click()
            cy.get('.study-class-select__bottom > .button-wrapper > .button').click()
            cy.get('#attestation-subject-test > .modal-dialog > .modal-content > .modal-body > .button-wrapper > [data-mode="ogn"]').click()
            cy.get('#required-subscribe > .modal-dialog > .modal-content > .modal-header > .modal-title').should('contain.text', 'Необходима активная подписка')
        });
    });
    context('Mobile version', () => {
        beforeEach(() => {
            cy.viewport('iphone-6')
        });
        it('Full attestation button', () => {
            cy.get('[href="/ru/attestation/russkaya-literatura"] > .subject-block__image > .subject-block__icon').click()
            cy.get('.study-class-select__bottom > .button-wrapper > .button').click()
            cy.get('#attestation-subject-test > .modal-dialog > .modal-content > .modal-body > .button-wrapper > [data-mode="ogn"]').click()
            cy.get('#required-subscribe > .modal-dialog > .modal-content > .modal-header > .modal-title').should('contain.text', 'Необходима активная подписка')
        });
    });
});