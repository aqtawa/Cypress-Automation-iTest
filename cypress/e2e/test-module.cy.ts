export{}

describe('Functional interaction with test module', () => {

    beforeEach(() => {
        cy.visit('https://itest.dev-bmg.kz/ru')
        cy.auth(1)
        cy.testActiveCheck()
        cy.get('.header-inner > .button').click()
        cy.get('#full-ent-test > .modal-dialog > .modal-content').should('be.visible')
        cy.get('[data-node-alias="biology"] > .study-block__title').click()
        cy.get('[data-node-alias="chemistry"] > .study-block__title').click()
        cy.get('#full-ent-test > .modal-dialog > .modal-content > .modal-footer > .button').click()
        cy.get('.test-container__wrapper-hidden').should('be.visible')
    })

    it('Check back/forward tests button', () => {
        cy.get('.process-footer__navigation-num').should('contain.text', '1 / 15')
        cy.get('.button-nav_theme_next').click()
        cy.get('.process-footer__navigation-num').should('contain.text', '2 / 15')
        cy.get('.button-nav_theme_prev').click()
        cy.get('.process-footer__navigation-num').should('contain.text', '1 / 15')
    })

    it('Check the "answers-map"', () => {
        cy.get('.map-questions__switcher').dblclick({force:true})
        cy.get('#etq_6').click()
        cy.get('.process-footer__navigation-num').should('contain.text', '6 / 15')
        cy.get('#etq_15').click()
        cy.get('.process-footer__navigation-num').should('contain.text', '15 / 15')
    })

    it('Check select/reselect answer', () => {
        cy.get(':nth-child(1) > [data-var-answer="a"]').click()
        cy.get(':nth-child(1) > [data-var-answer="a"]').should('have.class', 'is-active')
        cy.get(':nth-child(1) > [data-var-answer="b"]').click()
        cy.get(':nth-child(1) > [data-var-answer="b"]').should('have.class', 'is-active')
        cy.get(':nth-child(1) > [data-var-answer="a"]').should('not.have.class', 'is-active')
    })

    it('Select subject questions inside test', () => {
        cy.get('.process-footer__navigation-num').should('contain.text', '15 / 15')
        cy.get('[data-number="4"] > .study-block__image > .study-block__image-wrapper').click()
        cy.get('.process-footer__navigation-num').should('contain.text', '1 / 30')
        cy.get('.map-questions__switcher').dblclick({force:true})
        cy.get('#etq_30').click()
        cy.get('.process-footer__navigation-num').should('contain.text', '30 / 30')
        cy.get('.button-nav_theme_next').click()
        cy.get('#test-end > .modal-dialog > .modal-content > .modal-footer > .button_theme_orange').click()
        cy.get('#url-exit', {timeout:10000}).click()
        cy.location('hostname').should('contain', 'itest.dev-bmg.kz')
    });

})