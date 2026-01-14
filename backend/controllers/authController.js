import bcrypt from "bcryptjs";
import validator from "validator";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import Student from "../models/Student.js";
import Tutor from "../models/Tutor.js";
import Admin from "../models/Admin.js";
import Course from "../models/Course.js";
import Module from "../models/Module.js";
import RefreshToken from "../models/RefreshToken.js";
import ActivityLog from "../models/ActivityLog.js";
import { generateAccessToken } from "../utils/generateAccessToken.js";

export const login = async (req, res) => {
    try {
        const { email, password } = req.body || {};

        const user = await User.findOne({ email });
        if (!user) return res.status(401).json({ message: "Email address not registered" });

        const isMatching = await bcrypt.compare(password, user.password);
        if (!isMatching) return res.status(401).json({ message: "Invalid password" });

        const payload = {
            userId: user._id,
            role: user.role
        };

        const accessToken = generateAccessToken(payload);
        const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET);

        await RefreshToken.create({ token: refreshToken, userId: user._id });

        res.json({ accessToken, refreshToken, status: user.status, role: user.role });
    } catch (err) {
        res.status(500).json({ message: err.message || 'Login failed' });
    }
};

export const logout = async (req, res) => {
    const { refreshToken } = req.body;

    if (!refreshToken) return res.sendStatus(204);

    await RefreshToken.deleteOne({ token: refreshToken });

    res.sendStatus(204);
};

export const refresh = async (req, res) => {
    try {
        const { refreshToken } = req.body || {};

        if (!refreshToken) return res.status(401).json({ message: "Refresh token missing" });

        // Ensure the refresh token exists in DB (not revoked)
        const stored = await RefreshToken.findOne({ token: refreshToken });
        if (!stored) return res.status(403).json({ message: "Invalid refresh token" });

        const payload = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

        const accessToken = generateAccessToken({
            userId: payload.userId,
            role: payload.role
        });

        res.json({ accessToken });
    } catch (error) {
        res.status(403).json({ message: error.message });
    }
};

