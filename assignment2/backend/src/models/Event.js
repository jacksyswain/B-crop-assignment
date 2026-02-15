const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    organizer: { type: String, required: true },
    location: { type: String, required: true },
    dateTime: { type: Date, required: true },
    description: { type: String },

    capacity: { type: Number, required: true },
    availableSeats: { type: Number, required: true },

    category: { type: String },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    }
  },
  { timestamps: true }
);

eventSchema.index({
  name: "text",
  location: "text",
  category: "text"
});

module.exports = mongoose.model("Event", eventSchema);
