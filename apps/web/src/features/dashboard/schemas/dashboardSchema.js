import { z } from 'zod';
const money = z.number().int().nonnegative();
export const dashboardSchema = z.object({
  trip: z.object({ id: z.string(), name: z.string(), schoolName: z.string(), courseName: z.string(), destination: z.string(), estimatedDepartureDate: z.string().date(), studentCount: z.number().int().positive() }),
  funding: z.object({ targetClp: money, fundedClp: money, percentage: z.number().min(0).max(100) }),
  familyAccount: z.object({ balanceClp: money, nextInstallmentClp: money, nextDueDate: z.string().date(), recentMovements: z.array(z.object({ id: z.string(), title: z.string(), date: z.string().date(), amountClp: money, status: z.string() })) }),
  events: z.array(z.object({ id: z.string(), title: z.string(), date: z.string().date(), place: z.string(), registrationStatus: z.string() })),
  polls: z.array(z.object({ id: z.string(), title: z.string(), closesAt: z.string().date(), participation: z.number().min(0).max(100), status: z.string() })),
  documents: z.array(z.object({ id: z.string(), title: z.string(), studentName: z.string(), dueDate: z.string().date(), status: z.string() })),
  notices: z.array(z.object({ id: z.string(), title: z.string(), category: z.string(), date: z.string().date(), isRead: z.boolean() })),
});
