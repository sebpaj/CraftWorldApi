import Location from "./Location";
import Material from "./Material";

// Define associations
Location.hasOne(Material, { foreignKey: "materialId" });
Material.belongsTo(Location, { foreignKey: "locationId" });

export { Location, Material };
