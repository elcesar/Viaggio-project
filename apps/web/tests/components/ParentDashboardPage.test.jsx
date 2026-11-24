import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { expect, test } from 'vitest';
import { ParentDashboardPage } from '../../src/features/dashboard';
function renderPage() { return render(<MemoryRouter><QueryClientProvider client={new QueryClient({ defaultOptions: { queries: { retry: false } } })}><ParentDashboardPage /></QueryClientProvider></MemoryRouter>); }
test('renders the parent dashboard content', async () => { renderPage(); expect(await screen.findByText('Gira Italia 2028')).toBeInTheDocument(); expect(screen.getByText('Bingo solidario')).toBeInTheDocument(); expect(screen.getByText('Autorización de viaje')).toBeInTheDocument(); });
