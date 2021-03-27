const express = require("express");
const router = express.Router();
const EncodeList = require("../models/encodeList");
const _ = require("lodash");
const moment = require("moment");

// @route   GET api/user
// @desc    Get All encodeList
// @access  Public
router.get("/", async (req, res) => {
    const condition = !_.isNil(req.query.condition) ?
        JSON.parse(req.query.condition) :
        {};
    const limit = !_.isNil(req.query.limit) ? JSON.parse(req.query.limit) : 0;
    const skip = !_.isNil(req.query.skip) ? JSON.parse(req.query.skip) : 0;
    if (_.isNil(condition.deletedAt)) {
        condition.deletedAt = {
            $exists: false,
        };
    }
    try {
        const encodeListIds = await EncodeList.find(condition, {_id: 1})
            .skip(skip)
            .limit(limit);
        const removeObjEncodeListIds = encodeListIds.map((res) => {
            return res._id
        })
        const getAllEncodeList = await EncodeList.aggregate([{
                $match: {
                    _id: {
                        $in: removeObjEncodeListIds
                    },
                },
            },
            {
                $lookup: {
                    from: "records",
                    let: {
                        id: "$_id"
                    },
                    pipeline: [{
                        $match: {
                            deletedAt: {
                                $exists: false
                            },
                            messengerId: {
                                $exists: false
                            },
                            $expr: {
                                $eq: ["$encodeListId", "$$id"],
                            },
                        },
                    }, ],
                    as: "unAssignedRecord",
                },
            },
            {
                $lookup: {
                    from: "records",
                    let: {
                        id: "$_id"
                    },
                    pipeline: [{
                        $match: {
                            deletedAt: {
                                $exists: false
                            },
                            messengerId: {
                                $exists: true
                            },
                            $expr: {
                                $eq: ["$encodeListId", "$$id"],
                            },
                        },
                    }, ],
                    as: "assignedRecord",
                },
            },
            {
                $lookup: {
                    from: "records",
                    let: {
                        id: "$_id"
                    },
                    pipeline: [{
                        $match: {
                            deletedAt: {
                                $exists: false
                            },
                            $expr: {
                                $eq: ["$encodeListId", "$$id"],
                            },
                        },
                    }, ],
                    as: "record",
                },
            },
            {
                $addFields: {
                    recordCount: {
                        $size: "$record"
                    },
                    assignedRecordCount: {
                        $size: "$assignedRecord"
                    },
                    unAssignedRecordCount: {
                        $size: "$unAssignedRecord"
                    },
                },
            },
            {
                $unset: ["record", "assignedRecord", "unAssignedRecord"]
            },
        ]);
        res.json({
            dbRes: getAllEncodeList,
            isSuccess: true,
        });
    } catch (error) {
        res.json({
            dbRes: error.message,
            isSuccess: false,
        });
    }
});

// @route   GET api/user
// @desc    Get All encodeList
// @access  Public
router.get("/count", async (req, res) => {
    const condition = !_.isNil(req.query.condition) ?
        JSON.parse(req.query.condition) :
        {};
    if (_.isNil(condition.deletedAt)) {
        condition.deletedAt = {
            $exists: false,
        };
    }
    try {
        const getAllEncodeList = await EncodeList.find(
            condition
        ).estimatedDocumentCount();
        res.json({
            dbRes: getAllEncodeList,
            isSuccess: true,
        });
    } catch (error) {
        res.json({
            dbRes: err,
            isSuccess: false,
        });
    }
});

// @route   GET api/encodeList/:id
// @desc    Get Single EncodeList
// @access  Public
router.get("/:id", async (req, res) => {
    try {
        const getEncodeList = await EncodeList.findById({
            _id: req.params.id,
            deletedAt: {
                $exists: false,
            },
        });
        res.json({
            dbRes: getEncodeList,
            isSuccess: true,
        });
    } catch (error) {
        res.json({
            dbRes: err,
            isSuccess: false,
        });
    }
});

// @route   POST api/encodeList/add
// @desc    Add A EncodeList
// @access  Private
router.post("/", async (req, res) => {
    const fileName = req.body.fileName;
    if (!_.isNil(fileName) && fileName !== "") {
        const newEncodeList = new EncodeList({
            fileName,
        });

        try {
            const getEncodeList = await EncodeList.find({
                fileName,
                deletedAt: {
                    $exists: false,
                },
            });
            if (getEncodeList.length === 0) {
                const createEncodeList = await newEncodeList.save();
                res.json({
                    dbRes: createEncodeList,
                    isSuccess: true,
                });
            } else {
                res.json({
                    dbRes: "Encode list filename must be unique",
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
            dbRes: "Required values are either invalid or empty",
            isSuccess: false,
        });
    }
});

// @route   PUT api/encodeList/:id
// @desc    Update A EncodeList
// @access  Private
router.put("/:id", async (req, res) => {
    const fileName = req.body.fileName;
    if (!_.isNil(fileName)) {
        try {
            const getEncodeList = await EncodeList.find({
                fileName,
                deletedAt: {
                    $exists: false,
                },
            });
            if (getEncodeList.length === 0) {
                const updateEncodeList = await EncodeList.findByIdAndUpdate(
                    req.params.id, {
                        $set: {
                            fileName,
                            updatedAt: Date.now(),
                        },
                    }
                );
                res.json({
                    dbRes: updateEncodeList,
                    isSuccess: true,
                });
            } else {
                res.json({
                    dbRes: "Encode list file name must be unique.",
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

// @route   PATCH api/encodeList/:id
// @desc    Update A EncodeList
// @access  Private
router.patch("/:id", async (req, res) => {
    let toUpdate = {};
    const fileName = req.body.fileName;
    if (fileName) toUpdate.fileName = fileName;
    if (!_.isNil(fileName)) {
        try {
            const getEncodeList = await EncodeList.find({
                fileName,
                deletedAt: {
                    $exists: false,
                },
            });
            if (getEncodeList.length === 0) {
                const updateEncodeList = await EncodeList.findByIdAndUpdate(
                    req.params.id, {
                        $set: toUpdate,
                        updatedAt: Date.now(),
                    }
                );
                res.json({
                    dbRes: updateEncodeList,
                    isSuccess: true,
                });
            } else {
                res.json({
                    dbRes: "Encode list filename must be unique.",
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

// @route   DELETE api/encodeList/:id
// @desc    Delete A EncodeList
// @access  Private
router.delete("/:id", async (req, res) => {
    try {
        const getEncodeList = await EncodeList.find({
            _id: req.params.id,
            deletedAt: {
                $exists: false,
            },
        });
        if (getEncodeList.length > 0) {
            const deleteEncodeList = await EncodeList.findByIdAndUpdate(
                req.params.id, {
                    $set: {
                        deletedAt: Date.now(),
                    },
                }
            );
            res.json({
                dbRes: deleteEncodeList,
                isSuccess: true,
            });
        } else {
            res.json({
                dbRes: "Encode list is already deleted.",
                isSuccess: false,
            });
        }
    } catch (error) {
        res.json({
            dbRes: error,
            isSuccess: false,
        });
    }
});
module.exports = router;