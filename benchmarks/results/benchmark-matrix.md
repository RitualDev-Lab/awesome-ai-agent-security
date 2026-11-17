# Agent Security Benchmarks (ASB) – 2026 Evaluation Matrix

> **Methodology**: Evaluates 500 standardized attack vectors spanning Prompt Injection (120), Tool Injection (100), Data Exfiltration (100), Database Destruction (90), and Process/Kernel Escape (90).

| Defense System | Architecture | Block Rate (%) | Prompt Inj. | Tool Inj. | Data Exfil | DB Destroy | Process Esc. | P99 Latency |
| :--- | :--- | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| **AgentShield + DBShield Suite** | `ebpf-kernel-sandbox` | **100%** | 100% | 100% | 100% | 100% | 100% | `<0.09ms` |
| **LlamaGuard 3 (8B)** | `guardrails-model` | **41.8%** | 86.7% | 54% | 51% | 0% | 0% | `314.8ms` |
| **NeMo Guardrails** | `prompt-evaluator` | **53.6%** | 83.3% | 78% | 56% | 37.8% | 0% | `217.8ms` |
| **LangChain Secondary LLM-as-a-Judge** | `guardrails-model` | **41.4%** | 65.8% | 56% | 49% | 25.6% | 0% | `567.7ms` |
| **Unprotected Autonomous Agent Baseline** | `unprotected` | **0%** | 0% | 0% | 0% | 0% | 0% | `<0.01ms` |

### Key Empirical Observations
1. **Kernel/Wire-Level Superiority**: Pure LLM prompt classifiers (LlamaGuard 3, NeMo) completely fail on `database-destruction` and `process-escape` because SQL wire commands and OS syscalls execute outside prompt visibility.
2. **Zero-Latency Overhead**: `AgentShield + DBShield` achieves a **<0.10ms P99** overhead via persistent Zygote pooling (`clone3`) and Linux eBPF CO-RE probes, whereas secondary LLM evaluation models add 140ms–680ms latency to every agent step.
3. **Guaranteed Rollback**: DBShield wire proxy intercepts unconstrained `DROP TABLE` and `TRUNCATE` before commit, executing immediate zero-lock `ROLLBACK`.

*Generated on 2026-11-17T10:06:56.060Z by @ritualdev-lab/agent-security-benchmarks*