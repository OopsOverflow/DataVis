import * as d3 from 'd3';
import { IGroupedData } from './type';

async function loadData() {
  // Open the database
  const request = window.indexedDB.open('countryProdData', 1);

  // Create the database if it doesn't exist
  request.onupgradeneeded = (event: IDBVersionChangeEvent) => {
    const db = (event.target as IDBOpenDBRequest).result;
    db.createObjectStore('jsonData', { keyPath: 'id' });
  };

  d3.json('./data/meat_prod.json').then((data: any) => {
    const keys: string[] = Object.keys(data);
    const values: any[] = Object.values(data);
    const countries: string[] = Object.keys(values[0]);

    const dataset: any = {};
    countries.forEach((c) => {
      // console.log(values[ind])
      keys.forEach((k, i) => {
        dataset[c] = { ...dataset[c], [k]: values[i][c] };
      });
    });

    // load the production data in on request success
    request.onsuccess = (event: Event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      const transaction = db.transaction(['jsonData'], 'readwrite');
      const objectStore = transaction.objectStore('jsonData');

      for (let ind in countries) {
        const c = countries[ind];
        objectStore.add({ id: c, data: dataset[c] });
      }
    };
  });

  const requestFood = window.indexedDB.open('foodEmiData', 1);

  // Create the database if it doesn't exist
  requestFood.onupgradeneeded = (event: IDBVersionChangeEvent) => {
    const db = (event.target as IDBOpenDBRequest).result;
    db.createObjectStore('jsonData', { keyPath: 'id' });
  };

  d3.csv('./data/Datasets/Food_Product_Emissions.csv').then((data: any) => {
    // load the production emission in on request success
    requestFood.onsuccess = (event: Event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      const transaction = db.transaction(['jsonData'], 'readwrite');
      const objectStore = transaction.objectStore('jsonData');

      for (let ind in data) {
        objectStore.add({ id: data[ind]['Food product'], ...data[ind] });
      }
    };
  });
}

function fetchData(dbname: string, id: string): Promise<IGroupedData> {
  return new Promise((resolve) => {
    const request = window.indexedDB.open(dbname, 1);
    request.onsuccess = (event: Event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      const transaction = db.transaction(['jsonData'], 'readwrite');
      const objectStore = transaction.objectStore('jsonData');

      const countryReq = objectStore.get(id);

      // fetch the required on request success
      countryReq.onsuccess = () => {
        resolve({
          label: id,
          values: Object.values(countryReq.result.data).filter(
            (d) => d != null,
          ) as number[],
        });
      };
    };
  });
}

export { loadData, fetchData };
