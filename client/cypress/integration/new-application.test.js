// enables intelligent code completion for Cypress commands
// https://on.cypress.io/intelligent-code-completion
/// <reference types="Cypress" />

describe('New Application Page Smoke/E2E Testing', () => {
  // afterAll(() => {
    // cleanup applications from db
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
  xit('should navigate to the new applications form page', () => {
    cy.get("[data-testid='new-claim-link']").click()
    cy.url().should('include', '/application')
  })
  it('should create and submit a new application', () => {
    cy.get("[data-testid='new-claim-link']").click()

    // enter firstName --> next
    cy.get("input[name='firstName']").type('First Name e2e').should('have.value', 'First Name e2e')
    cy.get("[data-testid='next-button']").click()

    // add employment record button --> name of employer --> accept button --> Next
    cy.get("[data-testid='next-button']").click()

    // checkbox -> next
    cy.get("[data-testid='C_1']").click()
    cy.get("[data-testid='next-button']").click()

    // checkbox --> text field --> next
    cy.get("[data-testid='D_1']").click()
    cy.get("[data-testid='next-button']").click()

    // checkbox --> next
    cy.get("[data-testid='E_1']").click()
    cy.get("[data-testid='next-button']").click()

    // assert on dropzone element --> next
    cy.get("[data-testid='next-button']").click()

    // checkbox -> full name --> agree chexkbox --> submit application button
    cy.get("[data-testid='F_1']").click()
    cy.get("[data-testid='next-button']").click()

    // assert url should include /application-submitted
    cy.url().should('include', '/application-submitted')

    // download form button --> view applications button --> assert url should include /claim-status
  })
})
