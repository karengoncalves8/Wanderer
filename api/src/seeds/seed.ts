import sequelize from "../config/db_connection";
import AtividadeCategoria from "../models/AtividadeCategoria";
import DespesaCategoria from "../models/DespesaCategoria";

const DEFAULT_CATEGORIES = [
  "Gastronomia",
  "Turismo",
  "Aventura",
  "Compras",
  "Entretenimento",
];

const DEFAULT_DESPESA_CATEGORIAS = [
  "Alimentação",
  "Transporte",
  "Hospedagem",
  "Entretenimento",
  "Outros",
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

export async function seedDespesaCategorias() {
  try {
    // Ensure DB connection is alive
    await sequelize.authenticate();

    for (const nome of DEFAULT_DESPESA_CATEGORIAS) {
      await DespesaCategoria.findOrCreate({ where: { nome }, defaults: { nome } });
    }
  } catch (err) {
    console.error("[seed] Failed to seed DespesaCategoria:", err);
  }
}

export default async function runSeed() {
  await seedAtividadeCategorias();
  await seedDespesaCategorias();
}

