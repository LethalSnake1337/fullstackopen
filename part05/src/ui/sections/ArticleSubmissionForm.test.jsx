import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import ArticleSubmissionForm from "./ArticleSubmissionForm";
import userEvent from "@testing-library/user-event";

test("should call event handler with right details when new article is created", async () => {
  const onSubmitMock = vi.fn();
  const component = render(<ArticleSubmissionForm onSubmit={onSubmitMock} />);

  const newArticle = {
    title: "Test Title",
    author: "Test Author",
    url: "http://test.com",
  };

  const testUser = userEvent.setup();
  const titleInput = component.container.querySelector("#article-title");
  const authorInput = component.container.querySelector("#article-author");
  const urlInput = component.container.querySelector("#article-url");
  const submitButton = component.getByText("create");

  await testUser.type(titleInput, newArticle.title);
  await testUser.type(authorInput, newArticle.author);
  await testUser.type(urlInput, newArticle.url);
  await testUser.click(submitButton);

  expect(onSubmitMock.mock.calls).toHaveLength(1);
  expect(onSubmitMock.mock.calls[0][0]).toEqual(newArticle);
});
