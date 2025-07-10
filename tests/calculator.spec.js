const { test, expect } = require('@playwright/test');

test.describe('Calculator App', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000');
  });

  test('should perform basic addition calculation', async ({ page }) => {
    // Test basic addition: 5 + 3 = 8
    await page.click('button:has-text("5")');
    await page.click('button:has-text("+")');
    await page.click('button:has-text("3")');
    await page.click('button:has-text("=")');
    
    // Check the display shows the result
    const display = page.locator('.display');
    await expect(display).toContainText('8');
  });

  test('should perform multiplication and division calculations', async ({ page }) => {
    // Test multiplication: 6 * 7 = 42
    await page.click('button:has-text("6")');
    await page.click('button:has-text("*")');
    await page.click('button:has-text("7")');
    await page.click('button:has-text("=")');
    
    const display = page.locator('.display');
    await expect(display).toContainText('42');
    
    // Clear and test division: 42 / 6 = 7
    await page.click('button:has-text("CLEAR")');
    await page.click('button:has-text("4")');
    await page.click('button:has-text("2")');
    await page.click('button:has-text("/")');
    await page.click('button:has-text("6")');
    await page.click('button:has-text("=")');
    
    await expect(display).toContainText('7');
  });

  test('should toggle between light and dark themes', async ({ page }) => {
    // Initially in light mode
    await expect(page.locator('button:has-text("🌙 Dark")')).toBeVisible();
    
    // Switch to dark mode
    await page.click('button:has-text("🌙 Dark")');
    await expect(page.locator('button:has-text("☀️ Light")')).toBeVisible();
    
    // Verify dark theme is applied
    const calculator = page.locator('.calculator');
    await expect(calculator).toHaveCSS('background-color', 'rgb(30, 41, 59)'); // Dark theme color
    
    // Switch back to light mode
    await page.click('button:has-text("☀️ Light")');
    await expect(page.locator('button:has-text("🌙 Dark")')).toBeVisible();
  });

  test('should handle complex expressions with parentheses', async ({ page }) => {
    // Test complex expression: (5 + 3) * 2 = 16
    await page.click('button:has-text("(")');
    await page.click('button:has-text("5")');
    await page.click('button:has-text("+")');
    await page.click('button:has-text("3")');
    await page.click('button:has-text(")")');
    await page.click('button:has-text("*")');
    await page.click('button:has-text("2")');
    await page.click('button:has-text("=")');
    
    const display = page.locator('.display');
    await expect(display).toContainText('16');
  });

  test('should handle decimal numbers and error cases', async ({ page }) => {
    // Test decimal calculation: 3.5 + 2.5 = 6
    await page.click('button:has-text("3")');
    await page.click('button:has-text(".")');
    await page.click('button:has-text("5")');
    await page.click('button:has-text("+")');
    await page.click('button:has-text("2")');
    await page.click('button:has-text(".")');
    await page.click('button:has-text("5")');
    await page.click('button:has-text("=")');
    
    const display = page.locator('.display');
    await expect(display).toContainText('6');
    
    // Test DELETE functionality
    await page.click('button:has-text("CLEAR")');
    await page.click('button:has-text("1")');
    await page.click('button:has-text("2")');
    await page.click('button:has-text("3")');
    await expect(display).toContainText('123');
    
    await page.click('button:has-text("DELETE")');
    await expect(display).toContainText('12');
    
    // Test CLEAR functionality
    await page.click('button:has-text("CLEAR")');
    await expect(display).toContainText('0');
  });

  test('should verify all digit buttons and 0 button are visible and functional', async ({ page }) => {
    // Verify all digit buttons are visible including the 0 button
    for (let i = 0; i <= 9; i++) {
      const button = page.locator(`button:has-text("${i}")`);
      await expect(button).toBeVisible();
      await expect(button).toBeEnabled();
    }
    
    // Test that the 0 button works properly (it was previously cut off)
    await page.click('button:has-text("1")');
    await page.click('button:has-text("0")');
    await page.click('button:has-text("0")');
    
    const display = page.locator('.display');
    await expect(display).toContainText('100');
    
    // Verify the 0 button is at the bottom and fully visible
    const zeroButton = page.locator('button:has-text("0")').last(); // Get the standalone 0 button
    const boundingBox = await zeroButton.boundingBox();
    expect(boundingBox).toBeTruthy();
    expect(boundingBox.height).toBeGreaterThan(70); // Should be fully visible with proper height
  });
});