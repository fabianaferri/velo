export function generateOrderCode() {
    const prefix = 'VLO-';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let code = '';
  
    for (let i = 0; i < 6; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      code += characters[randomIndex];
    }
  
    return prefix + code;
  }
  
  const order = generateOrderCode();
  
  console.log(order); // Exemplo: VLO-HFYQUV