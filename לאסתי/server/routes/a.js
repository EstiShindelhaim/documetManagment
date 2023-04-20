const express = require("express");
const { uploadDocument } = require("../service/document");
const isBase64 = require('is-base64');

const resultRouter = express.Router();

resultRouter.route("/").post(async (req, res) => {
  console.log(req.body.files);
  req.body.files.forEach((element, ind) => {
  uploadDocument(element, `img${ind}`,'image/png', 37);  });  
  res.send("vh scj");
    

  // const base64String= req.body.document;
  // if (!isBase64(base64String)) 
  // { 
  //   return res.status(400).json({ error: 'Invalid base64 string' });
  // }
  // try 
  // {
  //   uploadDocument(base64String, req.body.name, req.body.type, 37)
  // } 
  // catch (error) 
  // {
  //   console.log(error);
  //   return err
  // }

  // return res.status(200).json({ message: 'File received' });   
});

module.exports = resultRouter;