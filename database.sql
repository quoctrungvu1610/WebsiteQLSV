/*create data base*/
CREATE DATABASE student_manager;

/* create my_student table*/ 
CREATE TABLE IF NOT EXISTS `my_student` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `Name` varchar(255) NOT NULL,
  `Email` varchar(255) NOT NULL,
  `Class` varchar(255) NOT NULL,
  `Phone` int(11) NOT NULL,
  `Avt` varchar(255) NOT NULL,
  `MSSV` int(11) NOT NULL,
  `DOB` varchar(255) NOT NULL,

  PRIMARY KEY (`Id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=1;

/*create accounts table*/
CREATE TABLE IF NOT EXISTS `accounts` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=1;
INSERT INTO `accounts` (`username`, `password`) VALUES ('admin', 'admin');


/*create mark table*/
CREATE TABLE IF NOT EXISTS `mark` (
  `STT` int(11) NOT NULL AUTO_INCREMENT,
  `FName` varchar(255) NOT NULL,
  `FMSSV` int(11) NOT NULL,
  `Subject1` int(11) NOT NULL,
  `Subject2` int(11) NOT NULL,
  `Subject3` int(11) NOT NULL,
  `Subject4` int(11) NOT NULL,
  `Subject5` int(11) NOT NULL,
  `image` varchar(255) NOT NULL,

  PRIMARY KEY (`STT`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=1;
