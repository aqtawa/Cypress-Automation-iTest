export{}

describe('With subscription', () => {
    beforeEach(() => {
        cy.auth(1)
        cy.visit('/voud')
    });

    context('Web version', () => {
        it('"Pass full VOUD" button', () => {
            cy.get('[href="/ru/voud-4"] > .subject-block__image > .subject-block__icon').click()
            cy.get('.study-wrapper__header > .button').click()
        });
    });
    context('Mobile version', () => {
        beforeEach(() => {
            cy.viewport('iphone-5')
        });

        it('"Pass full VOUD" button', () => {
            cy.get('[href="/ru/voud-4"] > .subject-block__image > .subject-block__icon').click()
            cy.get('.study-wrapper__header > .button').click()
        });

    });

});

describe('Without subscription', () => {
    beforeEach(() => {
        cy.auth(0)
        cy.visit('/voud')
    });

    context('Web version', () => {
        it('"Pass full VOUD" button', () => {
            cy.get('[href="/ru/voud-4"] > .subject-block__image > .subject-block__icon').click()
            cy.get('.study-wrapper__header > .button').click()
        });
    });
    context('Mobile version', () => {
        beforeEach(() => {
            cy.viewport('iphone-5')
        });

        it('"Pass full VOUD" button', () => {
            cy.get('[href="/ru/voud-4"] > .subject-block__image > .subject-block__icon').click()
            cy.get('.study-wrapper__header > .button').click()
        });
        
    });

});

describe('Without authentication', () => {
    beforeEach(() => {
        cy.visit('/voud')
    });

    context('Web version', () => {
        it('"Pass full VOUD" button', () => {
            cy.get('[href="/ru/voud-4"] > .subject-block__image > .subject-block__icon').click()
            cy.get('.study-wrapper__header > .button').click()
        });
    });
    context('Mobile version', () => {
        beforeEach(() => {
            cy.viewport('iphone-5')
        });

        it('"Pass full VOUD" button', () => {
            cy.get('[href="/ru/voud-4"] > .subject-block__image > .subject-block__icon').click()
            cy.get('.study-wrapper__header > .button').click()
        });
        
    });

});