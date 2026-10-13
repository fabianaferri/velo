import { test, expect } from '@playwright/test';

/// AAA - Arrange, Act, Assert

test('Deve consultar pedido aprovado', async ({ page }) => {

  //Arrange
  await page.goto('http://localhost:5173/');
  await expect(page.getByTestId('hero-section').getByRole('heading')).toContainText('Velô Sprint');

  await page.getByRole('link', { name: 'Consultar Pedido' }).click();
  await expect(page.getByRole('heading')).toContainText('Consultar Pedido');

  //Act
  await page.getByRole('textbox', { name: 'Número do Pedido' }).fill('VLO-HFYQUV');

  //await page.getByLabel('Número do Pedido').fill('VLO-HFYQUV');
  //await page.getByTestId('search-order-button').click();
  await page.getByRole('button', { name: 'Buscar Pedido' }).click();

  //Assert

  // const orderCode = page.locator('//p[text()="Pedido"]/..//p[text() ="VLO-HFYQUV"]')
  // await expect(orderCode).toBeVisible({ timeout: 10000 });

  const containerPedido = page.getByRole('paragraph')
    .filter({ hasText: /^Pedido$/})
    .locator('..') //sobe para o elemento pai a div que tem ambos

  await expect(containerPedido).toContainText('VLO-HFYQUV', {timeout:10000})

  await expect(page.getByText('APROVADO')).toBeVisible();

});