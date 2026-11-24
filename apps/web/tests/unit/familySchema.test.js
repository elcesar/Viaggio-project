import { expect, test } from 'vitest';
import { familyImportRowSchema } from '../../src/features/families/schemas/familySchema';

test('accepts a valid family import row', () => {
  const row = familyImportRowSchema.parse({ familyName: 'Familia Demo', guardianName: 'Apoderado Demo', studentName: 'Estudiante Demo' });
  expect(row.studentName).toBe('Estudiante Demo');
});

test('rejects incomplete family import rows', () => {
  expect(() => familyImportRowSchema.parse({ familyName: '', guardianName: 'A', studentName: '' })).toThrow();
});
