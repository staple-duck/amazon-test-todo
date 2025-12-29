import { CheckCircle2, Circle, ListTodo } from 'lucide-react';
import { useGetTodoStatisticsQuery } from '@/store/api/todosApi';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

/**
 * Todo statistics component.
 * Shows counts of total, active, and completed todos.
 */
export function TodoStatistics() {
  const { data: stats, isLoading } = useGetTodoStatisticsQuery();

  if (isLoading) {
    return (
      <div className="grid gap-4 md:grid-cols-3">
        <Skeleton className="h-24" />
        <Skeleton className="h-24" />
        <Skeleton className="h-24" />
      </div>
    );
  }

  if (!stats) return null;

  const statCards = [
    {
      title: 'Total Todos',
      value: stats.total,
      icon: ListTodo,
      color: 'text-blue-500',
    },
    {
      title: 'Active',
      value: stats.active,
      icon: Circle,
      color: 'text-orange-500',
    },
    {
      title: 'Completed',
      value: stats.completed,
      icon: CheckCircle2,
      color: 'text-green-500',
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-3">
      {statCards.map((stat) => {
        const Icon = stat.icon;
        return (
          <Card key={stat.title}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    {stat.title}
                  </p>
                  <p className="text-3xl font-bold mt-2">{stat.value}</p>
                </div>
                <Icon className={`h-8 w-8 ${stat.color}`} />
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}

