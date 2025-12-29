import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';

/**
 * UI state slice.
 * Manages UI-specific state like filters, sorting, and view preferences.
 * This state is NOT persisted to the backend - it's purely client-side.
 */
interface UiState {
  // Todo filters
  todoFilters: {
    status: 'all' | 'active' | 'completed';
    categoryId: string | null;
    sortBy: 'dueDate' | 'createdAt';
    order: 'asc' | 'desc';
  };
  
  // View preferences
  viewMode: 'list' | 'grid';
  
  // Dialogs state
  dialogs: {
    createCategory: boolean;
    editCategory: boolean;
    createTodo: boolean;
    editTodo: boolean;
  };
}

const initialState: UiState = {
  todoFilters: {
    status: 'all',
    categoryId: null,
    sortBy: 'createdAt',
    order: 'desc',
  },
  viewMode: 'list',
  dialogs: {
    createCategory: false,
    editCategory: false,
    createTodo: false,
    editTodo: false,
  },
};

/**
 * UI slice with actions for managing UI state.
 */
export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    /**
     * Set todo status filter (all/active/completed).
     */
    setStatusFilter: (state, action: PayloadAction<'all' | 'active' | 'completed'>) => {
      state.todoFilters.status = action.payload;
    },

    /**
     * Set category filter.
     */
    setCategoryFilter: (state, action: PayloadAction<string | null>) => {
      state.todoFilters.categoryId = action.payload;
    },

    /**
     * Set sorting options.
     */
    setSorting: (
      state,
      action: PayloadAction<{ sortBy: 'dueDate' | 'createdAt'; order: 'asc' | 'desc' }>
    ) => {
      state.todoFilters.sortBy = action.payload.sortBy;
      state.todoFilters.order = action.payload.order;
    },

    /**
     * Reset all filters to default.
     */
    resetFilters: (state) => {
      state.todoFilters = initialState.todoFilters;
    },

    /**
     * Toggle view mode between list and grid.
     */
    toggleViewMode: (state) => {
      state.viewMode = state.viewMode === 'list' ? 'grid' : 'list';
    },

    /**
     * Open a specific dialog.
     */
    openDialog: (state, action: PayloadAction<keyof UiState['dialogs']>) => {
      state.dialogs[action.payload] = true;
    },

    /**
     * Close a specific dialog.
     */
    closeDialog: (state, action: PayloadAction<keyof UiState['dialogs']>) => {
      state.dialogs[action.payload] = false;
    },

    /**
     * Close all dialogs at once.
     */
    closeAllDialogs: (state) => {
      state.dialogs = initialState.dialogs;
    },
  },
});

/**
 * Export actions for use in components.
 */
export const {
  setStatusFilter,
  setCategoryFilter,
  setSorting,
  resetFilters,
  toggleViewMode,
  openDialog,
  closeDialog,
  closeAllDialogs,
} = uiSlice.actions;

/**
 * Selectors for accessing UI state.
 * Use these in components with useSelector.
 */
export const selectTodoFilters = (state: RootState) => state.ui.todoFilters;
export const selectViewMode = (state: RootState) => state.ui.viewMode;
export const selectDialogs = (state: RootState) => state.ui.dialogs;

export default uiSlice.reducer;

