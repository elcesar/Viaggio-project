import { render, screen } from '@testing-library/react';
import { expect, test } from 'vitest';
import { StatusBadge } from '../../src/shared/components/StatusBadge';
test('renders a status label', () => { render(<StatusBadge status="Pendiente" />); expect(screen.getByText('Pendiente')).toBeInTheDocument(); });
