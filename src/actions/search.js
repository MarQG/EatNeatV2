export const setSearchFilters = (filters = []) => ({
    type: "SET_SEARCH_FILTERS",
    filters
});

export const setQuery = (query = '') => ({
    type: "SET_QUERY",
    query
});