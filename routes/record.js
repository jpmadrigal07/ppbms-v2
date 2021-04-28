const express = require("express");
const router = express.Router();
const Record = require("../models/record");
const EncodeList = require("../models/encodeList");
const _ = require("lodash");
const path = require("path");
const moment = require("moment");
const { extractExcelFile } = require("../services/excelJS");
const { masterListValidHeaderNames } = require("../services/constant");
const { isSheetMasterList } = require("../services/recordHelper");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

// @route   GET api/record
// @desc    Get All Record
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
    const getAllRecord = await Record.find(condition);
    res.json({
      dbRes: getAllRecord,
      isSuccess: true,
    });
  } catch (error) {
    res.json({
      dbRes: err,
      isSuccess: false,
    });
  }
});

// @route   GET api/record/count
// @desc    Get All Record
// @access  Public
router.get("/count", async (req, res) => {
  const condition = !_.isNil(req.query.condition)
    ? JSON.parse(req.query.condition)
    : {};
  if (_.isNil(condition.deletedAt)) {
    condition.deletedAt = {
      $exists: false,
    };
  }
  try {
    const getAllRecord = await Record.find(condition).countDocuments();
    res.json({
      dbRes: getAllRecord,
      isSuccess: true,
    });
  } catch (error) {
    res.json({
      dbRes: err,
      isSuccess: false,
    });
  }
});

// @route   GET api/record/:id
// @desc    Get Single Record
// @access  Public
router.get("/:id", async (req, res) => {
  try {
    const getRecord = await Record.findById({
      _id: req.params.id,
      deletedAt: {
        $exists: false,
      },
    });
    res.json({
      dbRes: getRecord,
      isSuccess: true,
    });
  } catch (error) {
    res.json({
      dbRes: err,
      isSuccess: false,
    });
  }
});

