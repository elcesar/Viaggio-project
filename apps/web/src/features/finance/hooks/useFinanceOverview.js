import { useQuery } from '@tanstack/react-query';
import { financeRepository } from '../api/financeRepository';
export function useFinanceOverview() { return useQuery({ queryKey: ['finance-overview'], queryFn: () => financeRepository.getFinanceOverview() }); }
