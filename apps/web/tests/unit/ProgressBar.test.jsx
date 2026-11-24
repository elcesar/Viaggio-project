import { render, screen } from '@testing-library/react';
import { expect, test } from 'vitest';
import { ProgressBar } from '../../src/shared/components/ProgressBar';
test('clamps progress below zero', () => { render(<ProgressBar value={-3} />); expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '0'); });
test('clamps progress above 100', () => { render(<ProgressBar value={120} />); expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '100'); });
