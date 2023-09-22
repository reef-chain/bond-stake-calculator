const axios = require('axios')
const gqlEndpoint =  "https://squid.subsquid.io/reef-explorer/graphql";

const query0 = `query StakeEventsNr($contractAddress: String!,$topic:String!) {
    evmEventsConnection(orderBy: id_ASC, first: 10, where: {contractAddress_eq: $contractAddress, topic0_eq: $topic}) {
        pageInfo {
          hasNextPage
          endCursor
        }
        edges {
          node {
            dataParsed
          }
        }
        totalCount
      }
  }`

const query1 = `query StakeEventsNr($contractAddress: String!,$topic:String!,$after:String!) {
    evmEventsConnection(orderBy: id_ASC, first: 10, where: {contractAddress_eq: $contractAddress, topic0_eq: $topic}, after: $after) {
        pageInfo {
          hasNextPage
          endCursor
        }
        edges {
          node {
            dataParsed
          }
        }
        totalCount
      }
  }`

const getStakeEvents = (contractAddress,topic,after) => {
    return {
      query : after=="0"?query0:query1,
      variables: { contractAddress,topic,after },
    };
  };

const fetchStakeEvents =async(contractAddress,topic,after)=> {
    const response = await axios({
    method: "post",
    url: gqlEndpoint,
    headers: {
      "Content-Type": "application/json",
    },
    data: getStakeEvents(contractAddress,topic,after),
  })
  return response.data;
}

module.exports = {
    fetchStakeEvents
}