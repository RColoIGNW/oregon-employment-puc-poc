// enables intelligent code completion for Cypress commands
// https://on.cypress.io/intelligent-code-completion
/// <reference types="Cypress" />

describe('404 Page Smoke/E2E Testing', () => {
  beforeEach(() => {
    Cypress.env('REACT_APP_API_HOST', 'https://oed-poc-server-ohkmuktm2a-uw.a.run.app')
  })
  it('should display the 404', () => {
    cy.visit('/404') // TODO: assert menu item shows up and is clickable instead of navigating here via url directly.
    cy.url().should('include', '/404')
    // TODO: assert You just hit a route that doesn't exist.
  })
})
