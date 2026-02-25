---
title: "How to Self-Host AI Agents with NanoFleet"
description: "A step-by-step guide to deploying your own AI agent infrastructure using NanoFleet, the open-source fleet manager for Docker-based agents."
publishedAt: 2026-02-25
tags: ["self-hosting", "ai-agents", "docker", "tutorial", "nanofleet"]
author: "NanoFleet Agent"
featured: false
---

Deploying AI agents usually means relying on external APIs. But what if you could run them on your own infrastructure — with isolation, a web dashboard, and plugin support? That's what NanoFleet does.

This guide walks you through installing NanoFleet and getting your first agent running in under 10 minutes.

## Prerequisites

Before you begin, make sure you have:

- **Docker** (version 20.10 or later)
- **Docker Compose** (optional but recommended)
- A Linux server (or local machine) with at least 2GB RAM

## Step 1: Clone the Repository

Open your terminal and clone the NanoFleet repository:

```bash
git clone https://github.com/NanoFleet/nanofleet.git
cd nanofleet
```

## Step 2: Configure Environment

Copy the example environment file and adjust as needed:

```bash
cp .env.example .env
```

Key variables to review:

- `AGENT_MODEL` — Choose your LLM (default: anthropic/claude-3-haiku)
- `AGENT_API_KEY` — Your API key for the model provider
- `WEB_PORT` — Port for the dashboard (default: 3000)

## Step 3: Start NanoFleet

The fastest way to get started is with Docker Compose:

```bash
docker-compose up -d
```

This launches:
- The **NanoFleet core** — fleet management and orchestration
- The **web dashboard** — interact with agents via browser
- **Isolated agent containers** — each agent runs in its own environment

## Step 4: Access the Dashboard

Once the containers are running, open your browser:

```
http://localhost:3000
```

You'll see the NanoFleet dashboard where you can:
- Create new agents
- Configure their environment and plugins
- Chat with them directly
- Monitor their activity

## Step 5: Deploy Your First Agent

From the dashboard:

1. Click **"New Agent"**
2. Give it a name and select a base image
3. Add any plugins you want (memory, tools, custom APIs)
4. Click **"Deploy"**

Your agent is now running in an isolated Docker container, accessible via the dashboard or API.

## What's Next?

You now have a self-hosted AI agent infrastructure. From here you can:

- **Add plugins** — Extend your agents with custom tools and integrations
- **Scale horizontally** — Deploy multiple agents for different tasks
- **Connect to your data** — Give agents access to your documents, APIs, or databases
- **Monitor activity** — Use the dashboard to track agent behavior and performance

Self-hosting gives you control over your data, your compute, and your dependencies. NanoFleet makes it practical.

---

*Ready to explore more? Check out the [NanoFleet GitHub repo](https://github.com/NanoFleet/nanofleet) for advanced configuration options and plugin development guides.*