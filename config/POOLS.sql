-- DROP TABLE IF EXISTS POOLS;

CREATE TABLE IF NOT EXISTS POOLS
(
	`pool_no` SMALLINT NOT NULL AUTO_INCREMENT COMMENT '채굴 S/W 고유식별번호'
	, `pool_host` VARCHAR (100) NOT NULL COMMENT '채굴 Pool 주소'
	, `pool_ko_name` VARCHAR (100) NULL COMMENT '채굴 Pool 한글 이름'
	, `coin_no` INT NULL COMMENT '채굴 대상 코인 고유식별번호'
	, `reg_date` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '채굴 Pool 등록일'

	, PRIMARY KEY ( `pool_no` )
)
ENGINE=InnoDB
COLLATE='utf8_general_ci'
COMMENT='채굴 Pool 정보 관리 테이블'
;
