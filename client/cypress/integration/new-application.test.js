// enables intelligent code completion for Cypress commands
// https://on.cypress.io/intelligent-code-completion
/// <reference types="Cypress" />

describe('New Application Page Smoke/E2E Testing', () => {
  afterEach(() => {
    Cypress.env('REACT_APP_API_HOST', 'https://oed-poc-server-ohkmuktm2a-uw.a.run.app')
    // cy.get('[data-e2e=sign-out-button]').click()
  })
  beforeEach(() => {
    const email = 'me@you.com'
    const password = 'Testing' // get from environment variable or mock auth call
    cy.visit('/')
    cy.get('input[name=email]').type(email).should('have.value', email)
    cy.get('input[name=password]').type(`${password}`)
    cy.get('button[type=submit]').click()
  })
  it('should navigate to the new applications form page', () => {
    cy.get("[data-testid='new-claim-link']").click()
    cy.url().should('include', '/application')
  })
})
