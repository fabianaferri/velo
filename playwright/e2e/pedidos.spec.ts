import { test, expect } from '@playwright/test';

/// AAA - Arrange, Act, Assert (PREPARAR, AGIR, VERIFICAR)

test('consultar pediddo aprovado', async ({ page }) => {
  //ARRANGE
  await page.goto('http://localhost:5173/');
  //verifica titulo da pagina
  await expect(page.getByTestId('hero-section').getByRole('heading')).toContainText('Velô Sprint');
  await page.getByRole('link', { name: 'Consultar Pedido' }).click();

  //verifica titulo da pagina
  await expect(page.getByRole('heading')).toContainText('Consultar Pedido');
 
  //ACT
  //preenche o campo de busca com o numero do pedido
  await page.getByTestId('search-order-id').fill('VLO-TMMLH1');
  await page.getByTestId('search-order-button').click();


  //ASSERT
  await expect(page.getByTestId('order-result-id')).toBeVisible();
  await expect(page.getByTestId('order-result-id')).toContainText('VLO-TMMLH1');

  await expect(page.getByTestId('order-result-status')).toBeVisible();
  await expect(page.getByTestId('order-result-status')).toContainText('APROVADO');


});