const {argv} = require('./args');
const {fetchStakeEvents} = require('./utils/graphql')

const contractAddress = argv['contract-address'];
const topic = argv['topic'];

const response = fetchStakeEvents(contractAddress,topic);
response.then(data=>console.log(data))

