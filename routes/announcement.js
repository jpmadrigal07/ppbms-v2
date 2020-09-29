const express = require("express");
const router = express.Router();
const Announcement = require("../models/announcement");
const { isNull } = require("lodash");

// @route   GET api/announcement
// @desc    Get All Announcement
// @access  Public
router.get("/", async(req, res) => {
  try{
    const allAnnouncement = await Announcement.find();
    res.json(allAnnouncement);
  }catch(error){
    res.status(501).json({Error:error});
  }
  });

  // @route   GET api/announcement/active
// @desc    Get All Announcement that not deleted
// @access  Public
router.get("/active", async(req, res) => {
  try{
   const activeAnnouncement= await Announcement.find({deletedAt:null});
        res.json(activeAnnouncement);
  }catch(error){
    res.status(501).json({Error:error});
  }
  });

  // @route   POST api/announcement/
// @desc    Add A Announcement
// @access  Private
router.post("/", async(req, res) => {
    const userId = req.body.userId;
    const description = req.body.description;
    const image = req.body.image;
    const updatedAt = Date.now();
    const createdAt = Date.now();

    const newAnnouncement = new Announcement({
        userId,
        description,
        image,
        updatedAt,
        createdAt
    });
    try{
    const saveAnnouncement =await newAnnouncement.save();
    res.json(saveAnnouncement);
    }catch(error){
      res.status(501).json({Error:error});
    }
});

// @route   PUT api/announcement/:id
// @desc    Update A Announcement
// @access  Private
router.put("/:id", async(req, res) => {
  try{
    const updateAnnouncement = await Announcement.findByIdAndUpdate(req.params.id, {
      $set: {
        description : req.body.description,
        image : req.body.image,
        updatedAt : Date.now(),
        deletedAt : req.body.deletedAt,
      },
    });
    if (updateAnnouncement) res.status(201).json("Announcement updated.");
    else res.status(400).json("Error found.");
  }catch(error){
    res.status(501).json({Error:error});
  }
  });

  // @route   PATCH api/announcement/:id
// @desc    Update A Announcement
// @access  Private
router.patch("/:id", async(req, res) => {
  let forUpdate ={};
  if(req.body.description) forUpdate.description =req.body.description;
  if(req.body.image) forUpdate.image =req.body.image;
  if(req.body.deletedAt) forUpdate.deletedAt =req.body.deletedAt;
  try{
    const updateAnnouncement = await Announcement.findByIdAndUpdate(req.params.id, {
      $set:forUpdate,updatedAt: Date.now()
    });
    if (updateAnnouncement) res.status(201).json("Announcement updated.");
    else res.status(400).json("Error found.");
  }catch(error){
    res.status(501).json({Error:error});
  }
  });

  // @route   DELETE api/announcement/:id
// @desc    Delete A Announcement
// @access  Private
router.delete("/:id", async(req, res) => {
  try{
   const deleteAnnouncement= await Announcement.findById(req.params.id);
        deleteAnnouncement.remove();
        res.status(400).json({success:true});
  }catch(error){
    res.status(501).json({Error:error});
  }
  });
module.exports = router;