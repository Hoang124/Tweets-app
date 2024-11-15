import AWSXRay from 'aws-xray-sdk';
import bodyParser from 'body-parser';
import express from 'express';
import { router as tweetRoutes } from './routes/tweetRoutes.js';
import { router as imageRoutes } from './routes/imageRoutes.js';

(async () => {
  //Create an express application
  const app = express(); 
  //default port to listen
  const port = process.env.PORT || 8080; 
  
  //use middleware so post bodies are accessable as req.body
  app.use(bodyParser.json());
  app.use(express.urlencoded({ extended: true })) //for requests from forms-like data
  app.use(AWSXRay.express.openSegment('tweets-app'));

  // Root URI call
  app.get( "/", ( req, res ) => {
    res.status(200).send("Welcome to the Cloud!");
  } );

  app.use(tweetRoutes)
  app.use(imageRoutes)

  app.use(AWSXRay.express.closeSegment());

  // Start the Server
  app.listen( port, () => {
      console.log( `server running http://localhost:${ port }` );
      console.log( `press CTRL+C to stop server` );
  } );
})();
