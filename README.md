# 🪟 Portfólio Interativo Windows 95 — Ademir Júnior

Portfólio interativo retrô com a experiência autêntica do **Windows 95**, desenvolvido em **HTML5, CSS3 e JavaScript puro (Vanilla)** para hospedagem gratuita e de alto desempenho no **GitHub Pages**.

---

## ✨ Funcionalidades Principais

- 🚀 **Tela de Boot Nostálgica:** Splash screen animada do Windows 95 com barra de progresso azul e som clássico de inicialização (`The Microsoft Sound.wav` por Brian Eno).
- 🪟 **Gerenciador Real de Janelas:** Arrastar e soltar, minimizar, maximizar, restaurar, fechar e sobreposição de foco (`z-index`).
- 📁 **Pasta "Meus Projetos" (Explorer):** Executáveis dos 5 sistemas oficiais em produção:
  - `RELATORIO.EXE` — CODECON: Sistema de Reclamações & Relatórios (CMSG)
  - `TELAO_CMSG.EXE` — Eleição da Mesa Diretora: Votação Nominal em Tempo Real
  - `PDFKIT.EXE` — CMSGPDFKit: Motor de Paginação & Layout Normatizado
  - `CLOUD.EXE` — CMSG Cloud: Repositório & Sincronização WebDAV
  - `FARMACIA.EXE` — Controle de Estoque de Remédios & Raspagem CMSG
- 🎮 **Pasta "Jogos Clássicos":**
  - **3D Pinball: Space Cadet** (Wasm 60 FPS, física e áudio originais)
  - **Campo Minado (WINMINE.EXE)** (JS nativo com 3 níveis, contadores LCD e expressões de carinha)
  - **Paciência (SOL.EXE)** (Mesa clássica de cartas)
  - **SkiFree (SKIFREE.EXE)** (Descida na neve com o Yeti)
- 💿 **CD Player Funcional:** Toca os 5 sons clássicos do sistema (Startup, Ta-daaa, Chord, Chimes, Ding).
- 📝 **Bloco de Notas (NOTEPAD.EXE):** Currículo e bio detalhada de Ademir Júnior.
- 📱 **100% Responsivo & Mobile Touch-Friendly:** Detecção automática de celulares com abertura por toque único e janelas ajustadas ao viewport móvel.

---

## 🚀 Como Testar Localmente

1. Basta abrir o arquivo `index.html` em qualquer navegador:
   - Dê dois cliques em `D:\powerpc\win95_web\index.html`
2. Ou via terminal Python:
   ```bash
   cd D:\powerpc\win95_web
   python -m http.server 8080
   ```
   Acesse: `http://localhost:8080`

---

## 🌐 Como Publicar no GitHub Pages (2 Minutos)

### Opção 1: Como seu site principal (`crustkernel.github.io`)
1. Crie um repositório no seu GitHub chamado: `crustkernel.github.io`
2. No terminal da pasta `D:\powerpc\win95_web`:
   ```bash
   git init
   git add .
   git commit -m "feat: portfolio interativo windows 95"
   git branch -M main
   git remote add origin https://github.com/CrustKernel/crustkernel.github.io.git
   git push -u origin main
   ```
3. O site estará no ar instantaneamente em: **`https://crustkernel.github.io/`**

### Opção 2: Como repositório de projeto (`crustkernel.github.io/portfolio-win95`)
1. Crie o repositório `portfolio-win95` no GitHub.
2. Faça o push dos arquivos de `D:\powerpc\win95_web`.
3. No GitHub, vá em **Settings > Pages > Branch: main > Save**.
4. Disponível em: **`https://crustkernel.github.io/portfolio-win95/`**
