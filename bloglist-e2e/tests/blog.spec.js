const {
  test,
  expect,
  beforeEach,
  describe,
  afterAll,
} = require("@playwright/test");

describe("Blog app", () => {
  const user = {
    username: "testuser",
    name: "Test User",
    password: "testpassword",
  };
  beforeEach(async ({ page, request }) => {
    await page.goto("http://localhost:5173");
    await request.post("http://localhost:3001/api/testing/create-user", {
      data: {
        username: user.username,
        name: user.name,
        password: user.password,
      },
    });
    await page.getByRole("textbox", { name: "Username" }).fill(user.username);
    await page.getByRole("textbox", { name: "Password" }).fill(user.password);

    const loginButton = page.getByRole("button", { name: "Login" });
    await expect(loginButton).toBeEnabled();

    await loginButton.click();
    await page.waitForLoadState("networkidle");
  });

  afterAll(async ({ request }) => {
    await request.post("http://localhost:3001/api/testing/reset-database");
  });

  describe("When logged in", () => {
    const newBlog = {
      title: "Test Blog",
      author: "Test Author",
      url: "https://test.com",
    };
    test("A blog can be created", async ({ page }) => {
      await page.getByRole("button", { name: "New blog" }).click();
      await page.getByRole("textbox", { name: "Title" }).fill(newBlog.title);
      await page.getByRole("textbox", { name: "Author" }).fill(newBlog.author);
      await page.getByRole("textbox", { name: "Url" }).fill(newBlog.url);
      await page.getByRole("button", { name: "Create" }).click();
      await page.waitForLoadState("networkidle");
      await page.getByRole("button", { name: "Cancel" }).click();
      await expect(page.getByRole("heading", { name: "Blogs" })).toBeVisible();
      await expect(
        page.getByRole("heading", { name: newBlog.title })
      ).not.toBeVisible();
    });

    test("A blog can be liked", async ({ page }) => {
      await page.getByRole("button", { name: "View" }).click();
      await page.getByRole("button", { name: "Like" }).click();
      await page.waitForLoadState("networkidle");
      await expect(page.getByText("1")).toBeVisible();
    });
  });
});
