const express = require("express");
const router = express.Router();
const ContactMessage = require("../models/message");

// @route   GET api/messages
// @desc    Get All Contact Messages
// @access  Private
router.get("/", async(req, res) => {
  try{
      const getMeesages =await ContactMessage.find();
      res.json(getMeesages);
  }catch(error){
    res.status(501).json({Error:error});
  }
  });

  // @route   GET api/messages/id
// @desc    Get Single Contact Messages
// @access  Private
router.get("/:id", async(req, res) => {
  try{
   const getMessage = await ContactMessage.findById(req.params.id);
     res.json(getMessage);
  }catch(error){
    res.status(501).json({Error:error});
  }
  });

 // @route   POST api/messages
// @desc    POST A MESSAGE
// @access  Private
router.post("/", async(req, res) => {
    const name = req.body.name;
    const emailAddress = req.body.emailAddress;
    const message = req.body.message;
    const createdAt =Date.now();
    const newMessage = new ContactMessage({
        name,
        emailAddress,
        message,
        createdAt
    });
    try {
      const postMessage = await newMessage.save();
      res.json({ dbRes: postMessage, isSuccess: true });
    } catch(err){
      res.json({ dbRes: err, isSuccess: false });
    }
});

// @route   PUT api/messages/:id
// @desc    Update A Message
// @access  Private
router.put("/:id", async(req, res) => {
  try{
      const updateMessage = await ContactMessage.findByIdAndUpdate(req.params.id, {
      $set: {
        name : req.body.name,
        emailAddress: req.body.emailAddress,
        message: req.body.message
      },
    });
        if (updateMessage) res.status(201).json("Message updated.");
        else res.status(400).json("Error found.");
  }catch(error){
    res.status(501).json({Error:error});
  }
  });

// @route   PATCH api/messages/:id
// @desc    Update A Contact Message
// @access  Private
router.patch("/:id", async(req, res) => {
  let forUpdate ={};
  if(req.body.name) forUpdate.name =req.body.name;
  if(req.body.emailAddress) forUpdate.emailAddress =req.body.emailAddress;
  if(req.body.message) forUpdate.message =req.body.message;
  try{
    const updateMessage = await ContactMessage.findByIdAndUpdate(req.params.id, {
      $set:forUpdate
    });
    if (updateMessage) res.status(201).json("Message updated.");
    else res.status(400).json("Error found.");
  }catch(error){
    res.status(501).json({Error:error});
  }
  });

   // @route   DELETE api/messages/:id
// @desc    Delete A Message
// @access  Private
router.delete("/:id", async(req, res) => {
  try{
      const deleteMessage =await ContactMessage.findById(req.params.id);
        deleteMessage.remove();
          res.status(201).json({success: true,});
  }catch(error){
    res.status(501).json({Error:error});
  }
  });
module.exports =router;