import { Context } from "mocha";
import selectors from '../support/selectors.js'

describe('With sub auth', () => {
    beforeEach(() => {
        cy.visit('https://itest.dev-bmg.kz/ru')
        cy.auth(1)
        cy.visit('https://itest.dev-bmg.kz/ru/ent')
    })

    context('Navigation functional', () => {
        it('Open conspect and interact back/forward buttons', () => {
            cy.get(selectors.historyKzBtn).click()
            cy.get('[data-node-id="14"]').click()
            cy.get(selectors.firstConspectHistoryKz).click()
            cy.get('h1').should('contain', 'Глава I. Появление Древнейших людей')
            cy.get('[href="/ru/ent/istoriya-kazahstana/6-klass/lecture/razvitie-orudiya"]').click() //forward conspect button
            cy.get('h1').should('contain.text', 'Развитие орудия')
            cy.get('[href="/ru/ent/istoriya-kazahstana/6-klass/lecture/glava-i-poyavlenie-drevnejshih-lyudej"]').click() //backward conspect button
            cy.get('h1').should('contain.text', 'Глава I. Появление Древнейших людей')
            
        });

        it('Open test and interact', () => {
            cy.get(selectors.historyKzBtn).click()
            cy.get('[data-node-id="14"]').click()
            cy.get(selectors.firstTestHistoryKz).click()
            cy.get('.test-body__theme').should('contain.text', 'Глава I. Появление Древнейших людей')
            
            // check back/forward tests button
            cy.get('.process-footer__navigation-num').should('contain.text', '1 / 10')
            cy.get('.button-nav_theme_next').click()
            cy.get('.process-footer__navigation-num').should('contain.text', '2 / 10')
            cy.get('.button-nav_theme_prev').click()
            cy.get('.process-footer__navigation-num').should('contain.text', '1 / 10')
            // check the "answers-map"
            cy.get('.map-questions__switcher').dblclick({force:true})
            cy.get('#etq_6').click()
            cy.get('.process-footer__navigation-num').should('contain.text', '6 / 10')
            cy.get('#etq_10').click()
            cy.get('.process-footer__navigation-num').should('contain.text', '10 / 10')
            cy.get('.button-nav_theme_next').click()
            cy.get('#test-end > .modal-dialog > .modal-content > .modal-footer > .button_theme_orange').click()
            cy.get('.result-panel__title').should('contain.text', 'Вы завершили тест')
            cy.get('.button-wrapper > .is-active').click()
            cy.get('.test-body__theme').should('contain.text', 'Глава I. Появление Древнейших людей')
            cy.get('.test-container__process-head > .button-radius').click()
            cy.get('.result-panel__title').should('contain.text', 'Вы завершили тест')
            cy.get('[data-action="create_replay_test"]').click()
            // check select/reselect answer
            cy.get(':nth-child(1) > [data-var-answer="a"]').click()
            cy.get(':nth-child(1) > [data-var-answer="a"]').should('have.class', 'is-active')
            cy.get(':nth-child(1) > [data-var-answer="b"]').click()
            cy.get(':nth-child(1) > [data-var-answer="b"]').should('have.class', 'is-active')
            cy.get(':nth-child(1) > [data-var-answer="a"]').should('not.have.class', 'is-active')
            // try to end test and exit
            cy.get('.map-questions__switcher').dblclick({force:true})
            cy.get('#etq_10').click()
            cy.get('.process-footer__navigation-num').should('contain.text', '10 / 10')
            cy.get('.button-nav_theme_next').click()
            cy.get('#test-end > .modal-dialog > .modal-content > .modal-footer > .button_theme_orange').click()
            cy.get('#url-exit').click()
            cy.location('hostname').should('contain', 'itest.dev-bmg.kz')
        });

        it('Breadcrumbs navigation', () => {
            cy.get(selectors.historyKzBtn).click()
            cy.get('[data-node-id="14"]').click()
            cy.get(selectors.firstConspectHistoryKz).click()
            cy.get('.breadcrumbs > :nth-child(5) > span').click()
            cy.location('pathname').should('eq', '/ru/ent/istoriya-kazahstana/6-klass/lecture/glava-i-poyavlenie-drevnejshih-lyudej')
            cy.get('.breadcrumbs > :nth-child(4) > a').click()
            cy.location('pathname').should('eq', '/ru/ent/istoriya-kazahstana/6-klass')
            cy.get('.breadcrumbs > :nth-child(3) > a').click()
            cy.location('pathname').should('eq', '/ru/ent/istoriya-kazahstana')
            cy.get('.breadcrumbs > :nth-child(2) > a').click()
            cy.location('pathname').should('eq', '/ru/ent')
            cy.go('back')
            cy.get('.breadcrumbs > :nth-child(1) > a').click()
            cy.location('hostname').should('contain', 'itest.dev-bmg.kz')
        });

        it('"Full test on subject" button', () => {
            cy.get(selectors.historyKzBtn).click()
            cy.get('.button-wrapper > .button').click()
            cy.get('.process-footer__navigation-num').should('contain.text', '1 / 15')
            cy.get('.map-questions__switcher').dblclick({force:true})
            cy.get('#etq_15').click()
            cy.get('.process-footer__navigation-num').should('contain.text', '15 / 15')
            cy.get('.button-nav_theme_next').click()
            cy.get('#test-end > .modal-dialog > .modal-content > .modal-footer > .button_theme_orange').click()
            cy.get('#url-exit').click()
            cy.location('hostname').should('contain', 'itest.dev-bmg.kz')
        });
    })

})

describe('Withot sub auth', () => {
    beforeEach(() => {
        cy.visit('https://itest.dev-bmg.kz/ru')
        cy.auth(0)
        cy.visit('https://itest.dev-bmg.kz/ru/ent')
    })

    context('Navigational available functionality', () => {
        it('User cant open "Full ENT test" and press "Buy" button', () => {
            cy.get(selectors.historyKzBtn).click()
            cy.get('.button-wrapper > .button').click() // full ent button
            cy.get('#required-subscribe > .modal-dialog > .modal-content > .modal-header > .modal-title') // Modal about subscribe
            .should('contain.text', '\n                    Необходима активная подписка\n                ')
            cy.get('#required-subscribe > .modal-dialog > .modal-content > .modal-footer > .button').click() // "Buy" button in modal
            cy.get('h1').should('contain.text', 'Подписка') // check right location
        });
        it('', () => {
            
        });
        it('User can open conspect but cant open test on theme', () => {
            cy.get(selectors.historyKzBtn).click()
            cy.get('[data-node-id="14"]').click()
            cy.get(selectors.firstTestHistoryKz).click()
            cy.get('#required-subscribe > .modal-dialog > .modal-content > .modal-header > .modal-title') // Modal about subscribe
            .should('contain.text', '\n                    Необходима активная подписка\n                ')
            cy.get('#required-subscribe > .modal-dialog > .modal-content > .close').click()
            cy.get(selectors.firstConspectHistoryKz).click()
            cy.get('.button-wrapper > .button').click()
            cy.get('#required-subscribe > .modal-dialog > .modal-content > .modal-header > .modal-title') // Modal about subscribe
            .should('contain.text', '\n                    Необходима активная подписка\n                ')
        });


    })
})

export{}