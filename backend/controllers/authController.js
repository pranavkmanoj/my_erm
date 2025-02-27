const loginUser = async (req, res) => {
    try {
        // Your login logic here
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
};

module.exports = { loginUser };
