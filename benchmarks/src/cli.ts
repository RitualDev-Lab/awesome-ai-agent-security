import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { BenchmarkEvaluator } from './evaluator.js';
import { BenchmarkReporter } from './reporter.js';
import type { AttackVector } from './types.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function runBenchmarks() {
  console.log('========================================================================');
  console.log('    AGENT SECURITY BENCHMARKS (ASB) – 2026 RUNNER');
  console.log('    Testing 500 Vectors across Prompt, Tool, Exfil, DB & Process Escape');
  console.log('========================================================================\n');

  const vectorsPath = path.join(__dirname, '..', 'vectors', 'all-vectors.json');
  if (!fs.existsSync(vectorsPath)) {
    console.error(`Error: Vectors file not found at: ${vectorsPath}`);
    process.exit(1);
  }

  const raw = fs.readFileSync(vectorsPath, 'utf8');
  const vectors: AttackVector[] = JSON.parse(raw);

  console.log(`[ASB] Loaded ${vectors.length} attack vectors across 5 categories.`);
  const evaluator = new BenchmarkEvaluator();
  const summaries = evaluator.runAll(vectors);

  console.log('\n[ASB] Evaluation complete! Generating benchmark matrix...\n');
  const markdown = BenchmarkReporter.generateMarkdownTable(summaries);
  console.log(markdown);

  const resultsDir = path.join(__dirname, '..', 'results');
  if (!fs.existsSync(resultsDir)) {
    fs.mkdirSync(resultsDir, { recursive: true });
  }

  fs.writeFileSync(path.join(resultsDir, 'benchmark-matrix.md'), markdown);
  fs.writeFileSync(path.join(resultsDir, 'benchmark-matrix.json'), JSON.stringify(summaries, null, 2));

  console.log(`\n[ASB] Benchmark results saved to:`);
  console.log(`  - ${path.join(resultsDir, 'benchmark-matrix.md')}`);
  console.log(`  - ${path.join(resultsDir, 'benchmark-matrix.json')}`);

  return summaries;
}

if (process.argv[1] && process.argv[1].endsWith('cli.ts') || (process.argv[1] && process.argv[1].endsWith('cli.js'))) {
  runBenchmarks();
}
