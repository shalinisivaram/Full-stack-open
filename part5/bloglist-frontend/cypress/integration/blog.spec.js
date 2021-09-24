describe('Blog app',function(){
    beforeEach(function(){
        cy.request('POST', 'http://localhost:3002/api/testing/reset')
        const user = {
            name:'mani',
            username:'mani',
            password:'ravi'
        }
        cy.request('POST','http://localhost:3002/api/users', user)
        cy.visit('http://localhost:3000')
    })
    it('login form displayed',function(){
        cy.contains('login to the application')
    })  
    describe('application login',function(){
        it('successful login', function(){
            cy.login({username:'mani',password:'ravi'})
            cy.contains('mani logged-in')
        }) 
        it('unsuccessful login',function(){
            cy.get('#username').type('mluukkai')
            cy.get('#password').type('wrong')
            cy.get('#login-button').click()
            cy.get('.error')
                .should('contain','wrong credentials')
                .and('have.css', 'color', 'rgb(255, 0, 0)')
                .and('have.css', 'border-style', 'solid')
        })
    })
    describe('blog creation',function(){
        beforeEach(function(){
            cy.login({username:'mani',password:'ravi'})
            cy.contains('mani logged-in')
        })
        it('a new blog can be created',function(){
            cy.addBlog({title:'first blog',author:'shalini',url:'www.sivaram.com'})
            cy.get('.blogList').contains('first blog -shalini')
        })
    })
    describe('blog function',function(){
        beforeEach(function(){
            cy.login({username:'mani',password:'ravi'})
            cy.addBlog({title:'second blog',author:'sivaram',url:'www.shalini.com'})
        })
        it('user can like a blog',function(){
            cy.contains('second blog').parent().get('#fullBlog').click()
            cy.get('.blogDetails').parent().get('#likes').click()
            cy.contains('second blog').parent().contains('Likes: 1')
        })
    })
})
    describe('blog delete',function(){
        it('user can delete a blog',function(){
            cy.login({username:'mani',password:'ravi'})
            cy.addBlog({title:'third blog',author:'viyas',url:'www.viyasini.com'}) 
            cy.addBlog({title:'fourth blog',author:'kutta',url:'www.harshith.com'})   
            cy.contains('third blog').parent().find('#remove-button').click()
            cy.get('.blogList').should('not.contain','third blog')
            cy.get('#logOut').click()
        })
        it('other user cannot delete a blog',function(){
            const user = {
                name:'shalu',
                username:'shalini',
                password:'ravi'
            }
            cy.request('POST','http://localhost:3002/api/users', user)
            cy.visit('http://localhost:3000')
            cy.login({username:'shalini',password:'ravi'})
            cy.contains('fourth blog').parent().should('not.contain',('#remove-button'))
        })
        it('blogs are ordered by likes',function(){
            cy.get('#fullBlog').click()
            cy.get('#like').contains('Likes: 1')
        })
            
    })
    
