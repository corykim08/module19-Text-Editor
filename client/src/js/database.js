import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

  // Add logic for a method that add the context to the database.
  export const putDb = async (content)  => {

    // Connect database
    const Db = await openDB('jate', 1);
    // Start a tansaction on a database, Open the object store, and request to add data.
    const addData = await Db.transaction('jate', 'readwrite').objectStore('jate').put({ id: 1, value: content });
    // Send massage to confirm the result
    console.log('Data has been added to the database', addData);
  };
  
  // TODO: Add logic for a method that gets all the content from the database
  export const getDb = async () => {

    // Connect database
    const Db = await openDB('jate', 1);
    // Start a tansaction on a database, Open the object store, and request to get all data.
    const getAllData = await Db.transaction('jate', 'readonly').objectStore('jate').getAll();
    // Send massage to confirm the result and return the value.
    console.log('Result:', getAllData);
    return getAllData?.value;
  };
  
  
  initdb();
