-- DASHBOARD 정보 관리 테이블
-- DROP TABLE `DASHBOARD`
CREATE TABLE IF NOT EXISTS `DASHBOARD`
(
	`coin_no` INT NOT NULL COMMENT '코인 고유 식별 번호'
	, `hashrate` DOUBLE NOT NULL COMMENT '전체 해쉬'
	, `shares_valid` INT NULL COMMENT '정상적 share 수'
	, `shares_invalid` INT NULL COMMENT '비정상적 share 수'
	, `estimates_block` DOUBLE NOT NULL COMMENT '추정 블럭수'
	, `estimates_fee` DOUBLE NOT NULL COMMENT '추정 수수료'
	, `balance_confirmed` DOUBLE NOT NULL COMMENT '확정된 수량'
	, `balance_unconfirmed` DOUBLE NOT NULL COMMENT '미확정된 수량'
	, `pool_workers` INT NOT NULL COMMENT '풀의 전체 워커 수'
	, `pool_hashrate` DOUBLE NOT NULL COMMENT '풀 전체 해쉬'
	, `pool_shares_valid` INT NULL COMMENT '정상적 share 수'
	, `pool_shares_invalid` INT sNULL COMMENT '비정상적 share 수'
	, `network_hashrate` DOUBLE NOT NULL COMMENT '네트워크 전체 해쉬'
	, `network_difficulty` BIGINT NOT NULL COMMENT '네트워크 난이도'
	, `network_block` INT NOT NULL COMMENT '네트워크 블럭'

	, `reg_date` DATETIME NOT NULL DEFAULT current_timestamp() COMMENT '정보 등록시각'

	, PRIMARY KEY (`reg_date` DESC, `coin_no`)
)
COMMENT='MPH DASHBOARD 정보 관리 테이블'
COLLATE='utf8_general_ci'
ENGINE=InnoDB
;

/*
INSERT INTO DASHBOARD
(
	coin_no, hashrate, shares_valid, shares_invalid, estimates_block
	, estimates_fee, balance_confirmed, balance_unconfirmed, pool_workers, pool_hashrate
	, pool_shares_valid, pool_shares_invalid, network_hashrate, network_difficulty, network_block
)
VALUES
(
	?, ?, ?, ?, ?
	, ?, ?, ?, ?, ?
	, ?, ?, ?, ?, ?
);


ALTER TABLE `DASHBOARD`
	CHANGE COLUMN `shares_valid` `shares_valid` INT(11) NULL COMMENT '정상적 share 수' AFTER `hashrate`,
	CHANGE COLUMN `shares_invalid` `shares_invalid` INT(11) NULL COMMENT '비정상적 share 수' AFTER `shares_valid`,
	CHANGE COLUMN `pool_shares_valid` `pool_shares_valid` INT(11) NULL COMMENT '정상적 share 수' AFTER `pool_hashrate`,
	CHANGE COLUMN `pool_shares_invalid` `pool_shares_invalid` INT(11) NULL COMMENT '비정상적 share 수' AFTER `pool_shares_valid`;
*/
