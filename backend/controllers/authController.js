import bcrypt from 'bcryptjs';
import validator from "validator";
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import Student from '../models/Student.js';
import Tutor from '../models/Tutor.js';
import Admin from '../models/Admin.js';
import Course from '../models/Course.js';
import Module from '../models/Module.js';
import RefreshToken from '../models/RefreshToken.js';
import {generateAccessToken} from "../utils/generateAccessToken.js";

export const registerStudent = async (req, res) => {
    // Account fields:
    // Personal Detail -> Firstname, middlename, lastname, dob, gender, email address, phone number, picture
    // Academic Detail -> Choose your Course, level of study, mode of study
    // Account Creation -> Create password
    // Awaiting Approval

    // Step 1: Field extraction
    try {
        const { email, password, firstName, middleName, lastName, dateOfBirth, gender, phoneNumber, courseId, levelOfStudy, modeOfStudy } = req.body || {};

        // Step 2: Validation
        if (!email || !password || !firstName || !lastName || !dateOfBirth || !gender || !phoneNumber || !courseId || !levelOfStudy || !modeOfStudy) return res.status(400).json({ message: "Missing required fields." });

        // Name validation
        const nameRegex = /^[A-Za-z]+([ '-][A-Za-z]+)*$/;
        if (!nameRegex.test(firstName)) return res.status(400).json({ message: "Invalid first name." });
        if (middleName && !nameRegex.test(middleName)) return res.status(400).json({ message: "Invalid middle name." });
        if (!nameRegex.test(lastName)) return res.status(400).json({ message: "Invalid last name." });

        // Email validation
        if (!validator.isEmail(email)) return res.status(400).json({ message: "Invalid email address." });

        // Phone Number validation
        const phoneRegex = /^\+?[0-9\s]{10,15}$/
        if (!phoneRegex.test(phoneNumber)) return res.status(400).json({ message: "Invalid phone number" });

        // Date Of Birth validation
        const dob = new Date(dateOfBirth);
        const age = (Date.now() - dob.getTime()) / (1000 * 60 * 60 * 24 * 365.25);
        if (isNaN(dob.getTime()) || age < 16) return res.status(400).json({ message: "Invalid date of birth" });

        // Password validation
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/
        if (!passwordRegex.test(password)) return res.status(400).json({ message: "Password must be 8 characters long and it must contain uppercase, lowercase, number, and symbol"});

        // Step 3: User exists?
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(409).json({ message: "Email already registered" });

        const course = await Course.findById(courseId);
        if (!course) return res.status(400).json({ message: "Invalid course selected" });

        // Step 4: Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Step 5: Create user with role
        const user = await User.create({
            email,
            password: hashedPassword,
            role: "student",
        });

        // Step 6 (New) : Create image
        const imagePath = req.file ? `/uploads/students/${req.file.filename}` : null;

        // Step 7: Create profile
        await Student.create({
            userId: user._id,
            firstName, middleName, lastName, dateOfBirth, gender, phoneNumber,
            picture: imagePath,
            courseId: course._id,
            levelOfStudy, modeOfStudy
        });

        // Step 8: Respond with success
        res.status(201).json({ message: "Student registered successfully." });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Registration failed." });
    }
};

export const registerTutor = async(req, res) => {
    // Account fields:
    // Personal Detail -> Firstname, middlename, lastname, dob, gender, email address, phone number, picture
    // Academic Detail -> Course, modules
    // Account Creation -> Create password
    // Awaiting Approval
    console.log("RAW req.body:", req.body);
    console.log("TYPE CHECK:", {
        year: typeof req.body.year,
        modules: req.body.modules,
        modulesType: typeof req.body.modules,
        isArray: Array.isArray(req.body.modules)
    });
    // Step 1: Field extraction
    try {
        let { email, password, firstName, middleName, lastName, dateOfBirth, gender, phoneNumber, courseId, year, modules} = req.body || {};

        // Normalization
        year = Number(year);
        if (modules && !Array.isArray(modules)) {
            modules = [modules];
        }

        // Step 2: Validation
        if (!email || !password || !firstName || !lastName || !dateOfBirth || !gender || !phoneNumber || !courseId || Number.isNaN(Number(year)) || !modules || modules.length !== 2 ) return res.status(400).json({ message: "Missing required fields and exactly 2 modules must be selected." });

        // Name validation
        const nameRegex = /^[A-Za-z]+([ '-][A-Za-z]+)*$/;
        if (!nameRegex.test(firstName)) return res.status(400).json({ message: "Invalid first name." });
        if (middleName && !nameRegex.test(middleName)) return res.status(400).json({ message: "Invalid middle name." });
        if (!nameRegex.test(lastName)) return res.status(400).json({ message: "Invalid last name." });

        // Email validation
        if (!validator.isEmail(email)) return res.status(400).json({ message: "Invalid email address." });

        // Phone Number validation
        const phoneRegex = /^\+?[0-9\s]{10,15}$/
        if (!phoneRegex.test(phoneNumber)) return res.status(400).json({ message: "Invalid phone number" });

        // Date Of Birth validation
        const dob = new Date(dateOfBirth);
        const age = (Date.now() - dob.getTime()) / (1000 * 60 * 60 * 24 * 365.25);
        if (isNaN(dob.getTime()) || age < 16) return res.status(400).json({ message: "Invalid date of birth" });

        // Password validation
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/
        if (!passwordRegex.test(password)) return res.status(400).json({ message: "Password must be 8 characters long and it must contain uppercase, lowercase, number, and symbol"});

        // Year validation
        if (!Number(year) || ![1, 2, 3].includes(Number(year))) return res.status(400).json({ message: "Invalid year" });

        // Step 3: User exists?
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(409).json({ message: "Email already registered" });

        const course = await Course.findById(courseId);
        if (!course) return res.status(400).json({ message: "Invalid course selected" });

        const selectedModules = await Module.find({
            _id : { $in: modules }
        });
        if (selectedModules.length !== 2) return res.status(400).json({ message: "Invalid module selection"});

        const [moduleA, moduleB] = selectedModules;

        if (
            !moduleA.courseId.equals(course._id) ||
            !moduleB.courseId.equals(course._id)
        ) return res.status(400).json({ message: "Selected modules do not belong to the chosen course" });

        if (moduleA.tutorId || moduleB.tutorId) return res.status(409).json({ message: "One or more selected modules are already assigned" });

        // 2 Modules validation
        const moduleIds = [moduleA._id, moduleB._id]
        if (moduleIds.length !== 2) return res.status(400).json({ message: "Select exactly 2 modules" });

        // Step 4: Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Step 5: Create user with role
        const user = await User.create({
            email,
            password: hashedPassword,
            role: "tutor",
            status: "approved"
        });

        // Step 6: Create Image
        const imagePath = req.file ? `/uploads/tutors/${req.file.filename}` : null;

        // Step 7: Create profile
        const tutor = await Tutor.create({
            userId: user._id,
            firstName, middleName, lastName, dateOfBirth, gender, phoneNumber,
            picture: imagePath,
            courseId: course._id,
            year: Number(year),
            modules: [moduleA._id, moduleB._id]
        });

        // Step 8: Update module availability and tutor assignment
        // Implies the concept of atomic cleanup. If 2 tutors click submit at the same time, one wins & the other loses. Validation passes but database state changed before update
        // This causes a tutor account with no modules, a user who can login but is broken and then will have to be manually cleaned up later
        // Therefore, this is rolling back tutor + user if the race condition did happen
        const updatedResult = await Module.updateMany(
            {
                _id: { $in: modules },
                tutorId: null
            },
            { tutorId: tutor._id }
        );

        if (updatedResult.modifiedCount !== 2) {
            await Tutor.findByIdAndDelete(tutor._id);
            await User.findByIdAndDelete(user._id);

            return res.status(409).json({ message: "One or more modules were taken. Please retry. "});
        }

        // Step 9: Respond with success
        res.status(201).json({ message: "Tutor registered successfully." });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Registration failed." });
    }
};

export const registerAdmin = async (req, res) => {
    // Step 1: Field extraction
    try {
        const { email, password, firstName, middleName, lastName, dateOfBirth, gender, phoneNumber, adminCode } = req.body || {};

        // Step 2: Validation
        if (!email || !password || !firstName || !lastName || !dateOfBirth || !gender || !phoneNumber || !adminCode ) return res.status(400).json({ message: "Missing required fields." });

        // Step 3: User exists?
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(409).json({ message: "Email already registered" });

        if (adminCode !== "testAdminCode") return res.status(400).json({ message: "Invalid admin code" });

        // Step 4: Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Step 5: Create user with role
        const user = await User.create({
            email,
            password: hashedPassword,
            role: "admin",
            status: "approved"
        });

        // Step 6: Create image
        const imagePath = req.file ? `/uploads/admins${req.file.filename}` : null;

        // Step 7: Create profile
        await Admin.create({
            userId: user._id,
            firstName, middleName, lastName, dateOfBirth, gender, phoneNumber,
            picture: imagePath
        });

        // Step 8: Respond with success
        res.status(201).json({ message: "Admin registered successfully." });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Registration failed." });
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: "Email address not registered" });

    const isMatching = await bcrypt.compare(password, user.password);
    if (!isMatching) return res.status(401).json({ message: "Invalid password" });

    const payload = {
        userId: user._id,
        role: user.role
    };

    const accessToken = generateAccessToken(payload);
    const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET)

    await RefreshToken.create({ token: refreshToken, userId: user._id });

    res.json({ accessToken: accessToken, refreshToken: refreshToken, status: user.status, role: user.role });
};

export const logout = async (req, res) => {
    const { refreshToken } = req.body;

    if (!refreshToken) return res.sendStatus(204);

    await RefreshToken.deleteOne({ token: refreshToken });

    res.sendStatus(204);
};

export const refresh = async (req, res) => {
    try {
        const { refreshToken } = req.body;

        if (!refreshToken) return res.status(401).json({ message: "Refresh token missing" });

        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, payload) => {
            if (err) return res.status(403).json({ message: "Invalid refresh token"});
            const accessToken = jwt.sign({
                userId: payload.userId,
                role: payload.role
            }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "15m" });

            res.json({ accessToken });
        });
    } catch (error) {
        res.status(403).json({ message: error.message });
    }
};