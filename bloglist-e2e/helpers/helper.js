const createBlog = async ({ page, blog }) => {
  await page.getByRole("button", { name: "New blog" }).click();
  await page.getByRole("textbox", { name: "Title" }).fill(newBlog.title);
  await page.getByRole("textbox", { name: "Author" }).fill(newBlog.author);
  await page.getByRole("textbox", { name: "Url" }).fill(newBlog.url);
  await page.getByRole("button", { name: "Create" }).click();
  await page.waitForLoadState("networkidle");
  await page.getByRole("button", { name: "Cancel" }).click();
};

const loginWith = async ({ page, username, password }) => {
  await page.getByRole("textbox", { name: "Username" }).fill(username);
  await page.getByRole("textbox", { name: "Password" }).fill(password);
  await page.getByRole("button", { name: "Login" }).click();
  await page.waitForLoadState("networkidle");
};

module.exports = { createBlog, loginWith };
