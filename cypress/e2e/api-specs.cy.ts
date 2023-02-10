export{}

describe('asd', () => {
    beforeEach(()=> {
        cy.visit('https://itest.dev-bmg.kz/ru/ent/istoriya-kazahstana')
    })

    it('wtf', () => {
        cy.get('[data-node-id="14"]').click({force:true})
        cy.api('https://itest.dev-bmg.kz/ru/ent/istoriya-kazahstana')
    });
})