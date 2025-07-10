import { test, expect } from '@playwright/test';

test.describe('Calculator Basic Operations', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should perform basic addition', async ({ page }) => {
    // Test: 5 + 3 = 8
    await page.getByRole('button', { name: '5' }).click();
    await page.getByRole('button', { name: '+' }).click();
    await page.getByRole('button', { name: '3' }).click();
    await page.getByRole('button', { name: '=' }).click();
    
    // Check the result
    await expect(page.locator('.display')).toContainText('8');
  });

  test('should perform basic subtraction', async ({ page }) => {
    // Test: 10 - 4 = 6
    await page.getByRole('button', { name: '1' }).click();
    await page.getByRole('button', { name: '0' }).click();
    await page.getByRole('button', { name: '-' }).click();
    await page.getByRole('button', { name: '4' }).click();
    await page.getByRole('button', { name: '=' }).click();
    
    // Check the result
    await expect(page.locator('.display')).toContainText('6');
  });

  test('should perform basic multiplication', async ({ page }) => {
    // Test: 7 * 8 = 56
    await page.getByRole('button', { name: '7' }).click();
    await page.getByRole('button', { name: '*' }).click();
    await page.getByRole('button', { name: '8' }).click();
    await page.getByRole('button', { name: '=' }).click();
    
    // Check the result
    await expect(page.locator('.display')).toContainText('56');
  });

  test('should perform basic division', async ({ page }) => {
    // Test: 15 / 3 = 5
    await page.getByRole('button', { name: '1' }).click();
    await page.getByRole('button', { name: '5' }).click();
    await page.getByRole('button', { name: '/' }).click();
    await page.getByRole('button', { name: '3' }).click();
    await page.getByRole('button', { name: '=' }).click();
    
    // Check the result
    await expect(page.locator('.display')).toContainText('5');
  });

  test('should handle decimal operations', async ({ page }) => {
    // Test: 2.5 + 1.5 = 4
    await page.getByRole('button', { name: '2' }).click();
    await page.getByRole('button', { name: '.' }).click();
    await page.getByRole('button', { name: '5' }).click();
    await page.getByRole('button', { name: '+' }).click();
    await page.getByRole('button', { name: '1' }).click();
    await page.getByRole('button', { name: '.' }).click();
    await page.getByRole('button', { name: '5' }).click();
    await page.getByRole('button', { name: '=' }).click();
    
    // Check the result
    await expect(page.locator('.display')).toContainText('4');
  });
});