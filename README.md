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

* Criadno o arquivo de configuração knex na mão, usando typescript
Crie um arquivo database.ts na pasta src
```typescript
import { knex as setupKnex } from 'knex'

export const knex = setupKnex({
  client: 'sqlite3',
  connection: {
    filename: ',/temp/app.db',
  },
})
```
