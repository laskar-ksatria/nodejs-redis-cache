const ethereum_controller = require("./ethereumController");
const Web3 = require("web3");
const web3 = new Web3(new Web3.providers.HttpProvider(process.env.INFURA));
const Account = require("../models/account.js");
const User = require("../models/user");

class AccountController {

  static readAll(req,res,next) {
    Account.find({})
      .then(function (accounts) {
        res.status(200).json(accounts)
      })
      .catch(next);
  };

  static readMe(req,res,next) {
    let userId = req.decoded.id;
    Account.findOne({user: userId})
      .then(function (account) {
        res.status(200).json(account)
      })
      .catch(next);
  };

  static readMyEth(req,res,next) {
    let userId = req.decoded.id;
    Account.findOne({user: userId})
      .then(function (account) {
        let eth = account.ETH;
        res.status(200).json({eth})
      })
      .catch(next)
  };

  static async create(req,res,next) {

    let userId = req.decoded.id;
    let ethData;
    let userAccount;
    let newAccount = {
      ETH: '',
      key: ''
    };

    ethData = await ethereum_controller.get_new_address();
    newAccount.ETH = ethData[0];
    newAccount.key =  web3.eth.accounts.encrypt(ethData[1], process.env.ENCRYPT);
    //Checking account User;
    Account.findOne({user: userId})
      .then(function (account) {
        if (account) {
          next({message: 'You already have acount'})
        }else {
          return Account.create({
            ETH: newAccount.ETH,
            key: newAccount.key,
            user: userId
          })
          .then(function (account) {
            userAccount = account;
            return User.updateOne({_id: userId}, {account: userAccount.id})
              .then(function() {
                  res.status(202).json({message: 'Your account has been created', userAccount})  
              })
          })
        };
      })
      .catch(next);

  };
};


module.exports = AccountController;


    //save account object to the database
    // const eth = await newAccount.save()
    // const user = await User.findOneAndUpdate(
    //   {_id: userId},
    //   {account: ethereum_controller._id},
    //   { new: true }
    // )

    // try {
    //   console.log('Masuk controller')
    //   res.status(200).send({
    //     message: `Created new account`,
    //     ethKey: eth.key.address,
    //   })
    // }catch(err) {
    //   res.status(400).send({
    //     message: `failed to created new account`,
    //     err
    //   })
    // };