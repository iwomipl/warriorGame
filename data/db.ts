import {createPool} from 'mysql2/promise';

export const pool = createPool({
    host: 'localhost',
    user: 'root',
    database: 'megak_warrior',
    decimalNumbers: true,
    namedPlaceholders: true,
});