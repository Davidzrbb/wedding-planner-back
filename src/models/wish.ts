import {DataTypes} from 'sequelize';
import sequelize from '../utils/mysql.connector';

export interface WishProps {
    id?: number,
    text?: string,
}

export const Wish = sequelize.define('wish', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: new DataTypes.TEXT()
    },
});

