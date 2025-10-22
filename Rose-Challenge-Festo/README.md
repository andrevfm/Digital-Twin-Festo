# Frontend — App React (Expo)

Interface para visualização de **status**, **histórico**, **métricas** e **relatórios** do sistema FESTO.

---

## Stack & Requisitos

- Node.js 18+
- npm (ou yarn/pnpm)
- Expo (via `npx expo`)

---

## 🔧 Setup & Execução

```bash
cd frontend
npm install
npm start 
```

> Abra no navegador (Web) ou no app **Expo Go** (mobile), conforme sua necessidade.

---

## Variáveis de Ambiente

Crie um arquivo **`.env`** em `frontend/` (exemplo):

```env
VITE_API_BASE_URL=http://127.0.0.1:5000
```

No código, leia usando `process.env.VITE_API_BASE_URL` (ou a lib de env que você utiliza).  
> Ajuste conforme onde o backend está rodando (localhost/servidor).

---

## Scripts úteis

```bash
npm start    
npm run build  
```

---

## Estrutura

```text
Rose-Challenge-Festo/
├─ .expo/                                   # configurações do Expo
├─ node_modules/                            # dependências instaladas
├─ public/                                  # arquivos estáticos
│   ├─ index.html
│   ├─ manifest.json
│   └─ robots.txt
├─ src/
│   ├─ App.js                               # ponto de entrada da aplicação
│   ├─ index.js                             # renderização principal
│   ├─ assets/
│   │   ├─ images/                          # ícones e imagens da interface
│   │   └─ models/                          # modelos 3D (.glb) dos atuadores DSNU e DSBC
│   ├─ components/
│   │   ├─ 3dModels/                        # componentes React-Three-Fiber
│   │   │   ├─ ModelDsnu.jsx
│   │   │   └─ ModelDsbc.jsx
│   │   ├─ ActuatorHistoryChart/            # gráfico de histórico
│   │   ├─ ActuatorPressureChart/           # gráfico de pressão
│   │   ├─ ActuatorReport/                  # exportação em PDF
│   │   ├─ Banner/                          # cabeçalho e layout inicial
│   │   ├─ Dashboard/                       # painel principal
│   │   ├─ DSNU/ e DSBC/                    # componentes de cada atuador
│   │   ├─ Monitoring/                      # módulo de monitoramento
│   │   ├─ Readings/                        # leitura de sensores
│   │   ├─ SelectModel/                     # seleção de modelo 3D
│   │   └─ WelcomePage/                     # tela inicial
│   ├─ utils/
│   │   ├─ api.js                           # configuração Axios/fetch
│   │   ├─ cylinderService.js               # abstração de chamadas API
│   │   └─ generatePDF.js                   # geração de relatórios
│   ├─ App.css / index.css                  # estilos globais
│   ├─ reportWebVitals.js / setupTests.js
│   └─ estrutura.txt (referência interna)
├─ .env
├─ jsconfig.json
├─ package.json
├─ package-lock.json
└─ README.md
```
---

## Integração com a API

- **Base URL**: `process.env.VITE_API_BASE_URL`
- **Endpoints esperados**:
  - `GET /api/cylinder/status`
  - `GET /api/cylinder/history?tag=<TAG>`

---

## Boas práticas de UI

- Estados explícitos
- Tooltips e legenda nos gráficos
- Acessibilidade (labels, contraste)
- Layout responsivo (web) e responsivo à densidade (mobile)