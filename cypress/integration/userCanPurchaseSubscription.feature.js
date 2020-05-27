describe("user can purchase a subscription", () => {
  beforeEach(() => {
    cy.server();
    cy.route({
      method: "POST",
      url: "**/api/auth/*",
      response: "fixture:successful_login.json",
      headers: {
        uid: "user@mail.com",
      },
    });
    cy.route({
      method: "GET",
      url: "**/api/auth/*",
      response: "fixture:successful_login.json",
      headers: {
        uid: "user@mail.com",
      },
    });
    cy.route({
      method: "POST",
      url: "**/subscription",
      response: { message: "Transaction was sucessfull" },
    });
    cy.visit("/");
    cy.get("#login-form").within(() => {
      cy.get("#email").type("user@mail.com");
      cy.get("#password").type("password");
      cy.get("Button").contains("Submit").click();
    });
  });

  it("by clicking button Buy subscription", () => {
    cy.get("button").contains("Buy Subscription").click();
    cy.get("#payment-interface").should("be.visible");
    cy.wait(1000);
    cy.typeInStripeElement("cardnumber", "42424242424242");
    cy.typeInStripeElement("exp-date", "1221");
    cy.typeInStripeElement("cvc", "132");
    cy.get("Button").contains("Submit").click();
    cy.get("#subscription-message").should(
      "contain",
      "Transaction was successfull"
    );
  });
});
