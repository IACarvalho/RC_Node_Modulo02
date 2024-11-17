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