// enables intelligent code completion for Cypress commands
// https://on.cypress.io/intelligent-code-completion
/// <reference types="Cypress" />

describe('Admin Approvals Page Smoke/E2E Testing', () => {
  // afterEach(() => {
  //   // cy.get('[data-e2e=sign-out-button]').click()
  // })
  beforeEach(() => {
    Cypress.env('REACT_APP_API_HOST', 'https://oed-poc-server-ohkmuktm2a-uw.a.run.app')
    const email = 'me@you.com'
    const password = 'Testing' // get from environment variable or mock auth call
    cy.visit('/')
    cy.get('input[name=email]').type(email).should('have.value', email)
    cy.get('input[name=password]').type(`${password}-{enter}`)
  })
  it('should navigate to the Admin Approvals page', () => {
    cy.visit('/admin/approvals') // TODO: assert menu item shows up and is clickable instead of navigating here via url directly.
    cy.url().should('include', '/admin/approvals')
  })
})
