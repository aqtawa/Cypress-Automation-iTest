import { it } from "mocha"

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
        cy.get('.process-footer__navigation-num').should('contain.text', '1 / 15')
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

    it ('Hide text button', () => {
        cy.get('[data-number="1"] > .study-block__image > .study-block__image-wrapper').click()
        cy.get('#test-longtext > :nth-child(2) > .button').should('contain.text', 'Скрыть текст')
        cy.get('#test-longtext > :nth-child(2) > .button').click()
        cy.get('#test-longtext > :nth-child(2) > .button').should('not.contain.text', 'Скрыть текст')
    });
    
    it('Test results buttons functions', () => {
        cy.get('[data-number="4"] > .study-block__image > .study-block__image-wrapper').click()
        cy.get('.map-questions__switcher').dblclick({force:true})
        cy.get('#etq_30').click()
        cy.get('.button-nav_theme_next').click()
        cy.get('#test-end > .modal-dialog > .modal-content > .modal-footer > .button_theme_orange').click()
        cy.get('.result-panel__title').should('contain.text', 'Вы завершили тест!')
        cy.get('#offline-html-percent > span').should('contain.text', '0% (0/130)')
        cy.get('.button-wrapper > .is-active').click()
        cy.get('.test-container__process').should('be.visible')
        cy.get('.test-container__process-head > .button-radius').click()
        cy.get('.result-panel__title').should('contain.text', 'Вы завершили тест!')
        cy.get('[data-action="create_replay_test"]').click()
        cy.get('.test-container__study-subject > .__status').should('contain.text', 'Активен')
        cy.get('[data-number="4"] > .study-block__image > .study-block__image-wrapper').click()
        cy.get('.map-questions__switcher').dblclick({force:true})
        cy.get('#etq_30').click()
        cy.get('.button-nav_theme_next').click()
        cy.get('#test-end > .modal-dialog > .modal-content > .modal-footer > .button_theme_orange').click()
        cy.get('.result-panel__title').should('contain.text', 'Вы завершили тест!')
        cy.get('#url-exit').click()
        cy.location('hostname').should('contain', 'itest.dev-bmg.kz')
    });
})

