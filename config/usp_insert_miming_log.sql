DROP PROCEDURE IF EXISTS `usp_insert_miming_log`;

DELIMITER //
CREATE OR REPLACE PROCEDURE `usp_insert_miming_log`(
	`p_miner_no` INT
	, `p_miner_sw`  VARCHAR(200)
	, `p_pool_info`  VARCHAR(200)
	, `p_running_time` INT
	, `p_total_hash` INT
	, `p_submitted_shares` INT
	, `p_invalid_shares` INT
	, `p_rejected_shares` INT
)
BEGIN

	DECLARE v_miner_no INT;
	DECLARE v_pool_no INT;
    DECLARE v_mining_log_no INT;

	SET v_miner_no = 0;
	SET v_pool_no = 0;
	SET v_mining_log_no = 0;

	SELECT fn_get_miner_sw_no(p_miner_sw) INTO v_miner_no;
	SELECT fn_get_pool_no(p_pool_info) INTO v_pool_no;
	
    INSERT INTO `MINING_LOGS` ( miner_no, miner_sw_no, pool_no, running_time, total_hash, submitted_shares, invalid_shares, rejected_shares )
    VALUES ( v_miner_no, v_pool_no, p_running_time, p_total_hash, p_submitted_shares, p_invalid_shares, p_rejected_shares );

	SET v_mining_log_no = LAST_INSERT_ID();

	SELECT
		v_mining_log_no AS mining_log_no;

END//
DELIMITER ;

/*
	CALL usp_add_site(2345, 34534, 1, 'duzon18888');
*/