# Publicação do protótipo

O protótipo da Envoke é publicado como um site estático pelo GitHub Pages:

- URL pública: <https://amelojunior.github.io/envoke/>
- Repositório: `amelojunior/envoke`
- Branch de desenvolvimento: `main`
- Branch de publicação: `gh-pages`
- Pasta publicada na branch `gh-pages`: raiz (`/`)

## Estrutura

Na branch `main`, os arquivos-fonte do protótipo ficam em `prototype/`:

```text
prototype/
├── app.js
├── index.html
└── styles.css
```

O logo usado pelo protótipo fica em
`assets/brand/logo-evk-shield.png`.

Na branch `gh-pages`, os arquivos que o navegador precisa acessar ficam na
raiz:

```text
/
├── app.js
├── index.html
├── styles.css
└── assets/
    └── brand/
        └── logo-evk-shield.png
```

Essa diferença de estrutura exige que o caminho do logo no `index.html`
publicado seja `assets/brand/logo-evk-shield.png`. No arquivo-fonte em
`prototype/index.html`, o caminho é
`../assets/brand/logo-evk-shield.png`.

## Configuração no GitHub Pages

No repositório do GitHub, em **Settings > Pages**, a publicação deve usar:

- **Source:** Deploy from a branch
- **Branch:** `gh-pages`
- **Folder:** `/ (root)`

Não há processo de build nem dependências de Node.js. O GitHub Pages entrega
diretamente os arquivos HTML, CSS, JavaScript e imagens da branch
`gh-pages`.

## Procedimento de publicação

Primeiro, versionar e enviar as alterações do protótipo na `main`:

```bash
git add prototype assets
git commit -m "Descreva a alteração do protótipo"
git push origin main
```

Depois, criar uma worktree temporária da branch de publicação:

```bash
git worktree add /tmp/envoke-gh-pages gh-pages
```

Copiar os arquivos atualizados para a raiz publicada:

```bash
cp prototype/index.html /tmp/envoke-gh-pages/index.html
cp prototype/styles.css /tmp/envoke-gh-pages/styles.css
cp prototype/app.js /tmp/envoke-gh-pages/app.js
mkdir -p /tmp/envoke-gh-pages/assets/brand
cp assets/brand/logo-evk-shield.png /tmp/envoke-gh-pages/assets/brand/logo-evk-shield.png
sed -i 's#../assets/brand/logo-evk-shield.png#assets/brand/logo-evk-shield.png#' /tmp/envoke-gh-pages/index.html
```

Revisar e publicar a branch:

```bash
git -C /tmp/envoke-gh-pages diff --check
git -C /tmp/envoke-gh-pages diff
git -C /tmp/envoke-gh-pages add index.html styles.css app.js assets
git -C /tmp/envoke-gh-pages commit -m "Publica atualização do protótipo"
git -C /tmp/envoke-gh-pages push origin gh-pages
```

Ao terminar, remover a worktree temporária:

```bash
git worktree remove /tmp/envoke-gh-pages
```

Se apenas um arquivo tiver mudado, como `styles.css`, basta copiar, revisar,
versionar e publicar esse arquivo na worktree da `gh-pages`.

## Validação

Após o `push`, o GitHub Pages pode levar alguns segundos para atualizar. A
publicação deve ser validada em:

<https://amelojunior.github.io/envoke/>

Para evitar que o cache esconda uma atualização recente, recarregue a página
ignorando o cache ou acrescente temporariamente um parâmetro à URL do asset:

```text
https://amelojunior.github.io/envoke/styles.css?v=COMMIT
```

Antes de encerrar a publicação, confira:

- carregamento do logo e dos estilos;
- navegação entre todas as telas;
- rolagem vertical dentro do mockup de celular;
- barra de navegação inferior durante a rolagem;
- apresentação em viewport mobile e desktop.

## Observações

- A `main` é a fonte de verdade do projeto. Não desenvolver diretamente na
  `gh-pages`.
- A branch `gh-pages` contém somente a versão pronta para servir.
- Alterações na `main` não chegam automaticamente ao site; é necessário
  atualizar e enviar também a `gh-pages`.
- A publicação atual é manual e não usa GitHub Actions.
