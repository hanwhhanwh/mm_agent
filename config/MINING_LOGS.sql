-- DROP TABLE IF EXISTS MINING_LOGS;

CREATE TABLE IF NOT EXISTS MINING_LOGS
(
	`mining_log_no` INT NOT NULL COMMENT '채굴 로그 고유식별번호'
	, `mining_time` TIMESTAMP NOT NULL COMMENT '채굴 수집일'
	, `miner_no` INT NOT NULL COMMENT '채굴기 식별 번호'
	, `miner_sw_no` SMALLINT NOT NULL COMMENT '채굴에 이용중인 S/W 식별번호'
	, `pool_no` SMALLINT NOT NULL COMMENT '채굴중인 풀 식별번호'
	, `running_time` INT NOT NULL COMMENT '채굴 S/W 동작 시간 (분)'
	, `total_hash` INT NOT NULL COMMENT '총 해쉬량'
	, `submitted_shares` INT NOT NULL COMMENT '승인된 쉐어 수'
	, `invalid_shares` INT NOT NULL COMMENT '잘못된 쉐어 수'
	, `rejected_shares` INT NOT NULL COMMENT '거절된 쉐어 수'

	, PRIMARY KEY ( `mining_log_no` )
)
ENGINE=InnoDB
COLLATE='utf8_general_ci'
COMMENT='채굴 로그 정보 관리 테이블'
;
