import { describe, it, expect } from 'vitest';
import uiReducer, {
  setStatusFilter,
  setCategoryFilter,
  setSorting,
  resetFilters,
  toggleViewMode,
  openDialog,
  closeDialog,
  closeAllDialogs,
} from '../slices/uiSlice';

describe('uiSlice', () => {
  const initialState = {
    todoFilters: {
      status: 'all' as const,
      categoryId: null,
      sortBy: 'createdAt' as const,
      order: 'desc' as const,
    },
    viewMode: 'list' as const,
    dialogs: {
      createCategory: false,
      editCategory: false,
      createTodo: false,
      editTodo: false,
    },
  };

  it('should return initial state', () => {
    expect(uiReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  describe('filters', () => {
    it('should set status filter', () => {
      const state = uiReducer(initialState, setStatusFilter('active'));
      expect(state.todoFilters.status).toBe('active');
    });

    it('should set category filter', () => {
      const categoryId = '123';
      const state = uiReducer(initialState, setCategoryFilter(categoryId));
      expect(state.todoFilters.categoryId).toBe(categoryId);
    });

    it('should set sorting', () => {
      const state = uiReducer(
        initialState,
        setSorting({ sortBy: 'dueDate', order: 'asc' })
      );
      expect(state.todoFilters.sortBy).toBe('dueDate');
      expect(state.todoFilters.order).toBe('asc');
    });

    it('should reset filters to initial state', () => {
      // First modify the state
      let state = uiReducer(initialState, setStatusFilter('completed'));
      state = uiReducer(state, setCategoryFilter('123'));
      
      // Then reset
      state = uiReducer(state, resetFilters());
      
      expect(state.todoFilters).toEqual(initialState.todoFilters);
    });
  });

  describe('view mode', () => {
    it('should toggle view mode from list to grid', () => {
      const state = uiReducer(initialState, toggleViewMode());
      expect(state.viewMode).toBe('grid');
    });

    it('should toggle view mode from grid to list', () => {
      const gridState = { ...initialState, viewMode: 'grid' as const };
      const state = uiReducer(gridState, toggleViewMode());
      expect(state.viewMode).toBe('list');
    });
  });

  describe('dialogs', () => {
    it('should open a dialog', () => {
      const state = uiReducer(initialState, openDialog('createTodo'));
      expect(state.dialogs.createTodo).toBe(true);
    });

    it('should close a dialog', () => {
      const openState = {
        ...initialState,
        dialogs: { ...initialState.dialogs, createTodo: true },
      };
      const state = uiReducer(openState, closeDialog('createTodo'));
      expect(state.dialogs.createTodo).toBe(false);
    });

    it('should close all dialogs', () => {
      const allOpenState = {
        ...initialState,
        dialogs: {
          createCategory: true,
          editCategory: true,
          createTodo: true,
          editTodo: true,
        },
      };
      const state = uiReducer(allOpenState, closeAllDialogs());
      expect(state.dialogs).toEqual(initialState.dialogs);
    });
  });
});

