import { ActionCard } from './ActionCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { mockData } from '@/lib/mockData';

export function KanbanBoard() {
  const { pendingActions } = mockData;

  const columns = [
    { id: 'todo', title: 'To Do', actions: pendingActions.filter(a => a.status === 'pending') },
    { id: 'in-progress', title: 'In Progress', actions: pendingActions.filter(a => a.status === 'in-progress') },
    { id: 'done', title: 'Done', actions: pendingActions.filter(a => a.status === 'completed') },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {columns.map((column) => (
        <Card key={column.id} className="glass-effect-dark border-border">
          <CardHeader>
            <CardTitle>{column.title}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {column.actions.map((action) => (
              <ActionCard
                key={action.id}
                title={action.title}
                description={action.description}
                status={action.status}
                time={action.time}
                type={action.type}
              />
            ))}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}