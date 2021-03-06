const { CLIENT_ID, CLIENT_SECRET } = require("../config");
const DotWallet = require("@dotwallet/sdk-node");
const dotwallet = new DotWallet();
dotwallet.init(CLIENT_ID, CLIENT_SECRET);
console.log('DotWallet initialized with ENV: ', { CLIENT_ID, CLIENT_SECRET })
const { auth } = require("./auth");
const { autoPay, createOrder, paymentResult } = require("./payment");
const { saveData } = require("./saveData");
const { getTxData } = require("./query");

/** 
 * @param {import('express').Application} app
 */
const routes = function (app) {
  auth(app, dotwallet);
  autoPay(app, dotwallet);
  createOrder(app, dotwallet);
  paymentResult(app);
  getTxData(app, dotwallet);
  saveData(app, dotwallet);
};

module.exports = { routes };
