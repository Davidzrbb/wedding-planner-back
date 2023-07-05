import {DataTypes} from 'sequelize';
import sequelize from '../utils/mysql.connector';

export interface CategoryProps {
    id?: number,
    name?: string,
    priority?: string,
    state?: boolean,
}

export const Category = sequelize.define('category', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: new DataTypes.STRING(128),
    },
    priority: {
        type: new DataTypes.STRING(128),
    },
    state: {
        type: DataTypes.BOOLEAN,
    }
});

