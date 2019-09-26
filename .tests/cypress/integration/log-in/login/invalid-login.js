import faker from 'faker'

describe('Invalid credentials login test', () => {
  before(() => {
    cy.visit('/customer/account/')
  })

  it('submits invalid credentials login form', () => {
    cy.get('#pass').type('Password123')
    cy.get('#email').type(faker.internet.email())
    cy.get('[data-testid=submit-login-button]').click()
    cy.server()
    cy.route('/customer/section/load/?sections*').as('sectionsGet')
    cy.wait('@sectionsGet')
    cy.get('[data-ui-id="message-error"]').should('be.visible')
  })
})