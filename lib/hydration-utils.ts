/**
 * Utility functions to prevent React hydration mismatches
 */

/**
 * List of attributes that can cause hydration mismatches between server and client
 */
export const HYDRATION_SENSITIVE_ATTRS = [
  'fdprocessedid',
  'data-sonner-toast',
  'data-melt-id',
  'data-radix-collection-item',
  'data-radix-popper-content-wrapper',
  'data-radix-portal',
  'data-radix-dialog-overlay',
  'data-radix-dropdown-menu-content',
  'data-radix-popover-content',
  'data-radix-select-content',
  'data-radix-toast-provider',
  'data-radix-tooltip-content'
] as const;

/**
 * Type for hydration-sensitive attributes
 */
export type HydrationSensitiveAttr = typeof HYDRATION_SENSITIVE_ATTRS[number];

/**
 * Filter out hydration-sensitive attributes from props
 * @param props - The original props object
 * @returns Filtered props without hydration-sensitive attributes
 */
export function filterHydrationSensitiveProps<T extends Record<string, unknown>>(
  props: T
): Partial<T> {
  const filteredProps = { ...props };
  
  HYDRATION_SENSITIVE_ATTRS.forEach(attr => {
    if (attr in filteredProps) {
      delete filteredProps[attr as keyof typeof filteredProps];
    }
  });
  
  return filteredProps;
}

/**
 * Create a filtered props object with hydration-sensitive attributes removed
 * @param props - The original props object
 * @returns Filtered props without hydration-sensitive attributes
 */
export function createHydrationSafeProps<T extends Record<string, unknown>>(
  props: T
): Partial<T> {
  return filterHydrationSensitiveProps(props);
}