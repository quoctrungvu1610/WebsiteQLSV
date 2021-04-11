const fs = require('fs');

exports.addStudentPage = (req, res) => {
    res.render('add-student.ejs', {
        title: "Welcome to QLSV | View Student",
        message: ''
    });
};

exports.addStudent = (req, res) => {
    if (!req.files) {
        return res.status(400).send("No files were uploaded.");
    }

    let message = '';
    let Name = req.body.Name;
    let Email = req.body.Email;
    let Class = req.body.Class;
    let Phone = req.body.Phone;
    let MSSV = req.body.MSSV;
    let DOB = req.body.DOB;
    let uploadedFile = req.files.image;
    let image_name = uploadedFile.name;
    let fileExtension = uploadedFile.mimetype.split('/')[1];
    image_name = MSSV + '.' + fileExtension;

    let usernameQuery = "SELECT * FROM `my_student` WHERE MSSV = '" + MSSV + "'";

    db.query(usernameQuery, (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).send(err);
        }

        if (result.length > 0) {
            message = 'MSSV bị trùng';
            res.render('add-student.ejs', {
                message,
                title: "Welcome to QLSV | View Student"
            });
        } else {
            // check the filetype before uploading it
            if (uploadedFile.mimetype === 'image/png' || uploadedFile.mimetype === 'image/jpeg' || uploadedFile.mimetype === 'image/gif') {
                // upload the file to the /public/assets/img directory
                uploadedFile.mv(`public/assets/img/${image_name}`, (err ) => {
                    if (err) {
                        return res.status(500).send(err);
                    }
                    // send the student's details to the database
                    let query = "INSERT INTO `my_student` (Avt, Name, Email, Class, Phone, MSSV,DOB) VALUES ('" +
                        image_name + "', '" + Name + "', '" + Email + "', '" + Class + "', '" + Phone + "', '" + MSSV + "', '" + DOB + "')";
                    db.query(query, (err, result) => {
                        if (err) {
                            return res.status(500).send(err);
                        }
                        res.redirect('/home');
                    });
                });
            } else {
                message = "Invalid File format. Only 'gif', 'jpeg' and 'png' images are allowed.";
                res.render('add-student.ejs', {
                    message,
                    title: "Welcome to QLSV | View Student"
                });
            }
        }
    });
}

exports.editStudentPage = (req, res) => {
    let studentId = req.params.Id;
    let query = "SELECT * FROM `my_student` WHERE Id = '" + studentId + "' ";
    db.query(query, (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.render('edit-student.ejs', {
            title: "Edit  Student",
            student: result[0],
            message: ''
        });
    });
}

exports.editStudent = (req, res) => {
    let studentId = req.params.Id;
    let Name = req.body.Name;
    let Email = req.body.Email;
    let Class = req.body.Class;
    let Phone = req.body.Phone;
    let DOB =req.body.DOB;
    let MSSV =req.body.MSSV;

    let query = "UPDATE `my_student` SET `Name` = '" + Name + "', `Email` = '" + Email + "', `Class` = '" + Class + "', `Phone` = '" + Phone +"', `DOB` = '"+ DOB + "', `MSSV` = '"+ MSSV + "' WHERE `my_student`.`Id` = '" + studentId + "'";
    db.query(query, (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.redirect('/home');
    });
}

exports.deleteStudent = (req, res) => {
    let studentId = req.params.Id;
    let getImageQuery = 'SELECT Avt from `my_student` WHERE Id = "' + studentId + '"';
    let deleteUserQuery = 'DELETE FROM my_student WHERE Id = "' + studentId + '"';

    db.query(getImageQuery, (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }

        let Avt = result[0].Avt;

        fs.unlink(`public/assets/img/${Avt}`, (err) => {
            if (err) {
                return res.status(500).send(err);
            }
            db.query(deleteUserQuery, (err, result) => {
                if (err) {
                    return res.status(500).send(err);
                }
                res.redirect('/home');
            });
        });
    });
}



///mark
exports.addMarkPage = (req, res) => {
    res.render('add-mark.ejs', {
        title: "Welcome to QLSV | View Mark",
        message: ''
    });
};

