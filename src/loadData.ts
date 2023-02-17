import * as d3 from 'd3';
import { type IGroupedData } from './type';


async function loadData() {
  // Open the database
  const request = window.indexedDB.open('countryProdData', 1);

  // Create the database if it doesn't exist
  request.onupgradeneeded = (event: IDBVersionChangeEvent) => {
    const db = (event.target as IDBOpenDBRequest).result;
    db.createObjectStore('jsonData', { keyPath: 'id' });
  };
  // load the production data in on request success
  request.onsuccess = (event: Event) => {
    const db = (event.target as IDBOpenDBRequest).result;
    const transaction = db.transaction(['jsonData'], 'readwrite');
    const objectStore = transaction.objectStore('jsonData');


    d3.json('./data/meat_tonnes_10_last_years.json').then((data: any) => {
      const keys: string[] = Object.keys(data);
      const values: any[] = Object.values(data);
      const countries: string[] = Object.keys(values[0]);
  
      const dataset: any = {};

      countries.forEach((c) => {
        // console.log(values[ind])
        keys.forEach((k, i) => {
          dataset[c] = { ...dataset[c], [k]: values[i][c] };
        });
      })
      for (const c of countries) {
        // const c = countries[ind];
        const addrequest = objectStore.add({ id: c, data: dataset[c] })
        addrequest.onsuccess = (event: Event) => {}
        addrequest.onerror = (e: Event) => {
          console.log("???")
        }
      }
  
    }).catch(err => { alert(err); });

  };


  const requestFood = window.indexedDB.open('foodEmiData', 1);

  // Create the database if it doesn't exist
  requestFood.onupgradeneeded = (event: IDBVersionChangeEvent) => {
    const db = (event.target as IDBOpenDBRequest).result;
    db.createObjectStore('jsonData', { keyPath: 'id' });
  };

    // load the production emission in on request success
  requestFood.onsuccess = (event: Event) => {
    const db = (event.target as IDBOpenDBRequest).result;
    const transaction = db.transaction(['jsonData'], 'readwrite');
    const objectStore = transaction.objectStore('jsonData');

    // console.log(objectStore.getAll())
    d3.csv('./data/Datasets/Food_Product_Emissions.csv').then((data: any) => {

      for (const d of data) {
        // console.log(d)
        const addrequest = objectStore.add({ id: d['Food product'] })
        addrequest.onsuccess = (event: Event) => {}

        // objectStore.add({ id: d['Food product'] });
      }
      }).catch(err => { alert(err); });
    // const countRequest = objectStore.count();
    // countRequest.onsuccess = () => {
    //   console.log(countRequest.result)
    //   if(countRequest.result <= 0) {

    //   }
    // };
  };

}

async function fetchData(
  dbname: string,
  id: string,
  year: string,
  cols: string[] =[],
): Promise<IGroupedData> {
  return await new Promise((resolve, reject) => {
    const request = window.indexedDB.open(dbname, 1);
    request.onsuccess = (event: Event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      const transaction = db.transaction(['jsonData'], 'readwrite');
      const objectStore = transaction.objectStore('jsonData');

      const countryReq = objectStore.get(year);

      // fetch the required on request success
      countryReq.onsuccess = () => {
        // console.log(countryReq.result)
        const data = countryReq.result.data[id];
        if (!countryReq.result) reject(new Error());
        console.log(data)
        resolve({
          label: id,
          values: Object.keys(data).reduce(
            (arr: any[], k: string) => {
              if(k.includes('tonnes') && data[k])
                arr.push({label: k, value: data[k]})
              return arr;
            },
            [],
          ),
        });
      };
    };
  });
}

export { loadData, fetchData };