// @route   POST api/record/add
// @desc    Add A Record
// @access  Private
router.post("/", async (req, res) => {
  const messengerId = req.body.messengerId;
  const encodeListId = req.body.encodeListId;
  const sender = req.body.sender;
  const delType = req.body.delType;
  const pud = req.body.pud;
  const month = req.body.month;
  const year = req.body.year;
  const jobNum = req.body.jobNum;
  const checkList = req.body.checkList;
  const fileName = req.body.fileName;
  const seqNum = req.body.seqNum;
  const cycleCode = req.body.cycleCode;
  const qty = req.body.qty;
  const address = req.body.address;
  const area = req.body.area;
  const subsName = req.body.subsName;
  const barCode = req.body.barCode;
  const acctNum = req.body.acctNum;
  const dateRecieved = req.body.dateRecieved;
  const recievedBy = req.body.recievedBy;
  const relation = req.body.relation;
  const messenger = req.body.messenger;
  const status = req.body.status;
  const reasonRTS = req.body.reasonRTS;
  const remarks = req.body.remarks;
  const dateReported = req.body.dateReported;
  if (
    !_.isNil(messengerId) &&
    !_.isNil(encodeListId) &&
    !_.isNil(sender) &&
    !_.isNil(delType) &&
    !_.isNil(pud) &&
    !_.isNil(month) &&
    !_.isNil(year) &&
    !_.isNil(jobNum) &&
    !_.isNil(checkList) &&
    !_.isNil(fileName) &&
    !_.isNil(seqNum) &&
    !_.isNil(cycleCode) &&
    !_.isNil(qty) &&
    !_.isNil(address) &&
    !_.isNil(area) &&
    !_.isNil(subsName) &&
    !_.isNil(barCode) &&
    !_.isNil(acctNum) &&
    !_.isNil(dateRecieved) &&
    !_.isNil(recievedBy) &&
    !_.isNil(relation) &&
    !_.isNil(messenger) &&
    !_.isNil(status) &&
    !_.isNil(reasonRTS) &&
    !_.isNil(remarks) &&
    !_.isNil(dateReported)
  ) {
    const newRecord = new Record({
      messengerId,
      encodeListId,
      sender,
      delType,
      pud,
      month,
      year,
      jobNum,
      checkList,
      fileName,
      seqNum,
      cycleCode,
      qty,
      address,
      area,
      subsName,
      barCode,
      acctNum,
      dateRecieved,
      recievedBy,
      relation,
      messenger,
      reasonRTS,
      remarks,
    });
    try {
      const getRecord = await Record.find({
        messengerId,
        encodeListId,
        sender,
        delType,
        pud,
        month,
        year,
        jobNum,
        checkList,
        fileName,
        seqNum,
        cycleCode,
        qty,
        address,
        area,
        subsName,
        barCode,
        acctNum,
        dateRecieved,
        recievedBy,
        relation,
        messenger,
        reasonRTS,
        remarks,
        deletedAt: {
          $exists: false,
        },
      });
      if (getRecord.length === 0) {
        const createRecord = await newRecord.save();
        res.json({
          dbRes: createRecord,
          isSuccess: true,
        });
      } else {
        res.json({
          dbRes: "Record must be unique.",
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

// @route   POST api/record/upload
// @desc    Upload File And Save Records
// @access  Private
router.post("/upload", async (req, res) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    res.json({
      dbRes: "No file found",
      isSuccess: false,
    });
    return;
  }

  const { name, mv } = req.files.file;
  const encodeListId = req.body.encodeListId;
  const barcodeMiddleText = req.body.barcodeMiddleText;
  const fileExt = path.extname(name);
  const allowedExt = [".xlsx", ".xls"];

  if (!allowedExt.includes(fileExt)) {
    res.json({
      dbRes: "This uploader only accept excel file",
      isSuccess: false,
    });
    return;
  }

  const uploadPath = path.join(__dirname, `../uploads/${name}`);
  mv(uploadPath, async (err) => {
    if (err) {
      res.json({
        dbRes: err.message,
        isSuccess: false,
      });
      return;
    }
    // insert encode list
    if (!_.isNil(name)) {
      try {
        const recordEncodeList = await Record.find({
          encodeListId: encodeListId,
          deletedAt: {
            $exists: false,
          },
        });
        if (recordEncodeList.length === 0) {
          const workbook = await extractExcelFile(uploadPath);
          const worksheet = workbook.worksheets[0];
          if (!_.isNil(worksheet)) {
            const recordCount = await Record.countDocuments();
            let recordLastCount = recordCount;
            const currentYear = moment().year();
            const rows = worksheet._rows;
            const toUploadFileHeaders = worksheet.getRow(1).values;
            const masterListSheet = isSheetMasterList(
              toUploadFileHeaders,
              masterListValidHeaderNames
            );
            // Iterate over all rows (including empty rows) in a worksheet
            const restructuredRows = rows
              .map((res, i) => {
                if (i > 1) {
                  recordLastCount++;
                  const values = worksheet.getRow(i).values;
                  const barCode = `${values[10]}${barcodeMiddleText}${recordLastCount}`;
                  return {
                    encodeListId: encodeListId,
                    sender: values[2],
                    delType: values[3],
                    pud: !_.isNil(values[4])
                      ? moment(values[4]).format("MM/DD/YYYY")
                      : null,
                    month: values[5],
                    year: currentYear,
                    jobNum: values[6],
                    checkList: values[7],
                    fileName: values[8],
                    seqNum: parseInt(values[9]),
                    cycleCode: values[10],
                    qty: parseInt(values[11]),
                    address: values[12],
                    area: values[13],
                    subsName: values[14],
                    barCode: barCode,
                    acctNum: values[16],
                  };
                }
              })
              .filter((res) => !_.isNil(res));
            if (restructuredRows.length > 0 && masterListSheet) {
              try {
                const insertResult = await Record.insertMany(restructuredRows);
                res.json({
                  dbRes: insertResult,
                  isSuccess: true,
                });
              } catch (error) {
                res.json({
                  dbRes: error.message,
                  isSuccess: true,
                });
              }
            } else if (excelRecords.length === 0 && masterListSheet) {
              res.json({
                dbRes: "Excel sheet is empty",
                isSuccess: false,
              });
            } else {
              res.json({
                dbRes: "Invalid excel sheet",
                isSuccess: false,
              });
            }
          } else {
            res.json({
              dbRes: "Excel sheet doesn't exist",
              isSuccess: false,
            });
          }
        } else {
          res.json({
            dbRes:
              "File name already exist. Maybe this file is already uploaded.",
            isSuccess: false,
          });
        }
      } catch (err) {
        res.json({
          dbRes: err,
          isSuccess: false,
        });
      }
    }
  });
});

// @route   PATCH api/record/upload
// @desc    Upload File And Save Records
// @access  Private
router.patch("/update", async (req, res) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    res.json({
      dbRes: "No file found",
      isSuccess: false,
    });
    return;
  }

  const { name, mv } = req.files.file;
  const originalSheetNumber = req.body.sheetNumber;
  // Needed to subtract 1 because sheet number starts with 0
  // but user input starts at 1
  const sheetNumber = originalSheetNumber - 1;
  const fileExt = path.extname(name);
  const allowedExt = [".xlsx", ".xls"];

  if (!allowedExt.includes(fileExt)) {
    res.json({
      dbRes: "This uploader only accept excel file",
      isSuccess: false,
    });
    return;
  }

  const uploadPath = path.join(__dirname, `../uploads/${name}`);
  mv(uploadPath, async (err) => {
    if (err) {
      res.json({
        dbRes: err.message,
        isSuccess: false,
      });
      return;
    }
    // insert encode list
    if (!_.isNil(name)) {
      try {
        const workbook = await extractExcelFile(uploadPath);
        const worksheet = workbook.worksheets[sheetNumber];
        if (!_.isNil(worksheet)) {
          // Iterate over all rows (including empty rows) in a worksheet
          const rows = worksheet._rows;
          const toUploadFileHeaders = worksheet.getRow(1).values;
          const isExcelRecordsEmpty = rows.length === 0 ? true : false;
          const masterListSheet = isSheetMasterList(
            toUploadFileHeaders,
            masterListValidHeaderNames
          );
          const restructuredRows = rows
            .map((res, i) => {
              if (i > 1) {
                const values = worksheet.getRow(i).values;
                const barCode = values[15];
                const dateRecieved = !_.isNil(values[17])
                  ? moment(new Date(values[17])).format()
                  : undefined;
                const recievedBy = values[18];
                const relation = values[19];
                const messenger = values[20];
                const status = values[21];
                const reasonRTS = values[22];
                const remarks = values[23];
                const dateReported = !_.isNil(values[24])
                  ? moment(new Date(values[24])).format()
                  : undefined;
                const bulk = {
                  updateOne: {
                    filter: { barCode },
                    update: {
                      $set: {
                        dateRecieved,
                        recievedBy,
                        relation,
                        messenger,
                        status,
                        reasonRTS,
                        remarks,
                        dateReported,
                      },
                    },
                  },
                };
                if (
                  !_.isNil(dateRecieved) ||
                  !_.isNil(recievedBy) ||
                  !_.isNil(relation) ||
                  !_.isNil(messenger) ||
                  !_.isNil(status) ||
                  !_.isNil(reasonRTS) ||
                  !_.isNil(remarks) ||
                  !_.isNil(dateReported)
                ) {
                  return bulk;
                }
              }
            })
            .filter((res) => !_.isNil(res));
          const updatedRecordBarcode = restructuredRows
            .map((res) => {
              return res.updateOne.filter.barCode;
            })
            .filter((res) => !_.isNil(res));
          if (!isExcelRecordsEmpty && masterListSheet) {
            if (restructuredRows.length > 0) {
              await Record.bulkWrite(restructuredRows);
              const updatedRecord = await Record.find({
                barCode: { $in: updatedRecordBarcode },
              }).exec();
              res.json({
                dbRes: updatedRecord,
                isSuccess: true,
              });
            } else {
              res.json({
                dbRes: "No data to encode",
                isSuccess: false,
              });
            }
          } else if (isExcelRecordsEmpty && !masterListSheet) {
            res.json({
              dbRes: "Excel sheet is empty",
              isSuccess: false,
            });
          } else {
            res.json({
              dbRes: "Invalid excel sheet",
              isSuccess: false,
            });
          }
        } else {
          res.json({
            dbRes: "Excel sheet doesn't exist",
            isSuccess: false,
          });
        }
      } catch (err) {
        res.json({
          dbRes: err,
          isSuccess: false,
        });
      }
    }
  });
});

// @route   PUT api/record/:id
// @desc    Update A Record
// @access  Private
router.put("/:id", async (req, res) => {
  const messengerId = req.body.messengerId;
  const encodeListId = req.body.encodeListId;
  const sender = req.body.sender;
  const delType = req.body.delType;
  const pud = req.body.pud;
  const month = req.body.month;
  const year = req.body.year;
  const jobNum = req.body.jobNum;
  const checkList = req.body.checkList;
  const fileName = req.body.fileName;
  const seqNum = req.body.seqNum;
  const cycleCode = req.body.cycleCode;
  const qty = req.body.qty;
  const address = req.body.address;
  const area = req.body.area;
  const subsName = req.body.subsName;
  const barCode = req.body.barCode;
  const acctNum = req.body.acctNum;
  const dateRecieved = req.body.dateRecieved;
  const recievedBy = req.body.recievedBy;
  const relation = req.body.relation;
  const messenger = req.body.messenger;
  const status = req.body.status;
  const reasonRTS = req.body.reasonRTS;
  const remarks = req.body.remarks;
  const dateReported = req.body.dateReported;
  if (
    !_.isNil(messengerId) &&
    !_.isNil(encodeListId) &&
    !_.isNil(sender) &&
    !_.isNil(delType) &&
    !_.isNil(pud) &&
    !_.isNil(month) &&
    !_.isNil(year) &&
    !_.isNil(jobNum) &&
    !_.isNil(checkList) &&
    !_.isNil(fileName) &&
    !_.isNil(seqNum) &&
    !_.isNil(cycleCode) &&
    !_.isNil(qty) &&
    !_.isNil(address) &&
    !_.isNil(area) &&
    !_.isNil(subsName) &&
    !_.isNil(barCode) &&
    !_.isNil(acctNum) &&
    !_.isNil(dateRecieved) &&
    !_.isNil(recievedBy) &&
    !_.isNil(relation) &&
    !_.isNil(messenger) &&
    !_.isNil(status) &&
    !_.isNil(reasonRTS) &&
    !_.isNil(remarks) &&
    !_.isNil(dateReported)
  ) {
    try {
      const getRecord = await Record.find({
        messengerId,
        encodeListId,
        sender,
        delType,
        pud,
        month,
        year,
        jobNum,
        checkList,
        fileName,
        seqNum,
        cycleCode,
        qty,
        address,
        area,
        subsName,
        barCode,
        acctNum,
        dateRecieved,
        recievedBy,
        relation,
        messenger,
        reasonRTS,
        remarks,
        deletedAt: {
          $exists: false,
        },
      });
      if (getRecord.length === 0) {
        const updateRecord = await Record.findByIdAndUpdate(req.params.id, {
          $set: {
            messengerId,
            encodeListId,
            sender,
            delType,
            pud,
            month,
            year,
            jobNum,
            checkList,
            fileName,
            seqNum,
            cycleCode,
            qty,
            address,
            area,
            subsName,
            barCode,
            acctNum,
            dateRecieved,
            recievedBy,
            relation,
            messenger,
            reasonRTS,
            remarks,
            updatedAt: Date.now(),
          },
        });
        res.json({
          dbRes: updateRecord,
          isSuccess: true,
        });
      } else {
        res.json({
          dbRes: "Record must be unique.",
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

// @route   PATCH api/record/:id
// @desc    Update A Record
// @access  Private
router.patch("/:id", async (req, res) => {
  let toUpdate = {};
  const messengerId = req.body.messengerId;
  const encodeListId = req.body.encodeListId;
  const sender = req.body.sender;
  const delType = req.body.delType;
  const pud = req.body.pud;
  const month = req.body.month;
  const year = req.body.year;
  const jobNum = req.body.jobNum;
  const checkList = req.body.checkList;
  const fileName = req.body.fileName;
  const seqNum = req.body.seqNum;
  const cycleCode = req.body.cycleCode;
  const qty = req.body.qty;
  const address = req.body.address;
  const area = req.body.area;
  const subsName = req.body.subsName;
  const barCode = req.body.barCode;
  const acctNum = req.body.acctNum;
  const dateRecieved = req.body.dateRecieved;
  const recievedBy = req.body.recievedBy;
  const relation = req.body.relation;
  const messenger = req.body.messenger;
  const status = req.body.status;
  const reasonRTS = req.body.reasonRTS;
  const remarks = req.body.remarks;
  const dateReported = req.body.dateReported;
  if (messengerId) toUpdate.messengerId = messengerId;
  if (encodeListId) toUpdate.encodeListId = encodeListId;
  if (sender) toUpdate.sender = sender;
  if (delType) toUpdate.delType = delType;
  if (pud) toUpdate.pud = pud;
  if (month) toUpdate.month = month;
  if (year) toUpdate.year = year;
  if (jobNum) toUpdate.jobNum = jobNum;
  if (checkList) toUpdate.checkList = checkList;
  if (fileName) toUpdate.fileName = fileName;
  if (seqNum) toUpdate.seqNum = seqNum;
  if (cycleCode) toUpdate.cycleCode = cycleCode;
  if (qty) toUpdate.qty = qty;
  if (address) toUpdate.address = address;
  if (area) toUpdate.area = area;
  if (subsName) toUpdate.subsName = subsName;
  if (barCode) toUpdate.barCode = barCode;
  if (acctNum) toUpdate.acctNum = acctNum;
  if (dateRecieved) toUpdate.dateRecieved = dateRecieved;
  if (recievedBy) toUpdate.recievedBy = recievedBy;
  if (relation) toUpdate.relation = relation;
  if (messenger) toUpdate.messenger = messenger;
  if (status) toUpdate.status = status;
  if (reasonRTS) toUpdate.reasonRTS = reasonRTS;
  if (remarks) toUpdate.remarks = remarks;
  if (dateReported) toUpdate.dateReported = dateReported;
  if (
    !_.isNil(encodeListId) &&
    !_.isNil(sender) &&
    !_.isNil(delType) &&
    !_.isNil(pud) &&
    !_.isNil(month) &&
    !_.isNil(year) &&
    !_.isNil(jobNum) &&
    !_.isNil(checkList) &&
    !_.isNil(fileName) &&
    !_.isNil(seqNum) &&
    !_.isNil(cycleCode) &&
    !_.isNil(qty) &&
    !_.isNil(address) &&
    !_.isNil(area) &&
    !_.isNil(subsName) &&
    !_.isNil(barCode)
  ) {
    try {
      const getRecord = await Record.find({
        messengerId,
        encodeListId,
        sender,
        delType,
        pud,
        month,
        year,
        jobNum,
        checkList,
        fileName,
        seqNum,
        cycleCode,
        qty,
        address,
        area,
        subsName,
        barCode,
        acctNum,
        dateRecieved,
        recievedBy,
        relation,
        messenger,
        reasonRTS,
        remarks,
        deletedAt: {
          $exists: false,
        },
      });
      if (getRecord.length === 0) {
        const updateRecord = await Record.findByIdAndUpdate(
          req.params.id,
          {
            $set: toUpdate,
            updatedAt: Date.now(),
          },
          {
            new: true,
          }
        );
        res.json({
          dbRes: updateRecord,
          isSuccess: true,
        });
      } else {
        res.json({
          dbRes: "Record must be unique",
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
      dbRes: "Required values are either invalid or empty",
      isSuccess: false,
    });
  }
});

// @route   DELETE api/record/bulk
// @desc    Delete A Record
// @access  Private
router.delete("/bulk", async (req, res) => {
  try {
    const getRecord = await Record.find({
      encodeListId: { $in: req.body },
      deletedAt: {
        $exists: false,
      },
    });
    if (getRecord.length > 0) {
      const deleteRecord = await Record.updateMany(
        { encodeListId: { $in: req.body } },
        {
          $set: {
            deletedAt: Date.now(),
          },
        }
      );
      res.json({
        dbRes: deleteRecord,
        isSuccess: true,
      });
    } else {
      res.json({
        dbRes: "Record is already deleted.",
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

// @route   DELETE api/record/:id
// @desc    Delete A Record
// @access  Private
router.delete("/:id", async (req, res) => {
  try {
    const getRecord = await Record.find({
      _id: req.params.id,
      deletedAt: {
        $exists: false,
      },
    });
    if (getRecord.length > 0) {
      const deleteRecord = await Record.findByIdAndUpdate(req.params.id, {
        $set: {
          deletedAt: Date.now(),
        },
      });
      res.json({
        dbRes: deleteRecord,
        isSuccess: true,
      });
    } else {
      res.json({
        dbRes: "Record is already deleted.",
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
