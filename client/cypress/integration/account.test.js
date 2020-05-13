// enables intelligent code completion for Cypress commands
// https://on.cypress.io/intelligent-code-completion
/// <reference types="Cypress" />

describe('Account Profile Settings Page Smoke/E2E Testing', () => {
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
  it('should navigate to the account profile page', () => {
    cy.get("[data-testid='account-menu-icon']").click()
    cy.get("[data-testid='account-menu-item']").click()
    cy.url().should('include', '/account')
  })
})
