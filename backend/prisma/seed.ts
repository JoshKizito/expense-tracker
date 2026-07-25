import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const DEFAULT_CATEGORIES = [
  { name: "Alimentation", icon: "utensils", color: "#f97316" },
  { name: "Transport", icon: "car", color: "#3b82f6" },
  { name: "Logement", icon: "home", color: "#8b5cf6" },
  { name: "Loisirs", icon: "film", color: "#ec4899" },
  { name: "Santé", icon: "heart-pulse", color: "#ef4444" },
  { name: "Shopping", icon: "shopping-bag", color: "#14b8a6" },
  { name: "Factures", icon: "receipt", color: "#6366f1" },
  { name: "Éducation", icon: "graduation-cap", color: "#0ea5e9" },
  { name: "Autre", icon: "more-horizontal", color: "#6b7280" },
];

async function main() {
  console.log("🌱 Seed des catégories par défaut...");

  for (const category of DEFAULT_CATEGORIES) {
    // Prisma interdit `null` dans la clause `where` d'un upsert basé sur un
    // index composite (@@unique([userId, name])) : null n'est pas comparable
    // par égalité en SQL. On vérifie donc l'existence manuellement.
    const existing = await prisma.category.findFirst({
      where: { userId: null, name: category.name },
    });

    if (!existing) {
      await prisma.category.create({
        data: { ...category, isDefault: true, userId: null },
      });
    }
  }

  console.log(`✅ ${DEFAULT_CATEGORIES.length} catégories par défaut créées/vérifiées.`);
}

main()
  .catch((err) => {
    console.error("❌ Erreur pendant le seed :", err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
