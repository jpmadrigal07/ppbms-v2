const express = require("express");
const router = express.Router();
const User = require("../models/user");

// @route   GET api/user
// @desc    Get All User
// @access  Public
router.get("/", async (req, res) => {
  const condition = !_.isNil(req.query.condition) ? JSON.parse(req.query.condition) : {};
  if (_.isNil(condition.deletedAt)) {
      condition.isBlocked = {
          $exists: false
      }
  }
  try {
    const getAllUser = await User.find(condition);
    res.json({
      dbRes: getAllUser,
      isSuccess: true
    });
  } catch (err) {
    res.json({
      dbRes: err,
      isSuccess: false
    });
  }
});

// @route   GET api/user/:id
// @desc    Get Single User
// @access  Public
router.get("/:id", async (req, res) => {
  try {
    const getUser = await User.findById({
      _id: req.params.id,
      isBlocked: {
          $exists: false
      }
    });
    res.json({
      dbRes: getUser,
      isSuccess: true
    });
  } catch (err) {
    res.json({
      dbRes: err,
      isSuccess: false
    });
  }
});

// @route   POST api/user/add
// @desc    Add A User
// @access  Private
router.post("/", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const role = req.body.role;
  const updatedAt = Date.now();
  const createdAt = Date.now();

  const newUser = new User({
    username,
    password,
    firstName,
    lastName,
    role,
    updatedAt,
    createdAt,
  });
  
  try {
    const createUser = await newUser.save();
    res.json({ dbRes: createUser, isSuccess: true });
  } catch (err) {
    res.json({ dbRes: err, isSuccess: false });
  }
});

// @route   PUT api/user/:id
// @desc    Update A User
// @access  Private
router.put("/:id", async (req, res) => {
  try {
    const updateUser = await User.findByIdAndUpdate(req.params.id, {
      $set: {
        username: req.body.username,
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        role: req.body.role,
        isBlocked: req.body.isBlocked,
        updatedAt: Date.now(),
      },
    });
    if (updateUser) res.status(201).json("User updated.");
    else res.status(400).json("Error found.");
  } catch (error) {
    res.status(501).json({ Error: error });
  }
});

// @route   PATCH api/user/:id
// @desc    Update A User
// @access  Private
router.patch("/:id", async (req, res) => {
  let forUpdate = {};
  if (req.body.role) forUpdate.role = req.body.role;
  if (req.body.isBlocked) forUpdate.isBlocked = req.body.isBlocked;
  if (req.body.username) forUpdate.username = req.body.username;
  if (req.body.password) forUpdate.password = req.body.password;
  if (req.body.firstName) forUpdate.firstName = req.body.firstName;
  if (req.body.lastName) forUpdate.lastName = req.body.lastName;
  try {
    const updateUser = await User.findByIdAndUpdate(req.params.id, {
      $set: forUpdate,
      updatedAt: Date.now(),
    }, {
      new: true
    });
    res.json({
      dbRes: updateUser,
      isSuccess: true
    });
  } catch (err) {
    res.json({
      dbRes: err,
      isSuccess: false
  });
  }
});

// @route   DELETE api/user/:id
// @desc    Delete A User
// @access  Private
router.delete("/:id", async (req, res) => {
  try {
    const deleteUser = await User.findById(req.params.id);
    deleteUser.remove();
    res.status(201).json({ success: true });
  } catch (error) {
    res.status(501).json({ Error: error });
  }
});
module.exports = router;
