import sequelize from "../config/db_connection";
import AtividadeCategoria from "../models/AtividadeCategoria";

const DEFAULT_CATEGORIES = [
  "Gastronomia",
  "Turismo",
  "Aventura",
  "Compras",
  "Entretenimento",
];

export async function seedAtividadeCategorias() {
  try {
    // Ensure DB connection is alive
    await sequelize.authenticate();

    for (const nome of DEFAULT_CATEGORIES) {
      await AtividadeCategoria.findOrCreate({ where: { nome }, defaults: { nome } });
    }
  } catch (err) {
    console.error("[seed] Failed to seed AtividadeCategoria:", err);
  }
}

export default async function runSeed() {
  await seedAtividadeCategorias();
}

