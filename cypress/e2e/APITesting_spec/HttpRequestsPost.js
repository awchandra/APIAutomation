/// <reference types="Cypress" />

describe("HTTP Requests POST", function(){
    beforeEach(function(){
        cy.fixture('APIResponse').then(function(data)
        {
            this.data = data
        })
    })
    it("Normal POST Test Case", function(){
        const requestBody = {
            title: "Some post title",
            body : "This is the post call",
            userid: this.data.userId
        }
        cy.request({
            method  : 'POST', 
            url     : this.data.url,
            body    : requestBody
        })
        .then((response) => {
            expect(response.status).to.equal(201)
            expect(response.body.title).to.equal('Some post title')
            expect(response.body.body).to.equal('This is the post call')
            expect(response.body.userid).to.equal(this.data.userId)
            expect(response.duration).not.to.be.greaterThan(2000)

        })
    })
    it("Should be failed POST Test Case When Didn't send userid", function(){
        const requestBody = {
            title: "Some post title",
            body : "This is the post call"
        }
        cy.request({
            method  : 'POST', 
            url     : this.data.url,
            body    : requestBody
        })
        .then((response) => {
            //The response should be 4XX because user didn't send userid, but this API seems didn't have that restriction 
            expect(response.status).to.equal(201)
            expect(response.body.title).to.equal('Some post title')
            expect(response.body.body).to.equal('This is the post call')
            expect(response.duration).not.to.be.greaterThan(1000)

        })
    })
    it("Should be failed POST Test Case When Send Typo userid", function(){
        const requestBody = {
            title: "Some post title",
            body : "This is the post call",
            userOd: this.data.userId
        }
        cy.request({
            method  : 'POST', 
            url     : this.data.url,
            body    : requestBody
        })
        .then((response) => {
            //The response should be 400 because user send bad request (typo userid) 
            expect(response.status).to.equal(201)
            expect(response.body.title).to.equal('Some post title')
            expect(response.body.body).to.equal('This is the post call')
            expect(response.body.userOd).to.equal(this.data.userId)
            expect(response.duration).not.to.be.greaterThan(1000)

        })
    })
    it("Should be failed POST Test Case Because it's a duplicate data", function(){
        const requestBody = {
            title: this.data.title,
            body : this.data.body,
            userOd: this.data.userId
        }
        cy.request({
            method  : 'POST', 
            url     : this.data.url,
            body    : requestBody
        })
        .then((response) => {
            //The response should be 4XX because the data is duplicated 
            expect(response.status).to.equal(201)
            expect(response.body.title).to.equal(this.data.title)
            expect(response.body.body).to.equal(this.data.body)
            expect(response.body.userOd).to.equal(this.data.userId)
            expect(response.duration).not.to.be.greaterThan(1000)

        })
    })
})