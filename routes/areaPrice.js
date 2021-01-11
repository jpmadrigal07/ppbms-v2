const express = require("express");
const router = express.Router();
const AreaPrice = require("../models/areaPrice");
const _ = require("lodash");

// @route   GET api/user
// @desc    Get All AreaPrice
// @access  Public
router.get("/", async (req, res) => {
  const condition = !_.isNil(req.query.condition) ? JSON.parse(req.query.condition) : {};
  if (_.isNil(condition.deletedAt)) {
      condition.deletedAt = {
          $exists: false
      }
  }
  try {
    const getAllAreaPrice = await AreaPrice.find(condition);
    res.json({
      dbRes: getAllAreaPrice,
      isSuccess: true
    });
  } catch (error) {
    res.json({
      dbRes: err,
      isSuccess: false
    });
  }
});

// @route   GET api/areaPrice/:id
// @desc    Get Single AreaPrice
// @access  Public
router.get("/:id", async (req, res) => {
  try {
    const getAreaPrice = await AreaPrice.findById({
      _id: req.params.id,
      deletedAt: {
        $exists: false
      }
    });
    res.json({
      dbRes: getAreaPrice,
      isSuccess: true
    });
  } catch (error) {
    res.json({
      dbRes: err,
      isSuccess: false
    });
  }
});

// @route   POST api/areaPrice/add
// @desc    Add A AreaPrice
// @access  Private
router.post("/", async (req, res) => {
  const name = req.body.name;
  const price = req.body.price;
  if (!_.isNil(name) && !_.isNil(price)) {
    const newAreaPrice = new AreaPrice({
      name,
      price
    });
    try {
      const getAreaPrice = await AreaPrice.find({
        name,
        deletedAt: {
          $exists: false
        }
      });
      if (getAreaPrice.length === 0) {
        const createAreaPrice = await newAreaPrice.save();
        res.json({
          dbRes: createAreaPrice,
          isSuccess: true
        });
      } else {
        res.json({
          dbRes: "Area price name must be unique.",
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

// @route   PUT api/areaPrice/:id
// @desc    Update A AreaPrice
// @access  Private
router.put("/:id", async (req, res) => {
  const name = req.body.name;
  const price = req.body.price;
  if (!_.isNil(name) && !_.isNil(price)) {
    try {
      const getAreaPrice = await AreaPrice.find({
        name,
        deletedAt: {
          $exists: false
        }
      });
      if (getAreaPrice.length === 0) {
        const updateAreaPrice = await AreaPrice.findByIdAndUpdate(req.params.id, {
          $set: {
            name,
            price,
            updatedAt: Date.now(),
          },
        });
        res.json({
          dbRes: updateAreaPrice,
          isSuccess: true
        });
      } else {
        res.json({
          dbRes: "Area price name must be unique.",
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

// @route   PATCH api/areaPrice/:id
// @desc    Update A AreaPrice
// @access  Private
router.patch("/:id", async (req, res) => {
  let toUpdate = {};
  const name = req.body.name;
  const price = req.body.price;
  if (name) toUpdate.name = name;
  if (price) toUpdate.price = price;
  if (!_.isNil(name) || !_.isNil(price)) {
    try {
        const updateAreaPrice = await AreaPrice.findByIdAndUpdate(req.params.id, {
          $set: toUpdate,
          updatedAt: Date.now(),
        }, {new: true});
        res.json({
          dbRes: updateAreaPrice,
          isSuccess: true
        });
    } catch (err) {
      res.json({
        dbRes: err.message,
        isSuccess: false
      });
    }
  } else {
    res.json({
      dbRes: "Required values are either invalid or empty",
      isSuccess: false
    });
  }
});

// @route   DELETE api/areaPrice/:id
// @desc    Delete A AreaPrice
// @access  Private
router.delete("/:id", async (req, res) => {
  try {
    const getAreaPrice = await AreaPrice.find({
      _id: req.params.id,
      deletedAt: {
        $exists: false
      }
    });
    if (getAreaPrice.length > 0) {
      const deleteAreaPrice = await AreaPrice.findByIdAndUpdate(req.params.id, {
        $set: {
          deletedAt: Date.now(),
        },
      });
      res.json({
        dbRes: deleteAreaPrice,
        isSuccess: true
      });
    } else {
      res.json({
        dbRes: "Area price is already deleted.",
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