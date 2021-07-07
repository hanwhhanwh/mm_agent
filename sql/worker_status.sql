-- 코인별 최근 수집 현황
SELECT
	R.reg_date, D.coin_no, C.acronyms, N.user_name, D.hashrate, D.worker_no, D.work_status_no
FROM WORKERS_STATUS_DATA AS D
	INNER JOIN (
		SELECT
			coin_no, MAX(work_status_no) AS work_status_no, MAX(reg_date) AS reg_date
		FROM WORKERS_STATUS AS W
		WHERE 1 = 1
		GROUP BY coin_no
	) AS R ON R.coin_no = D.coin_no
		AND R.work_status_no = D.work_status_no
	INNER JOIN WORKER AS N ON N.worker_no = D.worker_no
	INNER JOIN COIN AS C ON C.coin_no = D.coin_no
WHERE 1 = 1
	AND N.is_alert = 1
ORDER BY 4, D.coin_no, 2, D.work_status_no DESC, worker_no
LIMIT 200;


SELECT
	R.reg_date, R.coin_no, C.acronyms, R.amount, R.last_update
FROM RECENT_CREDITS AS R
	INNER JOIN COIN AS C ON C.coin_no = R.coin_no
ORDER BY R.reg_date DESC, R.coin_no
LIMIT 12;
