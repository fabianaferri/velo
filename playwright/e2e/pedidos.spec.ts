import { test, expect } from '@playwright/test';

test('consultar pediddo aprovado', async ({ page }) => {
  await page.goto('http://localhost:5173/');
  //verifica titulo da pagina
  await expect(page.getByTestId('hero-section').getByRole('heading')).toContainText('Velô Sprint');

  //clica no link de consultar pedido
  await page.getByRole('link', { name: 'Consultar Pedido' }).click();

  //verifica titulo da pagina
  await expect(page.getByRole('heading')).toContainText('Consultar Pedido');

  //preenche o campo de busca com o numero do pedido
  await page.getByTestId('search-order-id').fill('VLO-TMMLH1');
  await page.getByTestId('search-order-button').click();
  await expect(page.getByTestId('order-result-id')).toContainText('VLO-TMMLH1');
  await expect(page.getByTestId('order-result-status')).toBeVisible();
  await expect(page.getByTestId('order-result-status')).toContainText('APROVADO');


});