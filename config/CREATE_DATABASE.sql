-- 빌더를 위한 데이터베이스 생성
CREATE DATABASE `MINER`;
-- DROP DATABASE `MINER`;

-- 빌더를 위한 신규 사용자 계정 'mm_agent' 생성
CREATE USER 'mm_agent'@'%' IDENTIFIED BY 'mm_agent2019^^';
-- DROP USER 'mm_agent'@'localhost';

-- 신규 사용자 계정 'mm_agnet'에 MINER DB에 대한 모든 권한 부여
GRANT ALL PRIVILEGES ON MINER.* TO 'mm_agent'@'%';
-- REVOKE ALL ON MINER.* FROM 'mm_agent'@'localhost';

FLUSH PRIVILEGES;
