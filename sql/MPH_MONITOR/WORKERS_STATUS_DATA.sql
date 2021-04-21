-- MPH에서 worker별 채굴기 현황 정보 수집 로그 관리 테이블
-- DROP TABLE `WORKERS_STATUS_DATA`
CREATE TABLE IF NOT EXISTS `WORKERS_STATUS_DATA`
(
	`work_status_no` INT NOT NULL COMMENT 'MPH에 채굴기 현황 고유 식별 번호 (FK: WORKER_STATUS.worker_status_no)'
	, `worker_no` INT NOT NULL COMMENT '채굴기 고유 식별 번호 (FK: WORKER.worker_no)'
	, `coin_no` SMALLINT NOT NULL COMMENT '채굴코인 고유 식별 번호 (FK: COIN.coin_no)'
	, `hashrate` REAL NOT NULL COMMENT 'getuserworkers hashrate 값'
	, `difficulty` REAL NOT NULL COMMENT 'getuserworkers difficulty 값'

	, PRIMARY KEY (`coin_no`, `work_status_no`, `worker_no`)
)
COMMENT='MPH에서 worker별 채굴기 현황 정보 수집 로그 관리 테이블'
COLLATE='utf8_general_ci'
ENGINE=InnoDB
;
