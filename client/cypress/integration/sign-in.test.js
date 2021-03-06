// enables intelligent code completion for Cypress commands
// https://on.cypress.io/intelligent-code-completion
/// <reference types="Cypress" />

describe('Sign In Page Smoke/E2E Testing', () => {
  beforeEach(() => {
    Cypress.env('REACT_APP_API_HOST', 'https://oed-poc-server-ohkmuktm2a-uw.a.run.app')
  })
  it('should redirect to the user account page upon successful login', () => {
    const email = 'me@you.com'
    const password = 'Testing' // get from environment variable or mock auth call

    cy.visit('/')

    cy.get('input[name=email]').type(email).should('have.value', email)

    cy.get('input[name=password]').type(`${password}`)
    cy.get('button[type=submit]').click()

    cy.url().should('include', '/dashboard')
  })
})
