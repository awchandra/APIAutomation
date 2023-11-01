/// <reference types="Cypress" />

describe("HTTP Requests GET", function(){
    beforeEach(function(){
        cy.fixture('APIResponse').then(function(data)
        {
            this.data = data
        })
    })
    it("Normal GET Test Case", function(){
        cy.request({
            method  : 'GET', 
            url     : this.data.url,
        })
        .then((response) => {
            expect(response.status).to.equal(200)
            expect(response.body[0].id).to.equal(this.data.id)
            expect(response.body[0].title).to.equal(this.data.title)
            expect(response.body[0].body).to.equal(this.data.body)
            expect(response.duration).not.to.be.greaterThan(2000)

        })
    })
    it("Failed Body Assert GET Test Case", function(){
        cy.request({
            method  : 'GET', 
            url     : this.data.url_one_data,
        })
        .then((response) => {
            expect(response.status).to.equal(200)
            expect(response.body.id).not.to.equal(this.data.id)
            expect(response.body.title).not.to.equal(this.data.title)
            expect(response.body.body).not.to.equal(this.data.body)

        })
    })
    it("GET Test Case Return Empty When Hit Minimum Boundary", function(){
        cy.request({
            method  : 'GET', 
            url     : this.data.url_min_data,
            failOnStatusCode: false,
        })
        .then((response) => {
            expect(response.status).to.equal(404)
        })
    })
    it("GET Test Case Return Empty When Hit Maximum Boundary", function(){
        cy.request({
            method  : 'GET', 
            url     : this.data.url_max_data,
            failOnStatusCode: false,
        })
        .then((response) => {
            expect(response.status).to.equal(404)
        })
    })
})