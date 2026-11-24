import { useState } from 'react';
import { PageContainer } from '../../../shared/layouts/PageContainer';
import { familiesMock } from '../../../mocks/organizationData';
import { FamilyImport } from '../components/FamilyImport';
import { FamilyTable } from '../components/FamilyTable';
export function FamiliesPage() { const [families, setFamilies] = useState(familiesMock); function importFamilies(rows) { const additions = rows.map((row, index) => ({ id: `import-${Date.now()}-${index}`, name: row.familyName, primaryGuardian: row.guardianName, students: [{ id: `student-import-${index}`, name: row.studentName, status: 'Pendiente de invitación' }], status: 'Pendiente' })); setFamilies((current) => [...additions, ...current]); } return <PageContainer><header className="page-heading"><div><p className="eyebrow">Administración de gira</p><h1>Familias y estudiantes</h1><p>La nómina se valida localmente con datos ficticios. La importación productiva requerirá permisos, auditoría y cifrado.</p></div></header><FamilyImport onImport={importFamilies} /><FamilyTable families={families} /></PageContainer>; }
