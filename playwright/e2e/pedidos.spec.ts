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
  //await page.locator('//label[text()="Número do Pedido"]/..//input').fill('VLO-TMMLH1'); //criando localizador com xpath
  
  await page.getByRole('textbox', { name: 'Número do Pedido' }).fill('VLO-TMMLH1');

  await page.getByRole('button', { name: 'Buscar Pedido' }).click();


  //ASSERT

  await expect(page.getByText('VLO-TMMLH1')).toBeVisible({timeout: 10000});
  await expect(page.getByTestId('order-result-VLO-TMMLH1')).toContainText('VLO-TMMLH1');

  await expect(page.getByText('APROVADO')).toBeVisible();
  await expect(page.getByTestId('order-result-VLO-TMMLH1')).toContainText('APROVADO');


});