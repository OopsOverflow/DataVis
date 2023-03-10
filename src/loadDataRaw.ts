import * as d3 from 'd3';
import { type IGroupedData } from './type';
import kinds from '../public/data/kinds.json';

async function loadData() {
  // Open the database

  if (!localStorage.getItem('meat_prod')) {
    d3.json('./data/meat_tonnes_10_last_years.json')
      .then((data: any) => {
        localStorage.setItem('meat_prod', JSON.stringify(data));
      })
      .catch((err) => {
        alert(err);
      });
  }

  if (!localStorage.getItem('food_emission')) {
    // console.log(objectStore.getAll())
    d3.csv('./data/Datasets/Food_Product_Emissions.csv')
      .then((data: any) => {
        localStorage.setItem('food_emission', JSON.stringify(data));
      })
      .catch((err) => {
        alert(err);
      });
  }
}

function checkDataLoaded(id: string) {
  // console.log(localStorage.getItem(id))
  return localStorage.getItem(id);
}

async function fetchData(
  id: string,
  year: string,
  cols: string[] = [],
): Promise<IGroupedData> {
  return await new Promise((resolve, reject) => {
    const raw = localStorage.getItem('meat_prod') as string;
    try {
      const country = JSON.parse(raw)[id];
      if(!country) resolve({ label: id, values: []});
      const data = country[year];
      resolve({
        label: id,
        // values: [0]
        values: Object.keys(data).reduce((arr: any[], k: string) => {
          if (k.includes('tonnes') && data[k])
            arr.push({ label: k, value: data[k] });
          return arr;
        }, []),
      });
    }catch(err) {
      reject(err);
    }
    // console.log(data)
    
  });
}

async function fetchPieData(): Promise<IGroupedData[]> {
  return await new Promise((resolve) => {
    const raw = localStorage.getItem('food_emission') as string;
    // console.log(raw)
    const data = JSON.parse(raw);
    if(!data) resolve([])
    const filtered = data.filter((d: any) =>
      Object.keys(kinds).includes(d['Food product']),
    );
  
    resolve(filtered.map(
      (d: any) =>{
        return {
          label: d['Food product'],
          values: Object.values(d)
            .filter((v) => v === d['Total Global Average GHG Emissions per kg'])
            .map((v) => parseFloat(v as string)),
        }
      }
    ));
  })

}

export { loadData, fetchData, fetchPieData, checkDataLoaded };
