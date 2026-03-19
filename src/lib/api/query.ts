export const queryKeys =
    (key: string) =>
    (...args: unknown[]) => [key, ...args];
