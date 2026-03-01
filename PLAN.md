# NanoFleet Docs — Plan

## Tech choices

- **Format**: MDX via Astro content collections (`src/content/docs/`)
- **Search**: Pagefind (already in devDependencies) — indexes after `astro build`, works in production
- **Layout**: New `DocsLayout.astro` with persistent left sidebar + main content area

---

## URL structure & content mapping

### `/docs`
Landing page — 2 cards d'entrée :
- **NanoFleet UI** — Full fleet manager with web dashboard. Deploy and manage multiple agents, install plugins, and configure channels from a single interface. → `/docs/getting-started/ui`
- **Standalone agent** — Run a single agent with Docker. No dashboard, minimal setup, full control. → `/docs/getting-started/standalone`

---

### `/docs/getting-started/ui`
**Sources à supprimer après :**
- `nanofleet/docs/01-architecture-overview.md` § Introduction, Monorepo Structure, Tech Stack, Data Flow
- `nanofleet/docs/02-api-and-auth.md` § Bootstrap Phase, Login Flow, JWT
- `nanofleet/docs/03-docker-orchestration.md` § Network, Workspaces

**Contenu :**
- Prérequis (Docker, ports 8080)
- Clone du repo + configuration `.env` (ENCRYPTION_KEY, ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET)
- `docker compose up --build`
- Premier login : mot de passe temporaire dans le terminal + QR code 2FA à scanner
- Accès dashboard `http://localhost:8080`
- Production avec HTTPS (Traefik)

---

### `/docs/getting-started/standalone`
**Sources à supprimer après :**
- `nanofleet-agent/SPECIFICATIONS.md` § 17 Deployment, § 16 Configuration

**Contenu :**
- `docker run` minimal avec les variables d'env essentielles (ANTHROPIC_API_KEY, AGENT_MODEL)
- `docker-compose.yml` avec workspace persistant + canal Telegram intégré
- Variables d'env complètes (LLM provider, AGENT_MODEL, PORT, HEARTBEAT...)
- Upgrade : `docker pull ghcr.io/nanofleet/nanofleet-agent:latest` + redémarrage du container

---

### `/docs/agents/overview`
**Sources à supprimer après :**
- `nanofleet-agent/SPECIFICATIONS.md` § 1 Overview, § 2 Design Principles, § 3 Architecture, § 7 Tools, § 10 Usage & Cost Tracking
- `nanofleet/docs/03-docker-orchestration.md` § Agent Lifecycle

**Contenu :**
- Ce qu'est un agent (runtime Bun/TypeScript, framework Mastra)
- Architecture (LLM loop, Identity layer, Memory layer, Skills, Transport HTTP)
- Outils natifs : webSearch, webFetch, readFile, writeFile, editFile, listDir, execShell (désactivé par défaut)
- Modèles supportés (Anthropic, Google, OpenRouter, vLLM, 600+ via Mastra)
- Cycle de vie Docker (deploy → stop → resume → upgrade)
- Suivi usage & coût (tokens, cost USD par modèle)

---

### `/docs/agents/packs`
**Sources à supprimer après :**
- `nanofleet/docs/05-agent-packs.md` (complet)
- `nanofleet-agent/SPECIFICATIONS.md` § 4 Identity (SOUL.md, STYLE.md, AGENTS.md), § 5 Memory (MEMORY.md, HISTORY.md), § 6 Skills
- `nanofleet/docs/03-docker-orchestration.md` § Workspace Setup

**Contenu :**
- Structure du pack : `manifest.json`, `SOUL.md`, `STYLE.md`, `AGENTS.md`, `MEMORY.md`, `cron.json`
- `manifest.json` : champs (name, model, requiredEnvVars), exemple
- Rôle de chaque fichier (identité, style, multi-agent, mémoire long terme, tâches planifiées)
- Skills : structure `skills/SKILL.md` avec frontmatter YAML, chargement dynamique
- Upload depuis le dashboard (zip → Deploy Agent)
- Assemblage du system prompt (ordre static-first pour le prompt caching)

---

### `/docs/agents/scheduling`
**Sources à supprimer après :**
- `nanofleet-agent/SPECIFICATIONS.md` § 8 Scheduling (HEARTBEAT.md, cron.json), § 11 Channels (notifications proactives)

**Contenu :**
- `HEARTBEAT.md` : checklist de tâches périodiques, intervalle configurable (défaut 30 min), skip si vide
- `cron.json` : expressions cron, timezone, exemple morning-briefing
- Différence heartbeat vs cron (contexte, session, usage)
- Notifications proactives : SSE stream → canal → utilisateur
- Comportement si aucun canal connecté (notification dropped)

---

