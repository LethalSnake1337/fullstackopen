describe("Article management application", function () {
  const testUser = {
    name: "Test User",
    username: "test.user@test.com",
    password: "secret",
  };

  beforeEach(function () {
    cy.request("POST", `${Cypress.env("BACKEND")}/testing/reset`);
    cy.visit("");
    cy.request("POST", `${Cypress.env("BACKEND")}/users`, testUser);
  });

  it("Authentication form is displayed", function () {
    cy.contains("Log in to application");
    cy.contains("username");
    cy.contains("password");
    cy.contains("login");
  });

  describe("User authentication", function () {
    it("succeeds with valid credentials", function () {
      cy.get("#signin-username").type(testUser.username);
      cy.get("#signin-password").type(testUser.password);
      cy.get("#signin-submit").click();

      cy.contains(`${testUser.name} logged in`);
    });

    it("fails with invalid credentials", function () {
      cy.get("#signin-username").type(testUser.username);
      cy.get("#signin-password").type("wrong");
      cy.get("#signin-submit").click();

      cy.get(".error")
        .should("contain", "invalid username or password")
        .and("have.css", "color", "rgb(255, 0, 0)");

      cy.contains(`${testUser.name} logged in`).should("not.exist");
    });
  });

  describe("Article operations", function () {
    const firstArticle = {
      title: "First Title",
      author: "First Author",
      url: "http://firstblog.com",
      likes: 2,
    };

    const secondArticle = {
      title: "Second Title",
      author: "Second Author",
      url: "http://secondblog.com",
      likes: 1,
    };

    const thirdArticle = {
      title: "Third Title",
      author: "Third Author",
      url: "http://thirdblog.com",
      likes: 3,
    };

    beforeEach(function () {
      cy.login({ username: testUser.username, password: testUser.password });
    });

    it("New article can be submitted", function () {
      const testArticle = {
        title: "Test Title",
        author: "Test Author",
        url: "http://testblog.com",
      };

      cy.contains("new article").click();
      cy.get("#article-title").type(testArticle.title);
      cy.get("#article-author").type(testArticle.author);
      cy.get("#article-url").type(testArticle.url);

      cy.get("#submit-article").click();
      cy.contains(
        `New article "${testArticle.title}" by ${testArticle.author} added`,
      );
      cy.contains(`${testArticle.title} ${testArticle.author}`);
    });

    it("Article can receive a like", function () {
      cy.createBlog(firstArticle);
      cy.get("#expand-button").click();
      cy.get("#like-button").click();
      cy.contains("likes 3");
    });

    it("Article can be removed by its creator", function () {
      cy.createBlog(thirdArticle);
      cy.get("#expand-button").click();
      cy.get("#delete-button").click();
      cy.contains(
        `Article "${thirdArticle.title}" by ${thirdArticle.author} was removed`,
      );
      cy.contains(`${thirdArticle.title} ${thirdArticle.author}`).should(
        "not.exist",
      );
    });

    it("Remove button is visible only to the article creator", function () {
      cy.createBlog(firstArticle);
      cy.contains("First Title First Author");
      cy.get("#expand-button").click();
      cy.get("#delete-button").should("exist");

      const anotherUser = {
        name: "Another User",
        username: "another.user@test.com",
        password: "secret",
      };
      cy.request("POST", `${Cypress.env("BACKEND")}/users`, anotherUser);
      cy.login({
        username: anotherUser.username,
        password: anotherUser.password,
      });
      cy.contains("First Title First Author");
      cy.get("#expand-button").click();
      cy.get("#delete-button").should("not.exist");
    });

    it("Articles are sorted by likes in descending order", function () {
      cy.createBlog(firstArticle);
      cy.createBlog(secondArticle);
      cy.createBlog(thirdArticle);

      cy.get(".article-card").eq(0).contains("Third Title Third Author");
      cy.get(".article-card").eq(1).contains("First Title First Author");
      cy.get(".article-card").eq(2).contains("Second Title Second Author");

      cy.get(".article-card").eq(1).find("#expand-button").click();
      cy.get("#like-button").click();
      cy.contains("likes 3");
      cy.get("#like-button").click();
      cy.contains("likes 4");

      cy.get(".article-card").eq(0).contains("First Title First Author");
      cy.get(".article-card").eq(1).contains("Third Title Third Author");
      cy.get(".article-card").eq(2).contains("Second Title Second Author");
    });
  });
});
