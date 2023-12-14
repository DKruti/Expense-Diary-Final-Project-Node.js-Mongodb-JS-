//import winston from "winston"
import winston, {transports, format} from "winston"
//new library to get timezon and time related thing librabry is Luxon
//import luxon from 'luxon'
import {DateTime} from 'luxon'

const loggerlevel = ['info','debug','error', 'warn']


const logFormat = format.printf(({level,message}) =>{
    //return `log-format`
    //check timestamp when do QA so to define here static timestam o s below
    //const timestamp = '2021-09-28 12:00:00'
    
    //from librabry luxon define below
    //const timestamp = luxon.DateTime.now().toUTC()
    const timestamp = DateTime.now().toUTC()

    return `time:${timestamp} level:${level} message:${message}`
})

export const getLoggerInstance = ()=>{
//use winston{} 
    const logger = winston.createLogger({
        level:'info', // by default
        defaultMeta: { service: 'sfbu_course_service' }, //prints service name
        format:format.json(),
        transports:[
                //new winston.transports.Console({format:winston.format.simple()}),
                //new transports.Console({format:format.simple()}),
                new transports.Console({format:format.combine(format.colorize(),logFormat)}),
        ]
    })
    return logger
}