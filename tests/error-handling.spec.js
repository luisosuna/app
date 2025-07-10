import { test, expect } from '@playwright/test';

test.describe('Calculator Error Handling and Edge Cases', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should handle division by zero', async ({ page }) => {
    // Test: 5 / 0
    await page.getByRole('button', { name: '5' }).click();
    await page.getByRole('button', { name: '/' }).click();
    await page.getByRole('button', { name: '0' }).click();
    await page.getByRole('button', { name: '=' }).click();
    
    // Check that result shows Infinity
    await expect(page.locator('.display')).toContainText('Infinity');
  });

  test('should prevent multiple consecutive operators', async ({ page }) => {
    // Try to input 5 + + + 3
    await page.getByRole('button', { name: '5' }).click();
    await page.getByRole('button', { name: '+' }).click();
    await page.getByRole('button', { name: '+' }).click(); // This should be ignored
    await page.getByRole('button', { name: '+' }).click(); // This should be ignored
    await page.getByRole('button', { name: '3' }).click();
    
    // Check that only one operator was registered
    await expect(page.locator('.display')).toContainText('5+3');
  });

  test('should prevent operators at the beginning', async ({ page }) => {
    // Try to start with an operator
    await page.getByRole('button', { name: '+' }).click();
    await page.getByRole('button', { name: '5' }).click();
    
    // Check that the operator was ignored
    await expect(page.locator('.display')).toContainText('5');
  });

  test('should handle DELETE button functionality', async ({ page }) => {
    // Enter 123 then delete one by one
    await page.getByRole('button', { name: '1' }).click();
    await page.getByRole('button', { name: '2' }).click();
    await page.getByRole('button', { name: '3' }).click();
    
    // Verify initial input
    await expect(page.locator('.display')).toContainText('123');
    
    // Delete last digit
    await page.getByRole('button', { name: 'DELETE' }).click();
    await expect(page.locator('.display')).toContainText('12');
    
    // Delete another digit
    await page.getByRole('button', { name: 'DELETE' }).click();
    await expect(page.locator('.display')).toContainText('1');
    
    // Delete last digit
    await page.getByRole('button', { name: 'DELETE' }).click();
    await expect(page.locator('.display')).toContainText('0');
  });

  test('should handle CLEAR button functionality', async ({ page }) => {
    // Enter some calculation
    await page.getByRole('button', { name: '1' }).click();
    await page.getByRole('button', { name: '2' }).click();
    await page.getByRole('button', { name: '+' }).click();
    await page.getByRole('button', { name: '3' }).click();
    
    // Verify input
    await expect(page.locator('.display')).toContainText('12+3');
    
    // Clear everything
    await page.getByRole('button', { name: 'CLEAR' }).click();
    
    // Check that display is cleared
    await expect(page.locator('.display')).toContainText('0');
  });

  test('should handle invalid expressions gracefully', async ({ page }) => {
    // Create an invalid expression using parentheses
    await page.getByRole('button', { name: '(' }).click();
    await page.getByRole('button', { name: '5' }).click();
    await page.getByRole('button', { name: '+' }).click();
    // Missing closing parenthesis
    await page.getByRole('button', { name: '=' }).click();
    
    // Should handle error gracefully
    await expect(page.locator('.display')).toContainText('Error');
  });

  test('should handle very large numbers', async ({ page }) => {
    // Test large multiplication
    await page.getByRole('button', { name: '9' }).click();
    await page.getByRole('button', { name: '9' }).click();
    await page.getByRole('button', { name: '9' }).click();
    await page.getByRole('button', { name: '*' }).click();
    await page.getByRole('button', { name: '9' }).click();
    await page.getByRole('button', { name: '9' }).click();
    await page.getByRole('button', { name: '9' }).click();
    await page.getByRole('button', { name: '=' }).click();
    
    // Should handle large result
    await expect(page.locator('.display')).toContainText('998001');
  });

  test('should maintain functionality after error', async ({ page }) => {
    // Create an error
    await page.getByRole('button', { name: '(' }).click();
    await page.getByRole('button', { name: '5' }).click();
    await page.getByRole('button', { name: '=' }).click();
    
    // Clear and try normal operation
    await page.getByRole('button', { name: 'CLEAR' }).click();
    await page.getByRole('button', { name: '2' }).click();
    await page.getByRole('button', { name: '+' }).click();
    await page.getByRole('button', { name: '3' }).click();
    await page.getByRole('button', { name: '=' }).click();
    
    // Should work normally
    await expect(page.locator('.display')).toContainText('5');
  });
});