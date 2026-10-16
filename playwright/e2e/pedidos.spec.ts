import { test, expect } from '@playwright/test';
import { generateOrderCode } from '../support/helpers';
import { OrderLockupPage } from '../support/pages/OrderLockupPage';


/// AAA - Arrange, Act, Assert

test.describe('Consulta de pedido', () => {

  test.beforeEach(async ({ page }) => {

    //Arrange
    await page.goto('http://localhost:5173/');
    await expect(page.getByTestId('hero-section').getByRole('heading')).toContainText('Velô Sprint');

    await page.getByRole('link', { name: 'Consultar Pedido' }).click();
    await expect(page.getByRole('heading')).toContainText('Consultar Pedido');

  })


  test('Deve consultar pedido aprovado', async ({ page }) => {

    //Test Data
    // const order = 'VLO-HFYQUV'

    const order = {
      number: 'VLO-HFYQUV',
      status: 'APROVADO',
      color: 'Midnight Black',
      wheels: 'aero Wheels',
      customer: {
        name: 'fabiana ferri v3',
        email: 'fabianaferriv3@dev.com'
      },
      payment: 'À Vista'

    };

    //Act
    // await page.getByRole('textbox', { name: 'Código do Pedido' }).fill(order.number);

    // //await page.getByLabel('Número do Pedido').fill('VLO-HFYQUV');
    // //await page.getByTestId('search-order-button').click();
    // await page.getByRole('button', { name: 'Buscar Pedido' }).click();

    //usandoClasses
    const orderLockupPage = new OrderLockupPage(page)
    await orderLockupPage.searchOrder(order.number)

    //Assert

    // const orderCode = page.locator('//p[text()="Pedido"]/..//p[text() ="VLO-HFYQUV"]')
    // await expect(orderCode).toBeVisible({ timeout: 10000 });

    //--validacao de item por item - nessa validacao e a mesma do snaphot
    // const containerPedido = page.getByRole('paragraph')
    //   .filter({ hasText: /^Pedido$/ })
    //   .locator('..') //sobe para o elemento pai a div que tem ambos

    // await expect(containerPedido).toContainText(order, { timeout: 10000 })

    // await expect(page.getByText('APROVADO')).toBeVisible();
    //--    

    await expect(page.getByTestId(`order-result-${order.number}`)).toMatchAriaSnapshot(`
      - img
      - paragraph: Pedido
      - paragraph: ${order.number}
      - status:
        - img
        - text: ${order.status}
      - img "Velô Sprint"
      - paragraph: Modelo
      - paragraph: Velô Sprint
      - paragraph: Cor
      - paragraph: ${order.color}
      - paragraph: Interior
      - paragraph: cream
      - paragraph: Rodas
      - paragraph: ${order.wheels}
      - heading "Dados do Cliente" [level=4]
      - paragraph: Nome
      - paragraph: ${order.customer.name}
      - paragraph: Email
      - paragraph: ${order.customer.email}
      - paragraph: Loja de Retirada
      - paragraph
      - paragraph: Data do Pedido
      - paragraph: /\\d+\\/\\d+\\/\\d+/
      - heading "Pagamento" [level=4]
      - paragraph: ${order.payment}
      - paragraph: /R\\$ \\d+\\.\\d+,\\d+/
      `);

    const statusBadge = page.getByRole('status').filter({ hasText: order.status })

    await expect(statusBadge).toHaveClass(/bg-green-100/)
    await expect(statusBadge).toHaveClass(/text-green-700/)

    const statusIcon = statusBadge.locator('svg')
    await expect(statusIcon).toHaveClass(/lucide-circle-check-big/)



  })

  test('Deve consultar pedido reprovado', async ({ page }) => {

    //Test Data
    //const order = 'VLO-B88OPU'

    const order = {
      number: 'VLO-B88OPU',
      status: 'REPROVADO',
      color: 'Midnight Black',
      wheels: 'sport Wheels',
      customer: {
        name: 'fabiana ferri v4',
        email: 'testfabiv4@dev.com'
      },
      payment: 'À Vista'
    };

    //Act
    // await page.getByRole('textbox', { name: 'Código do Pedido' }).fill(order.number);
    // await page.getByRole('button', { name: 'Buscar Pedido' }).click();

    //usandoClasses
    const orderLockupPage = new OrderLockupPage(page)
    await orderLockupPage.searchOrder(order.number)

    //Assert
    await expect(page.getByTestId(`order-result-${order.number}`)).toMatchAriaSnapshot(`
      - img
      - paragraph: Pedido
      - paragraph: ${order.number}
      - status:
        - img
        - text: ${order.status}
      - img "Velô Sprint"
      - paragraph: Modelo
      - paragraph: Velô Sprint
      - paragraph: Cor
      - paragraph: ${order.color}
      - paragraph: Interior
      - paragraph: cream
      - paragraph: Rodas
      - paragraph: ${order.wheels}
      - heading "Dados do Cliente" [level=4]
      - paragraph: Nome
      - paragraph: ${order.customer.name}
      - paragraph: Email
      - paragraph: ${order.customer.email}
      - paragraph: Loja de Retirada
      - paragraph
      - paragraph: Data do Pedido
      - paragraph: /\\d+\\/\\d+\\/\\d+/
      - heading "Pagamento" [level=4]
      - paragraph: ${order.payment}
      - paragraph: /R\\$ \\d+\\.\\d+,\\d+/
      `);

    const statusBadge = page.getByRole('status').filter({ hasText: order.status })

    await expect(statusBadge).toHaveClass(/bg-red-100/)
    await expect(statusBadge).toHaveClass(/text-red-700/)

    const statusIcon = statusBadge.locator('svg')
    await expect(statusIcon).toHaveClass(/lucide-circle-x/)


  })

  test('Deve consultar pedido em analise', async ({ page }) => {

    //Test Data
    //const order = 'VLO-TAFEIH'

    const order = {
      number: 'VLO-TAFEIH',
      status: 'EM_ANALISE',
      color: 'Lunar White',
      wheels: 'aero Wheels',
      customer: {
        name: 'fabiana ferri v5',
        email: 'testfabiv5@dev.com'
      },
      payment: 'À Vista'
    };


    // Act  
    // await page.getByRole('textbox', { name: 'Código do Pedido' }).fill(order.number)
    // await page.getByRole('button', { name: 'Buscar Pedido' }).click()

    //usandoClasses
    const orderLockupPage = new OrderLockupPage(page)
    await orderLockupPage.searchOrder(order.number)

    // Assert
    await expect(page.getByTestId(`order-result-${order.number}`)).toMatchAriaSnapshot(`
      - img
      - paragraph: Pedido
      - paragraph: ${order.number}
      - status:
        - img
        - text: ${order.status}
      - img "Velô Sprint"
      - paragraph: Modelo
      - paragraph: Velô Sprint
      - paragraph: Cor
      - paragraph: ${order.color}
      - paragraph: Interior
      - paragraph: cream
      - paragraph: Rodas
      - paragraph: ${order.wheels}
      - heading "Dados do Cliente" [level=4]
      - paragraph: Nome
      - paragraph: ${order.customer.name}
      - paragraph: Email
      - paragraph: ${order.customer.email}
      - paragraph: Loja de Retirada
      - paragraph
      - paragraph: Data do Pedido
      - paragraph: /\\d+\\/\\d+\\/\\d+/
      - heading "Pagamento" [level=4]
      - paragraph: ${order.payment}
      - paragraph: /R\\$ \\d+\\.\\d+,\\d+/
      `);

    const statusBadge = page.getByRole('status').filter({ hasText: order.status })

    await expect(statusBadge).toHaveClass(/bg-amber-100/)
    await expect(statusBadge).toHaveClass(/text-amber-700/)

    const statusIcon = statusBadge.locator('svg')
    await expect(statusIcon).toHaveClass(/lucide-clock/)
  })


  test('Deve exibir mensagem quando o pedido não é encontrado', async ({ page }) => {

    //const order = 'VLO-ABC123'
    const order = generateOrderCode()

    // await page.getByRole('textbox', { name: 'Código do Pedido' }).fill(order);
    // await page.getByRole('button', { name: 'Buscar Pedido' }).click();

    //ACT

    //usandoClasses
    const orderLockupPage = new OrderLockupPage(page)
    await orderLockupPage.searchOrder(order)


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

})