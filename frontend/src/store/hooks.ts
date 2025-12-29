import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from './store';

/**
 * Typed version of useDispatch hook.
 * Use this instead of plain useDispatch for better TypeScript support.
 */
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();

/**
 * Typed version of useSelector hook.
 * Use this instead of plain useSelector for better TypeScript support.
 */
export const useAppSelector = useSelector.withTypes<RootState>();

