describe("Register Tests", () => {
  const baseUrl = "https://robot-lab-five.vercel.app/";

  it("should register new user and intercept API", () => {
    const interceptedData = [];

    cy.intercept("POST", "https://robot-lab.onrender.com/api/**", (req) => {
      req.continue((res) => {
        interceptedData.push({
          url: req.url,
          method: req.method,
          requestBody: req.body,
          responseBody: res.body,
          statusCode: res.statusCode,
        });
      });
    }).as("registerApi");

    cy.visit(baseUrl);


    cy.get(".nav-btn-register").click();

   
    cy.get("#firstName").type("Boss");
    cy.get("#lastName").type("Tester");

    const email = `test${Date.now()}@gmail.com`; // unique email
    cy.get("#email").type(email);
    cy.get("#password").type("password1234");

    cy.get("form > button").click({ force: true });

    cy.wait("@registerApi");


    cy.get(".message")
      .should("have.text", "Registration successful! Welcome, Boss!")
      .screenshot("Register-success-message"); 

    cy.screenshot("Register-success-page");


    cy.then(() => {
      cy.writeFile(
        "cypress/fixtures/register_intercept.json",
        interceptedData,
        { log: true }
      );
    });
  });
});
