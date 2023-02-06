describe('Navigation menu', () =>{
    beforeEach(() => {
        cy.visit('https://itest.dev-bmg.kz/ru')
        cy.testActiveCheck()
    })
    it.only('Authorization and profile navigation bar', () => {
        cy.auth(1)
        cy.get('.login-panel__enter').click()
        cy.get('.login-panel__user-menu > [href="/ru/profile/info"]').then((link) =>{
            cy.request(link.prop('href'))
            .its('status')
            .should('eq', 200)
        })
        cy.get('.login-panel__user-menu > [href="/ru/profile/subscribe"]').click()
        cy.location('pathname').should('contain', '/subscribe')
        cy.go('back')
        cy.get('.login-panel__enter').click()
        cy.get('.login-panel__user-menu > [href="/ru/profile/balance"]').click()
        cy.location('pathname').should('contain', '/balance')
        cy.go('back')
        cy.get('.login-panel__enter').click()
        cy.get('.login-panel__user-menu > [href="/ru/profile/statistics"]').click()
        cy.location('pathname').should('contain', '/statistic')
        cy.go('back')
        cy.get('.login-panel__enter').click()
        cy.get('.login-panel__user-menu > [href="/ru/logout"]').click()
        cy.get('.login-panel__enter').click()
        cy.get('.login-panel__user-menu > [href="/ru/logout"]').click()
        cy.get('.login-panel__enter > span').should('contain.text', 'Войти')

    })

    it('Search button', () => {
        cy.get('.header__form-search-button').click()
        cy.get('.form-search > input').type('something{enter}')
        cy.location('pathname').should('contain', '/search')
        cy.get('.search-page-inner > :nth-child(2)').contains('something')
    })

    it('Switch language', () => {
        cy.get('.language-switch__current').click()
        cy.get('.language-switch__list > li > a').click()
        cy.get('.language-switch__current > span').contains('Қазақша')
        cy.location('pathname').should('contain', '/kz')
    })

    it('Contact number button', () => {
        cy.get('.header__telephone').click()
        cy.location('pathname').should('contain', '/contact')
    })

    it('PASS FULL ENT button without subscribe', () => {
        cy.auth(0)
        cy.get('.header-inner > .button').click()
        cy.get('#full-ent-test > .modal-dialog > .modal-content').should('be.visible')
        cy.get('[data-node-alias="biology"] > .study-block__title').click()
        cy.get('[data-node-alias="chemistry"] > .study-block__title').click()
        cy.get('#full-ent-test > .modal-dialog > .modal-content > .modal-footer > .button').click()
        cy.get('#required-subscribe > .modal-dialog > .modal-content').should('be.visible')
        cy.wait(3000)
    })

    it('PASS FULL ENT button with subscribe', () => {
        cy.auth(1)
        cy.reload
        cy.get('.header-inner > .button').click()
        cy.get('#full-ent-test > .modal-dialog > .modal-content').should('be.visible')
        cy.get('[data-node-alias="biology"] > .study-block__title').click()
        cy.get('[data-node-alias="chemistry"] > .study-block__title').click()
        cy.get('#full-ent-test > .modal-dialog > .modal-content > .modal-footer > .button').click()
        cy.get('.test-container__wrapper-hidden').should('be.visible')
        cy.get('.test-container__end').dblclick({force:true})
        cy.get('#test-end > .modal-dialog > .modal-content > .modal-footer > .button_theme_orange').click()
    })

    it('Check ENT in navigation bar', () => {
        cy.get('.nav-menu').find('a').eq(0).click()
        cy.location('pathname').should('contain', '/ent')
        cy.get('.footer-top > .footer-inner').should('be.visible')
    })

    it('Check FINAL EXAMINATION in navigation bar', () => {
        cy.get('.nav-menu').find('a').eq(1).click()
        cy.location('pathname').should('contain', '/attestation')
        cy.get('.footer-top > .footer-inner').should('be.visible')
    })
    
    it('Check VOUD in navigation bar', () => {
        cy.get('.nav-menu').find('a').eq(2).click()
        cy.location('pathname').should('contain', '/voud')
        cy.get('.footer-top > .footer-inner').should('be.visible')
    })
    
    it('Check SUBSCRIBE in navigation bar', () => {
        cy.get('.nav-menu').find('a').eq(3).click()
        cy.location('pathname').should('contain', '/subscribe')
        cy.get('.footer-top > .footer-inner').should('be.visible')
    })
    
    it('Check NEWS in navigation bar', () => {
        cy.get('.nav-menu').find('a').eq(4).click()
        cy.location('pathname').should('contain', '/news')
        cy.get('.footer-top > .footer-inner').should('be.visible')
    })

    it('Check CONTACTS in navigation bar', () => {
        cy.get('.nav-menu').find('a').eq(5).click()
        cy.location('pathname').should('contain', '/contact')
        cy.get('.footer-top > .footer-inner').should('be.visible')
    })

    it('Click main iTest emblem button in navigation bar', () => {
        cy.get('.__standart').click()
        cy.location('hostname').should('eq', 'itest.dev-bmg.kz')
        cy.get('.footer-top > .footer-inner').should('be.visible')
    })
})
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
describe('Banners', () =>{
    beforeEach(() => {
        cy.visit('https://itest.dev-bmg.kz/ru')
    })

    it('Banner slide selection check', () => {
        cy.get('.bilim-banner__container').should('be.visible')
        cy.get('.arr-next').click()
        cy.get('.arr-prev').click()
        cy.get('.bilim-banner__container').should('be.visible')
    })
    // becouse banner disabled on dev
    // it('Banner links', () => {
    //     cy.get('.bilim-banner__button > a').then((link) => {
    //         cy.request(link.prop('href'))
    //         .its('status')
    //         .should('eq', '200')
    //     })
    // })
})
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
describe('Main menu', () => {
    beforeEach(() => {
        cy.visit('https://itest.dev-bmg.kz/ru')
        // cy.reload()
    })

    it('All ENT block-subjects checks', () => {
        cy.EntBlocksCheck()
    });

    it('All Attestations block-subjects checks', () => {
        cy.AttestationBlocksCheck()
    });

    it('VOUD section', () => {
        //1 block
        cy.get('.subject-block__bg').eq(31).click({force:true})
        cy.location('pathname').should('contain', '/ru/voud-4')
        cy.get('.footer-top > .footer-inner').should('be.visible')
        cy.go("back")
        //2 block
        cy.get('.subject-block__bg').eq(32).click({force:true})
        cy.location('pathname').should('contain', '/ru/voud-9')
        cy.get('.footer-top > .footer-inner').should('be.visible')
        cy.go("back")
        //3 block
        cy.get('.subject-block__bg').eq(33).click({force:true})
        cy.location('pathname').should('contain', '/ru/voud-11')
        cy.get('.footer-top > .footer-inner').should('be.visible')
    });
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    it('Our resourses', () => {
        // BilimLand block
        cy.get('.bilimland > .study-additional-block__wrapper').should('be.visible')
        cy.get('#carousel__additional').find('a').eq(0).then((link) =>{
            cy.request(link.prop('href'))
            .its('status')
            .should('eq', 200)
            cy.api(link.prop('href'))
            .its('allRequestResponses').its('0').its('Request URL')
            .should('contain', 'http://bilimland.kz/')
        })
        // imektep block
        cy.get('.imektep > .study-additional-block__wrapper').should('be.visible')
        cy.get('#carousel__additional').find('a').eq(1).then((link) =>{
            cy.request(link.prop('href'))
            .its('status')
            .should('eq', 200)
            cy.api(link.prop('href'))
            .its('allRequestResponses').its('0').its('Request URL')
            .should('contain', 'http://imektep.kz/')
        })
        // twig-bilim block
        cy.get('.twigbilim > .study-additional-block__wrapper').should('be.visible')
        cy.get('#carousel__additional').find('a').eq(2).then((link) =>{
            cy.request(link.prop('href'))
            .its('status')
            .should('eq', 200)
            cy.api(link.prop('href'))
            .its('allRequestResponses').its('0').its('Request URL')
            .should('contain', 'https://twig-bilim.kz/')
        })
    })
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    it('Footer creditals', () => {
        // Question-answer link
        cy.get('.footer__menu > :nth-child(1) > a').click().location('pathname').should('contain', '/help')
        cy.get('.footer-top > .footer-inner').should('be.visible')
        cy.go('back')
        // Our experts link
        cy.get('.footer__menu > :nth-child(2) > a').click().location('pathname').should('contain', '/experts')
        cy.get('.footer-top > .footer-inner').should('be.visible')
        cy.go('back')
        // Terms of use link
        cy.get('.footer__menu > :nth-child(3) > a').click().location('pathname').should('contain', '/terms-of-use')
        cy.get('.footer-top > .footer-inner').should('be.visible')
        cy.go('back')
        // Privacy policy link
        cy.get('.footer__menu > :nth-child(4) > a').click().location('pathname').should('contain', '/privacy-policy')
        cy.get('.footer-top > .footer-inner').should('be.visible')
        cy.go('back')
        // About iTest link
        cy.get('.footer__menu > :nth-child(5) > a').click().location('pathname').should('contain', '/about')
        cy.get('.footer-top > .footer-inner').should('be.visible')
    });
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    it('Footer links', () => {
        //vk
        cy.get('.social-list__vkontakte > a').should('be.visible')
        cy.get('.footer-bottom > .footer-inner').find('a').eq(0).then((link) =>{
            cy.request(link.prop('href'))
            .its('status')
            .should('eq', 200)
            cy.request(link.prop('href'))
            .its('allRequestResponses').its('0').its('Request Headers').its('referer')
            .should('contain', 'http://vk.com/bilimland')
        })
        //facebook
        cy.get('.social-list__facebook > a').should('be.visible')
        cy.get('.footer-bottom > .footer-inner').find('a').eq(1).then((link) =>{
            cy.request(link.prop('href'))
            .its('status')
            .should('eq', 200)
            cy.request(link.prop('href'))
            .its('allRequestResponses').its('0').its('Request Headers').its('referer')
            .should('contain', 'http://facebook.com/bilimland')
        })
        //inst // bc "too many requests 429" error
        // cy.get('.social-list__instagram > a').should('be.visible')
        // cy.get('.footer-bottom > .footer-inner').find('a').eq(2).then((link) =>{
        //     cy.request(link.prop('href'))
        //     .its('status')
        //     .should('eq', 200)
        //     cy.request(link.prop('href'))
        //     .its('allRequestResponses').its('0').its('Request URL')
        //     .should('contain', 'https://www.instagram.com/itest.kz/')
        // })
        //youtube
        cy.get('.social-list__youtube > a').should('be.visible')
        cy.get('.footer-bottom > .footer-inner').find('a').eq(3).then((link) =>{
            cy.request(link.prop('href'))
            .its('status')
            .should('eq', 200)
            cy.request(link.prop('href'))
            .its('allRequestResponses').its('0').its('Request URL')
            .should('contain', 'https://www.youtube.com/c/BilimLand')
        })
        
    })

    
})

export{}
