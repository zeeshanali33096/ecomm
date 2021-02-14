import PouchDB from "pouchdb-browser";

export const saveData = async (data: any, dbName: string = "ecommerce-xyz") => {
  const db = new PouchDB(dbName);

  try {
    const p = await db.put(data);
    console.log({ p });
  } catch (err) {
    if (err.error) {
      if (err.status === 409) {
        const g = await db.get(data._id);
        const newData = { ...data, _rev: g._rev };
        saveData(newData);
        //   const fetch =
      } else {
        console.trace({ err });
      }
    } else {
      console.trace({ err });
    }
  }
};

export const fetchData = async (
  _id: string,
  dbName: string = "ecommerce-xyz"
) => {
  const db = new PouchDB(dbName);

  try {
    const fetch = await db.get(_id);
    return fetch;
  } catch (err) {
    console.log({ err });
    throw err;
  }
};
