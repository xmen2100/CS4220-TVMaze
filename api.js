import axios from 'axios';

const BASE_URL = 'https://api.tvmaze.com';

export async function searchShows(keyword) {
    try {

        const response = await axios.get(`${BASE_URL}/search/shows?q=${keyword}`);
        
        return response.data.map(item => item.show);
        
    } catch (error) {
        console.error('There was an error getting the search results:', error.message);
        return [];
    } 
}

export async function getShowById(id) {
    try {

        const response = await axios.get(`${BASE_URL}/shows/${id}`);

        return response.data;

    } catch (error) {
        console.error('There was an error getting the show details:', error.message);
        return null;
    }
}