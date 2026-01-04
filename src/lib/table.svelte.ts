import { createTable, type RowData, type Table, type TableOptions, type TableState, type Updater } from '@tanstack/table-core';

export function createTanStackTable<TData extends RowData>(options: () => TableOptions<TData>): Table<TData> {
    const initialOptions = options();

    // Use a state rune to manage the table state reactively
    let state = $state<TableState>(
        createTable<TData>({
            ...initialOptions,
            onStateChange: () => { }
        } as any).initialState
    );

    const table = createTable<TData>({
        ...initialOptions,
        get state() {
            return state;
        },
        onStateChange: (updater: Updater<TableState>) => {
            if (typeof updater === 'function') {
                state = updater(state);
            } else {
                state = updater;
            }
            options().onStateChange?.(updater);
        },
        renderFallbackValue: null
    } as any);

    // Update the table options when they change
    $effect.pre(() => {
        const currentOptions = options();
        table.setOptions((prev) => ({
            ...prev,
            ...currentOptions,
            state,
            onStateChange: (updater: Updater<TableState>) => {
                if (typeof updater === 'function') {
                    state = updater(state);
                } else {
                    state = updater;
                }
                currentOptions.onStateChange?.(updater);
            }
        }));
    });

    return table;
}

/**
 * A simple flexRender helper for Svelte 5.
 * It handles strings, numbers, and custom objects with component/props.
 */
export function flexRender(content: any, props: any) {
    if (content === null || content === undefined) return null;
    if (typeof content === 'function') {
        return content(props);
    }
    return content;
}
