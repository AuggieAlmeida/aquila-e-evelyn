# Aquila & Evelyn — convite digital

Site estático responsivo criado como convite digital de casamento. A versão publicada preserva a direção de arte e as interações do projeto, mas não contém depoimentos, contatos, endereço, data do evento, RSVP, lista de presentes, PIX ou fotografias pessoais.

## Stack

- HTML5 sem framework;
- CSS3 responsivo, animações e `prefers-reduced-motion`;
- JavaScript puro para navegação, revelação por scroll e convite interativo;
- GitHub Pages com deploy por GitHub Actions.

## Executar localmente

```bash
python3 -m http.server 4173
```

Abra `http://127.0.0.1:4173/`.

## Privacidade e histórico

O estado original do convite foi preservado na branch `codex/archive-before-sanitization-2026-08-12`. A `main` é a edição pública e sanitizada, adequada para demonstração no portfólio.

## Estrutura

```text
.
├── index.html
├── css/styles.css
├── js/script.js
└── assets/
    ├── aquila.png
    ├── evelyn.png
    ├── casal.png
    ├── flower.png
    ├── leaf.png
    ├── leaf2.png
    └── rings.png
```