exports.addMark = (req, res) => {
    if (!req.files) {
        return res.status(400).send("No files were uploaded.");
    }

    let message = '';
    let FName = req.body.FName;
    let Subject1 = req.body.Subject1;
    let Subject2 = req.body.Subject2;
    let Subject3 = req.body.Subject3;
    let Subject4 = req.body.Subject4;
    let Subject5 = req.body.Subject5;
    let FMSSV = req.body.FMSSV;
    let uploadedFileMark = req.files.image;
    let image_name_mark = uploadedFileMark.name;
    let fileExtension = uploadedFileMark.mimetype.split('/')[1];
    image_name_mark = FMSSV + '.' + fileExtension;

    let usernameQuery_mark = "SELECT * FROM `mark` WHERE FMSSV = '" + FMSSV + "'";

    db.query(usernameQuery_mark, (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).send(err);
        }

        if (result.length > 0) {
            message = 'Mã Sinh Viên Bị Trùng';
            res.render('add-mark.ejs', {
                message,
                title: "Welcome to QLSV | View Mark"
            });
        } else {
            // check the filetype before uploading it
            if (uploadedFileMark.mimetype === 'image/png' || uploadedFileMark.mimetype === 'image/jpeg' || uploadedFileMark.mimetype === 'image/gif') {
                // upload the file to the /public/assets/img directory
                uploadedFileMark.mv(`public/assets/img/${image_name_mark}`, (err ) => {
                    if (err) {
                        return res.status(500).send(err);
                    }
                    // send the player's details to the database
                    let query = "INSERT INTO `mark` (image, FName, FMSSV, Subject1, Subject2, Subject3, Subject4, Subject5) VALUES ('" +
                        image_name_mark + "', '" + FName + "', '" + FMSSV + "', '" + Subject1 + "', '" + Subject2 + "', '" + Subject3 + "', '" + Subject4 + "', '" + Subject5 + "')";
                    db.query(query, (err, result) => {
                        if (err) {
                            return res.status(500).send(err);
                        }
                        res.redirect('/home-mark');
                    });
                });
            } else {
                message = "Invalid File format. Only 'gif', 'jpeg' and 'png' images are allowed.";
                res.render('add-mark.ejs', {
                    message,
                    title: "Welcome to QLSV | View Mark"
                });
            }
        }
    });
}

exports.editMarkPage = (req, res) => {
    let studentId_mark = req.params.STT;
    let query = "SELECT * FROM `mark` WHERE STT = '" + studentId_mark + "' ";
    db.query(query, (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.render('edit-mark.ejs', {
            title: "Edit",
            student: result[0],
            message: ''
        });
    });
}

exports.editMark = (req, res) => {
    let studentId_mark = req.params.STT;
    let FName = req.body.FName;
    let FMSSV = req.body.FMSSV;
    let Subject1 = req.body.Subject1;
    let Subject2 = req.body.Subject2;
    let Subject3 = req.body.Subject3;
    let Subject4 = req.body.Subject4;
    let Subject5 = req.body.Subject5;
    let query = "UPDATE `mark` SET `FName` = '" + FName + "', `FMSSV` = '" + FMSSV + "', `Subject1` = '" + Subject1 + "', `Subject2` = '" + Subject2 +"', `Subject3` = '"+ Subject3 +"', `Subject4` = '"+ Subject4 + "', `Subject5` = '"+ Subject5 + "' WHERE `mark`.`STT` = '" + studentId_mark + "'";
    db.query(query, (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.redirect('/home-mark');
    });
}

exports.deleteMark = (req, res) => {
    let studentId_mark = req.params.STT;
    let getImageQuery_mark = 'SELECT image from `mark` WHERE STT = "' + studentId_mark + '"';
    let deleteUserQuery_mark = 'DELETE FROM mark WHERE STT = "' + studentId_mark + '"';

    db.query(getImageQuery_mark, (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }

        let image = result[0].image;

        fs.unlink(`public/assets/img/${image}`, (err) => {
            if (err) {
                return res.status(500).send(err);
            }
            db.query(deleteUserQuery_mark, (err, result) => {
                if (err) {
                    return res.status(500).send(err);
                }
                res.redirect('/home-mark');
            });
        });
    });
}
