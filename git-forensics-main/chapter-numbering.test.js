import { describe, it, expect } from 'vitest';
import { readFileSync } from 'fs';
import { join } from 'path';

describe('Chapter Numbering Verification', () => {
  const htmlContent = readFileSync(join(__dirname, 'index.html'), 'utf-8');

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

  describe('Main Content Headings', () => {
    expectedChapters.forEach(({ num, title }) => {
      it(`should have correct heading for Chapter ${num}: ${title}`, () => {
        const regex = new RegExp(`<h1>CHAPTER ${num}: ${title}</h1>`);
        expect(htmlContent).toMatch(regex);
      });
    });

    it('should not have duplicate Chapter 7', () => {
      const chapter7Matches = htmlContent.match(/<h1>CHAPTER 7:/g);
      expect(chapter7Matches).toHaveLength(1);
    });

    it('should have all 17 chapters numbered consecutively', () => {
      const chapters = htmlContent.match(/<h1>CHAPTER (\d+):/g) || [];
      expect(chapters).toHaveLength(17);

      // Extract numbers and verify they're 1-17
      const numbers = chapters.map(ch => {
        const match = ch.match(/CHAPTER (\d+):/);
        return parseInt(match[1]);
      });
      expect(numbers).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17]);
    });
  });

  describe('Sidebar Navigation', () => {
    expectedChapters.forEach(({ num, title }) => {
      it(`should have correct sidebar title for Chapter ${num}`, () => {
        // Match the pattern: href="#chapter-X" followed by Chapter X title
        const anchorRegex = new RegExp(`href="#chapter-${num}"[^>]*data-chapter="${num}"`);
        const titleRegex = new RegExp(`<span class="chapter-title">Chapter ${num}</span>`);

        expect(htmlContent).toMatch(anchorRegex);
        expect(htmlContent).toMatch(titleRegex);
      });
    });

    it('should have all chapter numbers 1-17 in sidebar', () => {
      const sidebarTitles = htmlContent.match(/<span class="chapter-title">Chapter (\d+)<\/span>/g) || [];
      const numbers = sidebarTitles
        .map(title => parseInt(title.match(/Chapter (\d+)/)[1]))
        .filter(num => num >= 1 && num <= 17)  // Filter for main chapters only
        .sort((a, b) => a - b);

      const uniqueNumbers = [...new Set(numbers)];
      expect(uniqueNumbers).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17]);
    });

    it('should match sidebar chapter numbers with data-chapter attributes', () => {
      expectedChapters.forEach(({ num }) => {
        // Verify the sidebar entry structure
        const pattern = new RegExp(
          `<a href="#chapter-${num}"[^>]*data-chapter="${num}"[^>]*>[\\s\\S]*?` +
          `<span class="chapter-number">${num}</span>[\\s\\S]*?` +
          `<span class="chapter-title">Chapter ${num}</span>`
        );
        expect(htmlContent).toMatch(pattern);
      });
    });
  });

  describe('Download Files Consistency', () => {
    it('should have matching title in gitforensics.txt', () => {
      const txtContent = readFileSync(join(__dirname, 'gitforensics.txt'), 'utf-8');
      expect(txtContent).toContain('Git Forensics: Evidence Proliferation Guide');
      expect(txtContent).not.toContain('The Evidence Network: Using Git for Transparent Documentation');
    });

    it('should have matching title in gitforensics.md', () => {
      const mdContent = readFileSync(join(__dirname, 'gitforensics.md'), 'utf-8');
      expect(mdContent).toContain('# Git Forensics: Evidence Proliferation Guide');
      expect(mdContent).not.toContain('The Evidence Network');
    });

    it('should have all 17 chapters in gitforensics.txt', () => {
      const txtContent = readFileSync(join(__dirname, 'gitforensics.txt'), 'utf-8');
      expectedChapters.forEach(({ num, title }) => {
        expect(txtContent).toContain(`Chapter ${num}: ${title}`);
      });
    });
  });
});
