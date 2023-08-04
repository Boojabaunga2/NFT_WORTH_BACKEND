/**
 * @swagger
 * /nft-worth:
 *   post:
 *     summary: Process the collection address and NFT ID
 *     tags: [Backend]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               collectionAddress:
 *                 type: string
 *               nftId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Success response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 */
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const cors = require('cors');
const getFloorPrice = require('./api/floorprice'); // Import the processController module
const getNftRank = require('./api/nftrank')
const isSpam = require('./api/isSpam')
app.use(cors());
app.use(
    cors({
      origin: '*', // Replace with the domain of your frontend application
      methods: ['GET', 'POST'], // Specify the allowed HTTP methods
      allowedHeaders: ['Content-Type', 'Authorization'], // Specify the allowed headers
    })
  );

// Parse JSON bodies
app.use(bodyParser.json());

// Define a POST route for handling the inputs
app.post('/nft-worth', async (req, res) => {
  const collectionAddress = req.body.collectionAddress;
  const nftId = req.body.nftId;

  try {
    // Call the processInputs function from the processController module
    const result = await getFloorPrice.Floor(collectionAddress, nftId);
    const rank = await getNftRank.Rank(collectionAddress, nftId)
    const spam= await isSpam.isSpam(collectionAddress)

    // Send the result as the response
    res.json({
      
      "floorprice" :result,
      
      "nftRank":rank.rank,
      "spamornot":spam,
      "totalsupply":rank.totalsupply
    
    });
  } catch (error) {
    // Handle any errors that might occur during the process
    console.error(error);
    res.status(500).json({ error: 'An error occurred while processing the request.' });
  }
});




const swaggerOptions = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'WES NFT WORTH CALCULATOR',
        version: '1.0.0',
        description: 'A backend server that takes collection address and NFT ID inputs',
      },
      servers: [
        {
          url: 'http://localhost:3001',
        },
      ],
    },
    apis: ['server.js'],
  };
  
  const swaggerSpec = swaggerJsdoc(swaggerOptions);
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Start the server
const port = 3001;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});