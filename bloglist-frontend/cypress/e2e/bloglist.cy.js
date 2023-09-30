describe('Blog app', function() {
  const testUser = {
    name: 'Test User',
    username: 'testuser',
    password: 'testpwd',
  }

  const testUser2 = {
    name: 'Test User2',
    username: 'testuser2',
    password: 'testpwd2',
  }

  const newBlog = {
    title: 'Cool Tools',
    author: 'Kevin Kelly',
    url: 'https://kk.org/cooltools',
    likes: 1,
  }

  const newBlog2 = {
    title: 'Marginal Revolution',
    author: 'Tyler Cohen',
    url: 'https://marginalrevolution.com',
    likes: 2,
  }
  
  beforeEach(function() {
    cy.request('POST', `${Cypress.env('baseUrlBackEnd')}/testing/reset`)
    cy.request('POST', `${Cypress.env('baseUrlBackEnd')}/users`, testUser)
    cy.request('POST', `${Cypress.env('baseUrlBackEnd')}/users`, testUser2)
    cy.visit('')
  })

  // excercise 5.17
  it('Login form is shown', function() {
    cy.get('#loginForm')
      .should('exist')
      .and('contain', 'username')
      .and('contain', 'password')
      .and('contain', 'login')
  })

  // excercise 5.18
  describe('Login', function() {
    it('succeeds with valid credentials', function() {
      cy.get('#username').type(testUser.username)
      cy.get('#password').type(testUser.password)
      cy.get('#login-button').click()
      cy.contains(testUser.name)
    })

    it('fails with invalid credentials', function() {
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
  })

  // excercise 5.19
  describe('When logged in', function() {
    beforeEach(function() {
      cy.login(testUser)
    })

    it('a blog can be created', function () {
      cy.contains('create blog').click()
      cy.get('#title').type(newBlog.title)
      cy.get('#author').type(newBlog.author)
      cy.get('#url').type(newBlog.url)
      cy.get('#submit-button').click()
      cy.get('.blog').contains(newBlog.title)
    })

    describe('and a blog exists', function() {
      beforeEach(function() {
        cy.createBlog(newBlog)
      })

      function blogCanBeLikedByUser(currentLikeCount) {
        // select the blog from the list
        cy.get('.blog').contains(newBlog.title).parent().as('selectedBlog')
        // expand the details
        cy.get('@selectedBlog').find('button').contains('details').click()
        // check that likes are showing current count
        cy.get('@selectedBlog').should('contain', `likes: ${currentLikeCount}`)
        // click 'like' button
        cy.get('@selectedBlog').find('button').contains('like').click()
        // check that the likes are now incremented by 1
        cy.get('@selectedBlog').should('contain', `likes: ${currentLikeCount+1}`)
      }

      // excercise 5.20
      it('it can be liked by any user', function() {
        // first, check that the blog can be liked by current user
        blogCanBeLikedByUser(newBlog.likes)
        // now logout and login as another user
        cy.get('#logout-button').click()
        cy.login(testUser2)
        // and check that the blog can be liked by this user as well
        blogCanBeLikedByUser(newBlog.likes + 1)
      })

      // excercise 5.21
      it('it can be deleted by the creator', function() {
        // select the blog from the list
        cy.get('.blog').contains(newBlog.title).parent().as('selectedBlog')
        // click the delete button
        cy.get('@selectedBlog').find('button').contains('delete').click()
        // check that the blog entry is removed from the list
        cy.get('#bloglist').should('not.contain', newBlog.title)
      })

      // excercise 5.22
      it('only creator can see the delete button', function() {
        // select the blog from the list
        cy.get('.blog').contains(newBlog.title).parent().as('selectedBlog')
        // check that the delete button is shown
        cy.get('@selectedBlog').should('contain', 'delete')
        // now logout and login as another user
        cy.get('#logout-button').click()
        cy.login(testUser2)
        // check that the delete button is NOT shown
        cy.get('@selectedBlog').should('not.contain', 'delete')
      })
    })

    describe('and two blogs exist', function() {
      beforeEach(function() {
        cy.createBlog(newBlog)
        cy.createBlog(newBlog2)
      })

      // excercise 5.23
      it('they are sorted by most likes', function() {
        const blogs = [ newBlog, newBlog2 ]
        const sortedBlogs = blogs.sort((b1, b2) => b2.likes > b1.likes ? 1 : b2.likes < b1.likes ? -1 : 0)
        // check that blogs are ordered by most likes
        sortedBlogs.forEach(function(blog, i) {
          cy.get('.blog').eq(i).should('contain', blog.title)
        })
        // increment the likes of second blog to exceed the top blog
        cy.get('.blog').eq(1).as('secondBlog')
        for(let i=sortedBlogs[1].likes+1; i<=sortedBlogs[0].likes+1; i++) {
          cy.get('@secondBlog').contains('like').click()
        }
        // now check that the blogs are rearranged
        cy.get('.blog').eq(0).should('contain', sortedBlogs[1].title)
        cy.get('.blog').eq(1).should('contain', sortedBlogs[0].title)
      })
    })
  })
})