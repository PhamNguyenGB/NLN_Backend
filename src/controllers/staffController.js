const testApi = (req, res) => {
    return res.status(200).json({
        message: 'test',
    })
};

module.exports = {
    testApi,
}