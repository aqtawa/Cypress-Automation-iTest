import { Context } from "mocha";
import selectors from '../support/selectors.js'

describe('With sub auth', () => {
    beforeEach(() => {
        cy.auth(1)
        cy.visit('https://itest.dev-bmg.kz/ru/ent')
    })

    it('Open conspect and interact back/forward buttons', () => {
        cy.get(selectors.historyKzBtn).click()
        cy.get('[data-node-id="14"]').click({force:true})
        cy.get(selectors.firstConspectHistoryKz).click()
        cy.get('h1').should('contain', 'Глава I. Появление Древнейших людей')
        cy.get('[href="/ru/ent/istoriya-kazahstana/6-klass/lecture/razvitie-orudiya"]').click() //forward conspect button
        cy.get('h1').should('contain.text', 'Развитие орудия')
        cy.get('[href="/ru/ent/istoriya-kazahstana/6-klass/lecture/glava-i-poyavlenie-drevnejshih-lyudej"]').click() //backward conspect button
        cy.get('h1').should('contain.text', 'Глава I. Появление Древнейших людей')
    });

    it('Open test', () => {
        cy.get(selectors.historyKzBtn).click()
        cy.get('[data-node-id="14"]').click({force:true})
        cy.get(selectors.firstTestHistoryKz).click()
        cy.get('.test-body__theme').should('contain.text', 'Глава I. Появление Древнейших людей')
    });

    it('Breadcrumbs navigation', () => {
        cy.get(selectors.historyKzBtn).click()
        cy.get('[data-node-id="14"]').click({force:true})
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
        cy.get('.process-footer__navigation-num').should('contain.text', '1 / 20')
    });

    it("User can open conspect and download it", () => {
        cy.get(selectors.historyKzBtn).click()
        cy.get('[data-node-id="14"]').click({force:true})
        cy.get(selectors.firstConspectHistoryKz).click()
        cy.get('h1').should('contain', 'Глава I. Появление Древнейших людей')
        cy.get('.button-func').then((downloadBtn) =>{
            cy.api(downloadBtn.prop('href'))
            .its('status').should('eq', 200)
        })
    })

    context('Mobile-web', () => {
        beforeEach(() => {
            cy.viewport('iphone-se2')
        });

        it('Open conspect and interact back/forward buttons', () => {
            cy.get(selectors.historyKzBtn).click()
            cy.get('[data-node-id="14"]').click({force:true})
            cy.get(selectors.firstConspectHistoryKz).click()
            cy.get('h1').should('contain', 'Глава I. Появление Древнейших людей')
            cy.get('[href="/ru/ent/istoriya-kazahstana/6-klass/lecture/razvitie-orudiya"]').click() //forward conspect button
            cy.get('h1').should('contain.text', 'Развитие орудия')
            cy.get('[href="/ru/ent/istoriya-kazahstana/6-klass/lecture/glava-i-poyavlenie-drevnejshih-lyudej"]').click() //backward conspect button
            cy.get('h1').should('contain.text', 'Глава I. Появление Древнейших людей')
        });
    
        it('Open test', () => {
            cy.get(selectors.historyKzBtn).click()
            cy.get('[data-node-id="14"]').click({force:true})
            cy.get(selectors.firstTestHistoryKz).click()
            cy.get('.test-body__theme').should('contain.text', 'Глава I. Появление Древнейших людей')
        });
    
        it('Breadcrumbs navigation', () => {
            cy.get(selectors.historyKzBtn).click()
            cy.get('[data-node-id="14"]').click({force:true})
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
            cy.get('.process-footer__navigation-num').should('contain.text', '1 / 20')
        });
    
        it("User can open conspect and download it", () => {
            cy.get(selectors.historyKzBtn).click()
            cy.get('[data-node-id="14"]').click({force:true})
            cy.get(selectors.firstConspectHistoryKz).click()
            cy.get('h1').should('contain', 'Глава I. Появление Древнейших людей')
            cy.get('.button-func').then((downloadBtn) =>{
                cy.api(downloadBtn.prop('href'))
                .its('status').should('eq', 200)
            })
        })
    });
})

describe('Without sub auth', () => {
    beforeEach(() => {
        cy.auth(0)
        cy.visit('https://itest.dev-bmg.kz/ru/ent')
    })

    it('User opens "Full ENT test" and press "Buy" button', () => {
        cy.get(selectors.historyKzBtn).click()
        cy.get('.button-wrapper > .button').click() // full ent button
        cy.get('#required-subscribe > .modal-dialog > .modal-content > .modal-header > .modal-title') // Modal about subscribe
        .should('contain.text', '\n                    Необходима активная подписка\n                ')
        cy.get('#required-subscribe > .modal-dialog > .modal-content > .modal-footer > .button').click() // "Buy" button in modal
        cy.get('h1').should('contain.text', 'Подписка') // check right location
    });

    it("User can open conspect and download it", () => {
        cy.get(selectors.historyKzBtn).click()
        cy.get('[data-node-id="14"]').click({force:true})
        cy.get(selectors.firstConspectHistoryKz).click()
        cy.get('h1').should('contain', 'Глава I. Появление Древнейших людей')
        cy.get('.button-func').then((downloadBtn) =>{
            cy.api(downloadBtn.prop('href'))
            .its('status').should('eq', 200)
        })
    })

    it('User can open conspect but cant open test on theme', () => {
        cy.get(selectors.historyKzBtn).click()
        cy.get('[data-node-id="14"]').click({force:true})
        cy.get(selectors.firstTestHistoryKz).click
        cy.get('#required-subscribe > .modal-dialog > .modal-content > .modal-header > .modal-title') // Modal about subscribe
        .should('contain.text', '\n                    Необходима активная подписка\n                ')
        cy.get('#required-subscribe > .modal-dialog > .modal-content > .close').click({force:true})
        cy.get(selectors.firstConspectHistoryKz).click()
        cy.get('.button-wrapper > .button').click()
        cy.get('#required-subscribe > .modal-dialog > .modal-content > .modal-header > .modal-title') // Modal about subscribe
        .should('contain.text', '\n                    Необходима активная подписка\n                ')
    });

})

describe('Without auth', () => {
    beforeEach(() => {
        cy.visit('https://itest.dev-bmg.kz/ru/ent')
        cy.testActiveCheck
    })
    it("User can open conspect but cant download it", () => {
        cy.get(selectors.historyKzBtn).click()
        cy.get('[data-node-id="14"]').click({force:true})
        cy.get(selectors.firstConspectHistoryKz).click()
        cy.get('h1').should('contain', 'Глава I. Появление Древнейших людей')
        cy.get('.button-func').should('not.exist')
    })
})



export{}