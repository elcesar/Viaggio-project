import { parentDashboardMock } from '../../../mocks/dashboardData';
import { dashboardSchema } from '../schemas/dashboardSchema';

export const dashboardRepository = {
  async getParentDashboard() {
    // Replace this boundary with GET /api/v1/me/dashboard in a later PR.
    const response = structuredClone(parentDashboardMock);
    return dashboardSchema.parse(response);
  },
};
