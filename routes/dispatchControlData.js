const express = require("express");
const router = express.Router();
const DispatchControlData = require("../models/dispatchControlData");
const Record = require("../models/record");
const _ = require("lodash");

// @route   GET api/dispatchControlData
// @desc    Get All DispatchControlData
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
    const getAllDispatchControlData = await DispatchControlData.find(condition).skip(skip).limit(limit);
    res.json({
      dbRes: getAllDispatchControlData,
      isSuccess: true
    });
  } catch (error) {
    res.json({
      dbRes: err,
      isSuccess: false
    });
  }
});

// @route   GET api/record/count
// @desc    Get All Record
// @access  Public
router.get("/count/record", async (req, res) => {
  const condition = !_.isNil(req.query.condition)
    ? JSON.parse(req.query.condition)
    : {};
  const results = condition.map((query) => {
    // query.deletedAt = {
    //   $exists: false,
    // };
    return Record.aggregate([
      { $addFields: { sender: { $trim: { input: "$sender" } } } },
      { $match : JSON.parse(query) },
      { $group: { _id: null, count: { $sum: 1 } } }
    ]);
  });
  Promise.all(results).then((values) => {
    res.json({
      dbRes: values?.map((res) => {
        const count = res[0]?.count;
        return count ? count : 0;
      }),
      isSuccess: true,
    });
  }).catch(function(err) {
    res.json({
      dbRes: err,
      isSuccess: false,
    });
  });
});

// @route   GET api/dispatchControlData/:id
// @desc    Get Single DispatchControlData
// @access  Public
router.get("/:id", async (req, res) => {
  try {
    const getDispatchControlData = await DispatchControlData.findById({
      _id: req.params.id,
      deletedAt: {
        $exists: false
      }
    });
    res.json({
      dbRes: getDispatchControlData,
      isSuccess: true
    });
  } catch (error) {
    res.json({
      dbRes: err,
      isSuccess: false
    });
  }
});

// @route   POST api/dispatchControlData/add
// @desc    Add A DispatchControlData
// @access  Private
router.post("/", async (req, res) => {
  const messengerId = req.body.messengerId;
  const dataCycleCode = req.body.dataCycleCode;
  const pickupDate = req.body.pickupDate;
  const sender = req.body.sender;
  const delType = req.body.delType;
  if (!_.isNil(messengerId) && !_.isNil(dataCycleCode) && !_.isNil(pickupDate) && !_.isNil(sender) && !_.isNil(delType)) {
    const newDispatchControlData = new DispatchControlData({
      messengerId,
      dataCycleCode,
      pickupDate,
      sender,
      delType
    });
    try {
      const getDispatchControlData = await DispatchControlData.find({
        messengerId,
        dataCycleCode,
        pickupDate,
        sender,
        delType,
        deletedAt: {
          $exists: false
        }
      });
      if (getDispatchControlData.length === 0) {
        const createDispatchControlData = await newDispatchControlData.save();
        res.json({
          dbRes: createDispatchControlData,
          isSuccess: true
        });
      } else {
        res.json({
          dbRes: "Dispatch control data messenger id, data cycle code, pickup date, sender and delivery type must be unique.",
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

// @route   PUT api/dispatchControlData/:id
// @desc    Update A DispatchControlData
// @access  Private
router.put("/:id", async (req, res) => {
  const messengerId = req.body.messengerId;
  const dataCycleCode = req.body.dataCycleCode;
  const pickupDate = req.body.pickupDate;
  const sender = req.body.sender;
  const delType = req.body.delType;
  if (!_.isNil(messengerId) && !_.isNil(dataCycleCode) && !_.isNil(pickupDate) && !_.isNil(sender) && !_.isNil(delType)) {
    try {
      const getDispatchControlData = await DispatchControlData.find({
        messengerId,
        dataCycleCode,
        pickupDate,
        sender,
        delType,
        deletedAt: {
          $exists: false
        }
      });
      if (getDispatchControlData.length === 0) {
        const updateDispatchControlData = await DispatchControlData.findByIdAndUpdate(req.params.id, {
          $set: {
            messengerId,
            dataCycleCode,
            pickupDate,
            sender,
            delType,
            updatedAt: Date.now(),
          },
        });
        res.json({
          dbRes: updateDispatchControlData,
          isSuccess: true
        });
      } else {
        res.json({
          dbRes: "Dispatch control data messenger id, data cycle code, pickup date, sender and delivery type must be unique.",
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

// @route   PATCH api/dispatchControlData/:id
// @desc    Update A DispatchControlData
// @access  Private
router.patch("/:id", async (req, res) => {
  let toUpdate = {};
  const messengerId = req.body.messengerId;
  const dataCycleCode = req.body.dataCycleCode;
  const pickupDate = req.body.pickupDate;
  const sender = req.body.sender;
  const delType = req.body.delType;
  if (messengerId) toUpdate.messengerId = messengerId;
  if (dataCycleCode) toUpdate.dataCycleCode = dataCycleCode;
  if (pickupDate) toUpdate.pickupDate = pickupDate;
  if (sender) toUpdate.sender = sender;
  if (delType) toUpdate.delType = delType;
  if (!_.isNil(messengerId) || !_.isNil(dataCycleCode) || !_.isNil(pickupDate) || !_.isNil(sender) || !_.isNil(delType)) {
    try {
      const getDispatchControlData = await DispatchControlData.find({
        messengerId,
        dataCycleCode,
        pickupDate,
        sender,
        delType,
        deletedAt: {
          $exists: false
        }
      });
      if (getDispatchControlData.length === 0) {
        const updateDispatchControlData = await DispatchControlData.findByIdAndUpdate(req.params.id, {
          $set: toUpdate,
          updatedAt: Date.now(),
        }, {new: true});
        res.json({
          dbRes: updateDispatchControlData,
          isSuccess: true
        });
      } else {
        res.json({
          dbRes: "Dispatch control data messenger id, data cycle code, pickup date, sender and delivery type must be unique.",
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

// @route   DELETE api/dispatchControlData/:id
// @desc    Delete A DispatchControlData
// @access  Private
router.delete("/:id", async (req, res) => {
  try {
    const getDispatchControlData = await DispatchControlData.find({
      _id: req.params.id,
      deletedAt: {
        $exists: false
      }
    });
    if (getDispatchControlData.length > 0) {
      const deleteDispatchControlData = await DispatchControlData.findByIdAndUpdate(req.params.id, {
        $set: {
          deletedAt: Date.now(),
        },
      });
      res.json({
        dbRes: deleteDispatchControlData,
        isSuccess: true
      });
    } else {
      res.json({
        dbRes: "Dispatch control data is already deleted.",
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