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
    res.send({ success: true, data: updatedIdea });
  } catch (error) {
    console.log(error);
    res.status(500).send({ success: false, message: "Something went wrong!" });
  }
});

// DELETE an Idea
router.delete("/:id", async (req, res) => {
  try {
    await Idea.findByIdAndDelete(req.params.id);
    res.send({ success: true, data: {} });
  } catch (error) {
    console.log(error);
    res.status(500).send({ success: false, message: "Something went wrong!" });
  }
});

module.exports = router;

// pwd  zUAmuipAtqEJsaix
