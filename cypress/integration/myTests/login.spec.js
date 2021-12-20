describe("Login tests", () => {
    it("login inputs/ submit button exists", () => {
        cy.visit("/login");

        cy.get("input[name='userName']").should("exist");
        cy.get("input[name='userPass']").should("exist");
        cy.get("button[type='submit']").should("exist");
    });

    it("login our user successfully and enter the page", () => {
        cy.visit("/login");

        cy.get("input[name='userName']").type("a");
        cy.get("input[name='userPass']").type("a");

        cy.get("button[type='submit']").click();

        // should
    });

    it("login our user unsuccessfully and remain in the login page", () => {
        cy.visit("/login");

        cy.get("input[name='userName']").type("fail");
        cy.get("input[name='userPass']").type("fail");

        cy.get("button[type='submit']").click();

        // should
    });

    it.only("enter the root page without login and get redirect to the login page", () => {
        cy.visit("/");
    });
});