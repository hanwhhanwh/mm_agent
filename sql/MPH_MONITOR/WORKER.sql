-- MPH에 등록된 채굴기 정보 관리 테이블
-- DROP TABLE `WORKER`
CREATE TABLE IF NOT EXISTS `WORKER`
(
	`worker_no` INT NOT NULL COMMENT 'MPH에 등록된 채굴기 고유 식별 번호'
	, `coin_no` INT NOT NULL COMMENT '코인 고유 번호 (FK : COIN.coin_no)'
	, `user_name` VARCHAR(50) NOT NULL COMMENT 'MPH에 등록된 채굴기 식별 이름'
	, `password` VARCHAR(50) NOT NULL COMMENT 'MPH에 등록된 채굴기 비밀번호'
	, `monitor` BIT(1) NOT NULL DEFAULT 1 COMMENT 'MPH monitor 설정 여부'
	, `is_alert` BIT(1) NOT NULL DEFAULT 1 COMMENT 'Hashrate 0일 경우에 대한 경고 여부'
	, `reg_date` DATETIME NOT NULL DEFAULT current_timestamp() COMMENT '정보 등록시각'

	, PRIMARY KEY (`worker_no`)
)
COMMENT='MPH에 등록된 채굴기 정보 관리 테이블'
COLLATE='utf8_general_ci'
ENGINE=InnoDB
;
