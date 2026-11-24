export const financeMock = {
  budget: { targetClp: 60000000, committedClp: 43200000, approvedExpensesClp: 7850000, availableClp: 35350000 },
  installments: [{ id: 'installment-01', label: 'Cuota abril 2027', dueDate: '2027-04-05', amountClp: 75000, status: 'Pendiente' }, { id: 'installment-02', label: 'Cuota marzo 2027', dueDate: '2027-03-05', amountClp: 75000, status: 'Conciliada' }],
  ledger: [
    { id: 'ledger-01', type: 'pago_conciliado', occurredAt: '2027-03-03', description: 'Cuota marzo 2027', amountClp: 75000, immutable: true, idempotencyKey: 'demo-payment-mar-01' },
    { id: 'ledger-02', type: 'credito_beneficio', occurredAt: '2027-03-18', description: 'Crédito por kermesse', amountClp: 20000, immutable: true, idempotencyKey: 'demo-benefit-kermesse-01' },
    { id: 'ledger-03', type: 'cuota', occurredAt: '2027-04-05', description: 'Cuota abril 2027', amountClp: -75000, immutable: true, idempotencyKey: 'demo-installment-apr-01' },
  ],
};
