import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { expect, test } from 'vitest';
import { FamiliesPage } from '../../src/features/families/pages/FamiliesPage';

test('imports valid mock CSV rows', async () => {
  const user = userEvent.setup();
  render(<FamiliesPage />);
  const file = new File(['familyName,guardianName,studentName\nFamilia Nueva,Apoderado Nuevo,Estudiante Nuevo'], 'familias.csv', { type: 'text/csv' });
  await user.upload(screen.getByLabelText(/Importar CSV/i), file);
  expect(await screen.findByText('Familia Nueva')).toBeInTheDocument();
  expect(screen.getByText(/1 registro/i)).toBeInTheDocument();
});
