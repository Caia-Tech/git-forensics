import { test, expect } from '@playwright/test';

test.describe('Git Forensics Chapter Navigation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should display correct page title', async ({ page }) => {
    await expect(page).toHaveTitle(/Git Forensics/);
  });

  test('should have all 17 chapters in sidebar', async ({ page }) => {
    for (let i = 1; i <= 17; i++) {
      const chapterLink = page.locator(`a[href="#chapter-${i}"]`);
      await expect(chapterLink).toBeVisible();

      // Verify the chapter title matches the number
      const chapterTitle = chapterLink.locator('.chapter-title');
      await expect(chapterTitle).toContainText(`Chapter ${i}`);
    }
  });

  test('should display correct main headings for all chapters', async ({ page }) => {
    const expectedChapters = [
      { num: 1, title: 'WHY TRADITIONAL EVIDENCE FAILS' },
      { num: 2, title: 'THE GIT REVELATION' },
      { num: 3, title: 'UNDERSTANDING GIT METADATA FORENSICS' },
      { num: 4, title: 'THE NETWORK EFFECT' },
      { num: 5, title: 'BASIC IMPLEMENTATION' },
      { num: 6, title: 'ADVANCED TECHNIQUES' },
      { num: 7, title: 'THE BEHAVIORAL AMPLIFIER' },
      { num: 8, title: 'WORKPLACE APPLICATIONS' },
      { num: 9, title: 'PUBLIC INTEREST DOCUMENTATION' },
      { num: 10, title: 'PROTECTION STRATEGIES' },
      { num: 11, title: 'UNDERSTANDING OPPOSITION' },
      { num: 12, title: 'COMMON CHALLENGES AND SOLUTIONS' },
      { num: 13, title: 'ADDRESSING PLATFORM CENTRALIZATION RISKS' },
      { num: 14, title: 'THE PURE GIT PHILOSOPHY' },
      { num: 15, title: 'COMBATING AI-GENERATED EVIDENCE' },
      { num: 16, title: 'PRIVACY-PRESERVING GIT FORENSICS' },
      { num: 17, title: 'THE FUTURE OF GIT FORENSICS' }
    ];

    for (const { num, title } of expectedChapters) {
      // Click the chapter link
      await page.click(`a[href="#chapter-${num}"]`);

      // Wait for the chapter content to be visible
      await page.waitForSelector(`#chapter-${num}`, { state: 'visible' });

      // Verify the heading
      const heading = page.locator(`#chapter-${num} h1`);
      await expect(heading).toContainText(`CHAPTER ${num}: ${title}`);
    }
  });

  test('should not have duplicate Chapter 7', async ({ page }) => {
    // Count h1 elements containing "CHAPTER 7:"
    const chapter7Headings = page.locator('h1:has-text("CHAPTER 7:")');
    await expect(chapter7Headings).toHaveCount(1);

    // Verify it's THE BEHAVIORAL AMPLIFIER
    await expect(chapter7Headings).toContainText('THE BEHAVIORAL AMPLIFIER');
  });

  test('Chapter 8 should be WORKPLACE APPLICATIONS', async ({ page }) => {
    await page.click('a[href="#chapter-8"]');
    await page.waitForSelector('#chapter-8', { state: 'visible' });

    const heading = page.locator('#chapter-8 h1');
    await expect(heading).toContainText('CHAPTER 8: WORKPLACE APPLICATIONS');
  });

  test('sidebar chapter numbers should match visible numbers', async ({ page }) => {
    for (let i = 1; i <= 17; i++) {
      const chapterNumber = page.locator(`a[href="#chapter-${i}"] .chapter-number`);
      await expect(chapterNumber).toContainText(String(i));
    }
  });

  test('should navigate between chapters correctly', async ({ page }) => {
    // Start with Chapter 7
    await page.click('a[href="#chapter-7"]');
    await expect(page.locator('#chapter-7 h1')).toContainText('CHAPTER 7: THE BEHAVIORAL AMPLIFIER');

    // Navigate to Chapter 8
    await page.click('a[href="#chapter-8"]');
    await expect(page.locator('#chapter-8 h1')).toContainText('CHAPTER 8: WORKPLACE APPLICATIONS');

    // Navigate to Chapter 9
    await page.click('a[href="#chapter-9"]');
    await expect(page.locator('#chapter-9 h1')).toContainText('CHAPTER 9: PUBLIC INTEREST DOCUMENTATION');
  });

  test('all chapters should be sequentially numbered 1-17', async ({ page }) => {
    const chapterLinks = await page.locator('a[data-chapter]').all();

    // Filter to get only main chapter links (1-17)
    const mainChapterNumbers = [];
    for (const link of chapterLinks) {
      const dataChapter = await link.getAttribute('data-chapter');
      const num = parseInt(dataChapter);
      if (num >= 1 && num <= 17) {
        mainChapterNumbers.push(num);
      }
    }

    // Sort and verify
    mainChapterNumbers.sort((a, b) => a - b);
    const expected = Array.from({ length: 17 }, (_, i) => i + 1);
    expect(mainChapterNumbers.slice(0, 17)).toEqual(expected);
  });
});
