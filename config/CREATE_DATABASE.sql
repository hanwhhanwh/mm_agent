-- 빌더를 위한 데이터베이스 생성
CREATE DATABASE `MINER`;

-- 빌더를 위한 신규 사용자 계정 'mm_agnet' 생성
CREATE USER 'mm_agnet'@'localhost' IDENTIFIED BY 'mm_agent2019^^';

-- 신규 사용자 계정 'mm_agnet'에 MINER DB에 대한 모든 권한 부여
GRANT ALL PRIVILEGES ON MINER.* TO 'mm_agnet'@'localhost';

FLUSH PRIVILEGES;
