/**
 * @summary 로깅 처리를 위한 모듈
 * 	환경변수에 "NODE_ENV"가 정의되어 있지 않으면, "debug" 레벨로 동작함.
 *  로깅되는 timestamp 시각 정보는 UTC가 아닌 로컬의 시각 정보입니다.
 * @author hbesthee@naver.com
 * @date 2021-03-14
 */

const fs = require('fs'); // 파일 시스템
const { createLogger, format, transports, Console } = require('winston');
const winston = require('winston/lib/winston/config');
require('winston-daily-rotate-file');

const env = process.env.NODE_ENV || 'development';
const LOG_DIR = 'logs';
const tsFormat = () => (new Date()).toLocaleTimeString();
const myFormat = format.combine(
	format.timestamp({format: 'YYYY-MM-DD HH:mm:ss.SSS'})
	, format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`)
	//, format.colorize()
);


/** 기본 로깅 폴더 : 현재 폴더/logs */
let g_strLogFolder = './' + LOG_DIR;
/** 기본 로깅 폴더 : 현재 폴더/logs */
let g_strLogFilePrefix = '';
/** 로그 파일 확장자 */
let g_strLogFileExt = '.log';
/** 로그 파일을 날짜별로 만들지 여부 */
let g_isEnableRotateLog = true;
/** logBuffer() 함수에서 한줄에 출력할 버퍼 바이트 수. 기본 40bytes */
let g_nBufferPrintingBytesCount = 40;


/** 로깅 객체 */
let g_logger;


/**
 * Logger 초기화를 수행합니다.
 * @param {string} strLogFolder 기본 로깅 폴더. 기본값 = 현재 폴더/logs
 * @param {string} strLogFilePrefix = 로그 파일명에 대한 접두어. 기본값 = "log-"
 * @param {string} strLogFileExt 로그 파일 확장자. 기본값 = ".log"
 * @param {boolean} isEnableRotateLog 로그 파일을 날짜별로 만들지 여부. 기본값 = true
 */
function init() {
	// 이미 생성되어 있다면, 생성된 객체를 반환합니다.
	if (g_logger !== undefined)
		return g_logger;

	// logger 설정값 로딩
	if (fs.existsSync('./config/logger.json')) {
		let loggerConfig = require('../config/logger.json');
		this.g_strLogFolder = loggerConfig.logFolder;
		this.g_strLogFilePrefix = loggerConfig.logFilePrefix;
		this.g_strLogFileExt = loggerConfig.logFileExt;
		this.g_isEnableRotateLog = loggerConfig.isEnableRotateLog;
		this.g_nBufferPrintingBytesCount = loggerConfig.bufferPrintingBytesCount;
	}
	else {
		this.g_strLogFolder = './' + LOG_DIR;
		this.g_strLogFilePrefix = '';
		this.g_strLogFileExt = '.log';
		this.g_isEnableRotateLog = true;
		this.g_nBufferPrintingBytesCount = 40;
	}

	// 로깅 폴더 생성
	if (!fs.existsSync(this.g_strLogFolder)) {
		fs.mkdirSync(this.g_strLogFolder);
	};

	const winstonDailyRotateFile = new (transports.DailyRotateFile)({
		filename: this.g_strLogFolder + '/' + this.g_strLogFilePrefix + '%DATE%' + this.g_strLogFileExt
		, timestamep: tsFormat
		, datePattern: 'YYYYMMDD'
		, handleExceptions: true
		, prepend: true
		// format: format.combine( 
		//     format.splat()
		//     , format.json()
		// ), 
		, format: myFormat
		, level: env === 'product' ? 'error' : 'debug'
		, zippedArchive: true
		, maxSize: '30m'
		, maxFiles: '30d',
	});

	g_logger = createLogger({
		level: 'info'
		//, format: winstone.format.json()
		, transports: [
			winstonDailyRotateFile
			, new transports.Console({
					format: format.combine( format.colorize() // 색깔 넣어서 출력. 제일 먼저 지정
						, format.simple() )
					//format: myFormat
					// format: format.combine( 
					//     format.splat()
					//     , format.simple()
					// )
					, handleExceptions: true
					, level: env === 'product' ? 'error' : 'debug'
			})
		]
		, exitOnError: false, // do not exit on handled exceptions
	});
	// g_logger.exitAfterFlush(0);

	return g_logger;
}


/**
 * 버퍼의 이진 데이터를 16진 문자열(Hexa String)로 출력합니다.
 * 기본 적으로 40byte씩 잘라서 출력합니다.
 * @param {Buffer} buffer 로깅처리할 버퍼 객체
 * @param {string} strMessage 출력할 버퍼에 대한 설명 메시지 등
 * @param {number} nBufferPrintingBytesCount 버퍼 내용 출력시, 한 줄에 표시할 버퍼 bytes 수
 */
function logBuffer(buffer, strMessage = undefined, nBufferPrintingBytesCount = undefined) {
	if (g_logger === undefined)
		return;

	let nStart = 0;
	let nEnd = 0;
	let nCount = buffer.length;
	if (nBufferPrintingBytesCount === undefined) {
		nBufferPrintingBytesCount = this.g_nBufferPrintingBytesCount;
	}
	if (strMessage === undefined)
		strLogMessage = 'Buffer length = ' + nCount;
	else
		strLogMessage = strMessage + '\n\tBuffer length = ' + nCount;

	do {
		nEnd = nStart + nBufferPrintingBytesCount;
		strLogMessage += "\n\t" + buffer.toString("hex", nStart, nEnd);
		nStart = nEnd;
	} while (nCount > nEnd);
	g_logger.info(strLogMessage);
}

init();

exports.logger = g_logger;
exports.logBuffer = logBuffer;
module.exports = exports;
