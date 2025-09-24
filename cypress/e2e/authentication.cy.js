describe('Authentication', () => {
  it('Visits login page', () => {
    cy.visit('/login.html') 
    cy.contains('Login to continue').should('exist')
  })

  it('Submits login form', () => {
    cy.visit('/login.html')
    cy.get('#loginEmail').type('ngubanenokuhle@gmail.com')
    cy.get('#loginPassword').type('MaNizzle01#')
    cy.get('form').submit()
    cy.url().should('include', '/dashboard.html')
  })
})