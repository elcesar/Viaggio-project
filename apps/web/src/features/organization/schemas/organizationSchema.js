import { z } from 'zod';
export const organizationSchema = z.object({
  school: z.object({ id: z.string(), name: z.string().min(1), city: z.string().min(1), status: z.string() }),
  course: z.object({ id: z.string(), name: z.string().min(1), generation: z.string().min(1), studentCount: z.number().int().nonnegative(), guardianCount: z.number().int().nonnegative() }),
  trip: z.object({ id: z.string(), name: z.string().min(1), destination: z.string().min(1), estimatedDepartureDate: z.string().date(), status: z.string() }),
});
