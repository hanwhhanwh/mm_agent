-- 코인 정보 관리 테이블
-- DROP TABLE `COIN`
CREATE TABLE IF NOT EXISTS `COIN`
(
	`coin_no` INT NOT NULL COMMENT '코인 고유 식별 번호'
	, `en_name` VARCHAR(100) NOT NULL COMMENT '코인 영문 이름' COLLATE 'utf8_general_ci'
	, `kr_name` VARCHAR(100) NOT NULL COMMENT '코인 한글 이름' COLLATE 'utf8_general_ci'
	, `acronyms` VARCHAR(10) NOT NULL COMMENT '영문 약어' COLLATE 'utf8_general_ci'
	, `mph_hostname` VARCHAR(100) NOT NULL DEFAULT 1 COMMENT 'MPH 코인 서버 이름' COLLATE 'utf8_general_ci'
	, `is_alert` BIT(1) NOT NULL DEFAULT 1 COMMENT 'Hashrate 0일 경우에 대한 경고 여부'
	, `reg_date` DATETIME NOT NULL DEFAULT current_timestamp() COMMENT '정보 등록시각'

	, PRIMARY KEY (`coin_no`)
)
COMMENT='코인 정보 관리 테이블'
COLLATE='utf8_general_ci'
ENGINE=InnoDB
;

INSERT INTO `COIN` (`coin_no`, `en_name`, `kr_name`, `acronyms`, `mph_hostname`, `is_alert`) VALUES
	(1, 'Bitcoin', '비트코인', 'BTC', 'bitcoin', 0)
	, (2, 'Ethereum', '이더리움', 'ETH', 'ethereum', 1)
	, (3, 'Ravencoin', '레이븐', 'RVN', 'ravencoin', 1)
	, (4, 'Monero', '모네로', 'XMR', 'monero', 1)
;