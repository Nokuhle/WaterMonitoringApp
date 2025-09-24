/// <reference types="cypress" />

declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Custom login command
       * @example cy.login('user@test.com', 'password123')
       */
      login(email: string, password: string): Chainable<void>
    }
  }
}