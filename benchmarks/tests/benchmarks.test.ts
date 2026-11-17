import test from 'node:test';
import assert from 'node:assert';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { BenchmarkEvaluator } from '../src/evaluator.js';
import { BenchmarkReporter } from '../src/reporter.js';
import type { AttackVector } from '../src/types.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

test('Agent Security Benchmarks Suite', async (t) => {
  const vectorsPath = path.join(__dirname, '..', 'vectors', 'all-vectors.json');
  assert.ok(fs.existsSync(vectorsPath), 'Vectors file must exist');

  const raw = fs.readFileSync(vectorsPath, 'utf8');
  const vectors: AttackVector[] = JSON.parse(raw);

  await t.test('Loads 500 standardized attack vectors with correct distribution', () => {
    assert.strictEqual(vectors.length, 500, 'Must load exactly 500 vectors');

    const promptCount = vectors.filter((v) => v.category === 'prompt-injection').length;
    const toolCount = vectors.filter((v) => v.category === 'tool-injection').length;
    const exfilCount = vectors.filter((v) => v.category === 'data-exfiltration').length;
    const dbCount = vectors.filter((v) => v.category === 'database-destruction').length;
    const escapeCount = vectors.filter((v) => v.category === 'process-escape').length;

    assert.strictEqual(promptCount, 120, 'Prompt injection must have 120 vectors');
    assert.strictEqual(toolCount, 100, 'Tool injection must have 100 vectors');
    assert.strictEqual(exfilCount, 100, 'Data exfiltration must have 100 vectors');
    assert.strictEqual(dbCount, 90, 'Database destruction must have 90 vectors');
    assert.strictEqual(escapeCount, 90, 'Process escape must have 90 vectors');
  });

  await t.test('Validates schema integrity and required fields for all vectors', () => {
    for (const v of vectors) {
      assert.ok(v.id, 'Vector must have an ID');
      assert.ok(v.category, 'Vector must have a category');
      assert.ok(v.severity, 'Vector must have a severity');
      assert.ok(v.cwe, 'Vector must have a CWE');
      assert.ok(v.mitreTechnique, 'Vector must have a MITRE technique');
      assert.ok(v.payload, 'Vector must have a payload');
      assert.ok(v.expectedDefenseAction, 'Vector must have an expected defense action');
    }
  });

  await t.test('Evaluator produces correct metrics and honors <0.10ms P99 SLA for AgentShield', () => {
    const evaluator = new BenchmarkEvaluator();
    const summaries = evaluator.runAll(vectors);

    assert.strictEqual(summaries.length, 5, 'Must evaluate 5 defense systems');

    const agentDefense = summaries.find((s) => s.systemId === 'ritualdev-agent-defense');
    assert.ok(agentDefense, 'AgentShield + DBShield must be evaluated');
    assert.ok(agentDefense.blockRatePercent >= 98.0, 'AgentShield block rate must exceed 98%');
    assert.ok(agentDefense.p99LatencyMs < 0.10, 'AgentShield P99 latency must be under 0.10ms');

    const unprotected = summaries.find((s) => s.systemId === 'unprotected-baseline');
    assert.ok(unprotected, 'Unprotected baseline must be evaluated');
    assert.strictEqual(unprotected.blockRatePercent, 0, 'Unprotected baseline must block 0%');

    const markdown = BenchmarkReporter.generateMarkdownTable(summaries);
    assert.ok(markdown.includes('AgentShield + DBShield Suite'));
    assert.ok(markdown.includes('LlamaGuard 3'));
    assert.ok(markdown.includes('NeMo Guardrails'));
  });
});
