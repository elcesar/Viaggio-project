import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen } from '@testing-library/react';
import { expect, test } from 'vitest';
import { FinancePage } from '../../src/features/finance/pages/FinancePage';
test('shows budget and immutable ledger entries', async () => { render(<QueryClientProvider client={new QueryClient({ defaultOptions: { queries: { retry: false } } })}><FinancePage /></QueryClientProvider>); expect(await screen.findByText('Presupuesto y trazabilidad')).toBeInTheDocument(); expect(screen.getByText('Libro de movimientos')).toBeInTheDocument(); expect(screen.getByText('Crédito por kermesse')).toBeInTheDocument(); });
