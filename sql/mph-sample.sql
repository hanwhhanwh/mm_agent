-- MPH API 호출 결과 기록 관리 테이블
-- DROP TABLE `CALL_LOG`
CREATE TABLE IF NOT EXISTS `CALL_LOG`
(
	`call_log_no` INT NOT NULL COMMENT 'MPH에 API 호출 고유 식별 번호'
	, `api_name` VARCHAR(50) NOT NULL COMMENT 'MPH API 식별 이름'
	, `coin_name` VARCHAR(50) NOT NULL COMMENT '호출 Coin 식별 이름'
	, `call_status_code` SMALLINT NOT NULL DEFAULT 200 COMMENT 'API 호출 결과에 대한 status code'
	, `data` MEDIUMTEXT NULL COMMENT 'MPH API 호출 결과'
	, `reg_date` DATETIME NOT NULL DEFAULT current_timestamp() COMMENT 'API 호출 로그 등록시각'

	, PRIMARY KEY (`call_log_no`)
)
COMMENT='MPH API 호출 결과 기록 관리 테이블'
COLLATE='utf8_general_ci'
ENGINE=InnoDB
;


-- MPH Coin 최근 채굴 결과 관리 테이블
-- DROP TABLE `RECENT_CREDITS`
CREATE TABLE IF NOT EXISTS `RECENT_CREDITS`
(
	`reg_date` DATE NOT NULL COMMENT '채굴 날짜'
	, `coin_no` INT NOT NULL COMMENT 'Coin 고유 식별 번호 (FK: COIN.coin_no)'
	, `amount` DOUBLE NOT NULL COMMENT '채굴량'
	, `last_update` DATETIME NOT NULL DEFAULT current_timestamp() COMMENT '정보의 마지막 갱신 시각'

	, PRIMARY KEY (`reg_date`, `coin_no`)
)
COMMENT='MPH Coin 최근 채굴 결과 관리 테이블'
COLLATE='utf8_general_ci'
ENGINE=InnoDB
;


INSERT INTO `RECENT_CREDITS` (`reg_date`, `coin_no`, `amount`) VALUES	('2021-05-19', 2, 0.0532019845)ON DUPLICATE KEY UPDATE	amount = 0.0532019845	, `last_update` = NOW();
INSERT INTO `RECENT_CREDITS` (`reg_date`, `coin_no`, `amount`) VALUES	('2021-05-18', 2, 0.0213927625)ON DUPLICATE KEY UPDATE	amount = 0.0213927625	, `last_update` = NOW();
INSERT INTO `RECENT_CREDITS` (`reg_date`, `coin_no`, `amount`) VALUES	('2021-05-17', 2, 0.0311809445)ON DUPLICATE KEY UPDATE	amount = 0.0311809445	, `last_update` = NOW();
INSERT INTO `RECENT_CREDITS` (`reg_date`, `coin_no`, `amount`) VALUES	('2021-05-16', 2, 0.0288238665)ON DUPLICATE KEY UPDATE	amount = 0.0288238665	, `last_update` = NOW();

INSERT INTO `RECENT_CREDITS` (`reg_date`, `coin_no`, `amount`) VALUES	('2021-05-16', (SELECT coin_no FROM COIN WHERE mph_hostname = 'ethereum'), 0.0288238665)ON DUPLICATE KEY UPDATE	amount = 0.0288238665	, `last_update` = NOW();


INSERT INTO WORKER
(worker_no, user_name, password, monitor, is_alert, reg_date)
VALUES (0, '', '', 0, 0, NOW());


INSERT INTO WORKERS_STATUS
(coin_no, version, runtime)
VALUES (0, '', 0);


INSERT INTO WORKERS_STATUS_DATA
(work_status_no, worker_no, coin_no, hashrate, difficulty)
VALUES (0, 0, 0, 0, 0);


-- Ethereum 현재 동작하지 않는 채굴기의 `is_alert` 끄기
UPDATE `MPH_MONITOR`.`WORKER` SET `is_alert`=b'0' WHERE  `worker_no`=16734839;
UPDATE `MPH_MONITOR`.`WORKER` SET `is_alert`=b'0' WHERE  `worker_no`=16734970;
UPDATE `MPH_MONITOR`.`WORKER` SET `is_alert`=b'0' WHERE  `worker_no`=16642176;
