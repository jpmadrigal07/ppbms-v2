const express = require("express");
const router = express.Router();
const Referral = require("../models/referal");

// @route   GET api/referral
// @desc    Get All Referral
// @access  Private
router.get("/", async(req, res) => {
  try{
    const getReferral = await Referral.find();
    res.json(getReferral);
  }catch(error){
    res.status(501).json({Error:error});
  }
});

// @route   POST api/referral/
// @desc    Add A Referral
// @access  Private
router.post("/", async(req, res) => {
  const inviterId = req.body.inviterId;
  const invitedId = req.body.invitedId;
  const isInvitedPaid = req.body.isInvitedPaid;
  const createdAt = Date.now();
  const newReferral = new Referral({
    inviterId,
    invitedId,
    isInvitedPaid,
    createdAt,
  });
  try{
    const addReferral = await newReferral.save();
      res.json(addReferral);
  }catch(error){
    res.status(501).json({Error:error});
  }
    });

// @route   PUT api/referral/:id
// @desc    Update A Referral
// @access  Private
router.put("/:id", async(req, res) => {
  try{
  const updateReferral = await Referral.findByIdAndUpdate(req.params.id, {
    $set: {
      inviterId: req.body.inviterId,
      invitedId: req.body.invitedId,
      isInvitedPaid: req.body.isInvitedPaid,
    },
  })
      if (updateReferral) res.status(201).json("Referral updated.");
      else res.status(400).json("Error found.");
}catch(error){
  res.status(501).json({Error:error});
}
});

// @route   PATCH api/referral/:id
// @desc    Update A Referral
// @access  Private
router.patch("/:id", async(req, res) => {
  let forUpdate ={};
  if(req.body.isInvitedPaid) forUpdate.isInvitedPaid =req.body.isInvitedPaid;
  if(req.body.inviterId) forUpdate.inviterId =req.body.inviterId;
  if(req.body.invitedId) forUpdate.invitedId =req.body.invitedId;
  try{
    const updateReferral = await Referral.findByIdAndUpdate(req.params.id, {
      $set:forUpdate
    });
    if (updateReferral) res.status(201).json("Referral updated.");
    else res.status(400).json("Error found.");
  }catch(error){
    res.status(501).json({Error:error});
  }
  });

// @route   DELETE api/referral/:id
// @desc    Delete A Referral
// @access  Private
router.delete("/:id", async(req, res) => {
  try{
  const deleteReferral =await Referral.findById(req.params.id);
      deleteReferral.remove();
        res.status(201).json({success: true});
  }catch(error){
    res.status(501).json({Error:error});
  }
});
module.exports = router;
