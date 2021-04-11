module.exports = {
    getHomePage: (req, res) => {
        const search = req.query.search;
        //console.log(search);
       let query = "";

        if(search){
            query = "SELECT * FROM `my_student` where Name like '%" + search + "%' ORDER BY Id ASC";
        }else {
             query = "SELECT * FROM `my_student` ORDER BY Id ASC"; // query database to get all the players
        }

        // execute query
        db.query(query, (err, result) => {
            if (err) {
                res.redirect('/home');
            }
            res.render('index.ejs', {
                title: "Welcome to QLSV | View Student"
                ,my_student: result
            });
        });
    },
};