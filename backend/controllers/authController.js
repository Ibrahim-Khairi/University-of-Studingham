import bcrypt from 'bcryptjs'
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

    console.log("📥 Incoming student registration");
    console.log("BODY:", req.body);
    console.log("FILE:", req.file); // if using multer

    // Step 1: Field extraction
    try {
        const { email, password, firstName, middleName, lastName, dateOfBirth, gender, phoneNumber, courseId, levelOfStudy, modeOfStudy } = req.body || {};

        // Step 2: Validation
        if (!email || !password || !firstName || !lastName || !dateOfBirth || !gender || !phoneNumber || !courseId || !levelOfStudy || !modeOfStudy) return res.status(400).json({ message: "Missing required fields." });

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
            status: "approved"
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

    // Step 1: Field extraction
    try {
        const { email, password, firstName, middleName, lastName, dateOfBirth, gender, phoneNumber, courseId, modules} = req.body || {};

        // Step 2: Validation
        if (!email || !password || !firstName || !lastName || !dateOfBirth || !gender || !phoneNumber || !courseId || !Array.isArray(modules) || modules.length !==2 ) return res.status(400).json({ message: "Missing required fields and exactly 2 modules must be selected." });

        // Step 3: User exists?
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(409).json({ message: "Email already registered" });

        const course = await Course.findById(courseId);
        if (!course) return res.status(400).json({ message: "Invalid course selected" });

        // const moduleOne = await Module.findById(moduleId1);
        // if (!moduleOne) return res.status(400).json({ message: "Invalid module selected" });
        // const moduleTwo = await Module.findById(moduleId2);
        // if (!moduleTwo) return res.status(400).json({ message: "Invalid module selected" });
        //
        // if (!moduleOne.courseId.equals(course._id)) return res.status(400).json({ message: "Module not part of course" });
        // if (!moduleTwo.courseId.equals(course._id)) return res.status(400).json({ message: "Module not part of course" });
        //
        // if (moduleOne._id.equals(moduleTwo._id)) return res.status(400).json({ message: "Select a different module" });
        // if (moduleOne.year !== moduleTwo.year) return res.status(400).json({ message: "Modules from the same year are to be selected" });
        //
        // if (moduleOne.tutorId) return res.status(400).json({ message: "Module already taken" });
        // if (moduleTwo.tutorId) return res.status(400).json({ message: "Module already taken" });

        const selectedModules = await Module.find({
            _id : { $in: modules }
        });
        if (selectedModules.length !== 2) return res.status(400).json({ message: "Invalid module selection"});

        const [moduleA, moduleB] = selectedModules;

        if (
            !moduleA.courseId.equals(course._id) ||
            !mdouleB.courseId.equals(course._id)
        ) return res.status(400).json({ message: "Selected modules do not belong to the chosen course" });

        if (moduleA.tutorId || moduleB.tutorId) return res.status(409).json({ message: "One or more selected modules are already assigned" });

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
            modules: [moduleA._id, moduleB._id]
        });

        // Step 8: Update module availability and tutor assignment
        // Implies the concept of atomic cleanup. If 2 tutors click submit at the same time, one wins & the other loses. Validation passes but database state changed before update
        // This causes a tutor account with no modules, a user who can login but is broken and then will have to be manually cleaned up later
        // Therefore, this is rolling back tutor + user if the race condition did happen
        const updateResult = await Module.updateMany(
            {
                _i: { $in: modules },
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

    if (user.status !== "approved") return res.status(403).json({ message: `Account ${user.status}` });

    const payload = {
        userId: user._id,
        role: user.role
    };

    const accessToken = generateAccessToken(payload);
    const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET)

    await RefreshToken.create({ token: refreshToken, userId: user._id });

    res.json({ accessToken: accessToken, refreshToken: refreshToken });
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
            }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "20s" });

            res.json({ accessToken });
        });
    } catch (error) {
        res.status(403).json({ message: error.message });
    }
};