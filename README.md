# Anotações

## 1. Configurando para o Node compreender o TypeScript
* Instalar o TypeScript
```bash
npm install -g typescript
```
* Criar o arquivo de configuração do TypeScript
```bash
tsc --init
```
* Para o Node funcionar corretamente com o TypeScript é necessário instar o **@types/node**
```bash
npm install --save-dev @types/node
```

* Para executar o código TypeScript é necessário compilar o código para JavaScript basta instalar o tsx e criar o script
```bash
npm install --save-dev tsx
```
```json
"scripts": {
    "dev": "tsx watch src/server.ts"
}
```

## 2. Configurando o ESLint
* Instalar o ESLint
```bash
npm install eslint --save-dev
```
* Inicializar o ESLint
```bash
npx eslint --init
```
* Criar um arquivo de configuração do ESLint
```bash
touch .eslintrc.json
```
* Adicionar regras ao arquivo de configuração
```json
{
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended"
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaVersion": 12,
        "sourceType": "module"
    },
    "plugins": [
        "@typescript-eslint"
    ],
    "rules": {
        "indent": [
            "error",
            2
        ],
        "linebreak-style": [
            "error",
            "unix"
        ],
        "quotes": [
            "error",
            "single"
        ],
        "semi": [
            "error",
            "always"
        ]
    }
}
```

### Explicação das regras do `.eslintrc.json`
* `indent`: Define a indentação do código. Neste caso, está configurado para 2 espaços.
* `linebreak-style`: Define o estilo de quebra de linha. Neste caso, está configurado para o estilo Unix.
* `quotes`: Define o estilo de aspas. Neste caso, está configurado para aspas simples.
* `semi`: Define o uso de ponto e vírgula. Neste caso, está configurado para sempre usar ponto e vírgula.

**Obs.:** Nesse projeto estou usando o ESLint da Rocketseat, que já vem com algumas regras pré-definidas.

### Configurando o VScode para o ESLint
* instalar a extensão ESLint
* Adicionar a seguinte configuração no `settings.json`
```json
"editor.codeActionsOnSave": {
    "source.fixAll.eslint": "always"
},
```
* Crie um script no `package.json` para executar o ESLint
```json
"scripts": {
    "lint": "eslint . --ext .t --fix"
}
```

## 3. Configurando o Query Builder

Para um projeto de aprendizado um query builder é uma ferramenta muito boa. ORMs são mais complexos e para um projeto pequeno um query builder é mais do que suficiente.

* Instalando o Knex e o driver do SQLite
```bash
npm install knex sqlite3
```

* Criar o arquivo de configuração do Knex
```bash
npx knex init
```

* Criando o arquivo de configuração knex na mão, usando typescript
Crie um arquivo database.ts na pasta config
```typescriimport { knex as setupKnex, Knex } from 'knex'

export const config: Knex.Config = {
  client: 'sqlite3',
  connection: {
    filename: './temp/app.db',
  },
  useNullAsDefault: true,
  migrations: {
    directory: './src/migrations',
  },
}

export const knex = setupKnex(config)ig)
```

## 4. Criadno as migrations
Como o knex foi construído para trabalhar com javascropt e nosso projeto é em typescript precisamos fazer algumas configurações para o knex entender o typescript.
* Crie um arquivo `knexfilets` na raiz do projeto
```typescript
import { config } from './src/database'

export default config
```
* Crie o seguinte script que irá conseguir executar o knex com o typescript
```json
"knex": "node --import tsx ./node_modules/.bin/knex"
```
    * em versões mais antigas usava-se `--loader`

para passar parâmetros para o knex é necessário passar o comando `--` antes dos parâmetros
```bash
npm run knex -- -h
```
* Criar uma migration
O nome da migration deve ser descritivo para facilitar o entendimento de quem for ler o código.
```bash
npm run knex -- migrate:make nome_da_migration
```
* Estrutura de uma migration tem dois métodos `up` e `down`. O método `up` é responsável para a alteração no banco de dados e o método `down` reverte essa alteração.
```typescript
import { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('exemplo', (table) => {
    table.uuid('id').primary()
    table.text('title').notNullable()
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('exemplo')
}
```
* Executando a migration
```bash
npm run knex -- migrate:latest
```

    **IMPORTANTE**: sempre que uma migration for subida para time NUMCA deve ser modificada, caso seja necessário fazer alguma alteração crie uma nova migration.

* Desfazendo a migration
Caso eu não tenha subido para o time, posso desfazer a migration usando o comadno a seguir.
```bash
npm run knex -- migrate:rollback
```

## 5. Realizando querys com o knex
* Fazer um `insert`

```typescript
await knex('transactions')
    .insert({
      id: crypto.randomUUID(),
      title: 'Transaction test',
      amount: 1000,
    })
    .returning('*')
```
O `.returning('*')` faz com que após inserir o valor retorne o que foi inserido.

* Fazer uma consulta (`select`)
seleção de todos os registros
```typescript
const transaction = await knex('transactions').select('*')
```
seleção de registros com condição
```typescript
await knex('transactions')
    .where('amount', 500)
    .select('*')
```
Existe N possibilidades de fazer consultas com o knex, para saber mais consulte a [documentação](http://knexjs.org/)

## 6. Variáveis de ambiente
Em um projeto real é necessário ter variáveis de ambiente para proteger informações sensíveis como senhas, tokens, etc.
* Criar um arquivo `.env` na raiz do projeto
```env
DB_CLIENT="sqlite3"
DB_URL="./temp/app.db"
PORT="3333"
```
* Instale a extensão `dotenv` no vscode
    Isso fará o vscode enteder as variáveis de ambiente e não mostrará erros no código.
* Instale o pacote `dotenv`
```bash
npm install dotenv
```
* Usando o `env`
Para usar o `env` basta importar `dotenv/config` e usar a variável global `process.env`
```typescript
import 'dotenv/config'

const port = process.env.PORT
```
* Crie um arquivo `.env.example` para mostrar quais variáveis de ambiente são necessárias para o projeto
```env
DB_CLIENT=
DB_URL=
PORT=
```

## 7. Validando dados com o zod
Zod é uma biblioteca de validação de dados, muito útil para validar dados de entrada.
* Usando zod para validar o .env
```typescript
import 'dotenv/config'
import { z } from 'zod'

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('production'),
  DB_URL: z.string(),
  PORT: z.number().default(3333),
})

const _env = envSchema.safeParse(process.env)

if (!_env.success) {
  console.error('⚠️ Invalid environment variables', _env.error.format())

  process.exit(1)
}

export const env = _env.data
```

## 8. Plugins do fastify
Para usar plugins no fastify basta importar o plugin e usar o método `register` do fastify.
```typescript
import fastify from 'fastify'
import { exemplo } from './src'

const app = fastify()
app.register(exemplo)
```
A ordem dos plugins no código é a ordem emq ue são executados, então caso necessite que um seja executado antes coloqueo na frente.