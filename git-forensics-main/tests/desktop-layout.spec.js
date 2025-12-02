import { test, expect } from '@playwright/test';

test.describe('Desktop Layout', () => {
  test.use({ viewport: { width: 1920, height: 1080 } });

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('menu toggle should be hidden on desktop', async ({ page }) => {
    const menuToggle = page.locator('#menu-toggle');
    await expect(menuToggle).toBeHidden();
  });

  test('sidebar should be visible on desktop', async ({ page }) => {
    const sidebar = page.locator('#sidebar');
    await expect(sidebar).toBeVisible();
  });

  test('sidebar should not have transform on desktop', async ({ page }) => {
    const sidebar = page.locator('#sidebar');
    const transform = await sidebar.evaluate((el) => {
      return window.getComputedStyle(el).transform;
    });

    // On desktop, transform should be 'none' or identity matrix
    expect(transform === 'none' || transform === 'matrix(1, 0, 0, 1, 0, 0)').toBe(true);
  });

  test('content should have proper margin for sidebar on desktop', async ({ page }) => {
    const content = page.locator('#content');
    const marginLeft = await content.evaluate((el) => {
      return window.getComputedStyle(el).marginLeft;
    });

    // Should have margin to account for sidebar (typically 320px)
    const marginValue = parseInt(marginLeft);
    expect(marginValue).toBeGreaterThan(280);
  });

  test('all chapters should be accessible without menu toggle', async ({ page }) => {
    // Verify we can click chapters directly without needing the menu toggle
    await page.click('a[href="#chapter-1"]');
    await page.waitForSelector('#chapter-1', { state: 'visible' });

    const heading = page.locator('#chapter-1 h1');
    await expect(heading).toContainText('CHAPTER 1: WHY TRADITIONAL EVIDENCE FAILS');
  });

  test('theme toggle should be visible in sidebar', async ({ page }) => {
    const themeToggle = page.locator('#theme-toggle');
    await expect(themeToggle).toBeVisible();
  });

  test('desktop layout should not have horizontal scroll', async ({ page }) => {
    const hasHorizontalScroll = await page.evaluate(() => {
      return document.documentElement.scrollWidth > document.documentElement.clientWidth;
    });

    expect(hasHorizontalScroll).toBe(false);
  });
});
