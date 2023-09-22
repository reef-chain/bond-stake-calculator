const {argv} = require('./utils/args');
const {fetchStakeEvents} = require('./utils/graphql')

const contractAddress = argv['contract-address'];
const topic = argv['topic'];

const response = fetchStakeEvents(contractAddress,topic);
response.then(data=>{
    const evmEvents = data.data.evmEvents;
    for(let i=0;i<evmEvents.length;i++){
        console.log(evmEvents[i].dataParsed.args[1])
    }
})

