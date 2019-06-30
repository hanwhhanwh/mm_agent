DROP FUNCTION IF EXISTS fn_get_miner_sw_no;

DELIMITER //
CREATE DEFINER=`mm_agent`@`%` FUNCTION fn_get_miner_sw_no( $miner_sw_name TINYTEXT ) RETURNS SMALLINT
	MODIFIES SQL DATA
	COMMENT 'MINER S/W 이름을 입력하여, S/W가 이미 존재하면 해당 miner_sw_no 를 반환하고, 없는 경우에는 새로 추가 후, 번호를 반환한다.'
BEGIN
	DECLARE $miner_sw_no SMALLINT;
	
	SET $miner_sw_no = 0;

	SELECT
		S.`miner_sw_no` INTO $miner_sw_no
	FROM MINER_SW AS S
	WHERE 1 = 1
		AND miner_sw_name LIKE $miner_sw_name
	;

	IF $miner_sw_no IS NULL OR $miner_sw_no = 0 THEN
		INSERT INTO MINER_SW ( miner_sw_name ) VALUES ( $miner_sw_name );
		SET $miner_sw_no = LAST_INSERT_ID();
	END IF;

	RETURN $miner_sw_no;
END //

DELIMITER ;