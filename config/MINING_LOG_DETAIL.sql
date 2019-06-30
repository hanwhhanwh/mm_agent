-- DROP TABLE IF EXISTS MINING_LOG_DETAILS;

CREATE TABLE IF NOT EXISTS MINING_LOG_DETAILS
(
	`mining_log_no` INT NOT NULL COMMENT '채굴 로그 고유식별번호'
	, `index_no` TINYINT NOT NULL COMMENT 'GPU 순서 번호'
	, `hashrate` INT NOT NULL COMMENT 'GPU 해쉬값'
	, `temperature` TINYINT NOT NULL COMMENT 'GPU 온도'
	, `fan_speed` TINYINT NOT NULL COMMENT 'GPU 팬 속도 (%)'
	, `power` SMALLINT NOT NULL COMMENT 'GPU 사용 전력값'

	, PRIMARY KEY ( `mining_log_no`, `index_no` )
)
ENGINE=InnoDB
COLLATE='utf8_general_ci'
COMMENT='채굴 로그 정보 관리 테이블'
;
