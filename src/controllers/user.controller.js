import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.models.js";
import { uploadImage } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const registerUser = asyncHandler(async (req, res) => {
  // Get user details from request body
  const { fullname, email, password, username } = req.body;
  console.log("Request body:", req.body);

  // Validate the user details
  if (
    [fullname, email, password, username].some((field) => field?.trim() === "")
  ) {
    throw new ApiError(400, "All fields are required");
  }
  // Check if the user already exists
  const existedUser = await User.findOne({
    $or: [{ username }, { email }],
  });
  if (existedUser) {
    throw new ApiError(409, "User already exists with this username or email");
  }

  // Debug: log incoming files and body
  console.log("req.files:", req.files);
  console.log("req.body:", req.body);
  //Check for avatar and cover image
  const avatarLocalPath = req.files?.avatar[0]?.path;
  const coverImageLocalPath = req.files?.coverImage[0]?.path;

  //If Available , upload the images to cloudinary
  if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar image is required");
  }

  const avatar = await uploadImage(avatarLocalPath);
  const coverImage = await uploadImage(coverImageLocalPath);

  if (!avatar) {
    throw new ApiError(500, "Failed to upload avatar image");
  }

  // Create a new user in the database
  const user = await User.create({
    fullname,
    avatar: avatar.url,
    coverImage: coverImage?.url || "",
    email,
    password,
    username: username.toLowerCase(),
  });

  //Remove password and refreshToken from the response
  const createdUser = await User.findById(user._id).select(
    "-password  -refreshToken"
  );
  //Check for user creation
  if (!createdUser) {
    throw new ApiError(500, "Something went wrong, user not created");
  }

  //Send the response
  return res.status(201).json({
    data: new ApiResponse(201, createdUser, "User registered successfully"),
  });
});

export { registerUser };
