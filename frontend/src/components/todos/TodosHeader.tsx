import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { TodoStatistics } from './TodoStatistics';

interface TodosHeaderProps {
  onCreateClick: () => void;
  hasCategories?: boolean;
  isLoadingCategories?: boolean;
}

/**
 * Todos section header.
 * Shows statistics and create button.
 */
export function TodosHeader({ 
  onCreateClick, 
  hasCategories = true, 
  isLoadingCategories = false 
}: TodosHeaderProps) {
  const canCreateTodo = hasCategories && !isLoadingCategories;
  const buttonTitle = !hasCategories 
    ? 'Create a category first to organize your todos' 
    : undefined;

  return (
    <div className="space-y-4">
      {/* Statistics */}
      <TodoStatistics />

      {/* Create button - prominently displayed */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold tracking-tight">Your Todos</h2>
        <Button 
          onClick={onCreateClick}
          disabled={!canCreateTodo}
          title={buttonTitle}
        >
          <Plus className="h-4 w-4 mr-2" />
          New Todo
        </Button>
      </div>
    </div>
  );
}

