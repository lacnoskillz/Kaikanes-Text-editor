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

//accepts content and adds it to the database
export const putDb = async (content) =>{
  //logs when function in started
  console.log('PUT to the database');
  // connect to the jate database verison 1
  const jateDb = await openDB('jate', 1);
  // Create a new transaction and specify the database and data privileges.
  const tx = jateDb.transaction('jate', 'readwrite');
  // Open object store.
  const store = tx.objectStore('jate');
  // use .put method to add data to the database. gives it an id of 1
  const request = store.put({ value: content, id: 1 });
  //confirmation of the request set to const result
  const result = await request;
  // logs results
  console.log('🚀 - data saved to the database', result.value);
 // console.error('putDb not implemented');
};

// export function to GET to the database
export const getDb = async () => {
  console.log('GET from the database');

  // Create a connection to the jate database and version we want to use.
  const jateDb = await openDB('jate', 1);

  // Create a new transaction and specify the database and data privileges.
  const tx = jateDb.transaction('jate', 'readonly');

  // Open up the desired object store.
  const store = tx.objectStore('jate');

  // Use the .get method to get all data in the database.
  const request = store.get(1);

  // Get confirmation of the request.
  const result = await request;
  console.log('result.value', result?.value);
  //console.error('getDb not implemented');
  return result?.value;
  
}

initdb();
