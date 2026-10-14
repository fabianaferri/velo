import { test, expect } from '@playwright/test';

/// AAA - Arrange, Act, Assert

test('Deve consultar pedido aprovado', async ({ page }) => {

  //Test Data
  const order = 'VLO-HFYQUV'

  //Arrange
  await page.goto('http://localhost:5173/');
  await expect(page.getByTestId('hero-section').getByRole('heading')).toContainText('Velô Sprint');

  await page.getByRole('link', { name: 'Consultar Pedido' }).click();
  await expect(page.getByRole('heading')).toContainText('Consultar Pedido');

  //Act
  await page.getByRole('textbox', { name: 'Número do Pedido' }).fill(order);

  //await page.getByLabel('Número do Pedido').fill('VLO-HFYQUV');
  //await page.getByTestId('search-order-button').click();
  await page.getByRole('button', { name: 'Buscar Pedido' }).click();

  //Assert

  // const orderCode = page.locator('//p[text()="Pedido"]/..//p[text() ="VLO-HFYQUV"]')
  // await expect(orderCode).toBeVisible({ timeout: 10000 });

  const containerPedido = page.getByRole('paragraph')
    .filter({ hasText: /^Pedido$/ })
    .locator('..') //sobe para o elemento pai a div que tem ambos

  await expect(containerPedido).toContainText(order, { timeout: 10000 })

  await expect(page.getByText('APROVADO')).toBeVisible();

});

test('Deve exibir mensagem quando o pedido não é encontrado', async ({ page }) => {

  const order = 'VLO-ABC123'

  await page.goto('http://localhost:5173/');
  await expect(page.getByTestId('hero-section').getByRole('heading')).toContainText('Velô Sprint');

  await page.getByRole('link', { name: 'Consultar Pedido' }).click();
  await expect(page.getByRole('heading')).toContainText('Consultar Pedido');

  await page.getByRole('textbox', { name: 'Número do Pedido' }).fill(order);
  await page.getByRole('button', { name: 'Buscar Pedido' }).click();

  // const title = page.getByRole('heading', {name: 'Pedido não encontrado', level:3})
  // await expect(title).toBeVisible()

  // const message = page.locator('p', {hasText:'Verifique o número do pedido e tente novamente'})
  // await expect(message).toBeVisible()

  await expect(page.locator('#root')).toMatchAriaSnapshot(`
    - img
    - heading "Pedido não encontrado" [level=3]
    - paragraph: Verifique o número do pedido e tente novamente
    `);

})