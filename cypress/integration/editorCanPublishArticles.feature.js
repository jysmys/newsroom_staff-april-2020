describe("editor can publish articles", () => {
  beforeEach(() => {
    cy.login("editor");
    cy.route({
      method: "GET",
      url: "http://localhost:3000/api/admin/articles",
      response: "fixture:unpublished_articles.json",
    });
    cy.route({
      method: "GET",
      url: "http://localhost:3000/api/admin/articles/1",
      response: "fixture:single_unpublished_article.json",
    });
    cy.get("#review-nav").click();
  });
  describe("editor can checkout article", () => {
    it("can view checkout article", () => {
      cy.get("#checkout-article-1").click();
      cy.get("#preview-title").should("contain", "title 1");
      cy.get("#body").should("contain", "Lorem ipsum dolor");
      cy.get("#category").should("contain", "Sport");
      cy.get("#radio-free").should("be.checked");
    });
  });

  describe("editor can change properties and publish", () => {
    beforeEach(() => {
      cy.get("#checkout-article-1").click();
      cy.route({
        method: "PUT",
        url: "http://localhost:3000/api/admin/articles/1",
        response: "fixture:successful_publish.json",
      });
    });

    it("change category and publish", () => {
      cy.get("#category").click();
      cy.get("#category > .visible > :nth-child(4)").click();
      cy.get("#publish-btn").click();
      cy.get("#message").should("contain", "Article successfully published!");
    });

    it("change article class and publish", () => {
      cy.get('[type="radio"]').last().check();
      cy.get("#publish-btn").click();
      cy.get("#message").should("contain", "Article successfully published!");
    });
  });
});
