const axios = require('axios')
const gqlEndpoint =  "https://squid.subsquid.io/reef-explorer/graphql";

const query = `query StakeEventsNr($contractAddress: String!,$topic:String!) {
    evmEvents(
      where: {
        contractAddress_eq: $contractAddress,
        topic0_eq: $topic,
        status_eq: Success
      },
      orderBy: id_ASC,
      limit: 100
    ) {
      dataParsed
    }
  }`

const getStakeEvents = (contractAddress,topic) => {
    return {
      query,
      variables: { contractAddress,topic },
    };
  };

const fetchStakeEvents =async(contractAddress,topic)=> {
    const response = await axios({
    method: "post",
    url: gqlEndpoint,
    headers: {
      "Content-Type": "application/json",
    },
    data: getStakeEvents(contractAddress,topic),
  })
  return response.data;
}

module.exports = {
    fetchStakeEvents
}