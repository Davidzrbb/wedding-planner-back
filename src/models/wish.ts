import {DataTypes} from 'sequelize';
import sequelize from '../utils/mysql.connector';

export interface WishProps {
    id?: number,
    text?: string,
    fk_category?: number,
}

export const Wish = sequelize.define('wish', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    text: {
        type: new DataTypes.TEXT()
    },
    fk_category: {
        type: DataTypes.INTEGER,
    }
});

