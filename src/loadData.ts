import * as d3 from 'd3';
import { type IGroupedData } from './type';


function addMultiple(db: any, datas: any[], callback: () => void) {
  const tx = db.transaction(["jsonData"], "readwrite");

  datas.forEach(data => {
      let request = tx.objectStore("jsonData").add(data);
  })

  tx.oncomplete = function() {
      callback();
  }
};

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
    })

    // load the production data in on request success
    request.onsuccess = (event: Event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      const transaction = db.transaction(['jsonData'], 'readwrite');
      const objectStore = transaction.objectStore('jsonData');

      for (const c of countries) {
        // const c = countries[ind];
        objectStore.add({ id: c, data: dataset[c] });
      }
    };
  }).catch(err => { alert(err); });


    // // Open the database
    // const request = window.indexedDB.open('countryMeatData', 1);

    // // Create the database if it doesn't exist
    // request.onupgradeneeded = (event: IDBVersionChangeEvent) => {
    //   const db = (event.target as IDBOpenDBRequest).result;
    //   db.createObjectStore('jsonData', { keyPath: 'id' });
    // };
    
  
    // // load the production emission in on request success
    // request.onsuccess = (event: Event) => {
    //   const db = (event.target as IDBOpenDBRequest).result;
    //   const transaction = db.transaction(['jsonData'], 'readwrite');
    //   const objectStore = transaction.objectStore('jsonData');
  
    //   const countRequest = objectStore.count();
    //   countRequest.onsuccess = () => {
    //     if(countRequest.result <= 0) {
    //       d3.csv('./data/Datasets/meat_prod.csv').then((data: any) => {
    //         transaction.oncomplete = () => {
    //           console.log('Data added successfully!');
    //         };
    //         transaction.onerror = (event : any) => {
    //           console.log('Error adding data:', event.target.error);
    //         };
  
    //         for (const ind in data) {
    //           objectStore.add({ id: data[ind]['Entity'] && 'null', ...data[ind] });
    //         }
    //       }).catch(err => { console.log(err); });
    //     }
    //   };
    // }

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

    const countRequest = objectStore.count();
    countRequest.onsuccess = () => {
      if(countRequest.result <= 0) {
        d3.csv('./data/Datasets/Food_Product_Emissions.csv').then((data: any) => {

          for (const ind in data) {
            objectStore.add({ id: data[ind]['Food product'] && 'null', ...data[ind] });
          }
          }).catch(err => { alert(err); });
      }
    };
  };

}

async function fetchData(
  dbname: string,
  id: string,
  cols: string[] =[],
): Promise<IGroupedData> {
  return await new Promise((resolve, reject) => {
    const request = window.indexedDB.open(dbname, 1);
    request.onsuccess = (event: Event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      const transaction = db.transaction(['jsonData'], 'readwrite');
      const objectStore = transaction.objectStore('jsonData');

      const countryReq = objectStore.get(id);

      // fetch the required on request success
      countryReq.onsuccess = () => {
        // console.log(countryReq.result)
        if (!countryReq.result) reject(new Error());
        resolve({
          label: id,
          values: Object.keys(countryReq.result.data).reduce(
            (arr: any[], k: string) => {
              if(k.includes('tonnes') && countryReq.result.data[k])
                arr.push({label: k, value: countryReq.result.data[k]})
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
