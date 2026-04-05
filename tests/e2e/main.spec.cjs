const { test, expect } = require('@playwright/test');

test.describe('Aplikasi To-Do: Full System Integration Test', () => {
  const uniqueId = Date.now();
  const testEmail = `User-${uniqueId}@test.com`;
  const testPassword = 'Password123!';
  const taskName = `Latihan - ${uniqueId}`;

  test('Menyelesaikan seluruh alur aplikasi', async ({ page }) => {
    
    // HANDLE DIALOG (Agar tidak hang/macet saat alert muncul)
    page.on('dialog', async (dialog) => {
      console.log(`[DIALOG] klik OK: "${dialog.message()}"`);
      await dialog.accept();
    });

    // --- TAHAP 1: REGISTRASI ---
    console.log('Memulai Registrasi...');
    await page.goto('/register');
    await page.fill('[data-testid="reg-email"]', testEmail);
    await page.fill('[data-testid="reg-password"]', testPassword);
    await page.locator('[data-testid="reg-submit"]').hover();
    await page.click('[data-testid="reg-submit"]');

    // Pakai pola glob ** agar fleksibel
    await page.waitForURL('**/login', { timeout: 10000 });
    await expect(page.locator('h2')).toContainText('Welcome Back');

    // --- TAHAP 2: LOGIN ---
    console.log('Memulai Login...');
    await page.fill('[data-testid="login-email"]', testEmail);
    await page.fill('[data-testid="login-password"]', testPassword);
    await page.click('[data-testid="login-submit"]');

    await page.waitForURL('**/dashboard', { timeout: 10000 });
    await expect(page.locator('h1')).toContainText('My Tasks');

    // --- TAHAP 3: CREATE TODO ---
    console.log('Menambahkan Task Baru...');
    await page.fill('[data-testid="input-new-task"]', taskName);
    await page.click('[data-testid="btn-add-task"]');
    
    const taskItem = page.locator('div', { hasText: taskName }).first();
    await expect(taskItem).toBeVisible();

    // --- TAHAP 4: UPDATE TODO ---
    console.log('Melakukan Checklist...');
    const checkbox = taskItem.locator('input[type="checkbox"]');
    await checkbox.click();
    
    // Gunakan Regex /.*dashboard/ agar lebih "pintar" mengecek URL
    await expect(page).toHaveURL(/.*dashboard/);
    await expect(taskItem.locator('span')).toHaveClass(/line-through/);

    // --- TAHAP 5: DELETE TODO ---
    console.log('Menghapus Task...');
    await taskItem.locator('[data-testid^="btn-delete-"]').click();
    await expect(page.locator('span', { hasText: taskName })).not.toBeVisible();

    // --- TAHAP 6: LOGOUT ---
    console.log('Melakukan Logout...');
    await page.click('[data-testid="btn-logout"]');
    
    // Verifikasi balik ke login (Pakai Regex agar tahan banting)
    await page.waitForURL(/.*login/);
    await expect(page).toHaveURL(/.*login/);

    console.log('✅ BERHASIL!');
  });
});