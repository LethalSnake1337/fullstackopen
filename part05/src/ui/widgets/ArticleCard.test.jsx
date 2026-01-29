import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ArticleCard from "./ArticleCard";

let component;

const article = {
  title: "Test Title",
  author: "Test Author",
  url: "http://test.com",
  likes: 1,
  user: {
    username: "test.user@test.com",
    name: "Test User",
  },
};

const currentUser = {
  username: "user@user.com",
  name: "User",
};

const onLikeMock = vi.fn();
const onRemoveMock = vi.fn();

beforeEach(() => {
  component = render(
    <ArticleCard
      article={article}
      onLike={onLikeMock}
      currentUser={currentUser}
      onRemove={onRemoveMock}
    />,
  );
});

test("should show title and author but not url and likes by default", () => {
  expect(component.container).toHaveTextContent(article.title);
  expect(component.container).toHaveTextContent(article.author);
  expect(component.container).not.toHaveTextContent(article.url);
  expect(component.container).not.toHaveTextContent(article.likes);
});

test("should show url, number of likes and user when view button is clicked", async () => {
  const testUser = userEvent.setup();
  const viewButton = component.getByText("view");
  await testUser.click(viewButton);
  expect(component.container).toHaveTextContent(article.url);
  expect(component.container).toHaveTextContent(article.likes);
  expect(component.container).toHaveTextContent(article.user.name);
});

test("should call event handler twice when like button is double clicked", async () => {
  const testUser = userEvent.setup();
  const viewButton = component.getByText("view");
  await testUser.click(viewButton);
  const likeButton = component.getByText("like");
  await testUser.dblClick(likeButton);
  expect(onLikeMock.mock.calls).toHaveLength(2);
});
