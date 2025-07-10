import { test, expect } from '@playwright/test';

test.describe('Calculator Advanced Expressions', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should handle expressions with parentheses', async ({ page }) => {
    // Test: (2 + 3) * 4 = 20
    await page.getByRole('button', { name: '(' }).click();
    await page.getByRole('button', { name: '2' }).click();
    await page.getByRole('button', { name: '+' }).click();
    await page.getByRole('button', { name: '3' }).click();
    await page.getByRole('button', { name: ')' }).click();
    await page.getByRole('button', { name: '*' }).click();
    await page.getByRole('button', { name: '4' }).click();
    await page.getByRole('button', { name: '=' }).click();
    
    // Check the result
    await expect(page.locator('.display')).toContainText('20');
  });

  test('should handle nested parentheses', async ({ page }) => {
    // Test: ((2 + 3) * 2) = 10
    await page.getByRole('button', { name: '(' }).click();
    await page.getByRole('button', { name: '(' }).click();
    await page.getByRole('button', { name: '2' }).click();
    await page.getByRole('button', { name: '+' }).click();
    await page.getByRole('button', { name: '3' }).click();
    await page.getByRole('button', { name: ')' }).click();
    await page.getByRole('button', { name: '*' }).click();
    await page.getByRole('button', { name: '2' }).click();
    await page.getByRole('button', { name: ')' }).click();
    await page.getByRole('button', { name: '=' }).click();
    
    // Check the result
    await expect(page.locator('.display')).toContainText('10');
  });

  test('should show preview calculation with parentheses', async ({ page }) => {
    // Test preview: (5 + 5) should show (10)
    await page.getByRole('button', { name: '(' }).click();
    await page.getByRole('button', { name: '5' }).click();
    await page.getByRole('button', { name: '+' }).click();
    await page.getByRole('button', { name: '5' }).click();
    await page.getByRole('button', { name: ')' }).click();
    
    // Check the preview result
    await expect(page.locator('.display span')).toContainText('(10)');
  });

  test('should handle complex expressions with mixed operations', async ({ page }) => {
    // Test: (6 / 2) + (3 * 4) = 15
    await page.getByRole('button', { name: '(' }).click();
    await page.getByRole('button', { name: '6' }).click();
    await page.getByRole('button', { name: '/' }).click();
    await page.getByRole('button', { name: '2' }).click();
    await page.getByRole('button', { name: ')' }).click();
    await page.getByRole('button', { name: '+' }).click();
    await page.getByRole('button', { name: '(' }).click();
    await page.getByRole('button', { name: '3' }).click();
    await page.getByRole('button', { name: '*' }).click();
    await page.getByRole('button', { name: '4' }).click();
    await page.getByRole('button', { name: ')' }).click();
    await page.getByRole('button', { name: '=' }).click();
    
    // Check the result
    await expect(page.locator('.display')).toContainText('15');
  });

  test('should handle order of operations without parentheses', async ({ page }) => {
    // Test: 2 + 3 * 4 = 14 (not 20)
    await page.getByRole('button', { name: '2' }).click();
    await page.getByRole('button', { name: '+' }).click();
    await page.getByRole('button', { name: '3' }).click();
    await page.getByRole('button', { name: '*' }).click();
    await page.getByRole('button', { name: '4' }).click();
    await page.getByRole('button', { name: '=' }).click();
    
    // Check the result
    await expect(page.locator('.display')).toContainText('14');
  });
});