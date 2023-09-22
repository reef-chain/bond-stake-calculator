const argv = require('yargs')
    .option('contract-address', {
        alias: 'c',
        describe: 'Contract address',
        demandOption: true,
        type: 'string'
    })
    .option('topic', {
        alias: 't',
        describe: 'Topic',
        demandOption: true,
        type: 'string'
    })
    .help()
    .alias('help', 'h')
    .argv;

module.exports = {
    argv
}