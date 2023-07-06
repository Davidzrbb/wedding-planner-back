import {DataTypes} from 'sequelize';
import sequelize from '../utils/mysql.connector';

export interface ConnexionProps {
    id?: number,
    login?: string,
    password?: string,
    token?: string,
}

export const Connexion = sequelize.define('connexion', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    login: {
        type: new DataTypes.STRING(128),
    },
    password: {
        type: new DataTypes.STRING(128),
    },
    token: {
        type: DataTypes.STRING(),
    }
});

