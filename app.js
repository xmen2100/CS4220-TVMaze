import { select } from '@inquirer/prompts';

import { searchShows, getShowById } from './api.js';
import { insert, find } from './history.js';

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