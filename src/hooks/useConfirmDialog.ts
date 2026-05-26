'use client';

import { useState, useCallback } from 'react';

export interface UseConfirmDialogOptions<TData = void> {
  onConfirm: (data: TData) => Promise<void> | void;
}

export interface UseConfirmDialogReturn<TData> {
  /** Whether the dialog is currently open */
  open: boolean;
  /** Whether the confirm action is in progress */
  isLoading: boolean;
  /** The data passed when triggering the dialog (null when closed) */
  data: TData | null;
  /** Open the dialog, optionally passing contextual data */
  trigger: (data?: TData) => void;
  /** Execute the confirm callback */
  confirm: () => Promise<void>;
  /** Close/cancel the dialog without executing */
  cancel: () => void;
}

/**
 * Manages state for a ConfirmDialog.
 *
 * @example
 * ```tsx
 * const deleteDialog = useConfirmDialog({
 *   onConfirm: async (id: string) => {
 *     await fetch(`/api/items/${id}`, { method: 'DELETE' });
 *   },
 * });
 *
 * return (
 *   <>
 *     <button onClick={() => deleteDialog.trigger(item.id)}>Delete</button>
 *     <ConfirmDialog
 *       open={deleteDialog.open}
 *       isLoading={deleteDialog.isLoading}
 *       onConfirm={deleteDialog.confirm}
 *       onCancel={deleteDialog.cancel}
 *       title="ELIMINAR"
 *       message="¿Estás seguro?"
 *     />
 *   </>
 * );
 * ```
 */
export function useConfirmDialog<TData = void>(
  options: UseConfirmDialogOptions<TData>
): UseConfirmDialogReturn<TData> {
  const { onConfirm } = options;

  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<TData | null>(null);

  const trigger = useCallback((d?: TData) => {
    setData(d !== undefined ? d : (null as unknown as TData));
    setOpen(true);
  }, []);

  const cancel = useCallback(() => {
    setOpen(false);
    setIsLoading(false);
    setData(null);
  }, []);

  const confirm = useCallback(async () => {
    setIsLoading(true);
    try {
      await onConfirm(data as TData);
    } catch {
      // Error is handled by the caller (e.g. toast in the consumer)
      // We just need to reset state
    } finally {
      setIsLoading(false);
      setOpen(false);
      setData(null);
    }
  }, [data, onConfirm]);

  return { open, isLoading, data, trigger, confirm, cancel };
}
