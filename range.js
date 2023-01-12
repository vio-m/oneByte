module.exports = (req, res, next) => {
    res.header('Content-Range', 'entries 1-20/20')
    next()
}