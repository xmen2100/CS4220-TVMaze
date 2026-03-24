
const BASE_URL = 'https://api.tvmaze.com';

export async function searchShows(keyword) {
    const response = await fetch(`https://api.tvmaze.com/search/shows?q=${keyword}`);
    const data = await response.json();

    return data;
}

export async function getShowById(id) {
    const response = await fetch(`${BASE_URL}/shows/${id}`);
    const data = await response.json();

    return data;
}