// Importa o módulo 'app' do arquivo './app.js'
import app from '../app';

const port = process.env.PORT || 9001;

// Inicia o servidor na porta 9001 e imprime uma mensagem no console
app.listen(port, () => {
  // Importa uma linha em branco
  console.log();
  // Exibe uma mensagem informando que o servidor está escutando na porta 3000
  // e inclui um link para a página inicial
  console.log(`Escutando na porta ${port}, clique: https://api-app-finance.vercel.app:${port}`);
});
