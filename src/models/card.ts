import {DataTypes} from 'sequelize';
import sequelize from '../utils/mysql.connector';

export interface CardProps {
    id?: number,
    name?: string,
    state?: boolean,
    fk_category?: number,
}

export const Card = sequelize.define('card', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: new DataTypes.STRING(128),
    },
    state: {
        type: DataTypes.BOOLEAN,
    },
    fk_category: {
        type: DataTypes.INTEGER,
    }
});

