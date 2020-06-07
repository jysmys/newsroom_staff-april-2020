describe("editor", () => {
  const free = ":nth-child(2) > :nth-child(1) > label"
  const premium = ":nth-child(2) > :nth-child(2) > label"
  const locationSweden = ":nth-child(3) > :nth-child(1) > label" 
  const international = ":nth-child(3) > :nth-child(2) > label" 
  
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

  describe("can checkout article", () => {
    it("can view checked-out article", () => {
      cy.get("#checkout-article-1").click();
      cy.get("#preview-title").should("contain", "title 1");
      cy.get("#body").should("contain", "Lorem ipsum dolor");
      cy.get("#category").should("contain", "Sport");
      cy.get("#radio-free").should("be.checked");
    });

    it("and navigate back to list of articles", () => {
      cy.get("#checkout-article-1").click();
      cy.get("button").contains("Back to list").click();
      cy.get("#article-list").should("be.visible");
    });
  });

  describe("can change properties and successfully publish", () => {
    beforeEach(() => {
      cy.get("#checkout-article-1").click();
      cy.route({
        method: "PUT",
        url: "http://localhost:3000/api/admin/articles/1",
        response: "fixture:successful_publish.json",
      });
    });

    it("change category and add location and publish", () => {
      cy.get("#category").click();
      cy.get("#category > .visible > :nth-child(4)").click();
      cy.get(locationSweden).click();
      cy.get("#checkbox-sweden").should("be.checked");
      cy.get(international).click();
      cy.get("#checkbox-International").should("be.checked");
      cy.get("#publish-btn").click();
      cy.get("#success-message").should(
        "contain",
        "Article successfully published!"
      );
    });

    it("change article class and publish", () => {
      cy.get(locationSweden).click();
      cy.get(premium).click();
      cy.get("#publish-btn").click();
      cy.get("#success-message").should(
        "contain",
        "Article successfully published!"
      );
    });
  });

  describe("When an article is published", () => {
    beforeEach(() => {
      cy.route({
        method: "PUT",
        url: "http://localhost:3000/api/admin/articles/1",
        response: "fixture:successful_publish.json",
      });
      cy.get("#article-1").click();
      cy.get("#checkout-article-1").click();
      cy.get(locationSweden).click();
      cy.get(premium).click();
      cy.get("#publish-btn").click();
    });

    it('"Publish" button disappears', () => {
      cy.get("#publish-btn").should("not.exist");
    });

    it("it is not shown in article preview when going back to previous page", () => {
      cy.get("button").contains("Back to list").click();
      cy.get("#preview-message").should(
        "contain",
        "Select an article in the list to preview"
      );
    });
  });

  describe("cannot publish", () => {
    it("without choosing either 'local' or 'international'", () => {
      cy.get("#checkout-article-1").click();
      cy.get("#publish-btn").click();
      cy.get("#error-message").should(
        "contain",
        "Please select either local or international"
      );
    });
  });
});
