import Link from "next/link"

describe('Navigation menu', () =>{
    beforeEach(() => {
        cy.visit('https://itest.dev-bmg.kz/ru')
    })
    it('Authorization', () => {
        // click on auth button
        cy.get('.login-panel__enter > span').contains('Войти').click()
        // enter the phone as login
        cy.get('#phone').type('7756456689')
        // enter password
        cy.get('.password-block > .c-input').type('123456A')
        // click login button
        cy.get('#auth-form > .c-button').click()
        // check auth
        cy.get('.login-panel__enter > span').should('not.contain', 'Войти')
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
        cy.get('#url-exit').click()
    })

    it('Check ENT navigation', () => {
        cy.get('.nav-menu').find('a').eq(0).click()
        cy.location('pathname').should('contain', '/ent')
        cy.get('.footer-top > .footer-inner').should('be.visible')
    })

    it('Check FINAL EXAMINATION navigation', () => {
        cy.get('.nav-menu').find('a').eq(1).click()
        cy.location('pathname').should('contain', '/attestation')
        cy.get('.footer-top > .footer-inner').should('be.visible')
    })
    
    it('Check VOUD navigation', () => {
        cy.get('.nav-menu').find('a').eq(2).click()
        cy.location('pathname').should('contain', '/voud')
        cy.get('.footer-top > .footer-inner').should('be.visible')
    })
    
    it('Check SUBSCRIBE navigation', () => {
        cy.get('.nav-menu').find('a').eq(3).click()
        cy.location('pathname').should('contain', '/subscribe')
        cy.get('.footer-top > .footer-inner').should('be.visible')
    })
    
    it('Check NEWS navigation', () => {
        cy.get('.nav-menu').find('a').eq(4).click()
        cy.location('pathname').should('contain', '/news')
        cy.get('.footer-top > .footer-inner').should('be.visible')
    })

    it('Check CONTACTS navigation', () => {
        cy.get('.nav-menu').find('a').eq(5).click()
        cy.location('pathname').should('contain', '/contact')
        cy.get('.footer-top > .footer-inner').should('be.visible')
    })

    it('Click main iTest emblem button', () => {
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
    it('ENT section', () => {
        // All section block cheking
        //block 1
        cy.get(':nth-child(7) > .title-inner > .title > span').contains('ЕНТ')
        cy.get('.subject-block__bg').eq(0).click({force:true})
        cy.location('pathname').should('contain', '/ru/ent/')
        cy.get('.footer-top > .footer-inner').should('be.visible')
        cy.go("back")
        //block 2
        cy.get('.subject-block__bg').eq(1).click({force:true})
        cy.location('pathname').should('contain', '/ru/ent/')
        cy.get('.footer-top > .footer-inner').should('be.visible')
        cy.go("back")
        //block 3
        cy.get('.subject-block__bg').eq(2).click({force:true})
        cy.location('pathname').should('contain', '/ru/ent/')
        cy.get('.footer-top > .footer-inner').should('be.visible')
        cy.go("back")
        //block 4
        cy.get('.subject-block__bg').eq(3).click({force:true})
        cy.location('pathname').should('contain', '/ru/ent/')
        cy.get('.footer-top > .footer-inner').should('be.visible')
        cy.go("back")
        //block 5
        cy.get('.subject-block__bg').eq(4).click({force:true})
        cy.location('pathname').should('contain', '/ru/ent/')
        cy.get('.footer-top > .footer-inner').should('be.visible')
        cy.go("back")
        //block 6
        cy.get('.subject-block__bg').eq(5).click({force:true})
        cy.location('pathname').should('contain', '/ru/ent/')
        cy.get('.footer-top > .footer-inner').should('be.visible')
        cy.go("back")
        //block 7
        cy.get('.subject-block__bg').eq(6).click({force:true})
        cy.location('pathname').should('contain', '/ru/ent/')
        cy.get('.footer-top > .footer-inner').should('be.visible')
        cy.go("back")
        //block 8
        cy.get('.subject-block__bg').eq(7).click({force:true})
        cy.location('pathname').should('contain', '/ru/ent/')
        cy.get('.footer-top > .footer-inner').should('be.visible')
        cy.go("back")
        //block 9
        cy.get('.subject-block__bg').eq(8).click({force:true})
        cy.location('pathname').should('contain', '/ru/ent/')
        cy.get('.footer-top > .footer-inner').should('be.visible')
        cy.go("back")
        //block 10
        cy.get('.subject-block__bg').eq(9).click({force:true})
        cy.location('pathname').should('contain', '/ru/ent/')
        cy.get('.footer-top > .footer-inner').should('be.visible')
        cy.go("back")
        //block 11
        cy.get('.subject-block__bg').eq(10).click({force:true})
        cy.location('pathname').should('contain', '/ru/ent/')
        cy.get('.footer-top > .footer-inner').should('be.visible')
        cy.go("back")
        //block 12
        cy.get('.subject-block__bg').eq(11).click({force:true})
        cy.location('pathname').should('contain', '/ru/ent/')
        cy.get('.footer-top > .footer-inner').should('be.visible')
        cy.go("back")
        //block 13
        cy.get('.subject-block__bg').eq(12).click({force:true})
        cy.location('pathname').should('contain', '/ru/ent/')
        cy.get('.footer-top > .footer-inner').should('be.visible')
        cy.go("back")
        //block 14
        cy.get('.subject-block__bg').eq(13).click({force:true})
        cy.location('pathname').should('contain', '/ru/ent/')
        cy.get('.footer-top > .footer-inner').should('be.visible')
        cy.go("back")
        //block 15
        cy.get('.subject-block__bg').eq(14).click({force:true})
        cy.location('pathname').should('contain', '/ru/ent/')
        cy.get('.footer-top > .footer-inner').should('be.visible')
        cy.go("back")
        //block 16
        cy.get('.subject-block__bg').eq(15).click({force:true})
        cy.location('pathname').should('contain', '/ru/ent/')
        cy.get('.footer-top > .footer-inner').should('be.visible')
    });
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    it('FINAL ATTESTATION section', () => {
        //All section block cheking
        //block 1
        cy.get('.subject-block__bg').eq(16).click({force:true})
        cy.location('pathname').should('contain', '/ru/attestation/')
        cy.get('.footer-top > .footer-inner').should('be.visible')
        cy.go("back")
        //block 2
        cy.get('.subject-block__bg').eq(17).click({force:true})
        cy.location('pathname').should('contain', '/ru/attestation/')
        cy.get('.footer-top > .footer-inner').should('be.visible')
        cy.go("back")
        //block 3
        cy.get('.subject-block__bg').eq(18).click({force:true})
        cy.location('pathname').should('contain', '/ru/attestation/')
        cy.get('.footer-top > .footer-inner').should('be.visible')
        cy.go("back")
        //block 4
        cy.get('.subject-block__bg').eq(19).click({force:true})
        cy.location('pathname').should('contain', '/ru/attestation/')
        cy.get('.footer-top > .footer-inner').should('be.visible')
        cy.go("back")
        //block 5
        cy.get('.subject-block__bg').eq(20).click({force:true})
        cy.location('pathname').should('contain', '/ru/attestation/')
        cy.get('.footer-top > .footer-inner').should('be.visible')
        cy.go("back")
        //block 6
        cy.get('.subject-block__bg').eq(21).click({force:true})
        cy.location('pathname').should('contain', '/ru/attestation/')
        cy.get('.footer-top > .footer-inner').should('be.visible')
        cy.go("back")
        //block 7
        cy.get('.subject-block__bg').eq(22).click({force:true})
        cy.location('pathname').should('contain', '/ru/attestation/')
        cy.get('.footer-top > .footer-inner').should('be.visible')
        cy.go("back")
        //block 8
        cy.get('.subject-block__bg').eq(23).click({force:true})
        cy.location('pathname').should('contain', '/ru/attestation/')
        cy.get('.footer-top > .footer-inner').should('be.visible')
        cy.go("back")
        //block 9
        cy.get('.subject-block__bg').eq(24).click({force:true})
        cy.location('pathname').should('contain', '/ru/attestation/')
        cy.get('.footer-top > .footer-inner').should('be.visible')
        cy.go("back")
        //block 10
        cy.get('.subject-block__bg').eq(25).click({force:true})
        cy.location('pathname').should('contain', '/ru/attestation/')
        cy.get('.footer-top > .footer-inner').should('be.visible')
        cy.go("back")
        //block 11
        cy.get('.subject-block__bg').eq(26).click({force:true})
        cy.location('pathname').should('contain', '/ru/attestation/')
        cy.get('.footer-top > .footer-inner').should('be.visible')
        cy.go("back")
        //block 12
        cy.get('.subject-block__bg').eq(27).click({force:true})
        cy.location('pathname').should('contain', '/ru/attestation/')
        cy.get('.footer-top > .footer-inner').should('be.visible')
        cy.go("back")
        //block 13
        cy.get('.subject-block__bg').eq(28).click({force:true})
        cy.location('pathname').should('contain', '/ru/attestation/')
        cy.get('.footer-top > .footer-inner').should('be.visible')
        cy.go("back")
        //block 14
        cy.get('.subject-block__bg').eq(29).click({force:true})
        cy.location('pathname').should('contain', '/ru/attestation/')
        cy.get('.footer-top > .footer-inner').should('be.visible')
        cy.go("back")
        //block 15
        cy.get('.subject-block__bg').eq(30).click({force:true})
        cy.location('pathname').should('contain', '/ru/attestation/')
        cy.get('.footer-top > .footer-inner').should('be.visible')
    });
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
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
        })
        // imektep block
        cy.get('.imektep > .study-additional-block__wrapper').should('be.visible')
        cy.get('#carousel__additional').find('a').eq(1).then((link) =>{
            cy.request(link.prop('href'))
            .its('status')
            .should('eq', 200)
        })
        // twig-bilim block
        cy.get('.twigbilim > .study-additional-block__wrapper').should('be.visible')
        cy.get('#carousel__additional').find('a').eq(2).then((link) =>{
            cy.request(link.prop('href'))
            .its('status')
            .should('eq', 200)
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
    it.only('Footer links', () => {
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
