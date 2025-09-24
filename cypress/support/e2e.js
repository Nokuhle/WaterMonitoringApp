/// <reference types="cypress" />

Cypress.Commands.add('login', (email, password) => {
  cy.visit('/login.html')
  cy.get('#loginEmail').type(email)
  cy.get('#loginPassword').type(password)
  cy.get('form').submit()
})
