const express = require("express");
const router = express.Router();
const BarcodeMiddleText = require("../models/barcodeMiddleText");
const _ = require("lodash");

// @route   GET api/user
// @desc    Get All BarcodeMiddleText
// @access  Public
router.get("/", async (req, res) => {
  const condition = !_.isNil(req.query.condition)
    ? JSON.parse(req.query.condition)
    : {};
  if (_.isNil(condition.deletedAt)) {
    condition.deletedAt = {
      $exists: false,
    };
  }
  try {
    const getAllBarcodeMiddleText = await BarcodeMiddleText.find(condition);
    res.json({
      dbRes: getAllBarcodeMiddleText,
      isSuccess: true,
    });
  } catch (error) {
    res.json({
      dbRes: err,
      isSuccess: false,
    });
  }
});

// @route   GET api/barcodeMiddleText/:id
// @desc    Get Single BarcodeMiddleText
// @access  Public
router.get("/:id", async (req, res) => {
  try {
    const getBarcodeMiddleText = await BarcodeMiddleText.findById({
      _id: req.params.id,
      deletedAt: {
        $exists: false,
      },
    });
    res.json({
      dbRes: getBarcodeMiddleText,
      isSuccess: true,
    });
  } catch (error) {
    res.json({
      dbRes: err,
      isSuccess: false,
    });
  }
});

// @route   POST api/barcodeMiddleText/add
// @desc    Add A BarcodeMiddleText
// @access  Private
router.post("/", async (req, res) => {
  const code = req.body.code;
  if (!_.isNil(code)) {
    const newBarcodeMiddleText = new BarcodeMiddleText({
      code,
    });

    try {
      const getBarcodeMiddleText = await BarcodeMiddleText.find({
        code,
        deletedAt: {
          $exists: false,
        },
      });
      if (getBarcodeMiddleText.length === 0) {
        const createBarcodeMiddleText = await newBarcodeMiddleText.save();
        res.json({
          dbRes: createBarcodeMiddleText,
          isSuccess: true,
        });
      } else {
        res.json({
          dbRes: "Barcode middle text code must be unique.",
          isSuccess: false,
        });
      }
    } catch (err) {
      res.json({
        dbRes: err,
        isSuccess: false,
      });
    }
  } else {
    res.json({
      dbRes: "Required values are either invalid or empty.",
      isSuccess: false,
    });
  }
});

// @route   PUT api/barcodeMiddleText/:id
// @desc    Update A BarcodeMiddleText
// @access  Private
router.put("/:id", async (req, res) => {
  const code = req.body.code;
  if (!_.isNil(code)) {
    try {
      const getBarcodeMiddleText = await BarcodeMiddleText.find({
        code,
        deletedAt: {
          $exists: false,
        },
      });
      if (getBarcodeMiddleText.length === 0) {
        const updateBarcodeMiddleText = await BarcodeMiddleText.findByIdAndUpdate(
          req.params.id,
          {
            $set: {
              code,
              updatedAt: Date.now(),
            },
          }
        );
        res.json({
          dbRes: updateBarcodeMiddleText,
          isSuccess: true,
        });
      } else {
        res.json({
          dbRes: "Barcode middle text code must be unique.",
          isSuccess: false,
        });
      }
    } catch (error) {
      res.json({
        dbRes: err,
        isSuccess: false,
      });
    }
  } else {
    res.json({
      dbRes: "Required values are either invalid or empty.",
      isSuccess: false,
    });
  }
});

// @route   PATCH api/barcodeMiddleText/:id
// @desc    Update A BarcodeMiddleText
// @access  Private
router.patch("/:id", async (req, res) => {
  let toUpdate = {};
  const code = req.body.code;
  if (code) toUpdate.code = code;
  if (!_.isNil(code)) {
    try {
      const updateBarcodeMiddleText = await BarcodeMiddleText.findByIdAndUpdate(
        req.params.id,
        {
          $set: toUpdate,
          updatedAt: Date.now(),
        }, {new: true});
      res.json({
        dbRes: updateBarcodeMiddleText,
        isSuccess: true,
      });
    } catch (error) {
      res.json({
        dbRes: err,
        isSuccess: false,
      });
    }
  } else {
    res.json({
      dbRes: "Required values are either invalid or empty.",
      isSuccess: false,
    });
  }
});

// @route   DELETE api/barcodeMiddleText/:id
// @desc    Delete A BarcodeMiddleText
// @access  Private
router.delete("/:id", async (req, res) => {
  try {
    const getBarcodeMiddleText = await BarcodeMiddleText.find({
      _id: req.params.id,
      deletedAt: {
        $exists: false,
      },
    });
    if (getBarcodeMiddleText.length > 0) {
      const deleteBarcodeMiddleText = await BarcodeMiddleText.findByIdAndUpdate(
        req.params.id,
        {
          $set: {
            deletedAt: Date.now(),
          },
        }
      );
      res.json({
        dbRes: deleteBarcodeMiddleText,
        isSuccess: true,
      });
    } else {
      res.json({
        dbRes: "Barcode middle text is already deleted.",
        isSuccess: false,
      });
    }
  } catch (error) {
    res.json({
      dbRes: err,
      isSuccess: false,
    });
  }
});
module.exports = router;
