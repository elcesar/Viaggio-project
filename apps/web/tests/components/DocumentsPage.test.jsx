import { render, screen, fireEvent } from '@testing-library/react';
import { expect, test } from 'vitest';
import { DocumentsPage } from '../../src/features/documents/pages/DocumentsPage';

test('filters and searches demonstration documents', () => {
  render(<DocumentsPage />);
  fireEvent.click(screen.getByRole('button', { name: 'Pendiente' }));
  expect(screen.getByText('Autorización de viaje')).toBeInTheDocument();
  expect(screen.queryByText('Copia de identificación')).not.toBeInTheDocument();
  fireEvent.change(screen.getByRole('textbox', { name: 'Buscar documentos' }), { target: { value: 'no existe' } });
  expect(screen.getByText('No encontramos documentos')).toBeInTheDocument();
});
