const Web3 = require ('web3');
const Accounts = require('web3-eth-accounts');
const accounts = new Accounts('ws://localhost:8888');

// web3 provider stuff =====================================================================

const web3 = new Web3(new Web3.providers.HttpProvider(process.env.INFURA));

// this contains the web3 logic for grabbing the data from the ethereum blockchain
exports.get_new_address = async function (req,res) {
    console.log("*** ETH GET NEW ADDRESS ***");
    let ethData = {};
    try {
        ethData = await web3.eth.accounts.create();
                  console.table(ethData);
                  ethData.result = ethData.address;
                  ethData.result2= ethData.privateKey
                  let eth = [ethData.result, ethData.result2]
                  return eth ;
        } catch(err) {
            ethData.result = err.message
            console.log ( chalk.red ( "REQUEST ERROR in get_new_address" ) );
            return ethData.result;
     }
}
