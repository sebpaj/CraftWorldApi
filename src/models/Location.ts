import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../database";

interface LocationAttributes {
  id: number;
  name: string;
  materialId: number;
}

interface LocationCreationAttributes
  extends Optional<LocationAttributes, "id"> {}

class Location extends Model<LocationAttributes, LocationCreationAttributes> {
  public id!: number;
  public name!: string;
  public materialId!: number;
}

Location.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(128),
      allowNull: false,
    },
    materialId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "locations",
    timestamps: true,
  }
);

export default Location;
