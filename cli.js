import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import { runSearch, runHistory } from './app.js';

yargs(hideBin(process.argv))
    .scriptName('cli')
    .usage('Usage: node cli.js <command> [arguments]')
    .command(
        'search <keyword>',
        'Search for TV shows by keyword',
        (yargs) => {
            return yargs.positional('keyword', {
                describe: 'Keyword used to search for a TV show',
                type: 'string',
                demandOption: true
            });
        },
        async (argv) => {
            await runSearch(argv.keyword);
        }
    )
    .command(
        'history <type>',
        'View saved search history',
        (yargs) => {
            return yargs.positional('type', {
                describe: 'History type to view',
                type: 'string',
                choices: ['keywords']
            });
        },
        async (argv) => {
            await runHistory(argv.type);
        }
    )
    .example('node cli.js search friends', 'Search for shows related to "friends"')
    .example('node cli.js search office', 'Search for shows related to "office"')
    .example('node cli.js history keywords', 'Display saved search keywords')
    .help('help')
    .alias('help', 'h')
    .demandCommand(1, 'You must provide a valid command. Use --help to see available commands.')
    .strict()
    .parse();