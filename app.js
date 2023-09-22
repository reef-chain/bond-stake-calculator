const {argv} = require('./utils/args');
const {fetchStakeEvents} = require('./utils/graphql')
const {BigNumber} = require('bignumber.js')

const contractAddress = argv['contract-address'];
const topic = argv['topic'];

let hasNextPage = true;
let after = "0";

async function fetchEvents() {
    let totalStaked = BigNumber(0);
    let processedCount = 0;
    let totalCount = 0;

    while (hasNextPage) {
      try {
        const res = await fetchStakeEvents(contractAddress, topic, after);
        const data = res.data.evmEventsConnection;
        totalCount = data.totalCount
        hasNextPage = data.pageInfo.hasNextPage;
        after = data.pageInfo.endCursor;
        for(let i=0;i<data.edges.length;i++){
            let args = data.edges[i].node.dataParsed.args;
            if(args && args.length==2){
                totalStaked = BigNumber(totalStaked).plus(args[1].hex,16)
                processedCount++;
            }
        }
        const progress = Math.floor((processedCount / totalCount) * 100);
            process.stdout.clearLine();
            process.stdout.cursorTo(0);
            process.stdout.write(`Progress: ${progress}%`);
      } catch (error) {
        console.error(error);
        break;
      }
    }
    console.log("Total Staked: ",totalStaked.toNumber()/1e18);
  }
  
fetchEvents();


