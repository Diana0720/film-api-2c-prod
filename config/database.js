// database.js
const sqlite3 = require('sqlite3').verbose();
const dotenv = require('dotenv');

dotenv.config();

const DB_SOURCE = process.env.DB_SOURCE || "movies.db";

const db = new sqlite3.Database(DB_SOURCE, (err) => {
    if (err) {
        console.error("Gagal koneksi ke database:", err.message);
        throw err;
    } else {
        console.log('Terhubung ke database SQLite.');
        
        db.run('CREATE TABLE IF NOT EXISTS users ( \
            id INTEGER PRIMARY KEY AUTOINCREMENT, \
            username TEXT NOT NULL UNIQUE, \
            password TEXT NOT NULL \
            role TEXT NOT NULL DEFAULT `user`\
        )', (err) => {
            if (err) {
                console.error("Gagal membuat tabel users:", err.message);
            }
        });

        // Membuat tabel movies
        db.run('CREATE TABLE IF NOT EXISTS movies ( \
            id INTEGER PRIMARY KEY AUTOINCREMENT, \
            title TEXT, \
            director TEXT, \
            year INTEGER \
        )', (err) => {
            if (err) {
                console.error("Gagal membuat tabel movies:", err.message);
            }
        });
        
        // Membuat tabel directors 
        db.run('CREATE TABLE IF NOT EXISTS directors ( \
            id INTEGER PRIMARY KEY AUTOINCREMENT, \
            name TEXT, \
            birthYear INTEGER \
        )', (err) => {
            if (err) {
                console.error("Gagal membuat tabel directors:", err.message);
            }
        });
    }
});

module.exports = db;