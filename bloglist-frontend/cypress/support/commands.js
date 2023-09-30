// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

const APP_USER_DATA = 'loggedInUserBlogApp'
Cypress.Commands.add('login', ({ username, password }) => {
  cy.request({
    url: `${Cypress.env('baseUrlBackEnd')}/login`,
    method: 'POST',
    body: { username, password },
  }).then(({ body }) => {
    localStorage.setItem(APP_USER_DATA, JSON.stringify(body))
    cy.visit('')
  })
})

Cypress.Commands.add('createBlog', (blogData) => {
  cy.request({
    url: `${Cypress.env('baseUrlBackEnd')}/blogs`,
    method: 'POST',
    body: blogData,
    headers: {
      'Authorization': `Bearer ${JSON.parse(localStorage.getItem(APP_USER_DATA)).token}`
    }
  })

  cy.visit('')
})
