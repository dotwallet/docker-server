const DotWallet = require('@dotwallet/sdk-node');
const { checkTokenMiddleWare } = require('./auth');

/**
 * @param {import('express').Application} app
 * @param {DotWallet} dotwallet
 * @swagger
 * /get-data-from-tx:
 *   post:
 *     summary: Returns data that has been saved (using this API) to a certain txid
 *     parameters:
 *       - name: Authorization
 *         in: header
 *         description: Auth token header. must be passed as "Bearer ${token}". This must be passed either here or in the body
 *         required: false
 *         type: string
 *         example: "Bearer eyalkjasdf.efsfas"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               txid:
 *                 type: string
 *                 required: true
 *                 example: 55f34c6474e2ac068d293deb4b72c1785c7cfab848ccba63dda9282e03914554
 *               server_token:
 *                 type: string
 *                 required: false
 *                 example: test_token
 *                 description: The token must either be passed here or in the headers
 *   responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                 transaction_hash:
 *                   type: string
 *                 height:
 *                   type: number
 *                 size:
 *                   type: number
 *                 timestamp:
 *                   type: number
 *                 confirmation:
 *                   type: number
 *                 vins:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       script_hex:
 *                         type: string
 *                       value:
 *                         type: number
 *                 vouts:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       script_hex:
 *                         type: string
 *                       value:
 *                         type: number
 *
 *  */
const getTxData = (app, dotwallet) =>
  app.post('/get-data-from-tx', checkTokenMiddleWare, async (req, res) => {
    try {
      const savedData = await dotwallet.getSavedData(req.body.txid, true);
      res.json(savedData);
    } catch (error) {
      console.log('==============error==============\n', error);
      res.json(error);
    }
  });
module.exports = { getTxData };
