// enables intelligent code completion for Cypress commands
// https://on.cypress.io/intelligent-code-completion
/// <reference types="Cypress" />

describe('Weekly Claims Application Page Smoke/E2E Testing', () => {
  // afterEach(() => {
  //   // cy.get('[data-e2e=sign-out-button]').click()
  // })
  beforeEach(() => {
    Cypress.env('REACT_APP_API_HOST', 'https://oed-poc-server-ohkmuktm2a-uw.a.run.app')
    const email = 'me@you.com'
    const password = 'Testing' // get from environment variable or mock auth call
    cy.visit('/')
    cy.get('input[name=email]').type(email).should('have.value', email)
    cy.get('input[name=password]').type(`${password}`)
    cy.get('button[type=submit]').click()
  })
  it('should navigate to the weekly claims applications form page', () => {
    cy.get("[data-testid='weekly-claim-link']").click()
    cy.url().should('include', '/weekly-claims')
  })
})
