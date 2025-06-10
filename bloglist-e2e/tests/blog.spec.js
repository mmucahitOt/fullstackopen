const {
  test,
  expect,
  beforeEach,
  describe,
  afterAll,
  beforeAll,
} = require("@playwright/test");
const { loginWith, clearLocalStorage } = require("../helpers/helper");

describe("Blog app", () => {
  const user = {
    username: "testuser",
    name: "Test User",
    password: "testpassword",
  };

  beforeEach(async ({ page, request }) => {
    await page.goto("http://localhost:5173");
    const userResponse = await request.post(
      "http://localhost:3001/testing/create-user",
      {
        data: {
          username: user.username,
          name: user.name,
          password: user.password,
        },
      }
    );

    await loginWith({ page, username: user.username, password: user.password });
    await page.waitForLoadState("networkidle");
  });

  beforeAll(async ({ request }) => {
    await request.post("http://localhost:3001/testing/reset-database");
  });

  afterAll(async ({ request }) => {
    await request.post("http://localhost:3001/testing/reset-database");
  });

  describe("When logged in", () => {
    const newBlog = {
      title: "Test Blog",
      author: "Test Author",
      url: "https://test.com",
    };

    test("A blog can be created", async ({ page }) => {
      // Wait for and click new blog button
      const newBlogButton = page.getByRole("button", { name: "New blog" });
      await newBlogButton.waitFor({ state: "visible", timeout: 10000 });
      await newBlogButton.click();

      // Fill in blog details
      const titleInput = page.getByRole("textbox", { name: "Title" });
      await titleInput.waitFor({ state: "visible", timeout: 10000 });
      await titleInput.fill(newBlog.title);

      const authorInput = page.getByRole("textbox", { name: "Author" });
      await authorInput.waitFor({ state: "visible", timeout: 10000 });
      await authorInput.fill(newBlog.author);

      const urlInput = page.getByRole("textbox", { name: "Url" });
      await urlInput.waitFor({ state: "visible", timeout: 10000 });
      await urlInput.fill(newBlog.url);

      // Create blog
      const createButton = page.getByRole("button", { name: "Create" });
      await createButton.waitFor({ state: "visible", timeout: 10000 });
      await createButton.click();

      await page.waitForLoadState("networkidle");

      // Cancel and verify
      const cancelButton = page.getByRole("button", { name: "Cancel" });
      await cancelButton.waitFor({ state: "visible", timeout: 10000 });
      await cancelButton.click();

      await expect(page.getByRole("heading", { name: "Blogs" })).toBeVisible({
        timeout: 10000,
      });
      await expect(
        page.getByRole("heading", { name: newBlog.title })
      ).not.toBeVisible({ timeout: 10000 });
    });

    test("A blog can be liked", async ({ page }) => {
      const viewButton = page.getByRole("button", { name: "View" });
      await viewButton.waitFor({ state: "visible", timeout: 10000 });
      await viewButton.click();

      const likeButton = page.getByRole("button", { name: "Like" });
      await likeButton.waitFor({ state: "visible", timeout: 10000 });
      await likeButton.click();

      await page.waitForLoadState("networkidle");
      await expect(page.getByText("1")).toBeVisible({ timeout: 10000 });
    });

    test("Delete button is not visible for other users", async ({
      page,
      request,
    }) => {
      const user2 = {
        username: "testuser2",
        name: "Test User 2",
        password: "testpassword",
      };

      // Create second user
      await request.post("http://localhost:3001/testing/create-user", {
        data: {
          username: user2.username,
          name: user2.name,
          password: user2.password,
        },
      });

      await page.waitForLoadState("networkidle");

      // Log in as second user
      await clearLocalStorage(page);
      await page.goto("http://localhost:5173");
      await loginWith({
        page,
        username: user2.username,
        password: user2.password,
      });

      await page.waitForLoadState("networkidle");
      await page.waitForLoadState("domcontentloaded");

      // First verify the blog title is visible
      await expect(page.getByText(newBlog.title)).toBeVisible({
        timeout: 10000,
      });

      // Then click view to expand the blog details
      const viewButton = page.getByRole("button", { name: "View" });
      await viewButton.waitFor({ state: "visible", timeout: 10000 });
      await viewButton.click();

      // Now check that the delete button is not visible after expanding
      await expect(
        page.getByRole("button", { name: "Delete" })
      ).not.toBeVisible({ timeout: 10000 });
    });

    test("A blog can be deleted", async ({ page }) => {
      const viewButton = page.getByRole("button", { name: "View" });
      await viewButton.waitFor({ state: "visible", timeout: 10000 });
      await viewButton.click();

      // Set up dialog handler before clicking delete
      page.on("dialog", async (dialog) => {
        expect(dialog.type()).toBe("confirm");
        await dialog.accept();
      });

      const deleteButton = page.getByRole("button", { name: "Delete" });
      await deleteButton.waitFor({ state: "visible", timeout: 10000 });
      await deleteButton.click();

      await page.waitForLoadState("networkidle", { timeout: 10000 });
      await expect(page.getByText(newBlog.title)).not.toBeVisible({
        timeout: 10000,
      });
    });
  });
});
