### Hobbit Chat: Imersão React 4 - Alura

<hr>

#### Aula 1 - Criando o nosso projeto

##### Manual Setup
[getting-started](https://nextjs.org/docs/getting-started)

```
yarn init -y
```

```
yarn add next react react-dom
```

[coolors.co](https://coolors.co/)


```
yarn add @skynexui/components
```

```
npx gitignore node
```

<hr>

#### Aula 02 - State, novas páginas e navegação SPA vs a Tradicional

[custom-app](https://nextjs.org/docs/advanced-features/custom-app)

<hr>

#### Aula 03 - Chat offline? Aprimorando as habilidades com State

<hr>

#### Aula 04 - Integrando com o Supabase
* [supabase](https://supabase.com/)
* [api.github](https://api.github.com/users/lucasrmagalhaes)

```javascript
fetch('https://api.github.com/users/lucasrmagalhaes')
.then(async (respostaDoServidor) => {
    const respostaEsperada = await respostaDoServidor.json();
    console.log(respostaEsperada);
})
```

* [supabase-js](https://github.com/supabase/supabase-js)

```
yarn add @supabase/supabase-js
```

```js
supabaseClient
    .from('tabela')
    .select('*')
    .then((dados) => {
        console.log('Dados da consulta: ', dados);
    });

```

<hr>

#### Aula 05 - Adicionando suporte para Stickers

<hr>

#### ENV
```
NEXT_PUBLIC_BG
```

```
SUPABASE_URL
```

```
SUPABASE_ANON_KEY
```

```
NEXT_PUBLIC_SMEAGOL
```