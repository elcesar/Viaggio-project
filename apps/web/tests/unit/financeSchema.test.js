import { expect, test } from 'vitest';
import { financeSchema } from '../../src/features/finance/schemas/financeSchema';
import { financeMock } from '../../src/mocks/financeData';
test('validates financial values as integer CLP', () => expect(financeSchema.parse(financeMock).ledger).toHaveLength(3));
test('rejects a ledger entry without idempotency key', () => { const invalid = structuredClone(financeMock); invalid.ledger[0].idempotencyKey = ''; expect(() => financeSchema.parse(invalid)).toThrow(); });
