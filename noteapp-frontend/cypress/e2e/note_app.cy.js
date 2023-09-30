describe('Note app', function() {
  const testUser = {
    name: 'Test User',
    username: 'testuser',
    password: 'testpwd',
  }

  const newNote = {
    content: `a note crated by cypress ${Math.random()}`,
    important: true
  }
  
  beforeEach(function() {
    cy.request('POST', `${Cypress.env('baseUrlBackEnd')}/testing/reset`)
    cy.request('POST', `${Cypress.env('baseUrlBackEnd')}/users`, testUser)
    cy.visit('')
  })

  it('front page can be opened', function() {
    cy.contains('Notes')
    cy.contains('Note app, Department of Computer Science, University of Helsinki 2023')
  })

  it('login fails with wrong password', function() {
    cy.get('#username').type(testUser.username)
    cy.get('#password').type('wrong')
    cy.get('#login-button').click()
    cy.get('.error')
      .should('contain', 'invalid username or password')
      .and('have.css', 'color', 'rgb(255, 0, 0)')
      .and('have.css', 'border-style', 'solid')
    cy.get('html')
      .should('not.contain', `${testUser.name} logged in`)
  })

  it('user can login', function () {
    cy.get('#username').type(testUser.username)
    cy.get('#password').type(testUser.password)
    cy.get('#login-button').click()
    cy.contains(testUser.name)
  })

  describe('when logged in', function() {
    beforeEach(function() {
      cy.login(testUser)
    })

    it('a new note can be created', function () {
      cy.contains('create note').click()
      cy.get('#content').type(newNote.content)
      cy.get('#save-button').click()
      cy.contains(newNote.content)
    })

    describe('and a note exists', function() {
      beforeEach(function() {
        cy.createNote(newNote)
      })

      it.only('it can be made not important', function() {
        cy.get('.note')
          .contains(newNote.content)
          .parent()
          .as('noteDiv')
        cy.get('@noteDiv')
          .find('button')
          .contains('make not important')
          .click()
        cy.get('@noteDiv')
          .find('button')
          .contains('make important')
          .should('exist')
      })
    })
  })
})