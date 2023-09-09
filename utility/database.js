import config from "../config.js";
import mysql2 from "mysql2/promise";

class Database {
    pool;

    constructor() {
        this.pool = mysql2.createPool({
            host: config.db.host,
            port: config.db.port,
            user: config.db.username,
            password: config.db.password,
            database: config.db.database,
            waitForConnections: true,
            connectionLimit: 10,
            queueLimit: 0
        });
    }

    async totalItemCount() {
        const connection = await this.pool.getConnection();
        try {
            const sql = `
            WITH CurrentDay AS (
                SELECT i.amount
                FROM items i
                INNER JOIN (
                    SELECT label, MAX(id) AS max_id
                    FROM items
                    WHERE createdAt >= NOW() - INTERVAL 1 DAY
                    GROUP BY label
                ) sub ON i.label = sub.label AND i.id = sub.max_id
            ),
            Yesterday AS (
                SELECT i.amount
                FROM items i
                INNER JOIN (
                    SELECT label, MAX(id) AS max_id
                    FROM items
                    WHERE createdAt BETWEEN NOW() - INTERVAL 2 DAY AND NOW() - INTERVAL 1 DAY
                    GROUP BY label
                ) sub ON i.label = sub.label AND i.id = sub.max_id
            )
            SELECT 
                COALESCE(SUM(cd.amount), 0) AS currentItemCount,
                COALESCE(SUM(y.amount), 0) AS yesterdayItemCount,
                CASE 
                    WHEN COALESCE(SUM(y.amount), 0) = 0 THEN NULL 
                    ELSE (COALESCE(SUM(cd.amount), 0) - COALESCE(SUM(y.amount), 0)) / COALESCE(SUM(y.amount), 0) * 100 
                END AS incrementPercentage
            FROM (SELECT 1) AS dummy
            LEFT JOIN CurrentDay cd ON TRUE
            LEFT JOIN Yesterday y ON TRUE;
            `;

            const [rows] = await connection.query(sql);

            return {
                currentItemCount: rows[0].currentItemCount,
                yesterdayItemCount: rows[0].yesterdayItemCount,
                incrementPercentage: rows[0].incrementPercentage
            };
        } catch (err) {
            console.error('Error while fetching items:', err);
            throw err;
        }
        finally {
            connection.release();
        }
    }

    async uraniumTrend() {
        const connection = await this.pool.getConnection();
        try {
            const sql = `
            WITH CurrentDay AS (
                SELECT i.amount
                FROM items i
                INNER JOIN (
                    SELECT label, MAX(id) AS max_id
                    FROM items
                    WHERE createdAt >= NOW() - INTERVAL 1 DAY
                    AND label = 'Uranium Ingot'
                    GROUP BY label
                ) sub ON i.label = sub.label AND i.id = sub.max_id
            ),
            
            Yesterday AS (
                SELECT i.amount
                FROM items i
                INNER JOIN (
                    SELECT label, MAX(id) AS max_id
                    FROM items
                    WHERE createdAt BETWEEN NOW() - INTERVAL 2 DAY AND NOW() - INTERVAL 1 DAY
                    AND label = 'Uranium Ingot'
                    GROUP BY label
                ) sub ON i.label = sub.label AND i.id = sub.max_id
            )
            
            SELECT 
                COALESCE(SUM(cd.amount), 0) AS currentItemCount,
                COALESCE(SUM(y.amount), 0) AS yesterdayItemCount,
                CASE 
                    WHEN COALESCE(SUM(y.amount), 0) = 0 THEN NULL 
                    ELSE (COALESCE(SUM(cd.amount), 0) - COALESCE(SUM(y.amount), 0)) / COALESCE(SUM(y.amount), 0) * 100 
                END AS incrementPercentage
            FROM (SELECT 1) AS dummy
            LEFT JOIN CurrentDay cd ON TRUE
            LEFT JOIN Yesterday y ON TRUE;
            `;

            const [rows] = await connection.query(sql);

            return {
                currentItemCount: rows[0].currentItemCount,
                yesterdayItemCount: rows[0].yesterdayItemCount,
                incrementPercentage: rows[0].incrementPercentage
            };
        } catch (err) {
            console.error('Error while fetching items:', err);
            throw err;
        }
        finally {
            connection.release();
        }
    }

    async fetchDailyItemCount() {
        const connection = await this.pool.getConnection();
        try {
            const sql = `
            WITH DateSeries AS (
                SELECT CURDATE() - INTERVAL (a.a + (10 * b.a) + (100 * c.a)) DAY AS day
                FROM (SELECT 0 AS a UNION ALL SELECT 1 UNION ALL SELECT 2 UNION ALL SELECT 3 UNION ALL SELECT 4 UNION ALL SELECT 5 UNION ALL SELECT 6 UNION ALL SELECT 7 UNION ALL SELECT 8 UNION ALL SELECT 9) AS a
                CROSS JOIN (SELECT 0 AS a UNION ALL SELECT 1 UNION ALL SELECT 2 UNION ALL SELECT 3 UNION ALL SELECT 4 UNION ALL SELECT 5 UNION ALL SELECT 6 UNION ALL SELECT 7 UNION ALL SELECT 8 UNION ALL SELECT 9) AS b
                CROSS JOIN (SELECT 0 AS a UNION ALL SELECT 1) AS c
            ),
            LatestItems AS (
                SELECT
                    DATE(createdAt) as day,
                    SUM(amount) as dailyAmount
                FROM items
                WHERE 
                    label = 'Uranium Ingot'
                    AND createdAt >= NOW() - INTERVAL 30 DAY
                    AND id IN (
                        SELECT MAX(id) 
                        FROM items 
                        WHERE label = 'Uranium Ingot'
                        GROUP BY DATE(createdAt), label
                    )
                GROUP BY day
            )
            
            SELECT
                ds.day,
                COALESCE(li.dailyAmount, 0) AS dailyAmount
            FROM DateSeries ds
            LEFT JOIN LatestItems li ON ds.day = li.day
            WHERE ds.day > NOW() - INTERVAL 13 DAY
            ORDER BY ds.day DESC
            LIMIT 12;
            `;
            const [rows] = await connection.query(sql);
            return rows;

        } catch (err) {
            console.error('Error while fetching daily item count:', err);
            throw err;
        } finally {
            connection.release();
        }
    }

    async topItems() {
        const connection = await this.pool.getConnection();
        try {
            const sql = `
            SELECT *
            FROM items i
            INNER JOIN (
                SELECT *, MAX(id) AS max_id
                FROM items
                WHERE createdAt >= NOW() - INTERVAL 1 DAY
                GROUP BY label
            ) sub ON i.label = sub.label AND i.id = sub.max_id 
            order by i.amount desc
            LIMIT 5;
            `;

            const [rows] = await connection.query(sql);
            return rows;
        } catch (err) {
            console.error('Error while fetching items:', err);
            throw err;
        }
        finally {
            connection.release();
        }
    }
}

const database = new Database();

export default database;