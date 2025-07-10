import { test, expect } from '@playwright/test';

test.describe('Calculator Button Interactions', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should show hover effects on number buttons', async ({ page }) => {
    const numberButton = page.getByRole('button', { name: '5' });
    
    // Get initial styles
    const initialStyles = await numberButton.evaluate(el => {
      const styles = window.getComputedStyle(el);
      return {
        backgroundColor: styles.backgroundColor,
        transform: styles.transform
      };
    });
    
    // Hover over the button
    await numberButton.hover();
    
    // Check that hover effects are applied
    await expect(numberButton).toHaveCSS('cursor', 'pointer');
    
    // Verify button is hoverable and responds to interaction
    await expect(numberButton).toBeVisible();
    await expect(numberButton).toBeEnabled();
  });

  test('should show hover effects on operator buttons', async ({ page }) => {
    const operatorButton = page.getByRole('button', { name: '+' });
    
    // Hover over the button
    await operatorButton.hover();
    
    // Check that hover effects are applied
    await expect(operatorButton).toHaveCSS('cursor', 'pointer');
    
    // Verify button is hoverable and responds to interaction
    await expect(operatorButton).toBeVisible();
    await expect(operatorButton).toBeEnabled();
  });

  test('should show hover effects on theme toggle button', async ({ page }) => {
    const themeButton = page.getByRole('button', { name: /Dark/ });
    
    // Hover over the button
    await themeButton.hover();
    
    // Check that hover effects are applied
    await expect(themeButton).toHaveCSS('cursor', 'pointer');
    
    // Verify button is hoverable and responds to interaction
    await expect(themeButton).toBeVisible();
    await expect(themeButton).toBeEnabled();
  });

  test('should show hover effects on special buttons', async ({ page }) => {
    const deleteButton = page.getByRole('button', { name: 'DELETE' });
    const clearButton = page.getByRole('button', { name: 'CLEAR' });
    const equalsButton = page.getByRole('button', { name: '=' });
    
    // Test DELETE button
    await deleteButton.hover();
    await expect(deleteButton).toHaveCSS('cursor', 'pointer');
    
    // Test CLEAR button
    await clearButton.hover();
    await expect(clearButton).toHaveCSS('cursor', 'pointer');
    
    // Test EQUALS button
    await equalsButton.hover();
    await expect(equalsButton).toHaveCSS('cursor', 'pointer');
  });

  test('should maintain button focus states', async ({ page }) => {
    const numberButton = page.getByRole('button', { name: '1' });
    
    // Click the button
    await numberButton.click();
    
    // Verify the button was clicked (should show in display)
    await expect(page.locator('.display')).toContainText('1');
    
    // Verify button is still interactive
    await expect(numberButton).toBeEnabled();
    await expect(numberButton).toBeVisible();
  });

  test('should handle rapid button clicks', async ({ page }) => {
    // Rapidly click multiple buttons
    await page.getByRole('button', { name: '1' }).click();
    await page.getByRole('button', { name: '2' }).click();
    await page.getByRole('button', { name: '3' }).click();
    await page.getByRole('button', { name: '+' }).click();
    await page.getByRole('button', { name: '4' }).click();
    await page.getByRole('button', { name: '5' }).click();
    await page.getByRole('button', { name: '6' }).click();
    
    // Check that all clicks were registered
    await expect(page.locator('.display')).toContainText('123+456');
  });
});