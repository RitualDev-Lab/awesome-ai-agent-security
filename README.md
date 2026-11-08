<div align="center">

# Awesome AI Agent Security 🛡️

[![Awesome](https://awesome.re/badge.svg)](https://awesome.re)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](https://github.com/RitualDev-Lab/awesome-ai-agent-security/blob/main/CONTRIBUTING.md)
[![License: CC0-1.0](https://img.shields.io/badge/License-CC0_1.0-lightgrey.svg?style=flat-square)](https://creativecommons.org/publicdomain/zero/1.0/)
[![Maintained by RitualDev Lab](https://img.shields.io/badge/Maintained%20by-RitualDev%20Lab-00F59B?style=flat-square)](https://ritualdev.in)

> A curated list of awesome frameworks, runtime sandboxes, zero-leak redactors, prompt injection defenses, database guardrails, and compliance benchmarks for **Autonomous AI Coding Agents** (Claude Code, Cursor, Windsurf, Devin, OpenHands, Aider, LangGraph, CrewAI).

[Online Playground](https://ritualdev.in/playground) • [Documentation](https://ritualdev.in/docs) • [Trust Center](https://ritualdev.in/trust) • [Contributing](CONTRIBUTING.md)

</div>

---

## 📑 Contents

- [Threat Models & Taxonomies](#threat-models--taxonomies)
- [Runtime Sandboxes & Process Confinement](#runtime-sandboxes--process-confinement)
- [Zero-Leak Secret Redaction & Env Defense](#zero-leak-secret-redaction--env-defense)
- [Database Guardrails & Wire Proxies](#database-guardrails--wire-proxies)
- [Context Compaction & Token Defense](#context-compaction--token-defense)
- [Model Context Protocol (MCP) Hardening](#model-context-protocol-mcp-hardening)
- [Prompt Injection & Indirect Jailbreaks](#prompt-injection--indirect-jailbreaks)
- [Red Teaming & Security Benchmarks](#red-teaming--security-benchmarks)
- [Static Code Analysis for Agent-Generated Code](#static-code-analysis-for-agent-generated-code)
- [Regulatory Frameworks & Compliance](#regulatory-frameworks--compliance)
- [Interactive Playgrounds](#interactive-playgrounds)

---

## 🎯 Threat Models & Taxonomies

- [OWASP Top 10 for Large Language Models (2025)](https://owasp.org/www-project-top-10-for-large-language-model-applications/) - Core classification including LLM01: Prompt Injection, LLM02: Sensitive Information Disclosure, and LLM06: Excessive Agency.
- [MITRE ATLAS™ (Adversarial Threat Landscape for AI Systems)](https://atlas.mitre.org/) - Comprehensive matrix mapping real-world adversarial tactics targeting AI-enabled systems.
- [NIST AI Risk Management Framework (AI 100-1)](https://www.nist.gov/itl/ai-risk-management-framework) - Guidance on managing cybersecurity risks in autonomous decision loops.
- [CWE-77 / CWE-78 (Improper Neutralization of Special Elements used in a Command)](https://cwe.mitre.org/data/definitions/77.html) - Critical root cause when agents generate raw shell instructions (`eval`, `sh -c`).

---

## 📦 Runtime Sandboxes & Process Confinement

*Tools providing kernel-level process isolation, syscall filtering, and filesystem boundaries for autonomous coding agents.*

- [AgentShield](https://github.com/RitualDev-Lab/AgentShield) - Enterprise-grade zero-leak secret defense, Landlock/seccomp kernel sandbox, and pseudo-terminal emulator for autonomous AI coding agents.
- [gVisor](https://github.com/google/gvisor) - Application kernel written in Go that implements a substantial portion of the Linux system call surface for secure container isolation.
- [Firecracker](https://github.com/firecracker-microvm/firecracker) - Minimalist, secure MicroVM hypervisor written in Rust for serverless and agent confinement.
- [nsjail](https://github.com/google/nsjail) - Light-weight process isolation tool using Linux namespaces, cgroups, and seccomp-bpf.
- [Bubblewrap](https://github.com/containers/bubblewrap) - Unprivileged sandboxing tool for Linux utilizing user namespaces to restrict directory hierarchies.
- [E2B](https://github.com/e2b-dev/E2B) - Cloud sandboxing platform built for running untrusted AI-generated code in isolated environments.

---

## 🔒 Zero-Leak Secret Redaction & Env Defense

*Engines preventing agents from reading `/proc/self/environ`, executing `echo $SECRET`, or exfiltrating credentials across LLM boundaries.*

- [AgentShield Secret Redactor](https://github.com/RitualDev-Lab/AgentShield) - High-performance dual-pass zero-leak redactor featuring linear-time token verification, environment variable spoofing, and HMAC-SHA256 audit ledgers.
- [Detect-Secrets](https://github.com/Yelp/detect-secrets) - An enterprise-friendly tool for finding and preventing secrets in codebases using entropy heuristics.
- [TruffleHog](https://github.com/trufflesecurity/trufflehog) - High-speed git secret scanner with 800+ detector types and credential live-verification.
- [Gitleaks](https://github.com/gitleaks/gitleaks) - Fast, lightweight tool for detecting hardcoded secrets like passwords, API keys, and tokens in repositories.

---

## 🗄️ Database Guardrails & Wire Proxies

*Proxy layers that inspect, validate, and intercept autonomous agent SQL queries before they touch production data.*

- [DBShield](https://github.com/RitualDev-Lab/DBShield) - Air-gapped database wire proxy that intercepts unindexed queries, blocks destructive `DROP`/`TRUNCATE` operations, and orchestrates two-man rule Slack approvals.
- [SQLFluff](https://github.com/sqlfluff/sqlfluff) - Dialect-flexible SQL linter and AST security parser validating agent-generated database queries.
- [Prisma Pulse Guard](https://github.com/prisma/prisma) - Safe database interaction wrappers with row-level permission constraints.

---

## ⚡ Context Compaction & Token Defense

*Engines that compress agent context to prevent context-stuffing denial-of-service and minimize prompt exposure.*

- [SkillPrism](https://github.com/RitualDev-Lab/SkillPrism) - JIT progressive skill disclosure and context compaction engine, cutting agent context token overhead by up to 96.7% while preserving instruction fidelity.
- [LLMLingua](https://github.com/microsoft/LLMLingua) - Microsoft's prompt compression toolkit using small language models to remove redundant prompt tokens.
- [Selective-Context](https://github.com/liyucheng09/Selective_Context) - Context reduction method based on self-information evaluation.

---

## 🔌 Model Context Protocol (MCP) Hardening

*Securing Anthropic's Model Context Protocol (MCP) tool servers and client transports.*

- [MCPBuilderKit](https://github.com/RitualDev-Lab/mcp-builder-kit) - Production scaffolding and testing toolkit for Model Context Protocol servers with schema validation and authentication gates.
- [MCP Official SDK](https://github.com/modelcontextprotocol) - Official TypeScript and Python SDKs for Model Context Protocol.
- [MCP Security Guidelines](https://modelcontextprotocol.io/docs/concepts/architecture#security) - Architectural specifications for server-client isolation and authorization scopes.

---

## 🛡️ Prompt Injection & Indirect Jailbreaks

*Gateways and guardrails detecting hostile instructions in user prompts and untrusted web inputs.*

- [NeMo Guardrails](https://github.com/NVIDIA/NeMo-Guardrails) - NVIDIA's open-source toolkit for adding programmable guardrails to LLM conversational systems.
- [Llama Guard 3](https://github.com/meta-llama/llama-recipes) - Meta's fine-tuned model for input/output safety classification.
- [Rebuff](https://github.com/protectai/rebuff) - Multi-layer prompt injection defense incorporating heuristic filtering, LLM detection, and vector canary tokens.
- [Lakera Guard](https://www.lakera.ai/) - Low-latency API layer defending against prompt injection and jailbreaks.

---

## 🧪 Red Teaming & Security Benchmarks

*Frameworks for evaluating and adversarial testing of autonomous agents.*

- [AgentBench](https://github.com/THUDM/AgentBench) - Multi-dimensional benchmark evaluating LLMs as autonomous agents across operating system, database, and web environments.
- [HarmBench](https://github.com/centerforaisafety/HarmBench) - Standardized evaluation framework for automated red teaming of large language models.
- [Garak](https://github.com/leondz/garak) - LLM vulnerability scanner checking for hallucinations, data leaks, prompt injection, and misinformation.
- [PyRIT](https://github.com/Azure/PyRIT) - Python Risk Identification Tool for generative AI by Microsoft.

---

## 🔍 Static Code Analysis for Agent-Generated Code

*AST-level analyzers tailored for identifying insecure patterns in code generated by autonomous agents.*

- [WebSecAuditor](https://github.com/RitualDev-Lab/web-sec-auditor) - AST taint analysis and automated GitHub PR security gate detecting SQL injections, SSRF, and prototype pollution in agent pull requests.
- [Semgrep](https://github.com/semgrep/semgrep) - Fast, lightweight static analysis tool for finding bugs and enforcing code standards.
- [Bandit](https://github.com/PyCQA/bandit) - Security linter for Python code.

---

## 🏛️ Regulatory Frameworks & Compliance

- [India DPDP Act 2023 Compliance Controls](https://ritualdev.in/privacy/dpdp) - Data fiduciary obligations, consent architectures, and cross-border transfer boundaries for AI agents.
- [EU AI Act (Regulation 2024/1689)](https://artificialintelligenceact.eu/) - Risk classification hierarchy for high-risk and general-purpose AI models.
- [SOC 2 Type II AI Controls](https://ritualdev.in/trust) - Trust services criteria mapped to automated agent execution logs and audit ledgers.

---

## 🎮 Interactive Playgrounds

- [RitualDev Adversarial Playground](https://ritualdev.in/playground) - Live, in-browser interactive terminal to test hostile agent payloads (AWS credential dumps, `/proc/self/environ` reads, ReDoS attacks) and observe real-time zero-leak redaction.

---

## 🤝 Contributing

Contributions are welcome! Please read the [Contributing Guidelines](CONTRIBUTING.md) before submitting a pull request.

---

## 🏷️ Embed Verifiable Badges in Your Repository

Add verifiable cryptographic defense, monetization, and catalog badges to your agent or tool `README.md`:

#### 1. Runtime Sandboxing & Egress Defense
```markdown
[![Secured by AgentShield](https://ritualdev.in/badge/secured-by-agentshield.svg)](https://ritualdev.in/agentshield)
```
[![Secured by AgentShield](https://ritualdev.in/badge/secured-by-agentshield.svg)](https://ritualdev.in/agentshield)

#### 2. Model Context Protocol (MCP) Monetization
```markdown
[![Monetized with MCP](https://ritualdev.in/badge/monetized-with-mcp.svg)](https://ritualdev.in/mcp-builder)
```
[![Monetized with MCP](https://ritualdev.in/badge/monetized-with-mcp.svg)](https://ritualdev.in/mcp-builder)

#### 3. DevShelf Programmatic Registry A+ Verification
```markdown
[![Verified by DevShelf](https://ritualdev.in/badge/verified-by-devshelf.svg)](https://ritualdev.in/devshelf)
```
[![Verified by DevShelf](https://ritualdev.in/badge/verified-by-devshelf.svg)](https://ritualdev.in/devshelf)

#### 4. Featured on Awesome AI Agent Security
```markdown
[![Featured on Awesome AI Agent Security](https://img.shields.io/badge/Awesome-AI%20Agent%20Security-00F59B?style=flat-square&logo=shield)](https://github.com/RitualDev-Lab/awesome-ai-agent-security)
```
[![Featured on Awesome AI Agent Security](https://img.shields.io/badge/Awesome-AI%20Agent%20Security-00F59B?style=flat-square&logo=shield)](https://github.com/RitualDev-Lab/awesome-ai-agent-security)

---

## 📄 License

[![CC0](https://licensebuttons.net/p/zero/1.0/88x31.png)](https://creativecommons.org/publicdomain/zero/1.0/)

To the extent possible under law, [RitualDev Lab](https://ritualdev.in) has waived all copyright and related or neighboring rights to this work.
