import Policy from "../models/Policy.js";
import ActivityLog from "../models/ActivityLog.js";

export const getAllPolicies = async (req, res) => {
    try {
        const policies = await Policy.find({});
        res.json(policies);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch policies" });
    }
};

export const getPolicyByKey = async (req, res) => {
    try {
        const policy = await Policy.findOne({ key: req.params.key });
        if (!policy) return res.status(404).json({ message: "Policy not found" });

        res.json(policy);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch policy" });
    }
};

export const updatePolicyByKey = async (req, res) => {
    try {
        const { content } = req.body;
        const POLICY_LABELS = {
            terms: "Terms & Conditions",
            privacy: "Privacy Policy",
            accessibility: "Accessibility Statement"
        };

        const policy = await Policy.findOneAndUpdate(
            { key: req.params.key },
            { content },
            { new: true }
        );

        if (!policy) return res.status(404).json({ message: "Policy not found" });

        await ActivityLog.create({
            actor: req.user.userId,
            action: "UPDATED_POLICY",
            target: {
                id: policy._id,
                model: "Policy",
            },
            description: `Updated policy "${POLICY_LABELS[policy.key] || policy.key}"`,
        });
        res.json(policy);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to update policy" });
    }
}
