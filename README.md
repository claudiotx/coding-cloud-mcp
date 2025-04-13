# Coding-Cloud MCP Server

This project provides a Model Context Protocol (MCP) server allowing AI assistants to securely connect with and retrieve information from Coding-Cloud.com, specifically focusing on searching for and accessing code snippets.

---

# Overview

## What is MCP?

Model Context Protocol (MCP) is an open standard allowing AI systems to securely connect with external tools like Coding-Cloud.com. This server enables AI agents to interact with Coding-Cloud's code snippet database.

## Features

-   **Coding-Cloud Integration**: Tools for AI agents to search and retrieve code snippets.
-   **Production-Ready Architecture**: Clean, layered architecture based on a proven pattern.
-   **Type Safety**: Built with TypeScript.
-   **Testing Framework**: Includes unit and CLI integration tests.
-   **Development Tooling**: Preconfigured ESLint, Prettier, TypeScript.

---

# Getting Started

## Prerequisites

-   **Node.js** (>=18.x): [Download](https://nodejs.org/)
-   **Git**

## Step 1: Clone and Install

```bash
# Clone the repository (Update URL if needed)
git clone https://github.com/<YOUR_GITHUB_USERNAME>/coding-cloud-mcp-server.git
cd coding-cloud-mcp-server

# Install dependencies
npm install
```

## Step 2: Run Development Server

```bash
npm run dev:server
```

Access the MCP Inspector at http://localhost:5173.

## Step 3: Test the Coding-Cloud Tool (CLI)

```bash
# Example: Search for snippets
npm run dev:cli -- search-code-snippets "javascript async await"

# Example: Search with language filter
npm run dev:cli -- search-code-snippets "python dictionary comprehension" --language python

# Example: Get snippet details (if implemented)
# npm run dev:cli -- get-snippet-details <snippet_id>
```

(Adjust commands based on your actual CLI implementation)

# Architecture

Uses a layered architecture: CLI -> Tools -> Controllers -> Services.

```
src/
├── cli/              # Command-line interfaces
├── controllers/      # Business logic
├── services/         # External API interactions (Coding-Cloud API)
├── tools/            # MCP tool definitions (search, get details)
├── types/            # Type definitions
├── utils/            # Shared utilities (logging, errors, formatting)
└── index.ts          # Entry point
```

# Development Guide

## Common Scripts

```bash
# Start dev server (hot-reload & inspector)
npm run dev:server

# Run CLI command in dev mode
npm run dev:cli -- [command] [args]

# Build for production
npm run build

# Start production server
npm run start:server

# Run CLI command in production mode
npm run start:cli -- [command] [args]

# Run all tests
npm test

# Generate test coverage
npm run test:coverage

# Lint code
npm run lint

# Format code
npm run format

# Type check
npm run typecheck
```

## Debugging Tools

### MCP Inspector
Run `npm run dev:server` and open http://localhost:5173. Test tools and view logs in the UI.

### Server Logs
Enable debug logs: `DEBUG=true npm run dev:server` or configure in `~/.mcp/configs.json`.

# License

This project is licensed under the ISC License.

Copyright <YEAR> <OWNER> (<- Update this line)

Permission to use, copy, modify, and/or distribute this software for any purpose with or without fee is hereby granted, provided that the above copyright notice and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.