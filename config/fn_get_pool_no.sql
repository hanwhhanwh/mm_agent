DROP FUNCTION IF EXISTS fn_get_pool_no;

DELIMITER //
CREATE DEFINER=`mm_agent`@`%` FUNCTION fn_get_pool_no( $host_addr TINYTEXT ) RETURNS INT
	MODIFIES SQL DATA
	COMMENT 'pool 주소를 입력하혀, 해당 풀이 이미 존재하면 해당 pool_no 를 반환하고, 없는 경우에는 새로 추가 후, 번호를 반환한다.'
BEGIN
	DECLARE $pool_no INT;
	
	SET $pool_no = 0;

	SELECT
		P.`pool_no` INTO $pool_no
	FROM POOLS AS P
	WHERE 1 = 1
		AND pool_host LIKE $host_addr
	;

	IF $pool_no IS NULL OR $pool_no = 0 THEN
		INSERT INTO POOLS ( pool_host ) VALUES ( $host_addr );
		SET $pool_no = LAST_INSERT_ID();
	END IF;

	RETURN $pool_no;
END //

DELIMITER ;