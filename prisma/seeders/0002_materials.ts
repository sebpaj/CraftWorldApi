import { Prisma, PrismaClient } from "@prisma/client";
import { fileURLToPath } from "url";
import { basename } from "path";

const prisma = new PrismaClient();

const materialsData: Prisma.MaterialCreateManyInput[] = [
  {
    name: "Oak Wood",
    locationId: 1,
  },
  {
    name: "Stone",
    locationId: 2,
  },
];

async function main() {
  const fileName = basename(fileURLToPath(import.meta.url));
  console.log("Seeding", fileName);

  const migrationInstances = await prisma.migration.findMany();
  const migrationNames = migrationInstances.map((migration) => migration.name);
  if (migrationNames.includes(fileName)) {
    console.log("Migration", fileName, "already seeded.");
    return;
  }

  const migration = await prisma.migration.create({
    data: { name: fileName },
  });
  console.log("Seeded", migration);

  const materials = await prisma.material.createMany({
    data: materialsData,
  });
  console.log("Created", materials);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
