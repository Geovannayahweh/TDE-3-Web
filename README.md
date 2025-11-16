# Consumo de APIs com JavaScript

Aplicação que demonstra como consumir APIs HTTP usando JavaScript com Fetch API e Async/Await.

## API Utilizada

**JSONPlaceholder** (https://jsonplaceholder.typicode.com/)

API de teste fake que simula um servidor com dados de usuários, posts e comentários. Ideal para aprender e praticar requisições HTTP sem autenticação.

## Métodos HTTP Implementados

### GET - Buscar Posts

Recupera dados do servidor.

```javascript
const response = await fetch(
  `https://jsonplaceholder.typicode.com/posts?_limit=5`
);
const posts = await response.json();
```

- Endpoint: `GET /posts?_limit=5`
- Retorna os 5 primeiros posts
- Status esperado: 200 OK

### POST - Criar Novo Post

Envia dados para criar um novo recurso.

```javascript
const response = await fetch(`https://jsonplaceholder.typicode.com/posts`, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    userId: 1,
    title: "Título",
    body: "Conteúdo",
  }),
});
const newPost = await response.json();
```

- Endpoint: `POST /posts`
- Envia JSON no corpo da requisição
- Status esperado: 201 Created

### DELETE - Deletar Post

Remove um recurso do servidor.

```javascript
const response = await fetch(`https://jsonplaceholder.typicode.com/posts/1`, {
  method: "DELETE",
});
```

- Endpoint: `DELETE /posts/{id}`
- Remove o post com ID especificado
- Status esperado: 200 OK

## Tratamento de Erros

Todas as requisições usam `try/catch` e validam o status HTTP:

```javascript
try {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Erro HTTP! Status: ${response.status}`);
  }
  const data = await response.json();
} catch (error) {
  console.error("Erro:", error.message);
}
```

## Como Usar

1. Abra `index.html` em um navegador
2. Use os botões para fazer requisições:
   - **GET**: Clique em "Buscar Posts"
   - **POST**: Preencha o formulário e clique em "Criar Post"
   - **DELETE**: Insira um ID e clique em "Deletar Post"

---

**Desenvolvido com JavaScript, Fetch API e Async/Await**

Criado: 15 de novembro de 2025
