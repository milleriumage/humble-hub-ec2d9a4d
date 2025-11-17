# Limitações do Vercel

## ⚠️ WebSockets Persistentes Não Suportados

O Vercel **não suporta WebSockets de longa duração**, o que afeta este projeto:

### ✅ O Que Funciona no Vercel

- **Login do IMVU** - Autenticação completa funciona
- **Buscar salas** - Pesquisa de salas funciona
- **API REST** - Todas as chamadas HTTP funcionam normalmente

### ❌ O Que NÃO Funciona no Vercel

- **Entrar em salas** - Requer conexão IMQ (WebSocket persistente)
- **Mensagens em tempo real** - Receber/enviar mensagens nas salas
- **Presença de usuários** - Ver quem entra/sai das salas
- **Chat bot em tempo real** - Interação automática com IA

## 🔧 Solução Aplicada

O backend foi modificado para:

1. **Login sem IMQ** - Login funciona mesmo sem WebSocket
2. **Flag `DISABLE_IMQ=true`** - Configurada automaticamente no Vercel
3. **Erros claros** - Mensagens informam quando recursos não estão disponíveis

### Como Funciona

```javascript
// No Vercel: DISABLE_IMQ=true
// Login: ✅ Funciona
// Salas: ❌ Erro claro: "Real-time features not available"

// Backend completo (Railway/Render/local):
// Login: ✅ Funciona
// Salas: ✅ Funciona com tempo real
```

## 🚀 Para Habilitar Recursos Completos

### Opção 1: Railway (Recomendado)

```bash
# 1. Criar conta no Railway
# 2. Conectar repositório GitHub
# 3. Deploy automático
# URL: https://seu-projeto.up.railway.app
```

### Opção 2: Render

```bash
# 1. Criar conta no Render
# 2. New Web Service → Connect Repository
# 3. Configurar:
#    Build: cd backend && npm install
#    Start: cd backend && npm start
```

### Opção 3: Local com ngrok

```bash
cd backend
npm start

# Em outro terminal:
ngrok http 3001

# Copiar URL: https://abc123.ngrok-free.app
```

## 📝 Variáveis de Ambiente

### Vercel (Atual)
```bash
DISABLE_IMQ=true  # Login funciona, salas não
```

### Railway/Render (Completo)
```bash
DISABLE_IMQ=false  # Tudo funciona
# ou simplesmente não definir a variável
```

## 🎯 Próximos Passos

1. **Para testar login**: Já funciona no Vercel
2. **Para usar salas e tempo real**: Deploy em Railway ou Render
3. **Para desenvolvimento local**: Use ngrok conforme `SETUP.md`

## 📚 Documentação Relacionada

- `SETUP.md` - Como conectar localmente com ngrok
- `DEPLOY.md` - Como fazer deploy no Vercel (limitado)
- `TROUBLESHOOTING_LOGIN.md` - Resolver erros de login
