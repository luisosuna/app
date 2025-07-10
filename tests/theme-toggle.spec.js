import { test, expect } from '@playwright/test';

test.describe('Calculator Theme Toggle', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should start with light theme by default', async ({ page }) => {
    // Check that the theme toggle shows "Dark" (indicating current theme is light)
    await expect(page.getByRole('button', { name: /Dark/ })).toBeVisible();
    
    // Check that the data-theme attribute is set to light
    const htmlElement = page.locator('html');
    await expect(htmlElement).toHaveAttribute('data-theme', 'light');
  });

  test('should toggle to dark theme when clicked', async ({ page }) => {
    // Click the theme toggle button
    await page.getByRole('button', { name: /Dark/ }).click();
    
    // Check that the button text changes to "Light"
    await expect(page.getByRole('button', { name: /Light/ })).toBeVisible();
    
    // Check that the data-theme attribute is set to dark
    const htmlElement = page.locator('html');
    await expect(htmlElement).toHaveAttribute('data-theme', 'dark');
  });

  test('should toggle back to light theme', async ({ page }) => {
    // First toggle to dark
    await page.getByRole('button', { name: /Dark/ }).click();
    
    // Then toggle back to light
    await page.getByRole('button', { name: /Light/ }).click();
    
    // Check that the button text changes back to "Dark"
    await expect(page.getByRole('button', { name: /Dark/ })).toBeVisible();
    
    // Check that the data-theme attribute is set to light
    const htmlElement = page.locator('html');
    await expect(htmlElement).toHaveAttribute('data-theme', 'light');
  });

  test('should maintain theme state during calculations', async ({ page }) => {
    // Toggle to dark theme
    await page.getByRole('button', { name: /Dark/ }).click();
    
    // Perform a calculation
    await page.getByRole('button', { name: '5' }).click();
    await page.getByRole('button', { name: '+' }).click();
    await page.getByRole('button', { name: '3' }).click();
    await page.getByRole('button', { name: '=' }).click();
    
    // Check that the theme is still dark
    const htmlElement = page.locator('html');
    await expect(htmlElement).toHaveAttribute('data-theme', 'dark');
    await expect(page.getByRole('button', { name: /Light/ })).toBeVisible();
  });

  test('should show theme toggle button with correct icons', async ({ page }) => {
    // Check initial state with moon icon
    await expect(page.getByRole('button', { name: /🌙 Dark/ })).toBeVisible();
    
    // Click to toggle to dark theme
    await page.getByRole('button', { name: /🌙 Dark/ }).click();
    
    // Check that it shows sun icon
    await expect(page.getByRole('button', { name: /☀️ Light/ })).toBeVisible();
  });
});