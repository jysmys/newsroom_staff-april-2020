describe("Journalist can create an article", () => {
  beforeEach(() => {
    cy.login("journalist");
  });

  describe("successfully", () => {
    beforeEach(() => {
      cy.route({
        method: "POST",
        url: "http://localhost:3000/api/articles*",
        response: "fixture:success_message.json",
      });
    });

    it("with title, body, image and category", () => {
      cy.get("input#title").type("This is the title");
      cy.get("textarea#body").type(
        "This is the body this is the body this is the body this is the body this is the body."
      );

      cy.get("#category").click();
      cy.get("#category > .visible > :nth-child(2)").click();
      cy.file_upload("img.jpeg", "#image-upload", "image/jpeg");
      cy.get("#preview-image").should("be.visible");
      cy.get("#post").click();
      cy.get("#message").should("contain", "Article successfully created!");
    });

    it("the input fields are cleared on submission", () => {
      cy.get("input#title").type("This is the title");
      cy.get("textarea#body").type(
        "This is the body"
      );
      cy.get("#category").click();
      cy.get("#category > .visible > :nth-child(2)").click();
      cy.file_upload("img.jpeg", "#image-upload", "image/jpeg");
      cy.get("#preview-image").should("be.visible");
      cy.get("#post").click();
      cy.get("#message").should("contain", "Article successfully created!");
      cy.get("input#title").should("not.have.value", "This is the title");
      cy.get("textarea#body").should("not.have.value", "This is the body");
      cy.get("#preview-image").should("not.be.visible");
      cy.wait(3000);
      cy.get("#message").should("not.be.visible");
    });
  });

  describe("unsuccessfully", () => {
    it("without entering any title", () => {
      cy.route({
        method: "POST",
        url: "http://localhost:3000/api/articles*",
        response: "fixture:title_blank_message.json",
        status: 400,
      });
      cy.get("textarea#body").type(
        "This is the body this is the body this is the body this is the body this is the body."
      );
      cy.get("#post").click();
      cy.get("#message").should("contain", "Title can't be blank");
    });

    it("without entering any body text", () => {
      cy.route({
        method: "POST",
        url: "http://localhost:3000/api/articles*",
        response: "fixture:body_blank_message.json",
        status: 400,
      });
      cy.get("input#title").type("This is the title");
      cy.get("#post").click();
      cy.get("#message").should("contain", "Body can't be blank");
    });

    it("without uploading image", () => {
      cy.route({
        method: "POST",
        url: "http://localhost:3000/api/articles*",
        response: "fixture:image_blank_message.json",
        status: 400,
      });
      cy.get("input#title").type("This is the title");
      cy.get("textarea#body").type(
        "This is the body this is the body this is the body this is the body this is the body."
      );
      cy.get("#post").click();
      cy.get("#message").should("contain", "Image can't be blank");
    });
  });
});
