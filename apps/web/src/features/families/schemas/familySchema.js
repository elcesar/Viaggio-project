import { z } from 'zod';
export const familySchema = z.object({
  id: z.string(), name: z.string().min(2), primaryGuardian: z.string().min(2), status: z.string(), students: z.array(z.object({ id: z.string(), name: z.string().min(2), status: z.string() })).min(1),
});
export const familyImportRowSchema = z.object({
  familyName: z.string().trim().min(2, 'Familia requerida'),
  guardianName: z.string().trim().min(2, 'Apoderado requerido'),
  studentName: z.string().trim().min(2, 'Estudiante requerido'),
});
