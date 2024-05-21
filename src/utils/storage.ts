const STORAGE_KEY = 'churnPreventionState';

export const loadState = () => {
    const state = localStorage.getItem(STORAGE_KEY);
    return state ? JSON.parse(state) : null;
};

export const saveState = (state: any) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
};
