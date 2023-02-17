export{}
const url = 'https://itest.dev-bmg.kz'
describe('Registration', () => {

    it('Empty password', () => {
        cy.api({
            method: 'POST',
            url: 'https://itest.dev-bmg.kz/api/register',
            failOnStatusCode: false,
            body: {
                email: 'asd@mail.ru',
                password: ''
            }
        }).then((response) => {
            expect(response.body.error).to.eq(' "password" жолы толтырылуы керек.')
            })
    })
    it('Password less then 5 characters', () => {
        cy.api({
            method: 'POST',
            url: '${url}/api/register',
            failOnStatusCode: false,
            body: {
                email: 'asd@mail.ru',
                password: '1234',
            }
        }).then((response) => {
            expect(response.body.error).to.eq(' "password" кемінде 5 таңбадан тұруы керек.')
        })
    })
})
