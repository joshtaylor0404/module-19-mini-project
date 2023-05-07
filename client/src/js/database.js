// TODO: Install the following package:
import { openDB } from "idb";

// TODO: Complete the initDb() function below:
const initdb = async () => {
  await openDB("contact", 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains("contact")) {
        console.log("contact database already exists");
        return;
      }

      db.createObjectStore("contact", { keyPath: "id", autoIncrement: true });
      console.log("contact database created");
    },
  });
};

async function getContactStore() {
  const contactDb = await openDB("contact", 1);

  const tx = contactDb.transaction("contact", "readwrite");

  const store = tx.objectStore("contact");

  return store;
}

// TODO: Complete the postDb() function below:
export const postDb = async (name, home, cell, email) => {
  const store = await getContactStore();

  const result = await store.add({
    name,
    home_phone: home,
    cell_phone: cell,
    email,
  });

  console.log("🚀 - data saved to the database", result);
};

// TODO: Complete the getDb() function below:
export const getDb = async () => {
  const store = await getContactStore();

  const result = await store.getAll();

  return result;
};

// TODO: Complete the deleteDb() function below:
export const deleteDb = async (id) => {
  const store = await getContactStore();

  const result = await store.delete(id);

  return result?.value;
};

initdb();
