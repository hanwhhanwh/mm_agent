-- MINING 데이터 베이스 생성
CREATE DATABASE MINING;

-- 'mining' DB 계정 생성
CREATE USER 'mining'@'%' IDENTIFIED BY 'mining#@!~';

-- 'mining' 계정에 대한 권한 부여
GRANT ALL PRIVILEGES ON MINING.* TO 'mining'@'%';

-- 계정 대한 권한 새로 고침
FLUSH PRIVILEGES;