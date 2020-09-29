const express = require("express");
const router = express.Router();
const Payment = require("../models/payments");

// @route   GET api/payment
// @desc    Get All Payments
// @access  Private
router.get("/list", async(req, res) => {
  try{
    const listPayment = await Payment.find();
    res.json(listPayment);
  }catch(error){
    res.status(501).json({Error:error});
  }
  });

  // @route   GET api/payment/pending
// @desc    Get Pending Payments
// @access  Private
router.get("/pending", async(req, res) => {
  try{
    const pendingPayment = await Payment.find({status:"Pending"})
      res.json(pendingPayment);
  }catch(error){
    res.status(501).json({Error:error});
  }
  });
  
  // @route   GET api/payment/verified
// @desc    Get Verified Payments
// @access  Private
router.get("/verified", async(req, res) => {
  try{
   const verifiedPayment = await Payment.find({status:"Verified"});
      res.json(verifiedPayment);
  }catch(error){
    res.status(501).json({Error:error});
  }
  });

   // @route   GET api/payment/problem
// @desc    Get Problematic Payments
// @access  Private
router.get("/problem", async(req, res) => {
  try{
    const problemPayment = await Payment.find({status:"Problem"});
     res.json(problemPayment);
  }catch(error){
    res.status(501).json({Error:error});
  }
  });

 // @route   POST api/payment/add
// @desc    Add A Payment
// @access  Private
router.post("/", async(req, res) => {
    const userId = req.body.userId;
    const method = req.body.method;
    const referenceNumber = req.body.referenceNumber;
    const photoProof = req.body.photoProof;
    const updatedAt = Date.now();
    const createdAt = Date.now();

    const newPayment = new Payment({
        userId,
        method,
        referenceNumber,
        photoProof,
        updatedAt,
        createdAt
    });
    try{
    const savePayment =await newPayment.save();
      res.json(savePayment);
    }catch(error){
      res.status(501).json({Error:error});
    }
});

// @route   PUT api/payment/:id
// @desc    Update A Payment
// @access  Private
router.put("/:id", async(req, res) => {
  try{
    const updatePayment = await Payment.findByIdAndUpdate(req.params.id, {
      $set: {
        userId:req.body.userId,
        method: req.body.method,
        referenceNumber: req.body.referenceNumber,
        photoProof: req.body.photoProof,
        status : req.body.status,
        problemDesc: req.body.problemDesc,
        updatedAt: Date.now()
      },
    });
        if (updatePayment) res.status(201).json("Payment updated.");
        else res.status(400).json("Error found.");
  }catch(error){
    res.status(501).json({Error:error});
  }
  });

  // @route   PATCH api/payment/:id
// @desc    Update A Announcement
// @access  Private
router.patch("/:id", async(req, res) => {
  let forUpdate ={};
  if(req.body.status) forUpdate.status =req.body.status;
  if(req.body.problemDesc) forUpdate.problemDesc =req.body.problemDesc;
  if(req.body.userId) forUpdate.userId =req.body.userId;
  if(req.body.method) forUpdate.method =req.body.referenceNumber;
  if(req.body.referenceNumber) forUpdate.referenceNumber =req.body.referenceNumber;
  if(req.body.photoProof) forUpdate.photoProof =req.body.photoProof;
  try{
    const updatePayment = await Payment.findByIdAndUpdate(req.params.id, {
      $set:forUpdate,updatedAt: Date.now()
    });
    if (updatePayment) res.status(201).json("Payment updated.");
    else res.status(400).json("Error found.");
  }catch(error){
    res.status(501).json({Error:error});
  }
  });

 // @route   DELETE api/payment/:id
// @desc    Delete A Payment
// @access  Private
router.delete("/:id", async(req, res) => {
  try{
    const deletePayment =await Payment.findById(req.params.id);
      
        deletePayment.remove();
          res.status(201).json({success: true});
  }catch(error){
    res.status(501).json({Error:error});
  }
  });
module.exports =router;