# Deploy do Backend no Vercel

## ⚠️ Nota sobre erros TypeScript
Os erros TypeScript exibidos são do SDK `imvu.js-master` e **não afetam** o funcionamento do backend. O backend roda com JavaScript puro (`node server.js`) e funciona perfeitamente.

## Passo 1: Instalar Vercel CLI
```bash
npm install -g vercel
```

## Passo 2: Fazer deploy do backend
```bash
cd backend
vercel
```

Siga as instruções:
- Login com sua conta (GitHub, GitLab ou email)
- Selecione "Create new project"
- Confirme as configurações

## Passo 3: Pegar a URL do deploy

Após o deploy, você receberá uma URL como:
```
https://seu-projeto.vercel.app
```

## Passo 4: Configurar a URL no frontend

Abra o console do navegador (F12) e execute:
```javascript
localStorage.setItem('BACKEND_URL', 'https://seu-projeto.vercel.app');
location.reload();
```

## Passo 5: Testar a conexão

1. Vá para a página "Bots"
2. Faça login com suas credenciais do IMVU
3. Vá para "Rooms" para se conectar a salas

## Notas importantes:

- O Vercel oferece plano gratuito
- O WebSocket funcionará automaticamente via HTTPS
- Cada deploy gera uma nova URL (use `vercel --prod` para URL permanente)
- Para atualizar o backend, basta rodar `vercel` novamente na pasta backend

## Troubleshooting:

Se o WebSocket não conectar:
1. Verifique se a URL no localStorage está correta
2. Abra o console (F12) e procure por erros
3. Confirme que o deploy do Vercel foi bem-sucedido
