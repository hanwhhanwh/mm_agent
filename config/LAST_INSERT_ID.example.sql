CREATE TABLE IF NOT EXISTS LOG_TEST
(
	log_no INT NOT NULL AUTO_INCREMENT 
	, log_date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
	, PRIMARY KEY ( log_no )
);

-- DROP TABLE IF EXISTS LOG_TEST_DETAIL;
CREATE TABLE IF NOT EXISTS LOG_TEST_DETAIL
(
	log_detail_no INT NOT NULL AUTO_INCREMENT 
	, log_no INT NOT NULL 
	, value INT NULL
	, PRIMARY KEY ( log_detail_no )
);


SET @log_no = 0;

INSERT INTO LOG_TEST ( log_date ) VALUES ( NOW() );

SET @log_no = LAST_INSERT_ID();

SELECT @log_no;




SET @log_no = 0;

INSERT INTO LOG_TEST ( log_date ) VALUES ( NOW() );

SET @log_no = LAST_INSERT_ID();

INSERT INTO LOG_TEST_DETAIL ( log_no, value ) VALUES ( @log_no, 0), ( @log_no, 1), ( @log_no, 2)

