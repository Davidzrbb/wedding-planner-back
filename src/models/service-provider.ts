import {DataTypes} from 'sequelize';
import sequelize from '../utils/mysql.connector';

export interface ServiceProviderProps {
    id?: number,
    name?: string,
    price?: number,
    contact?: string,
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
        type: new DataTypes.NUMBER(),
    },
    contact: {
        type: DataTypes.STRING(128),
    }
});

