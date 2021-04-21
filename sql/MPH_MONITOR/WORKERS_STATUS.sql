-- MPH에서 채굴기 현황 정보 수집 로그 관리 테이블
-- DROP TABLE `WORKERS_STATUS`
CREATE TABLE IF NOT EXISTS `WORKERS_STATUS`
(
	`work_status_no` INT NOT NULL AUTO_INCREMENT COMMENT 'MPH에 채굴기 현황 고유 식별 번호'
	, `coin_no` SMALLINT NOT NULL COMMENT '채굴코인 고유 식별 번호 (FK: COIN.coin_no)'
	, `version` VARCHAR(50) NOT NULL COMMENT 'getuserworkers version 값'
	, `runtime` DOUBLE NOT NULL COMMENT 'getuserworkers rundime 값'
	, `reg_date` DATETIME NOT NULL DEFAULT current_timestamp() COMMENT '정보 등록시각'

	, PRIMARY KEY (`work_status_no`)
	, INDEX IX_COIN_NO_REG_DATE ( `coin_no`, `reg_date` DESC )
)
COMMENT='MPH에서 채굴기 현황 정보 수집 로그 관리 테이블'
COLLATE='utf8_general_ci'
ENGINE=InnoDB
;
