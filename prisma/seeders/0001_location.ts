import { Prisma, PrismaClient } from "@prisma/client";
import { fileURLToPath } from "url";
import { basename } from "path";

const prisma = new PrismaClient();

const locationData: Prisma.LocationCreateInput[] = [
  { name: "Oak Forest" },
  { name: "Quarry" },
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

  const locations = await prisma.location.createMany({
    data: locationData,
  });
  console.log("Created", locations);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
