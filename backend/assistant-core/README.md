# assistant-core

A reusable TypeScript engine for deploying AI assistants with structured output, lead capture, and human handoff detection.

## How it works

1. Copy `client-template/`
2. Edit `config.ts` with client branding and prompts
3. Add client data to `data/`
4. Deploy

## Structure

```text
assistant-core/     — engine, never edited per client
client-template/    — copy this per client
```

## Quick start

```bash
npm install
cp -r client-template/ my-client/
cd my-client && cp .env.example .env
# add your API key to .env
npm run dev
```

## Switching LLM providers

Swap the provider in your client entry point:

```ts
import { createOpenAIProvider } from "../assistant-core/index.js";
import { createGeminiProvider } from "../assistant-core/index.js";
import { createAnthropicProvider } from "../assistant-core/index.js";
```

All three use raw `fetch` — no SDK dependencies.

## Core concepts

- **Assistant** — orchestrates the chat loop, data retrieval, and LLM calls
- **DataConnector** — pluggable interface for injecting domain knowledge
- **JsonConnector** — built-in connector for in-memory JSON data with keyword search
- **Lead capture** — extracts structured contact data from conversations
- **Handoff detection** — triggers escalation when configured phrases appear in replies

## Running tests

```bash
npm test
```
