# TAD Area Calculator

---

Aplicação que recebe dois valores, exibe o resultado como área em m² e atualiza o seletor de quantidade da página de produto.

## Uso

---

1. Crie uma nova branch e altere o vendor

```json
{
  "vendor": "{vendor}",
  "name": "tad-area-calculator",
  "version": "0.0.1",
  "title": "Calculadora de área",
  "description": "Aplicação que recebe dois valores, exibe o resultado como área em m² e atualiza o seletor de quantidade da página de produto."
}
```

2. Caso não precise de alterações, libere a nova versão para o vendor, publique e faça o deploy do app. Caso precise de alterações, execute os passos após a realização das mesmas.

3. Importe o app nas dependências do seu app no `manifest.json`, assim como o seguinte exemplo:

```json
  "dependencies": {
    "{vendor}.tad-area-calculator": "0.x"
  }
```
4. Declare o bloco "area-calculator" na estrutura desejada, assim como o seguinte exemplo:

```json
  "area-calculator": {
    "children": [{"children"}],
    "props": {    }
  },
```

## Props

---

- `showCalculatorTitle`: (boolean) - Define se o título é exibido.
- `calculatorTitle`: (string) - Texto do título.
- `widthLabel`: (string) - Label de largura.
- `widthPlaceholder`: (string) - Placeholder de largura.
- `lengthLabel`: (string) - Label de comprimento.
- `lengthPlaceholder`: (string) - Placeholder de comprimento.
- `errorText`: (string) - Texto para inputs vazios.
- `warningText`: (string) - Texto extra para avisos/informações.
- `calculateText`: (string) - Texto do botão de calcular.
- `textBeforeResult`: (string) - Texto antes do resultado.
- `setQuantityText`: (string) - Texto do botão de atualizar quantidade.

## Contributors

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->



<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!