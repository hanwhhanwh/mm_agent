-- DROP TABLE IF EXISTS COINS;

CREATE TABLE IF NOT EXISTS COINS
(
	`coin_no` INT NOT NULL AUTO_INCREMENT COMMENT '채굴 코인 고유식별번호'
	, `coin_en_name` VARCHAR (100) NOT NULL COMMENT '채굴 코인 영문 이름'
	, `coin_ko_name` VARCHAR (100) NOT NULL COMMENT '채굴 코인 한글 이름'
	, `coin_id` VARCHAR (10) NOT NULL COMMENT '채굴 코인 식별자, 코인 약어(Monero = XMR)'
	, `hash_unit` TINYINT NOT NULL COMMENT '해쉬 단위 : 0-H, 1-KH, 2-MH, 3-GH'
	, `homepage` VARCHAR (100) NULL COMMENT '채굴 코인 홈페이지 주소'
	, `mod_date` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '채굴 코인 수정시각'
	, `reg_date` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '채굴 코인 등록시각'

	, PRIMARY KEY ( `coin_no` )
	, UNIQUE INDEX `UNIQ_EN_NAME` ( `coin_en_name` )
	, UNIQUE INDEX `UNIQ_KO_NAME` ( `coin_ko_name` )
	, UNIQUE INDEX `UNIQ_ID` ( `coin_id` )
)
ENGINE=InnoDB
COLLATE='utf8_general_ci'
COMMENT='코인(Coin) 정보 관리 테이블'
;

INSERT INTO COINS ( `coin_ko_name`, `coin_en_name`, `coin_id`, `hash_unit`, `homepage` ) VALUES
	( '이더리움', 'Ethereum', 'ETH', 1, NULL )
	, ( '모네로', 'Monero', 'XMR', 0, NULL )
	, ( '비트코인 노바', 'Bitcoin Nova', 'BTN', 0, NULL )
	, ( '이더소셜', 'Ethersocial', 'ESN', 1, NULL )
	, ( '칼리스토', 'Calisto', 'CLO', 1, NULL )
	, ( '헌혈코인', 'Blood Donation Coin-Brazilian Coin', 'BBRC', 0, NULL )
	, ( '인텐스', 'Intense', 'ITN', 0, NULL )
	, ( '이오스', 'EOS', 'EOS', 0, NULL )
	, ( '메타버스', 'Metaverse', 'ETP', 1, NULL )
;
