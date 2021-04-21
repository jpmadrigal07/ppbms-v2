const express = require("express");
const router = express.Router();
const DispatchControlMessenger = require("../models/dispatchControlMessenger");
const _ = require("lodash");

// @route   GET api/dispatchControlMessenger
// @desc    Get All DispatchControlMessenger
// @access  Public
router.get("/", async (req, res) => {
  const condition = !_.isNil(req.query.condition) ? JSON.parse(req.query.condition) : {};
  const limit = !_.isNil(req.query.limit) ? JSON.parse(req.query.limit) : 0;
  const skip = !_.isNil(req.query.skip) ? JSON.parse(req.query.skip) : 0;
  if (_.isNil(condition.deletedAt)) {
      condition.deletedAt = {
          $exists: false
      }
  }
  
  try {
    const getAllDispatchControlMessenger = await DispatchControlMessenger.find(condition).skip(skip).limit(limit);
    console.log('smile', getAllDispatchControlMessenger)
    res.json({
      dbRes: getAllDispatchControlMessenger,
      isSuccess: true
    });
  } catch (error) {
    res.json({
      dbRes: error,
      isSuccess: false
    });
  }
});

// @route   GET api/dispatchControlMessenger
// @desc    Get All DispatchControlMessenger
// @access  Public
router.get("/count", async (req, res) => {
  const condition = !_.isNil(req.query.condition) ? JSON.parse(req.query.condition) : {};
  if (_.isNil(condition.deletedAt)) {
      condition.deletedAt = {
          $exists: false
      }
  }
  
  try {
    const getAllDispatchControlMessenger = await DispatchControlMessenger.find(condition).countDocuments();
    res.json({
      dbRes: getAllDispatchControlMessenger,
      isSuccess: true
    });
  } catch (error) {
    res.json({
      dbRes: err,
      isSuccess: false
    });
  }
});

// @route   GET api/dispatchControlMessenger/:id
// @desc    Get Single DispatchControlMessenger
// @access  Public
router.get("/:id", async (req, res) => {
  try {
    const getDispatchControlMessenger = await DispatchControlMessenger.findById({
      _id: req.params.id,
      deletedAt: {
        $exists: false
      }
    });
    res.json({
      dbRes: getDispatchControlMessenger,
      isSuccess: true
    });
  } catch (error) {
    res.json({
      dbRes: err,
      isSuccess: false
    });
  }
});

// @route   POST api/dispatchControlMessenger/add
// @desc    Add A DispatchControlMessenger
// @access  Private
router.post("/", async (req, res) => {
  const name = req.body.name;
  const address = req.body.address;
  const preparedBy = req.body.preparedBy;
  const date = req.body.date;
  if (!_.isNil(name) && !_.isNil(address) && !_.isNil(preparedBy) && !_.isNil(date)) {
    const newDispatchControlMessenger = new DispatchControlMessenger({
      name,
      address,
      preparedBy,
      date
    });
    try {
      const getDispatchControlMessenger = await DispatchControlMessenger.find({
        name,
        address,
        preparedBy,
        date,
        deletedAt: {
          $exists: false
        }
      });
      if (getDispatchControlMessenger.length === 0) {
        const createDispatchControlMessenger = await newDispatchControlMessenger.save();
        res.json({
          dbRes: createDispatchControlMessenger,
          isSuccess: true
        });
      } else {
        res.json({
          dbRes: "Dispatch control messenger name, address and prepared must be unique.",
          isSuccess: false
        });
      }
    } catch (err) {
      res.json({
        dbRes: err,
        isSuccess: false
      });
    }
  } else {
    res.json({
      dbRes: "Required values are either invalid or empty.",
      isSuccess: false
    });
  }
});

// @route   PUT api/dispatchControlMessenger/:id
// @desc    Update A DispatchControlMessenger
// @access  Private
router.put("/:id", async (req, res) => {
    const name = req.body.name;
    const address = req.body.address;
    const preparedBy = req.body.preparedBy;
    const date = req.body.date;
  if (!_.isNil(name) && !_.isNil(address) && !_.isNil(preparedBy) && !_.isNil(date)) {
    try {
      const getDispatchControlMessenger = await DispatchControlMessenger.find({
        name,
        address,
        preparedBy,
        date,
        deletedAt: {
          $exists: false
        }
      });
      if (getDispatchControlMessenger.length === 0) {
        const updateDispatchControlMessenger = await DispatchControlMessenger.findByIdAndUpdate(req.params.id, {
          $set: {
            name,
            address,
            preparedBy,
            date,
            updatedAt: Date.now(),
          },
        });
        res.json({
          dbRes: updateDispatchControlMessenger,
          isSuccess: true
        });
      } else {
        res.json({
          dbRes: "Dispatch control messenger name, address and prepared must be unique.",
          isSuccess: false
        });
      }
    } catch (error) {
      res.json({
        dbRes: err,
        isSuccess: false
      });
    }
  } else {
    res.json({
      dbRes: "Required values are either invalid or empty.",
      isSuccess: false
    });
  }
});

// @route   PATCH api/dispatchControlMessenger/:id
// @desc    Update A DispatchControlMessenger
// @access  Private
router.patch("/:id", async (req, res) => {
  let toUpdate = {};
  const name = req.body.name;
  const address = req.body.address;
  const preparedBy = req.body.preparedBy;
  const date = req.body.date;
  if (name) toUpdate.name = name;
  if (address) toUpdate.address = address;
  if (preparedBy) toUpdate.prepared = preparedBy;
  if (date) toUpdate.prepared = date;
  if (!_.isNil(name) || !_.isNil(address) || !_.isNil(preparedBy) || !_.isNil(date)) {
    try {
      const getDispatchControlMessenger = await DispatchControlMessenger.find({
        name,
        address,
        preparedBy,
        date,
        deletedAt: {
          $exists: false
        }
      });
      if (getDispatchControlMessenger.length === 0) {
        const updateDispatchControlMessenger = await DispatchControlMessenger.findByIdAndUpdate(req.params.id, {
          $set: toUpdate,
          updatedAt: Date.now(),
        });
        res.json({
          dbRes: updateDispatchControlMessenger,
          isSuccess: true
        });
      } else {
        res.json({
          dbRes: "Dispatch control messenger name, address and prepared must be unique.",
          isSuccess: false
        });
      }
    } catch (error) {
      res.json({
        dbRes: err,
        isSuccess: false
      });
    }
  } else {
    res.json({
      dbRes: "Required values are either invalid or empty.",
      isSuccess: false
    });
  }
});

// @route   DELETE api/dispatchControlMessenger/:id
// @desc    Delete A DispatchControlMessenger
// @access  Private
router.delete("/:id", async (req, res) => {
  try {
    const getDispatchControlMessenger = await DispatchControlMessenger.find({
      _id: req.params.id,
      deletedAt: {
        $exists: false
      }
    });
    if (getDispatchControlMessenger.length > 0) {
      const deleteDispatchControlMessenger = await DispatchControlMessenger.findByIdAndUpdate(req.params.id, {
        $set: {
          deletedAt: Date.now(),
        },
      });
      res.json({
        dbRes: deleteDispatchControlMessenger,
        isSuccess: true
      });
    } else {
      res.json({
        dbRes: "Dispatch control messenger is already deleted.",
        isSuccess: false
      });
    }
  } catch (error) {
    res.json({
      dbRes: err,
      isSuccess: false
    });
  }
});

module.exports = router;