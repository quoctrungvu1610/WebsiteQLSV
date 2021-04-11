module.exports = {
    getHomePageMark: (req, res) => {
        let query = "SELECT * FROM `mark`"; // query database to get all the players

        // execute query
        db.query(query, (err, result) => {
            if (err) {
                res.redirect('/home-mark');
            }
            res.render('index-mark.ejs', {
                title: "QLSV"
                ,mark: result
            });
        });
    },
};