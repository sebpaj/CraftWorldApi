import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../database";

interface MaterialAttributes {
  id: number;
  name: string;
  locationId: number;
}

interface MaterialCreationAttributes
  extends Optional<MaterialAttributes, "id"> {}

class Material extends Model<MaterialAttributes, MaterialCreationAttributes> {
  public id!: number;
  public name!: string;
  public locationId!: number;
}

Material.init(
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
    locationId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
  },
  { sequelize, tableName: "materials", timestamps: true }
);

export default Material;
