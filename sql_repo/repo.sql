CREATE TABLE repo (
  id int(11) NOT NULL AUTO_INCREMENT,
  name varchar(255) NOT NULL,
  url varchar(255) NOT NULL,
  status tinyint(4) NOT NULL DEFAULT 1,
  PRIMARY KEY (id)
);

CREATE TABLE comment (
  id int(11) NOT NULL AUTO_INCREMENT,
  comm varchar(255) NOT NULL,
  id_repo int(11) NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (id_repo) REFERENCES repo(id)
);

CREATE TABLE language (
  id int(11) NOT NULL AUTO_INCREMENT,
  name varchar(255) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE repo_language (
	id_repo int(11) NOT NULL,
	id_language int(11) NOT NULL
);