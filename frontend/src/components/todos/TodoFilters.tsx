import { ArrowDownAZ, ArrowUpAZ, Calendar, Clock } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  selectTodoFilters,
  setStatusFilter,
  setCategoryFilter,
  setSorting,
  resetFilters,
} from '@/store/slices/uiSlice';
import { useGetCategoriesQuery } from '@/store/api/categoriesApi';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';

/**
 * Todo filters component.
 * Controls for filtering and sorting todos.
 * Syncs with Redux state.
 */
export function TodoFilters() {
  const dispatch = useAppDispatch();
  const filters = useAppSelector(selectTodoFilters);
  const { data: categories } = useGetCategoriesQuery();

  const handleStatusChange = (status: 'all' | 'active' | 'completed') => {
    dispatch(setStatusFilter(status));
  };

  const handleCategoryChange = (categoryId: string) => {
    dispatch(setCategoryFilter(categoryId === 'all' ? null : categoryId));
  };

  const handleSortChange = (sortBy: 'dueDate' | 'createdAt') => {
    dispatch(setSorting({ sortBy, order: filters.order }));
  };

  const toggleSortOrder = () => {
    dispatch(
      setSorting({
        sortBy: filters.sortBy,
        order: filters.order === 'asc' ? 'desc' : 'asc',
      })
    );
  };

  const handleReset = () => {
    dispatch(resetFilters());
  };

  const hasActiveFilters =
    filters.status !== 'all' ||
    filters.categoryId !== null ||
    filters.sortBy !== 'createdAt' ||
    filters.order !== 'desc';

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="space-y-4">
          {/* Status filter */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Status</label>
            <Tabs value={filters.status} onValueChange={handleStatusChange as any}>
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="active">Active</TabsTrigger>
                <TabsTrigger value="completed">Completed</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          {/* Category filter */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Category</label>
            <Select
              value={filters.categoryId || 'all'}
              onValueChange={handleCategoryChange}
            >
              <SelectTrigger>
                <SelectValue placeholder="All categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories?.map((category) => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Sort controls */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Sort By</label>
            <div className="flex gap-2">
              <Select value={filters.sortBy} onValueChange={handleSortChange as any}>
                <SelectTrigger className="flex-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="createdAt">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      Created Date
                    </div>
                  </SelectItem>
                  <SelectItem value="dueDate">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      Due Date
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>

              {/* Sort order toggle */}
              <Button
                variant="outline"
                size="icon"
                onClick={toggleSortOrder}
                title={filters.order === 'asc' ? 'Ascending' : 'Descending'}
              >
                {filters.order === 'asc' ? (
                  <ArrowUpAZ className="h-4 w-4" />
                ) : (
                  <ArrowDownAZ className="h-4 w-4" />
                )}
                <span className="sr-only">Toggle sort order</span>
              </Button>
            </div>
          </div>

          {/* Reset button */}
          {hasActiveFilters && (
            <Button
              variant="outline"
              size="sm"
              onClick={handleReset}
              className="w-full"
            >
              Reset Filters
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

