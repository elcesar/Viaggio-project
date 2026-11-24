import { financeMock } from '../../../mocks/financeData';
import { financeSchema } from '../schemas/financeSchema';
export const financeRepository = { async getFinanceOverview() { return financeSchema.parse(structuredClone(financeMock)); } };
