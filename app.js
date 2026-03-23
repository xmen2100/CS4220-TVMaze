import { select } from '@inquirer/prompts';

import { searchShows, getShowById } from './api.js';
import { insert, find } from './history.js';

const stripHtml = (text) => {
    if (!text) {
        return 'N/A';
    }

    return text.replace(/<[^>]*>/g, '');
}

const displayShowDetails = (show) => {
    console.clear();
    console.log('========================================');
    console.log(`📺  ${show.name}`);
    console.log('----------------------------------------');
    console.log(`Type       : ${show.type || 'N/A'}`);
    console.log(`Language   : ${show.language || 'N/A'}`);
    console.log(`Genres     : ${show.genres.length ? show.genres.join(', ') : 'N/A'}`);
    console.log(`Status     : ${show.status || 'N/A'}`);
    console.log(`Premiered  : ${show.premiered || 'N/A'}`);
    console.log(`Runtime    : ${show.runtime ? `${show.runtime} minutes` : 'N/A'}`);
    console.log(`Rating     : ${show.rating.average ? show.rating.average : 'N/A'}`);
    console.log(`Network    : ${show.network?.name || show.webChannel?.name || 'N/A'}`);
    console.log('----------------------------------------');
    console.log('Summary:');
    console.log(stripHtml(show.summary) || 'N/A');
    console.log('========================================');
};

const displayShows = async (results) => {
    const choices = results.map((result) => {
        return {
            name: `${result.show.name} (${result.show.premiered ? result.show.premiered.slice(0, 4) : 'N/A'})`,
            value: result.show.id
        };
    });

    choices.unshift({ name: 'Exit', value: null });

    return await select({
        message: 'Select a show:',
        choices
    });
};

export const runSearch = async (keyword) => {
    try {
        const results = await searchShows(keyword);

        if (!results.length) { 
            console.log(`No results found for "${keyword}".`);
            return;
        }
        
        await insert(keyword);

        const selectedId = await displayShows(results);

        if (!selectedId) {
            console.log('Exited search.');
            return;
        }

        const show = await getShowById(selectedId);

        displayShowDetails(show);
    } catch (error) {
        console.error(error);
    }
}