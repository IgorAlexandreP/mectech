# MecTech Equipamentos - Landing Page

## Sobre o Projeto

Esta é uma landing page moderna e responsiva para a **MecTech Equipamentos**, uma empresa especializada em soluções de equipamentos de qualidade. O site foi desenvolvido para apresentar a empresa, seus produtos e facilitar o contato com clientes através do WhatsApp.

### Características Principais

- **Design Responsivo**: Otimizado para desktop, tablet e mobile
- **Integração com WhatsApp**: Botões de contato direto para o WhatsApp
- **Interface Moderna**: Design limpo e profissional com animações suaves
- **Performance**: Carregamento rápido e otimizado
- **SEO Friendly**: Estrutura otimizada para mecanismos de busca

## Tecnologias Utilizadas

- **Vite** - Build tool e bundler
- **React 18** - Biblioteca para interface de usuário
- **TypeScript** - Tipagem estática para JavaScript
- **Tailwind CSS** - Framework CSS utilitário
- **shadcn/ui** - Biblioteca de componentes UI
- **React Router** - Roteamento para aplicações React
- **Lucide React** - Ícones modernos
- **Framer Motion** - Animações (implícito nas classes CSS)

## Estrutura do Projeto

```
src/
├── components/          # Componentes reutilizáveis
│   ├── ui/             # Componentes base (shadcn/ui)
│   ├── Header.tsx      # Cabeçalho da página
│   ├── Hero.tsx        # Seção principal
│   ├── About.tsx       # Sobre a empresa
│   ├── Products.tsx    # Catálogo de produtos
│   ├── FAQ.tsx         # Perguntas frequentes
│   ├── Contact.tsx     # Formulário de contato
│   ├── Footer.tsx      # Rodapé
│   └── WhatsAppFloat.tsx # Botão flutuante do WhatsApp
├── pages/              # Páginas da aplicação
├── assets/             # Imagens e recursos estáticos
├── hooks/              # Hooks customizados
└── lib/                # Utilitários
```

## Seções da Landing Page

1. **Hero** - Apresentação principal com call-to-action
2. **Produtos** - Catálogo de equipamentos (integrado com WhatsApp)
3. **Sobre** - Informações sobre a empresa e valores
4. **FAQ** - Perguntas frequentes
5. **Contato** - Formulário e informações de contato
6. **WhatsApp Float** - Botão flutuante para contato direto

## Como Executar o Projeto

### Pré-requisitos

- Node.js (versão 16 ou superior)
- npm ou yarn

### Instalação

1. Clone o repositório:
```bash
git clone <URL_DO_REPOSITORIO>
cd mectech-whats-connect-23
```

2. Instale as dependências:
```bash
npm install
```

3. Execute o servidor de desenvolvimento:
```bash
npm run dev
```

4. Abra [http://localhost:5173](http://localhost:5173) no seu navegador

### Scripts Disponíveis

- `npm run dev` - Inicia o servidor de desenvolvimento
- `npm run build` - Cria build de produção
- `npm run preview` - Visualiza o build de produção
- `npm run lint` - Executa o linter

## Personalização

### Alterando Informações da Empresa

As informações da empresa podem ser alteradas nos seguintes arquivos:

- **Hero**: `src/components/Hero.tsx`
- **Sobre**: `src/components/About.tsx`
- **Contato**: `src/components/Contact.tsx`
- **WhatsApp**: Número do WhatsApp em `src/components/WhatsAppFloat.tsx`

### Cores e Tema

As cores podem ser personalizadas no arquivo `tailwind.config.ts`:

```typescript
theme: {
  extend: {
    colors: {
      primary: {
        // Suas cores personalizadas
      }
    }
  }
}
```

## Deploy

### Build de Produção

```bash
npm run build
```

Os arquivos otimizados serão gerados na pasta `dist/`.

### Hospedagem

O projeto pode ser hospedado em qualquer serviço que suporte aplicações React estáticas:

- **Vercel** (recomendado)
- **Netlify**
- **GitHub Pages**
- **AWS S3 + CloudFront**

## Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## Contato

Para dúvidas ou sugestões sobre este projeto, entre em contato através do WhatsApp da MecTech Equipamentos.