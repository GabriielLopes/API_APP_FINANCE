// Importa o módulo 'app' do arquivo './app.js'
import app from '../app';

const port = 3333;

// Inicia o servidor na porta 3000 e imprime uma mensagem no console
app.listen(port, () => {
  // Importa uma linha em branco
  console.log();

  // Exibe uma mensagem informando que o servidor está escutando na porta 3000
  // e inclui um link para a página inicial
  console.log('Escutando na porta 3333, clique: http://localhost:3333');
});
