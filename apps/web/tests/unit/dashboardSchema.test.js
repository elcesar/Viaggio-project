import { expect, test } from 'vitest';
import { dashboardSchema } from '../../src/features/dashboard/schemas/dashboardSchema';
import { parentDashboardMock } from '../../src/mocks/dashboardData';
test('accepts the mock dashboard contract', () => expect(dashboardSchema.parse(parentDashboardMock).trip.name).toBe('Gira Italia 2028'));
test('rejects incomplete contracts', () => expect(() => dashboardSchema.parse({})).toThrow());
