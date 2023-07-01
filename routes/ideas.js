const express = require("express");
const router = express.Router();

const Idea = require("../models/Idea");

// GET all ideas
router.get("/", async (req, res) => {
  try {
    const ideas = await Idea.find();
    res.send({ success: true, data: ideas });
  } catch (error) {
    console.log(error);
    res.status(500).send({ success: false, error: "Something went wrong!" });
  }
});

// GET an idea
router.get("/:id", async (req, res) => {
  try {
    const idea = await Idea.findById(req.params.id);
    res.send({ success: true, data: idea });
  } catch (error) {
    console.log(error);
    res.status(500).send({ success: false, message: "Something went wrong!" });
  }
});

// POST an idea
router.post("/", async (req, res) => {
  const idea = new Idea({
    tag: req.body.tag,
    text: req.body.text,
    username: req.body.username,
  });

  try {
    const savedIdea = await idea.save();
    res.send({ success: true, data: savedIdea });
  } catch (error) {
    console.log(error);
    res.status(500).send({ success: false, message: "Something went wrong!" });
  }
});

// UPDATE an Idea
router.put("/:id", async (req, res) => {
  try {
    const idea = await Idea.findById(req.params.id);
    // if username matches
    if (idea.username === req.body.username) {
      // update idea
      const updatedIdea = await Idea.findByIdAndUpdate(
        req.params.id,
        {
          $set: {
            text: req.body.text,
            tag: req.body.tag,
          },
        },
        { new: true }
      );
      return res.send({ success: true, data: updatedIdea });
    }

    // if they don't match
    res.status(403).send({
      success: false,
      error: "You are not authorized to modify this resource",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ success: false, message: "Something went wrong!" });
  }
});

// DELETE an Idea
router.delete("/:id", async (req, res) => {
  try {
    const idea = await Idea.findById(req.params.id);

    if (idea.username === req.body.username) {
      await Idea.findByIdAndDelete(req.params.id);
      return res.send({ success: true, data: {} });
    }

    res.status(403).send({
      success: false,
      error: "You are not authorized to delete this resource",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ success: false, message: "Something went wrong!" });
  }
});

module.exports = router;
