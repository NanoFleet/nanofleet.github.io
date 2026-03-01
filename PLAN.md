# NanoFleet Docs — Plan

## Tech choices

- **Format**: MDX via Astro content collections (`src/content/docs/`)
- **Search**: Pagefind (already in devDependencies) — indexes after `astro build`, works in production
- **Layout**: New `DocsLayout.astro` with persistent left sidebar + main content area

---

## URL structure

```
/docs                          ← Landing page (2 cards: UI install / standalone install)
/docs/getting-started/ui       ← Installation with NanoFleet UI (multi-agent dashboard)
/docs/getting-started/standalone  ← Standalone single-agent (docker run / compose + upgrade)

/docs/agents/overview          ← What is an agent, architecture, specs
/docs/agents/packs             ← Agent Packs: SOUL.md, STYLE.md, AGENTS.md, MEMORY.md, cron.json
/docs/agents/scheduling        ← HEARTBEAT.md + cron.json scheduled tasks

/docs/plugins/overview         ← Plugin system overview (Docker container + MCP server)
/docs/plugins/installing       ← How to install a plugin via manifest URL
/docs/plugins/building         ← How to build a plugin (manifest.json, Dockerfile, MCP server)
/docs/plugins/nanofleet-tasks  ← Official plugin: Tasks
/docs/plugins/nanofleet-vault  ← Official plugin: Vault

/docs/channels/overview        ← What are channels (communication adapters)
/docs/channels/telegram        ← Telegram channel: setup, bot token, allowed users

/docs/ui/overview              ← NanoFleet UI: fleet dashboard, sidebar, layout
/docs/ui/agents                ← Managing agents from the UI
/docs/ui/settings              ← Settings: password, TOTP, API keys
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

## /docs landing page

Two cards:
- **NanoFleet UI** — "Full fleet manager with web dashboard. Deploy and manage multiple agents, install plugins, and configure channels from a single interface."  → /docs/getting-started/ui
- **Standalone agent** — "Run a single agent with Docker. No dashboard, minimal setup, full control." → /docs/getting-started/standalone

---

## Implementation steps

1. Create `src/content/docs/` collection with MDX files
2. Add `docs` collection to `content.config.ts`
3. Create `DocsLayout.astro` (header + sidebar + content)
4. Create `src/pages/docs/[...slug].astro` dynamic route
5. Update `src/pages/docs/index.astro` (landing with 2 cards)
6. Write content for each page (based on existing docs + SPECIFICATIONS.md)
7. Wire up Pagefind (build script + search component on /docs)