### `/docs/plugins/overview`
**Sources à supprimer après :**
- `nanofleet/docs/04-mcp-and-plugins.md` § 1, 2, 4
- `nanofleet/docs/plugins/01-architecture.md` § 1 Core Principle, § 2 Network Topology, § 4 Agent↔Plugin Scope, § 5 SDUI Sidebar Slots

**Contenu :**
- Qu'est-ce qu'un plugin (container Docker isolé + MCP server HTTP)
- Topologie réseau : nanofleet-net, agents appellent les plugins directement (API pas sur le hot path)
- Comment les agents utilisent les plugins : `.mcp.json` généré à chaque démarrage
- Relation many-to-many agents↔plugins (auto-link à l'installation)
- Sidebar slots : plugin peut injecter une entrée nav + iframe UI dans le dashboard
- Isolation sécurité : plugin trappé dans son container

---

### `/docs/plugins/installing`
**Sources à supprimer après :**
- `nanofleet/docs/plugins/01-architecture.md` § 3 Lifecycle (installation, deletion)
- `nanofleet/docs/04-mcp-and-plugins.md` § 7 Plugin Lifecycle
- `nanofleet/docs/plugins/03-mcp-router.md` § 2 Agent Configuration

**Contenu :**
- Installer via manifest URL dans le dashboard (`POST /api/plugins/install`)
- Ce qui se passe en coulisse : fetch manifest → pull image → start container → probe MCP → register → auto-link agents
- Désinstaller : stop container → cascade delete → agents redémarrés
- Upgrade : bouton dans le dashboard Channels/Plugins (pull nouvelle image, recréer container)

---

### `/docs/plugins/building`
**Sources à supprimer après :**
- `nanofleet/docs/plugins/02-plugin-manifest.md` (complet)
- `nanofleet/docs/plugins/03-mcp-router.md` § 3 Tool Call Flow, § 6 Security Model
- `nanofleet/docs/04-mcp-and-plugins.md` § 6 UI Proxying

**Contenu :**
- Format `manifest.json` complet (tous les champs, validation, exemples minimal et full)
- Variables d'env injectées automatiquement (NANO_API_URL, NANO_INTERNAL_TOKEN, NANO_PLUGIN_ID)
- Exigences MCP server : `initialize`, `tools/list`, `tools/call`
- Libs recommandées (Python `mcp`, TypeScript `@modelcontextprotocol/sdk`)
- Flow d'un tool call (agent → plugin → callback API si besoin)
- Plugin avec UI : uiPort, proxy `/api/plugins/:name/ui/*`, `?nf_token=`
- Modèle de sécurité (isolation réseau, agent_id, NANO_INTERNAL_TOKEN)

---

### `/docs/plugins/nanofleet-tasks`
**Sources à supprimer après :**
- `nanofleet-tasks/manifest.json` (toolsDoc + champs)

**Contenu :**
- Description (Kanban task manager)
- Manifest URL d'installation
- Outils MCP : `list_my_tasks`, `get_task`, `update_task_status`, `post_task_result`
- Règles critiques pour les agents (in_progress en premier, post_task_result clôture la tâche)
- Note : monte `/shared` pour les fichiers produits

---

### `/docs/plugins/nanofleet-vault`
**Sources à supprimer après :**
- `nanofleet-vault/manifest.json` (toolsDoc + champs)

**Contenu :**
- Description (secret manager avec accès par agent)
- Manifest URL d'installation
- `VAULT_ENCRYPTION_KEY` : généré automatiquement à l'installation
- Outil MCP : `get_secret(name)` → `{ name, value }`
- Règles critiques : ne jamais logger/afficher les valeurs, appeler seulement quand nécessaire

---

### `/docs/channels/overview`
**Sources à supprimer après :**
- `nanofleet-agent/SPECIFICATIONS.md` § 11 Channels (contrat, multimodal), § 13 Multimodal

**Contenu :**
- Qu'est-ce qu'un canal (adapter séparé du core agent, repo `nanofleet-agent-channels`)
- Contrat : receive → normalize → POST /api/agents/:id/stream → send response
- Canaux disponibles : Telegram, Discord, webhook, CLI
- Gestion multimodal : voix → STT (Whisper/Groq) avant envoi à l'agent, TTS en sortie
- Notifications proactives : l'agent pousse des messages sans que l'utilisateur ait initié

---

### `/docs/channels/telegram`
**Sources à supprimer après :**
- `nanofleet/apps/api/src/routes/channels.ts` (env vars, logique deploy)
- `nanofleet-agent/SPECIFICATIONS.md` § 11 (config channel)

**Contenu :**
- Créer un bot Telegram via @BotFather, récupérer le token
- **Via NanoFleet UI** : Channels → deploy → agentId + botToken + allowedUsers (optionnel) + notificationUserId (optionnel)
- **Via standalone** : ajouter le service `nanofleet-channel-telegram` dans docker-compose.yml avec les variables d'env (AGENT_URL, TELEGRAM_BOT_TOKEN, ALLOWED_USERS, NOTIFICATION_USER_ID)
- Upgrade du canal (depuis le dashboard ou docker pull)

---

### `/docs/ui/overview`
**Sources à supprimer après :**
- `nanofleet/docs/06-ui-and-design-system.md` § 2 Layout, § 6 Core Screens (View 1, View 2)
- `nanofleet/docs/01-architecture-overview.md` § Data Flow

**Contenu :**
- Layout : sidebar gauche persistante + workspace droite avec grid pattern
- Fleet Dashboard : cards agents (nom, statut, coût tokens, logs live)
- Navigation plugins dynamique (sidebar slots injectés par les plugins installés)
- Bouton "Deploy New Agent"

---

### `/docs/ui/agents`
**Sources à supprimer après :**
- `nanofleet/docs/06-ui-and-design-system.md` § View 2 (Workspace), § View 3 (Config Editor)
- `nanofleet/docs/03-docker-orchestration.md` § 3 Lifecycle, § 5 Log Streaming

**Contenu :**
- Déployer un agent : sélectionner/uploader un pack, nommer, choisir le modèle
- Start / Stop / Delete depuis la card
- Logs temps réel (WebSocket sur stdout/stderr du container)
- Éditeur SOUL.md et TOOLS.md intégré (depuis l'interface)
- Workspace fichiers (explorer, uploader, éditer)

---

### `/docs/ui/settings`
**Sources à supprimer après :**
- `nanofleet/docs/02-api-and-auth.md` § 5 Emergency Recovery, § 3 JWT
- `nanofleet/docs/04-mcp-and-plugins.md` § requiredEnvVars

**Contenu :**
- Changer le nom d'utilisateur et le mot de passe
- Reset 2FA : `bun apps/api/scripts/reset-2fa.ts` (accès SSH requis) → Bootstrap Mode au prochain démarrage
- API Keys (vault) : ajouter/supprimer des clés (ANTHROPIC_API_KEY, GITHUB_TOKEN, clés custom...)
- Les clés sont résolues automatiquement au déploiement des agents et plugins (`requiredEnvVars`)

---

## Docs à supprimer après implémentation

```
nanofleet/docs/01-architecture-overview.md
nanofleet/docs/02-api-and-auth.md
nanofleet/docs/03-docker-orchestration.md
nanofleet/docs/04-mcp-and-plugins.md
nanofleet/docs/05-agent-packs.md
nanofleet/docs/06-ui-and-design-system.md
nanofleet/docs/plugins/01-architecture.md
nanofleet/docs/plugins/02-plugin-manifest.md
nanofleet/docs/plugins/03-mcp-router.md
nanofleet/docs/plugins/README.md
nanofleet/SPECIFICATIONS.md
nanofleet-agent/SPECIFICATIONS.md
```

---

## Sidebar structure

```
Getting Started
  ├── Installation (UI)          → /docs/getting-started/ui
  └── Installation (Standalone)  → /docs/getting-started/standalone

Agents
  ├── Overview                   → /docs/agents/overview
  ├── Agent Packs                → /docs/agents/packs
  └── Scheduling                 → /docs/agents/scheduling

Plugins
  ├── Overview                   → /docs/plugins/overview
  ├── Installing a plugin        → /docs/plugins/installing
  ├── Building a plugin          → /docs/plugins/building
  ├── nanofleet-tasks            → /docs/plugins/nanofleet-tasks
  └── nanofleet-vault            → /docs/plugins/nanofleet-vault

Channels
  ├── Overview                   → /docs/channels/overview
  └── Telegram                   → /docs/channels/telegram

NanoFleet UI
  ├── Overview                   → /docs/ui/overview
  ├── Managing agents            → /docs/ui/agents
  └── Settings                   → /docs/ui/settings
```

---

## Implementation steps

1. Create `src/content/docs/` collection with MDX files (one per page)
2. Add `docs` collection to `content.config.ts`
3. Create `DocsLayout.astro` (header + sidebar + prose content area)
4. Create `src/pages/docs/[...slug].astro` dynamic route
5. Update `src/pages/docs/index.astro` (landing with 2 cards)
6. Write MDX content for each page (based on mapping above)
7. Wire up Pagefind (postbuild script + search UI component)
8. Delete source docs from `nanofleet/` and `nanofleet-agent/` repos
