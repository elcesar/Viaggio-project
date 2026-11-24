import { useQuery } from '@tanstack/react-query';
import { dashboardRepository } from '../api/dashboardRepository';
export function useParentDashboard() { return useQuery({ queryKey: ['parent-dashboard'], queryFn: () => dashboardRepository.getParentDashboard() }); }
