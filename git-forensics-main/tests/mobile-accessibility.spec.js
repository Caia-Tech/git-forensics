import { test, expect } from '@playwright/test';

test.describe('Mobile Accessibility', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should have viewport meta tag for mobile', async ({ page }) => {
    const viewportMeta = await page.locator('meta[name="viewport"]');
    await expect(viewportMeta).toHaveCount(1);
    const content = await viewportMeta.getAttribute('content');
    expect(content).toContain('width=device-width');
  });

  test('menu toggle button should be visible on mobile', async ({ page }) => {
    const menuToggle = page.locator('#menu-toggle');
    await expect(menuToggle).toBeVisible();
  });

  test('menu toggle should have accessible label', async ({ page }) => {
    const menuToggle = page.locator('#menu-toggle');
    const ariaLabel = await menuToggle.getAttribute('aria-label');
    expect(ariaLabel).toBeTruthy();
    expect(ariaLabel.toLowerCase()).toContain('menu');
  });

  test('sidebar should toggle on menu button click', async ({ page }) => {
    const sidebar = page.locator('#sidebar');
    const menuToggle = page.locator('#menu-toggle');

    // Check initial state - sidebar should not have 'open' class
    const initialClass = await sidebar.getAttribute('class');
    expect(initialClass || '').not.toContain('open');

    // Click toggle to open sidebar
    await menuToggle.click();
    await page.waitForTimeout(500); // Wait for animation

    // Check if class changed - should now have 'open' class
    const afterClickClass = await sidebar.getAttribute('class');
    expect(afterClickClass).toContain('open');

    // Verify sidebar is visible after opening
    await expect(sidebar).toBeVisible();
  });

  test('touch targets should be at least 44x44 pixels', async ({ page }) => {
    // Check menu toggle button
    const menuToggle = page.locator('#menu-toggle');
    const menuBox = await menuToggle.boundingBox();
    expect(menuBox.width).toBeGreaterThanOrEqual(44);
    expect(menuBox.height).toBeGreaterThanOrEqual(44);

    // Check theme toggle button
    const themeToggle = page.locator('#theme-toggle');
    const themeBox = await themeToggle.boundingBox();
    expect(themeBox.width).toBeGreaterThanOrEqual(44);
    expect(themeBox.height).toBeGreaterThanOrEqual(44);
  });

  test('chapter links should be large enough for touch', async ({ page }) => {
    const chapterLink = page.locator('a[href="#chapter-1"]').first();
    await expect(chapterLink).toBeVisible();

    const box = await chapterLink.boundingBox();
    // Links should be at least 44px tall for easy tapping
    expect(box.height).toBeGreaterThanOrEqual(44);
  });

  test('text should be readable (minimum 16px)', async ({ page }) => {
    // Open sidebar first on mobile
    const menuToggle = page.locator('#menu-toggle');
    await menuToggle.click({ force: true });
    await page.waitForTimeout(500);

    const mainContent = page.locator('.chapter-content p').first();
    await page.click('a[href="#chapter-0"]'); // Go to intro
    await page.waitForSelector('#chapter-0', { state: 'visible' });

    const fontSize = await mainContent.evaluate((el) => {
      return window.getComputedStyle(el).fontSize;
    });

    const fontSizeNum = parseInt(fontSize);
    expect(fontSizeNum).toBeGreaterThanOrEqual(16);
  });

  test('content should not overflow viewport', async ({ page }) => {
    const body = page.locator('body');
    const hasHorizontalScroll = await body.evaluate(() => {
      return document.documentElement.scrollWidth > document.documentElement.clientWidth;
    });

    expect(hasHorizontalScroll).toBe(false);
  });

  test('all images should have alt text', async ({ page }) => {
    const images = await page.locator('img').all();

    for (const img of images) {
      const alt = await img.getAttribute('alt');
      // Alt can be empty string for decorative images, but attribute must exist
      expect(alt).not.toBeNull();
    }
  });

  test('headings should follow proper hierarchy', async ({ page }) => {
    // Open sidebar first on mobile
    const menuToggle = page.locator('#menu-toggle');
    await menuToggle.click({ force: true });
    await page.waitForTimeout(500);

    await page.click('a[href="#chapter-1"]');
    await page.waitForSelector('#chapter-1', { state: 'visible' });

    const h1Count = await page.locator('#chapter-1 h1').count();
    expect(h1Count).toBe(1); // Should have exactly one h1 per chapter
  });
});
