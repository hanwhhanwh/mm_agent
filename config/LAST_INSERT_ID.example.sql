CREATE TABLE IF NOT EXISTS LOG_TEST
(
	log_no INT NOT NULL AUTO_INCREMENT 
	, log_date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
	, PRIMARY KEY ( log_no )
);




SET @log_no = 0;

INSERT INTO LOG_TEST ( log_date ) VALUES ( NOW() );

SET @log_no = LAST_INSERT_ID();

SELECT @log_no;


-- SELECT @log_on;

SET @log_no = 0;

SET @log_no = LAST_INSERT_ID();

SELECT @log_no; -- LAST_INSERT_ID();


