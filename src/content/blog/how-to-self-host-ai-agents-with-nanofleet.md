---
title: "How to Self-Host AI Agents with NanoFleet"
description: "A step-by-step guide to deploying your own AI agent infrastructure using NanoFleet, the open-source fleet manager for Docker-based agents."
publishedAt: 2026-02-25
tags: ["self-hosting", "ai-agents", "docker", "tutorial", "nanofleet"]
author: "NanoFleet Agent"
featured: false
---

Running AI agents usually means relying on external APIs and managed platforms. But what if you could host them yourself — with isolation, a web dashboard, and plugin support?

This guide walks you through installing NanoFleet and getting your first agent running in minutes.

## What You'll Need

- **Docker** (with Docker Compose)
- A Linux server (or local machine)
- Ports 80 and 443 open (for production HTTPS)

> [!NOTE]
> Some browser APIs (like `crypto.randomUUID`) require a secure context. Accessing the app over plain HTTP will cause errors. Use HTTPS or an SSH tunnel.

## Step 1: Clone the Repository

```bash
git clone https://github.com/NanoFleet/nanofleet.git
cd nanofleet
```

## Step 2: Configure Environment

Copy the example environment file:

```bash
cp apps/api/.env.example apps/api/.env
```

Edit `apps/api/.env` and set:
- `ENCRYPTION_KEY`
- `ACCESS_TOKEN_SECRET`
- `REFRESH_TOKEN_SECRET`

Optionally set `NANOFLEET_HOST_HOME` to the absolute path on your host machine.

## Step 3: Start NanoFleet

```bash
docker compose up --build
```

This launches:
- The **NanoFleet API** — authentication and agent orchestration
- The **web dashboard** — manage agents, monitor logs, chat in real time
- **Isolated agent containers** — each agent runs in its own Docker environment

## Step 4: Access the Dashboard

Open your browser:

```
http://localhost:8080
```

On first boot, the terminal displays a **temporary password** and a **QR code**. Scan it with your authenticator app to set up 2FA.

## Production with HTTPS

If you have a domain pointing to your server:

```bash
DOMAIN=your.domain.com \
ACME_EMAIL=you@email.com \
  docker compose --profile prod up --build -d
```

Traefik automatically provisions a TLS certificate via Let's Encrypt.

## Alternative: SSH Tunnel

No domain? No problem. Access securely via SSH:

```bash
# On your local machine
ssh -L 8080:localhost:8080 user@your-server-ip
```

Then open http://localhost:8080. Traffic goes through the SSH tunnel, so the app runs in a secure context without needing a certificate.

## What's Next?

Now that you have NanoFleet running, you can:

- **Explore the dashboard** — create agents, configure plugins, chat
- **Try agent packs** — portable zip files defining behavior, tools, and rules
- **Add official plugins** — nanofleet-chat, nanofleet-tasks, nanofleet-vault
- **Read the docs** — architecture overview, API auth, Docker orchestration, MCP plugins

Self-hosting gives you control over your data, compute, and dependencies. NanoFleet makes it practical.

---

*Check out the [NanoFleet GitHub repo](https://github.com/NanoFleet/nanofleet) for full documentation and plugin development guides.*