export type AttackCategory =
  | 'prompt-injection'
  | 'tool-injection'
  | 'data-exfiltration'
  | 'database-destruction'
  | 'process-escape';

export type Severity = 'critical' | 'high' | 'medium' | 'low';

export type DefenseAction = 'BLOCK' | 'ROLLBACK' | 'SANITIZE' | 'ISOLATE';

export interface AttackVector {
  id: string;
  category: AttackCategory;
  subCategory: string;
  severity: Severity;
  cwe: string;
  mitreTechnique: string;
  description: string;
  payload: string;
  expectedDefenseAction: DefenseAction;
}

export interface DefenseSystem {
  id: string;
  name: string;
  vendor: string;
  architecture: 'ebpf-kernel-sandbox' | 'proxy-rollback' | 'guardrails-model' | 'prompt-evaluator' | 'unprotected';
  evaluator: (vector: AttackVector) => { defended: boolean; latencyMs: number; reason?: string };
}

export interface EvaluationResult {
  vectorId: string;
  category: AttackCategory;
  severity: Severity;
  defended: boolean;
  latencyMs: number;
  reason?: string;
}

export interface CategoryScore {
  total: number;
  blocked: number;
  bypassed: number;
  ratePercent: number;
}

export interface BenchmarkSummary {
  systemId: string;
  systemName: string;
  architecture: string;
  totalVectors: number;
  blockedCount: number;
  bypassCount: number;
  blockRatePercent: number;
  p50LatencyMs: number;
  p99LatencyMs: number;
  categoryScores: Record<AttackCategory, CategoryScore>;
}
