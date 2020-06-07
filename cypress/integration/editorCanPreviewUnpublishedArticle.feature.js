describe("Editor can see unpublished articles", () => {
  beforeEach(() => {
    cy.login("editor");
    cy.route({
      method: "GET",
      url: "http://localhost:3000/api/admin/articles",
      response: "fixture:unpublished_articles.json",
    });
    cy.get("#review-nav").click();
  });

  describe("when logged in as editor", () => {
    beforeEach(() => {
      cy.route({
        method: "GET",
        url: "http://localhost:3000/api/admin/articles/1",
        response: "fixture:single_unpublished_article.json",
      });
    });

    it("tells you to click an article", () => {
      cy.get("#preview-message").should(
        "contain",
        "Select an article in the list to preview"
      );
    });

    it("can click and view an article on the review page", () => {
      cy.get("#article-1").click();
      cy.get("#preview").within(() => {
        cy.get("#preview-title").should("contain", "title 1");
        cy.get("#body").should("contain", "Lorem ipsum");
        cy.get(".image").should("be.visible");
      });
    });
  });

  describe("with article that is no longer unpublished", () => {
    beforeEach(() => {
      cy.route({
        method: "GET",
        url: "http://localhost:3000/api/admin/articles/2",
        response: {
          message: "This article was already published",
        },
        status: 422
      });
      cy.get('#article-2').click()
    });

    it('shows the error message in the response', () => {
      cy.get('#preview-message').should('contain', 'This article was already published')
    })
  });
});
