describe('Navigation', () => {
    beforeEach(() => {
        cy.visit('https://itest.dev-bmg.kz/ru/news')
    })

    it('Click on news block', () => {
        cy.get('.article-block__preview > img').eq(0).then($newsBlock => {
            cy.get('.articles-list > a').eq(0).click()
            cy.get('.breadcrumbs > :nth-child(3) > span').should('have.text', $newsBlock.prop('alt'))
            cy.go('back')
        })
        cy.get('.article-block__preview > img').eq(1).then($newsBlock => {
            cy.get('.articles-list > a').eq(1).click()
            cy.get('.breadcrumbs > :nth-child(3) > span').should('have.text', $newsBlock.prop('alt'))
        })
    });

    it('Page selection', () => {
        cy.get('.page-link').eq(2).click()
        cy.location('href').should('eq', 'https://itest.dev-bmg.kz/ru/news?page=2')
        cy.get('.page-link').eq(0).click()
        cy.location('href').should('eq', 'https://itest.dev-bmg.kz/ru/news?page=1')
        cy.get('.page-link').eq(12).click()
        cy.location('href').should('eq', 'https://itest.dev-bmg.kz/ru/news?page=2')
    });
})

describe('Mobile Navigation', () => {
    beforeEach(() => {
        cy.viewport('iphone-se2')
        cy.visit('https://itest.dev-bmg.kz/ru/news')
    })
    
    it.only('Tap on news blocks', () => {
        cy.get('.article-block__preview > img').eq(0).then($newsBlock => {
            cy.get('.articles-list > a').eq(0).click()
            cy.get('.breadcrumbs > :nth-child(3) > span').should('have.text', $newsBlock.prop('alt'))
            cy.go('back')
        })
        cy.get('.article-block__preview > img').eq(1).then($newsBlock => {
            cy.get('.articles-list > a').eq(1).click()
            cy.get('.breadcrumbs > :nth-child(3) > span').should('have.text', $newsBlock.prop('alt'))
        })
    })
})









export{}