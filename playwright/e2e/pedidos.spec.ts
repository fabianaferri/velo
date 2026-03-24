import { test, expect } from '@playwright/test';
import { generateOrderCode } from '../support/hlerpers'


/// AAA - Arrange, Act, Assert (PREPARAR, AGIR, VERIFICAR)

test.describe('Consulta de Pedido', () => {


  test.beforeEach(async ({ page }) => {
    //Arrange
    await page.goto('http://localhost:5173/')
    await expect(page.getByTestId('hero-section').getByRole('heading')).toContainText('Velô Sprint')

    await page.getByRole('link', { name: 'Consultar Pedido' }).click();
    await expect(page.getByRole('heading')).toContainText('Consultar Pedido');
  })


  test('consultar pediddo aprovado', async ({ page }) => {


    //Test Data
    //const order = 'VLO-TMMLH1'

    const order = {
      number: 'VLO-TMMLH1', 
      status: 'APROVADO',
      color: 'Glacier Blue',
      wheels: 'aero Wheels',
      customer: {
        name: 'fabiana ferri ferri',
        email: 'fabianaferri@dev.test',
      },
      payment: 'À Vista'
    }

    //ACT
    //preenche o campo de busca com o numero do pedido
    //await page.locator('//label[text()="Número do Pedido"]/..//input').fill('VLO-TMMLH1'); //criando localizador com xpath

    await page.getByRole('textbox', { name: 'Número do Pedido' }).fill(order.number);

    await page.getByRole('button', { name: 'Buscar Pedido' }).click();


    //ASSERT

    //validação pelo snapshot - codigo gerado pelo snapshot

    await expect(page.getByTestId(`order-result-${order.number}`)).toMatchAriaSnapshot(`
      - img
      - paragraph: Pedido
      - paragraph: ${order.number}
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

  });

  test('consultar pediddo reprovado', async ({ page }) => {

    //Test Data
    //const order = 'VLO-A7ZDV0'

    const order = {
      number: 'VLO-A7ZDV0',
      status: 'REPROVADO',
      color: 'Midnight Black',
      wheels: 'sport Wheels',
      customer: {
        name: 'steve jobs',
        email: 'jobs@apple.com',
      },
      payment: 'À Vista'
    }

    //ACT
    await page.getByRole('textbox', { name: 'Número do Pedido' }).fill(order.number);

    await page.getByRole('button', { name: 'Buscar Pedido' }).click();

    //ASSERT

    //validação pelo snapshot - codigo gerado pelo snapshot

    await expect(page.getByTestId(`order-result-${order.number}`)).toMatchAriaSnapshot(`
      - img
      - paragraph: Pedido
      - paragraph: ${order.number}
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

  });

  test('consultar pediddo em analise', async ({ page }) => {

    //Test Data
    //const order = 'VLO-A7ZDV0'

    const order = {
      number: 'VLO-L0VG0U',
      status: 'EM_ANALISE',
      color: 'Lunar White',
      wheels: 'aero Wheels',
      customer: {
        name: 'joão da silva e silva',
        email: 'joaosilvas@dev.com',
      },
      payment: 'À Vista'
    }

    //ACT
    await page.getByRole('textbox', { name: 'Número do Pedido' }).fill(order.number);

    await page.getByRole('button', { name: 'Buscar Pedido' }).click();

    //ASSERT
    //validação pelo snapshot - codigo gerado pelo snapshot

    await expect(page.getByTestId(`order-result-${order.number}`)).toMatchAriaSnapshot(`
      - img
      - paragraph: Pedido
      - paragraph: ${order.number}
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

  });

  test('deve exibir mensagem quando o pedido não é encontrado', async ({ page }) => {

    //Test Data não existente
    //massa de teste que vc pode colocar manualmente
    //const order = 'VLO-ABC123'

    const order = generateOrderCode()

    //Arrange

    //Act
    await page.getByRole('textbox', { name: 'Número do Pedido' }).fill(order);

    await page.getByRole('button', { name: 'Buscar Pedido' }).click();


    // //Assert


    //usando assert snapshot do proprio playwright uma sintesie mais simples e robusta ao mesmo tempo, valiando a img, título e paragrafo
    await expect(page.locator('#root')).toMatchAriaSnapshot(`
      - img
      - heading "Pedido não encontrado" [level=3]
      - paragraph: Verifique o número do pedido e tente novamente
      `);


  });

})



