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

  // test.beforeAll(async () =>{
  //   console.log(
  //     'beforeAll: roda uma vez antes de todos os testes'
  //   )
  // })

  // test.afterEach(async () => {
  //   console.log(
  //     'afterEach: roda depois de cada teste'
  //   )
  // })

  // test.afterAll(async () => {
  //   console.log(
  //     'aferAll: roda uma vez depois de todos os testes'
  //   )
  // })


  test('consultar pediddo aprovado', async ({ page }) => {


    //Test Data
    const order = 'VLO-TMMLH1'



    //ACT
    //preenche o campo de busca com o numero do pedido
    //await page.locator('//label[text()="Número do Pedido"]/..//input').fill('VLO-TMMLH1'); //criando localizador com xpath

    await page.getByRole('textbox', { name: 'Número do Pedido' }).fill(order);

    await page.getByRole('button', { name: 'Buscar Pedido' }).click();


    //ASSERT

    // await expect(page.getByText('VLO-TMMLH1')).toBeVisible({timeout: 10000});
    // await expect(page.getByTestId('order-result-VLO-TMMLH1')).toContainText('VLO-TMMLH1');

    // await expect(page.getByText('APROVADO')).toBeVisible();
    // await expect(page.getByTestId('order-result-VLO-TMMLH1')).toContainText('APROVADO');


    //---abordagem mais tradicional de validação elemento por elemento
    // const containerPedido = page.getByRole('paragraph')
    //   .filter({ hasText: /^Pedido$/ })
    //   .locator('..')

    // await expect(containerPedido).toContainText(order, { timeout: 10000 });

    // await expect(page.getByText('APROVADO')).toBeVisible();



    //validação pelo snapshot - codigo gerado pelo snapshot

    await expect(page.getByTestId(`order-result-${order}`)).toMatchAriaSnapshot(`
      - img
      - paragraph: Pedido
      - paragraph: ${order}
      - img
      - text: APROVADO
      - img "Velô Sprint"
      - paragraph: Modelo
      - paragraph: Velô Sprint
      - paragraph: Cor
      - paragraph: Glacier Blue
      - paragraph: Interior
      - paragraph: cream
      - paragraph: Rodas
      - paragraph: aero Wheels
      - heading "Dados do Cliente" [level=4]
      - paragraph: Nome
      - paragraph: fabiana ferri ferri
      - paragraph: Email
      - paragraph: fabianaferri@dev.test
      - paragraph: Loja de Retirada
      - paragraph
      - paragraph: Data do Pedido
      - paragraph: /\\d+\\/\\d+\\/\\d+/
      - heading "Pagamento" [level=4]
      - paragraph: À Vista
      - paragraph: /R\\$ \\d+\\.\\d+,\\d+/
      `);

  });

  test('consultar pediddo reprovado', async ({ page }) => {


    //Test Data
    const order = 'VLO-A7ZDV0'

    //ACT

    await page.getByRole('textbox', { name: 'Número do Pedido' }).fill(order);

    await page.getByRole('button', { name: 'Buscar Pedido' }).click();


    //ASSERT

    //validação pelo snapshot - codigo gerado pelo snapshot

    await expect(page.getByTestId(`order-result-${order}`)).toMatchAriaSnapshot(`
      - img
      - paragraph: Pedido
      - paragraph: ${order}
      - img
      - text: REPROVADO
      - img "Velô Sprint"
      - paragraph: Modelo
      - paragraph: Velô Sprint
      - paragraph: Cor
      - paragraph: Midnight Black
      - paragraph: Interior
      - paragraph: cream
      - paragraph: Rodas
      - paragraph: sport Wheels
      - heading "Dados do Cliente" [level=4]
      - paragraph: Nome
      - paragraph: steve jobs
      - paragraph: Email
      - paragraph: jobs@apple.com
      - paragraph: Loja de Retirada
      - paragraph
      - paragraph: Data do Pedido
      - paragraph: /\\d+\\/\\d+\\/\\d+/
      - heading "Pagamento" [level=4]
      - paragraph: À Vista
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

    // código gerado pelo codegen, é um codigo mais simples e funcional
    // await expect(page.locator('#root')).toContainText('Pedido não encontrado');
    // await expect(page.locator('#root')).toContainText('Verifique o número do pedido e tente novamente');


    // const title  = page.getByRole('heading', {name: 'Pedido não encontrado'})
    // await expect(title).toBeVisible()

    // //const message = page.getByText('Verifique o número do pedido e tente novamente');

    // //usando xpath
    // //const message = page.locator('//p[text()="Verifique o número do pedido e tente novamente"]')

    // //usando o localizar e validando o texto com um pouco mais de tecnica e programando com playwright puro
    // const message = page.locator('p', {hasText: 'Verifique o número do pedido e tente novamente'})

    // await expect(message).toBeVisible()

    //usando assert snapshot do proprio playwright uma sintesie mais simples e robusta ao mesmo tempo, valiando a img, título e paragrafo
    await expect(page.locator('#root')).toMatchAriaSnapshot(`
      - img
      - heading "Pedido não encontrado" [level=3]
      - paragraph: Verifique o número do pedido e tente novamente
      `);


  });

})



