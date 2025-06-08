const {
  test,
  expect,
  beforeEach,
  describe,
  afterAll,
} = require("@playwright/test");
const { createBlog, loginWith } = require("../helpers/helper");

describe("Blog app", () => {
  const user = {
    username: "testuser",
    name: "Test User",
    password: "testpassword",
  };
  beforeEach(async ({ page, request }) => {
    await request.post("http://localhost:3001/api/testing/reset");
    await request.post("http://localhost:3001/api/users", {
      data: {
        username: user.username,
        name: user.name,
        password: user.password,
      },
    });

    await page.goto("http://localhost:5173");
    await loginWith({ page, username: user.username, password: user.password });
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

    test("A blog can be deleted", async ({ page }) => {
      await page.getByRole("button", { name: "View" }).click();
      await page.getByRole("button", { name: "Delete" }).click();
      page.on("dialog", async (dialog) => {
        expect(dialog.type()).toBe("confirm");
        await dialog.accept();
        await page.waitForLoadState("networkidle");
        await expect(page.getByText(newBlog.title)).not.toBeVisible();
      });
    });
  });
});
