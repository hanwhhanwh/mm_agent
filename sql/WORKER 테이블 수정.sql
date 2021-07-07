-- WORKER 테이블에 "coin_no" 컬럼 추가
ALTER TABLE `WORKER`
	ADD COLUMN `coin_no` INT NULL DEFAULT 0 COMMENT '코인 고유 번호 (FK : COIN.coin_no)' AFTER `worker_no`;


-- RVN 채굴 장비
UPDATE WORKER SET
	coin_no = 3
WHERE 1 = 1
	AND worker_no < 522314
;

-- BTG 채굴 장비
UPDATE WORKER SET
	coin_no = 5
WHERE 1 = 1
	AND worker_no > 70426
	AND worker_no < 981983
;

-- XMR 채굴 장비
UPDATE WORKER SET
	coin_no = 4
WHERE 1 = 1
	AND worker_no > 522338
	AND worker_no < 16039922
;

-- ETH 채굴 장비
UPDATE WORKER SET
	coin_no = 2
WHERE 1 = 1
	AND worker_no > 1202609
	-- AND worker_no < 522314
;


ALTER TABLE `WORKER`
	CHANGE COLUMN `coin_no` `coin_no` INT NOT NULL COMMENT '코인 고유 번호 (FK : COIN.coin_no)' AFTER `worker_no`;


-- 채굴 중지된 RVN 장비 모니터링 제외
UPDATE `MPH_MONITOR`.`WORKER` SET `is_alert`=b'0' WHERE  `worker_no`=30698;
UPDATE `MPH_MONITOR`.`WORKER` SET `is_alert`=b'0' WHERE  `worker_no`=30701;
UPDATE `MPH_MONITOR`.`WORKER` SET `is_alert`=b'0' WHERE  `worker_no`=30702;
UPDATE `MPH_MONITOR`.`WORKER` SET `is_alert`=b'0' WHERE  `worker_no`=30761;
UPDATE `MPH_MONITOR`.`WORKER` SET `is_alert`=b'0' WHERE  `worker_no`=30764;
UPDATE `MPH_MONITOR`.`WORKER` SET `is_alert`=b'0' WHERE  `worker_no`=30793;
UPDATE `MPH_MONITOR`.`WORKER` SET `is_alert`=b'0' WHERE  `worker_no`=30794;
UPDATE `MPH_MONITOR`.`WORKER` SET `is_alert`=b'0' WHERE  `worker_no`=30804;
UPDATE `MPH_MONITOR`.`WORKER` SET `is_alert`=b'0' WHERE  `worker_no`=30806;
UPDATE `MPH_MONITOR`.`WORKER` SET `is_alert`=b'0' WHERE  `worker_no`=30807;
