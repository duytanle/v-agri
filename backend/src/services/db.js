import mysql from "mysql2";
import config from "../../config.js";
const pool = mysql.createPool(config.db).promise();

export async function getAllRow(table) {
    const [rows] = await pool.query(`SELECT * from ${table}`);
    return rows;
}

export async function getMaxID(table, column) {
    const [rows] = await pool.query(`SELECT MAX(${column}) from ${table}`);
    return rows;
}

export async function getByColumn(table, column, where) {
    const [rows] = await pool.query(
        `SELECT * from ${table} WHERE ${column}= "${where}"`
    );
    return rows;
}

export async function getByColumnCons(table, where) {
    const [rows] = await pool.query(`SELECT * from ${table} WHERE ${where}`);
    return rows;
}
export async function postRow(table, fields, values) {
    const result = await pool.query(
        `INSERT INTO ${table} (${fields}) values (${values})`
    );

    return result;
}

export async function updateRows(table, valueUpdate, where) {
    const result = await pool.query(
        `UPDATE ${table} SET ${valueUpdate} where ${where}`
    );

    return result;
}

export async function getRowJoin(table1, table2, fieldCon, where) {
    const [row] = await pool.query(`SELECT * 
FROM ${table1} INNER JOIN ${table2} ON ${table1}.${fieldCon} = ${table2}.${fieldCon} where ${where}`);
    return row;
}

export async function getRowJoins(table, infoJoin, where = "") {
    const joinString = infoJoin.map(
        (info) =>
            `${info.type ? info.type : `INNER JOIN`} ${info.table2} ON ${
                info.table1
            }.${info.fieldCon} = ${info.table2}.${info.fieldCon}`
    );
    const [row] = await pool.query(
        `SELECT * FROM ${table} ${joinString.join(" ")} ${
            where ? `where ${table}.${where}` : ``
        }`
    );

    return row;
}

export async function getAllJoins(type, table, fields, infoJoin) {
    const joinString = infoJoin.map(
        (info) =>
            `${type} ${info.table2} ON ${info.table1}.${info.fieldCon} = ${info.table2}.${info.fieldCon}`
    );
    const [row] = await pool.query(
        `SELECT ${fields} FROM ${table} ${joinString.join(" ")}`
    );

    return row;
}

export async function countData(table, countField, where = "") {
    const [number] = await pool.query(
        `SELECT COUNT(${countField}) as CountValue from ${table} ${
            where ? `where ${where}` : ""
        }`
    );
    return number;
}

export async function getDataCustom(
    preCondition = "",
    selectCustom,
    fromCustom,
    conditionCustom
) {
    const [result] = await pool.query(
        `${
            preCondition ? `${preCondition};` : ""
        }\nSELECT ${selectCustom} FROM ${fromCustom} ${conditionCustom}`
    );
    // console.log(
    //     `${
    //         preCondition ? `${preCondition};` : ""
    //     }\nSELECT ${selectCustom} FROM ${fromCustom} ${conditionCustom}`
    // );
    return result;
}

export async function deleteRow(table, column, where) {
    const result = await pool.query(
        `delete from ${table} where ${column}="${where}"`
    );
    return result;
}

export async function deleteCustom(table, where) {
    const result = await pool.query(`delete from ${table} where ${where}`);
    return result;
}
