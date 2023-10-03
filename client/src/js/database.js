import { openDB } from 'idb';

//Constant for the 'jate' storage
const JATE = 'jate';

const initdb = async () =>
  openDB(JATE, 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains(JATE)) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore(JATE, { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// Put method that accepts some content and adds it to the database
export const putDb = async (id, content) => {
  try {
    console.log('PUT to database');

    const jateDb = await openDB(JATE, 1);

    const tx = jateDb.transaction(JATE, 'readwrite');

    const store = tx.objectStore(JATE);

    const request = store.put({ id: id, value: content });

    const result = await request;

    console.log('Updated data now in database', result);
  } catch (error) {
    console.error('putDb not implemented');
  }
};

// Method that gets all the content from the database
export const getDb = async () => {
  try {
    console.log('GET from database');

    const jateDb = await openDB(JATE, 1);

    const tx = jateDb.transaction(JATE, 'readonly');

    const store = tx.objectStore(JATE);

    const request = store.getAll();

    const result = await request;
    console.log('result.value', result);
    return result;
  } catch (error) {
    console.error('getDb not implemented');
  }
};

initdb();
