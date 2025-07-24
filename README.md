## Brainiac

[Requisitos](#requisitos) | [Clone](#clone) | [Config](#config) | [Docker](#docker)
### Requisitos

Para executar o projeto instale a stack 

- [Node.js](https://nodejs.org/)

  > Usei a versão 22

- [pnpm](https://pnpm.io/installation)
- [git](https://git-scm.com/)

> Como tudo instalado, siga os passos abaixo para configurar o projeto ou use _Docker_

### Clone

Clone o projeto, usando o comando abaixo:
```bash
git clone https://github.com/nathan2slime/brainiac.git
```

### Config

Use o arquivo `.env.example` como base e crie um arquivo `.env.local`, e nele adicione as seguintes variáveis de ambiente

```env
NEXT_PUBLIC_API_URL=http://localhost:3000/api
NEXT_PUBLIC_INTERNAL_API_URL=http://web:3000/api
```

Use o comando abaixo para instalar as dependências
```
pnpm install
```

Com tudo pronto. Para executar o projeto **Next.js**, use o comando abaixo
```
pnpm dev --filter=@iac/web...
```
E para executar o **Storybook**, use o comando abaixo
```bash
pnpm dev --filter=@iac/storybook...
```

### Docker
Para executar o projeto usando **Docker** rode o comando abaixo

```bash
docker compose build \
  --build-arg NEXT_PUBLIC_API_URL=http://localhost:3000/api \
  --build-arg NEXT_PUBLIC_INTERNAL_API_URL=http://web:3000/api
```