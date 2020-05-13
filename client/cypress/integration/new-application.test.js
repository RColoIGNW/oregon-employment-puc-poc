// enables intelligent code completion for Cypress commands
// https://on.cypress.io/intelligent-code-completion
/// <reference types="Cypress" />

describe('New Application Page Smoke/E2E Testing', () => {
  // after(() => {
    // cleanup applications from db
  // })
  beforeEach(() => {
    Cypress.LocalStorage.clear = () => undefined
  })

  it('should navigate to the new applications form page', () => {
    cy.wait(1000)
    Cypress.env('REACT_APP_API_HOST', 'https://oed-poc-server-ohkmuktm2a-uw.a.run.app')
    const email = 'e2e@testing.com'
    const password = 'testing'
    cy.visit('/')
    cy.get('input[name=email]').type(email)
    cy.get('input[name=password]').type(`${password}{enter}`)
    cy.wait(200)
    cy.get("[data-testid='new-claim-link']").click({multiple: true, force: true})
    cy.wait(200)
  })
  it('section A - should enter a first name and save progress', () => {
    cy.get("input[name='firstName']").type('First Name e2e').should('have.value', 'First Name e2e')
    cy.get("[data-testid='next-button']").click({multiple: true, force: true})
    cy.wait(1000)
  })
  it('section B - should add employee record and save progress', () => {
    // add employment record button --> name of employer --> accept button --> Next
    cy.get("[data-testid='next-button']").click({multiple: true, force: true})
    cy.wait(1000)
  })
  it('section C - should select an answer checkbox and save progress', () => {
    cy.get("[data-testid='C_1']").click()
    cy.get("[data-testid='next-button']").click({multiple: true, force: true})
    cy.wait(1000)
  })
  it('section D - should select an answer checkbox and save progress', () => {
    // checkbox --> text field --> next
    cy.get("[data-testid='D_1']").click()
    cy.get("[data-testid='next-button']").click({multiple: true, force: true})
    cy.wait(1000)
  })
  it('section E - should select an answer checkbox and save progress', () => {
    cy.get("[data-testid='E_1']").click()
    cy.get("[data-testid='next-button']").click({multiple: true, force: true})
    cy.wait(1000)
  })
  it('section F - have the file upload (react dropzone) and save progress', () => {
    // assert on dropzone element --> next
    cy.get("[data-testid='next-button']").click({multiple: true, force: true})
    cy.wait(1000)
  })
  it('section G - should select an answer, click agree and submit the application', () => {
    // checkbox -> full name --> agree chexkbox --> submit application button
    cy.get("[data-testid='F_1']").click()
    cy.get("[data-testid='next-button']").click({multiple: true, force: true})
    cy.wait(1000)
    cy.url().should('include', '/application-submitted')
  })
  it('application submitted - should download a pdf application and navigate to view claim status.', () => {
    cy.get("[data-testid='download-application-button']").click()
    cy.get("[data-testid='view-claims-button']").click()
    cy.url().should('include', '/claim-status')
  })
})
