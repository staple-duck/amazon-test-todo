import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { TodoStatistics } from './TodoStatistics';

interface TodosHeaderProps {
  onCreateClick: () => void;
}

/**
 * Todos section header.
 * Shows statistics and create button.
 */
export function TodosHeader({ onCreateClick }: TodosHeaderProps) {
  return (
    <div className="space-y-4">
      {/* Statistics */}
      <TodoStatistics />

      {/* Create button - prominently displayed */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold tracking-tight">Your Todos</h2>
        <Button onClick={onCreateClick}>
          <Plus className="h-4 w-4 mr-2" />
          New Todo
        </Button>
      </div>
    </div>
  );
}

