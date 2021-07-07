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
