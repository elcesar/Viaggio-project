import { z } from 'zod';
const clp = z.number().int();
export const financeSchema = z.object({
  budget: z.object({ targetClp: clp.nonnegative(), committedClp: clp.nonnegative(), approvedExpensesClp: clp.nonnegative(), availableClp: clp.nonnegative() }),
  installments: z.array(z.object({ id: z.string(), label: z.string(), dueDate: z.string().date(), amountClp: clp.positive(), status: z.string() })),
  ledger: z.array(z.object({ id: z.string(), type: z.enum(['cuota', 'pago_informado', 'pago_conciliado', 'credito_beneficio', 'ajuste', 'egreso', 'reversa', 'devolucion']), occurredAt: z.string().date(), description: z.string(), amountClp: clp, immutable: z.boolean(), idempotencyKey: z.string().min(1), reversalOf: z.string().optional() })),
});
