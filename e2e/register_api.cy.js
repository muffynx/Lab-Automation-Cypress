describe("Register API Tests", () => {
  const apiUrl = "https://robot-lab.onrender.com/api/auth/register"; // ปรับตาม intercept จริง

  it("should send register API request 10 times with different emails", () => {
    cy.fixture("register_users.json").then((users) => {
      users.forEach((user, index) => {
        cy.request({
          method: "POST",
          url: apiUrl,
          body: user,
          failOnStatusCode: false, // กัน error ถ้าเจอ 400/409
        }).then((res) => {
          cy.log(`Request ${index + 1}: ${user.email}`);
          cy.log(`Status: ${res.status}`);
          cy.writeFile(
            `cypress/results/register_result_${index + 1}.json`,
            { email: user.email, status: res.status, body: res.body },
            { flag: "a+" }
          );
        });
      });
    });
  });
});