export const registerStudent = async (req, res) => {
  // Account fields:
  // Personal Detail -> Firstname, middlename, lastname, dob, gender, email address, phone number, picture
  // Academic Detail -> Choose your Course, level of study, mode of study
  // Account Creation -> Create password
  // Awaiting Approval

  // Step 1: Field extraction
  try {
    const {
      email,
      password,
      firstName,
      middleName,
      lastName,
      dateOfBirth,
      gender,
      phoneNumber,
      courseId,
      levelOfStudy,
      modeOfStudy,
    } = req.body || {};

    // Step 2: Validation
    if (
      !email ||
      !password ||
      !firstName ||
      !lastName ||
      !dateOfBirth ||
      !gender ||
      !phoneNumber ||
      !courseId ||
      !levelOfStudy ||
      !modeOfStudy
    )
      return res.status(400).json({ message: "Missing required fields." });

    // Name validation
    const nameRegex = /^[A-Za-z]+([ '-][A-Za-z]+)*$/;
    if (!nameRegex.test(firstName))
      return res.status(400).json({ message: "Invalid first name." });
    if (middleName && !nameRegex.test(middleName))
      return res.status(400).json({ message: "Invalid middle name." });
    if (!nameRegex.test(lastName))
      return res.status(400).json({ message: "Invalid last name." });

    // Email validation
    if (!validator.isEmail(email))
      return res.status(400).json({ message: "Invalid email address." });

    // Phone Number validation
    const phoneRegex = /^\+?[0-9\s]{10,15}$/;
    if (!phoneRegex.test(phoneNumber))
      return res.status(400).json({ message: "Invalid phone number" });

    // Date Of Birth validation
    const dob = new Date(dateOfBirth);
    const age = (Date.now() - dob.getTime()) / (1000 * 60 * 60 * 24 * 365.25);
    if (isNaN(dob.getTime()) || age < 16)
      return res.status(400).json({ message: "Invalid date of birth" });

    // Password validation
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    if (!passwordRegex.test(password))
      return res.status(400).json({
        message:
          "Password must be 8 characters long and it must contain uppercase, lowercase, number, and symbol",
      });

    // Step 3: User exists?
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(409).json({ message: "Email already registered" });

    const course = await Course.findById(courseId);
    if (!course)
      return res.status(400).json({ message: "Invalid course selected" });

    // Step 4: Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Step 5: Create user with role
    const user = await User.create({
      email,
      password: hashedPassword,
      role: "student",
    });

    // Step 6 (New) : Create image
    const imagePath = req.file
      ? `/uploads/students/${req.file.filename}`
      : null;

        // Step 7: Create profile
        const student = await Student.create({
            userId: user._id,
            firstName, middleName, lastName, dateOfBirth, gender, phoneNumber,
            picture: imagePath,
            courseId: course._id,
            levelOfStudy, modeOfStudy
        });

        await ActivityLog.create({
            actor: user._id,
            action: "STUDENT_REGISTRATION",
            target:{
                id: user._id,
                model: "User"
            },
            description: "New Student registration request",
            meta: {
                name: `${student.firstName} ${student.middleName} ${student.lastName}`,
                email: user.email,
                role: "Student",
                courseName: course.name,
                courseCode: course.code
            }
        });

        // Step 8: Respond with success
        res.status(201).json({ message: "Student registered successfully." });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Registration failed." });
    }
};

export const registerTutor = async (req, res) => {
    try {
        // 1. Field extraction
        let {
            email,
            password,
            firstName,
            middleName,
            lastName,
            dateOfBirth,
            gender,
            phoneNumber,
            courseId,
            year,
            modules,
        } = req.body || {};

        // 2. Data Normalization
        year = Number(year);
        // Ensure modules is an array (handles cases where frontend might send a single string)
        if (modules && !Array.isArray(modules)) {
            modules = [modules];
        }

        // 3. Basic Validation (Guard Clauses)
        if (
            !email ||
            !password ||
            !firstName ||
            !lastName ||
            !dateOfBirth ||
            !gender ||
            !phoneNumber ||
            !courseId ||
            Number.isNaN(year) ||
            !modules ||
            modules.length !== 2
        ) {
            return res.status(400).json({
                message:
                    "Missing required fields and exactly 2 modules must be selected.",
            });
        }

        // Name validation
        const nameRegex = /^[A-Za-z]+([ '-][A-Za-z]+)*$/;
        if (!nameRegex.test(firstName))
            return res.status(400).json({ message: "Invalid first name." });
        if (middleName && !nameRegex.test(middleName))
            return res.status(400).json({ message: "Invalid middle name." });
        if (!nameRegex.test(lastName))
            return res.status(400).json({ message: "Invalid last name." });

        // Email & Phone validation
        if (!validator.isEmail(email))
            return res.status(400).json({ message: "Invalid email address." });
        const phoneRegex = /^\+?[0-9\s]{10,15}$/;
        if (!phoneRegex.test(phoneNumber))
            return res.status(400).json({ message: "Invalid phone number" });

        // Age validation (Must be at least 16)
        const dob = new Date(dateOfBirth);
        const age = (Date.now() - dob.getTime()) / (1000 * 60 * 60 * 24 * 365.25);
        if (isNaN(dob.getTime()) || age < 16)
            return res.status(400).json({ message: "Invalid date of birth" });

        // Password complexity validation
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
        if (!passwordRegex.test(password)) {
            return res.status(400).json({
                message:
                    "Password must be 8 characters long and contain uppercase, lowercase, number, and symbol",
            });
        }

        if (![1, 2, 3].includes(year))
            return res.status(400).json({ message: "Invalid year selection" });

        // 4. Database Checks (Existence)
        const existingUser = await User.findOne({ email });
        if (existingUser)
            return res.status(409).json({ message: "Email already registered" });

        const course = await Course.findById(courseId);
        if (!course)
            return res.status(400).json({ message: "Invalid course selected" });

        // Check if the 2 selected modules exist and belong to the correct course
        const selectedModules = await Module.find({ _id: { $in: modules } });
        if (selectedModules.length !== 2)
            return res.status(400).json({ message: "Invalid module selection" });

        for (const mod of selectedModules) {
            if (!mod.courseId.equals(course._id)) {
                return res.status(400).json({
                    message: `Module ${mod.name} does not belong to the selected course`,
                });
            }
            if (mod.tutorId) {
                return res.status(409).json({
                    message: `Module ${mod.name} is already assigned to another tutor`,
                });
            }
        }

        // 5. Create Account Logic
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create base User
        const user = await User.create({
            email,
            password: hashedPassword,
            role: "tutor",
        });

        const imagePath = req.file ? `/uploads/tutors/${req.file.filename}` : null;

        // Create Tutor Profile
        const tutor = await Tutor.create({
            userId: user._id,
            firstName,
            middleName,
            lastName,
            dateOfBirth,
            gender,
            phoneNumber,
            picture: imagePath,
            courseId: course._id,
            year: year,
            modules: modules, // IDs of the two modules
        });

        // 6. Assign Modules to Tutor (Atomic Check)
        // We only update if tutorId is currently null to prevent race conditions
        const updatedResult = await Module.updateMany(
            { _id: { $in: modules }, tutorId: null },
            { tutorId: tutor._id }
        );

        // If someone else took the modules between our check and our update:
        if (updatedResult.modifiedCount !== 2) {
            // Rollback
            await Tutor.findByIdAndDelete(tutor._id);
            await User.findByIdAndDelete(user._id);
            return res.status(409).json({
                message:
                    "One or more modules were just taken by another user. Please retry.",
            });
        }

        // 7. Log the Activity
        if (typeof ActivityLog !== "undefined") {
            await ActivityLog.create({
                actor: user._id,
                action: "TUTOR_REGISTRATION",
                target: { id: user._id, model: "User" },
                description: "New Tutor registration request",
                meta: {
                    name: `${tutor.firstName} ${tutor.lastName}`,
                    email: user.email,
                    courseName: course.name,
                },
            });
        }

        // 8. Final Success Response
        res.status(201).json({
            message: "Tutor registered successfully. Awaiting admin approval.",
        });
    } catch (error) {
        console.error("Tutor Registration Error:", error);
        res
            .status(500)
            .json({ message: "Registration failed due to server error." });
    }
};

export const registerAdmin = async (req, res) => {
    try {
        // 1. Field extraction
        const {
            email,
            password,
            firstName,
            middleName,
            lastName,
            dateOfBirth,
            gender,
            phoneNumber,
            adminCode,
        } = req.body || {};

        // 2. Basic Validation (Guard Clauses)
        if (
            !email ||
            !password ||
            !firstName ||
            !lastName ||
            !dateOfBirth ||
            !gender ||
            !phoneNumber ||
            !adminCode
        ) {
            return res.status(400).json({ message: "Missing required fields." });
        }

        // Name validation
        const nameRegex = /^[A-Za-z]+([ '-][A-Za-z]+)*$/;
        if (!nameRegex.test(firstName))
            return res.status(400).json({ message: "Invalid first name." });
        if (middleName && !nameRegex.test(middleName))
            return res.status(400).json({ message: "Invalid middle name." });
        if (!nameRegex.test(lastName))
            return res.status(400).json({ message: "Invalid last name." });

        // Email & Phone validation
        if (!validator.isEmail(email))
            return res.status(400).json({ message: "Invalid email address." });
        const phoneRegex = /^\+?[0-9\s]{10,15}$/;
        if (!phoneRegex.test(phoneNumber))
            return res.status(400).json({ message: "Invalid phone number" });

        // Age validation (Must be at least 16)
        const dob = new Date(dateOfBirth);
        const age = (Date.now() - dob.getTime()) / (1000 * 60 * 60 * 24 * 365.25);
        if (isNaN(dob.getTime()) || age < 16)
            return res.status(400).json({ message: "Invalid date of birth" });

        // Password complexity validation
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
        if (!passwordRegex.test(password)) {
            return res.status(400).json({
                message:
                    "Password must be 8 characters long and contain uppercase, lowercase, number, and symbol",
            });
        }

        // 3. Database Checks (Existence)
        const existingUser = await User.findOne({ email });
        if (existingUser)
            return res.status(409).json({ message: "Email already registered" });

        // Admin code validation
        if (adminCode !== "testAdminCode") {
            return res.status(400).json({ message: "Invalid admin code" });
        }

        // 4. Create Account Logic
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create base User
        const user = await User.create({
            email,
            password: hashedPassword,
            role: "admin",
        });

        const imagePath = req.file ? `/uploads/admins/${req.file.filename}` : null;

        // Create Admin Profile
        const admin = await Admin.create({
            userId: user._id,
            firstName,
            middleName,
            lastName,
            dateOfBirth,
            gender,
            phoneNumber,
            picture: imagePath,
        });

        // 5. Log the Activity
        if (typeof ActivityLog !== "undefined") {
            await ActivityLog.create({
                actor: user._id,
                action: "ADMIN_REGISTRATION",
                target: { id: user._id, model: "User" },
                description: "New Admin registration request",
                meta: {
                    name: `${admin.firstName} ${admin.lastName}`,
                    email: user.email,
                    role: "Admin",
                },
            });
        }

        // 6. Final Success Response
        res.status(201).json({ message: "Admin registered successfully." });
    } catch (error) {
        console.error("Admin Registration Error:", error);
        res
            .status(500)
            .json({ message: "Registration failed due to server error." });
    }
};