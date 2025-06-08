const {
  test,
  expect,
  beforeEach,
  describe,
  afterEach,
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
  });

  afterEach(async ({ page, request }) => {
    await request.post("http://localhost:3001/api/testing/reset-database");
  });

  test("Login form is shown", async ({ page }) => {
    const locator = await page.getByRole("heading", { name: /Login/ });
    console.log(locator);
    await expect(locator).toBeVisible();
  });

  describe("Login", () => {
    test("Login with valid credentials", async ({ page }) => {
      await page.getByRole("textbox", { name: "Username" }).fill(user.username);
      await page.getByRole("textbox", { name: "Password" }).fill(user.password);

      // Wait for the button to be enabled and clickable
      const loginButton = page.getByRole("button", { name: "Login" });
      await expect(loginButton).toBeEnabled();

      // Click the button and wait for the page to load
      await loginButton.click();
      await page.waitForLoadState("networkidle");

      // Verify we're logged in by checking for the Blogs heading
      await expect(page.getByRole("heading", { name: "Blogs" })).toBeVisible();
    });

    test("Login with invalid credentials", async ({ page }) => {
      await page.getByRole("textbox", { name: "Username" }).fill(user.username);
      await page.getByRole("textbox", { name: "Password" }).fill("invalid");

      const loginButton = page.getByRole("button", { name: "Login" });
      await expect(loginButton).toBeEnabled();

      await loginButton.click();
      await page.waitForLoadState("networkidle");

      await expect(page.getByRole("heading", { name: /Login/ })).toBeVisible();
    });
  });
});
