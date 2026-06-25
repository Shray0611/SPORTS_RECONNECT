const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minlength: [2, "Name must be at least 2 characters long"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        "Please enter a valid email",
      ],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters long"],
    },
    role: {
      type: String,
      enum: ["official", "organizer", "admin"],
      default: "official",
      required: true,
    },
    phone: { type: String, trim: true },
    location: { type: String, trim: true },
    dateOfBirth: { type: String, trim: true }, // for officials
    dateOfEstablishment: { type: String, trim: true }, // for organizers
    sports: { type: [String], default: [] },
    experience: { type: String, trim: true },
    organization: { type: String, trim: true },
    certifications: { type: [String], default: [] },
    profilePhoto: { type: String, default: null }, // base64 or URL
    approvalStatus: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: function() {
        return this.role === "admin" ? "approved" : "pending";
      },
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Hash password before saving
userSchema.pre("save", async function (next) {
  // Only hash the password if it has been modified (or is new)
  if (!this.isModified("password")) return next();

  try {
    // Generate salt with 12 rounds
    const salt = await bcrypt.genSalt(12);
    // Hash password
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Method to compare password
userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Method to get user without password
userSchema.methods.toJSON = function () {
  const user = this.toObject();
  delete user.password;
  return user;
};

module.exports = mongoose.model("User", userSchema);
