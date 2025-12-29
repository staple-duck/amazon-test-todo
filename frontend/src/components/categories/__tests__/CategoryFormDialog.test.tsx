import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { CategoryFormDialog } from '../CategoryFormDialog';

// Mock the API hooks
vi.mock('@/store/api/categoriesApi', () => ({
  useCreateCategoryMutation: () => [vi.fn(), { isLoading: false }],
  useUpdateCategoryMutation: () => [vi.fn(), { isLoading: false }],
}));

// Mock the helpers
vi.mock('@/lib/api-helpers', () => ({
  handleApiError: vi.fn(),
  showSuccess: vi.fn(),
}));

describe('CategoryFormDialog', () => {
  it('renders create mode correctly', () => {
    render(
      <CategoryFormDialog open={true} onOpenChange={vi.fn()} />
    );

    expect(screen.getByText('Create Category')).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Work, Personal/)).toBeInTheDocument();
  });

  it('renders edit mode correctly', () => {
    const category = {
      id: '1',
      name: 'Test Category',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    render(
      <CategoryFormDialog
        open={true}
        onOpenChange={vi.fn()}
        category={category}
      />
    );

    expect(screen.getByText('Edit Category')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Test Category')).toBeInTheDocument();
  });

  it('allows input changes', () => {
    render(
      <CategoryFormDialog open={true} onOpenChange={vi.fn()} />
    );

    const input = screen.getByPlaceholderText(/Work, Personal/) as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'New Category' } });

    expect(input.value).toBe('New Category');
  });
});

