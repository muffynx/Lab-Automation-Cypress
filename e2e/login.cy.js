describe("Login Tests", () => {

  const baseUrl = "https://robot-lab-five.vercel.app/";

  it("should login successfully", () => {
    cy.visit(baseUrl);
    cy.get(".nav-btn-login").click();

    cy.get("#loginEmail").type("boss2@gmail.com"); // email ที่ถูกต้อง
    cy.get("#loginPassword").type("password1234"); // password ที่ถูกต้อง
    cy.get("form > button").click({ force: true });


    cy.get(".message")
      .should("have.text", "Login successful! Welcome, Boss!")
      .screenshot("login-success-message"); 

    cy.screenshot("login-success-page");
  });

  it("should fail login with wrong password", () => {
    cy.visit(baseUrl);
    cy.get(".nav-btn-login").click();

    cy.get("#loginEmail").type("boss2@gmail.com"); // email ถูกต้อง
    cy.get("#loginPassword").type("wrongpassword"); // password ผิด
    cy.get("form > button").click({ force: true });


    cy.get(".message")
      .should("have.text", "Invalid email or password")
      .screenshot("login-fail-message"); 


    cy.screenshot("login-fail-page");
  });
});
