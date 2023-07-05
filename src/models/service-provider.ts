import {DataTypes} from 'sequelize';
import sequelize from '../utils/mysql.connector';

export interface ServiceProviderProps {
    id?: number,
    name?: string,
    price?: number,
    contact?: string,
    fk_category?: number,
}

export const ServiceProvider = sequelize.define('serviceprovider', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: new DataTypes.STRING(128),
    },
    price: {
        type: new DataTypes.INTEGER(),
    },
    contact: {
        type: DataTypes.STRING(128),
    },
    fk_category: {
        type: DataTypes.INTEGER(),
    }
});

