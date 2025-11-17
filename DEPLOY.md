# Deploy do Backend no Vercel

## ⚠️ Nota sobre erros TypeScript
Os erros TypeScript exibidos são do SDK `imvu.js-master` e **não afetam** o funcionamento do backend. O backend roda com JavaScript puro (`node server.js`) e funciona perfeitamente.

## ⚠️ IMPORTANTE: Configurar Backend URL no Frontend

Após fazer o deploy, você DEVE configurar a URL do backend no frontend:

### Opção 1: Via Settings (Recomendado)
1. Abra o app no navegador
2. Vá em **Settings** (no menu lateral)
3. Em "Backend Configuration", cole a URL do Vercel
4. Clique em "Save and Reload"

### Opção 2: Via Console do Navegador
```javascript
localStorage.setItem('BACKEND_URL', 'https://humble-hub-96357c81.vercel.app');
location.reload();
```

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
https://humble-hub-96357c81.vercel.app
```

**ATENÇÃO:** Cole esta URL exata no Settings do app!

## Passo 4: Testar a conexão

1. Vá para a página "Bots"
2. Clique em "Login" em um bot
3. Digite suas credenciais do IMVU
4. Verifique os logs no console (F12) - eles mostrarão a URL sendo usada

## Troubleshooting:

### "Login failed. Please check credentials"
Possíveis causas:
1. **Backend URL não configurada** - Vá em Settings e configure
2. **Backend não está rodando** - Faça o deploy no Vercel
3. **URL incorreta** - Verifique se a URL em Settings está correta
4. **Credenciais IMVU inválidas** - Verifique usuário e senha

### Como verificar se está funcionando:
1. Abra o console do navegador (F12)
2. Tente fazer login
3. Veja os logs detalhados:
   - `Connecting to backend: https://...` ← Mostra a URL sendo usada
   - `Backend response status: 200` ← Deve ser 200 se OK
   - `Backend response: {...}` ← Mostra a resposta completa

### WebSocket não conecta:
1. Verifique se a URL no localStorage está correta
2. O WebSocket usa automaticamente a mesma URL do backend
3. Procure por `[WebSocket]` nos logs do console

## Notas importantes:

- O Vercel oferece plano gratuito
- O WebSocket funcionará automaticamente via HTTPS
- Cada deploy gera uma nova URL (use `vercel --prod` para URL permanente)
- Para atualizar o backend, basta rodar `vercel` novamente na pasta backend
- **SEMPRE** configure a URL no Settings após fazer o deploy!
