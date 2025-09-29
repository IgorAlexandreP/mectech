# 🚀 Guia de Deploy - HostingZone Business

## 📋 **Resumo do Deploy**

Seu projeto está pronto para ser publicado no domínio principal do seu plano Business da [HostingZone](https://www.hostingzone.com.br).

## ✅ **Arquivos Prontos para Upload**

A pasta `dist/` contém todos os arquivos otimizados para produção:

```
dist/
├── index.html          # Página principal
├── favicon.png         # Ícone do site
├── logo-mectech.png    # Logo da empresa
├── robots.txt          # SEO
├── assets/
│   ├── hero-bg-xxx.jpg # Imagem de fundo
│   ├── index-xxx.css   # Estilos otimizados
│   ├── index-xxx.js    # JavaScript otimizado
│   └── logo-xxx.png    # Logo otimizada
```

## 🔧 **Passos para Deploy**

### **1. Acessar o Painel da HostingZone**

1. Acesse: [https://www.hostingzone.com.br](https://www.hostingzone.com.br)
2. Faça login no **Painel de Controle**
3. Vá para **Gerenciador de Arquivos** ou **File Manager**

### **2. Upload dos Arquivos**

1. **Navegue até a pasta raiz** do seu domínio (geralmente `public_html/` ou `www/`)
2. **Faça upload de TODOS os arquivos** da pasta `dist/`:
   - `index.html`
   - `favicon.png`
   - `logo-mectech.png`
   - `robots.txt`
   - Pasta `assets/` completa

### **3. Configuração do Domínio**

Se você quiser usar o domínio principal (ex: `seudominio.com.br`):

1. **Certifique-se** que os arquivos estão na pasta raiz
2. **Configure o domínio** para apontar para a pasta correta
3. **Teste** acessando seu domínio

## 🌐 **Configurações de Produção**

### **Variáveis de Ambiente**

Crie um arquivo `.env` na raiz do servidor com:

```env
# URL da sua API .NET de produção
VITE_API_BASE_URL=https://sua-api-fabrica.com/api
```

### **Configuração da API**

Lembre-se de configurar a API .NET com:

1. **Deploy da API** no servidor da HostingZone
2. **Configurar CORS** para permitir seu domínio
3. **Ativar o controller** `ProdutosPublicController.cs`

## 📱 **Teste Pós-Deploy**

Após o upload, teste:

1. ✅ **Página principal** carrega corretamente
2. ✅ **Logo** aparece com tamanho correto
3. ✅ **Navegação** funciona
4. ✅ **Responsividade** em mobile
5. ✅ **Integração com API** (quando configurada)

## 🔒 **Configurações de Segurança**

### **HTTPS (Recomendado)**

1. **Ative SSL** no painel da HostingZone
2. **Force HTTPS** para segurança
3. **Configure redirecionamento** HTTP → HTTPS

### **Cache e Performance**

1. **Ative cache** para arquivos estáticos
2. **Configure compressão** GZIP
3. **Otimize imagens** (já feito no build)

## 📞 **Suporte HostingZone**

Se precisar de ajuda:

- **Telefone**: (11) 4200-1466
- **Horário**: Comercial + Atendimento 24hs
- **Painel**: Central de Atendimento

## 🎯 **Próximos Passos**

1. **Upload** dos arquivos da pasta `dist/`
2. **Configurar** variáveis de ambiente
3. **Deploy** da API .NET
4. **Testar** integração completa
5. **Configurar** SSL/HTTPS

## 📊 **Estrutura Final**

```
seudominio.com.br/
├── index.html          # Landing page
├── favicon.png         # Ícone
├── logo-mectech.png    # Logo
├── robots.txt          # SEO
└── assets/             # Recursos otimizados
    ├── CSS otimizado
    ├── JS otimizado
    └── Imagens otimizadas
```

---

**🎉 Seu projeto está pronto para produção!**

A landing page será acessível em seu domínio principal com todos os recursos otimizados.
