
describe('Newsletter subcribe form', () =>{
    beforeEach(() => {
        cy.visit('http://localhost:3000')
    })

    context('hero section', () => {
        it('Allows users to subscribe to the email list', () => {
            cy.getByData('email-input').type('dangerbit1999@gmail.com')
            cy.getByData('submit-button').click()
            cy.getByData('success-message')
            .should('exist')
            .contains('dangerbit1999@gmail.com')
        })
    
        it('does NOT allow a invalid email adress', () => {
            cy.getByData('email-input').type('dangerbit1999')
            cy.getByData('submit-button').click()
            cy.getByData('success-message')
            .should('not.exist')
        })
    
        it('does NOT allow a email thats already subscribe', () => {
            cy.getByData('email-input').type('john@example.com')
            cy.getByData('submit-button').click()
            cy.getByData('server-error-message')
            .should('exist')
            .contains('john@example.com')
        })
    })

    context('Courses section', () => {
        it('Course: Testing Your First Next.js Application', () =>{
            cy.getByData('course-0').find('a').eq(3).click()
            cy.location('pathname').should('eq', '/testing-your-first-application')
        })
        it("Course: Testing Foundations", () => {
            cy.getByData("course-1").find("a").eq(3).click()
            cy.location("pathname").should("eq", "/testing-foundations")
          })
          it("Course: Cypress Fundamentals", () => {
            cy.getByData("course-2").find("a").eq(3).click()
            cy.location("pathname").should("eq", "/cypress-fundamentals")
          })
    })
    
})

export{}