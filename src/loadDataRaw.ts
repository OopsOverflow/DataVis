import * as d3 from 'd3';
import { type IGroupedData } from './type';


async function loadData() {
  // Open the database

  if(!localStorage.getItem('meat_prod')) {
    d3.json('./data/meat_tonnes_10_last_years.json').then((data: any) => {
      localStorage.setItem("meat_prod", JSON.stringify(data));

    }).catch(err => { alert(err); });

  }

  if(!localStorage.getItem('food_emission')) {
    // console.log(objectStore.getAll())
    d3.csv('./data/Datasets/Food_Product_Emissions.csv').then((data: any) => {

      localStorage.setItem("food_emission", JSON.stringify(data));

    }).catch(err => { alert(err); });

  }

};

function checkDataLoaded(id: string) {
  return localStorage.getItem(id);
}

async function fetchData(
  id: string,
  year: string,
  cols: string[] =[],
): Promise<IGroupedData> {
  return await new Promise((resolve, reject) => {

    const raw = localStorage.getItem("meat_prod") as string;
    const data = JSON.parse(raw)[id][year];
    // console.log(data)
    resolve({
      label: id,
      // values: [0]
      values: Object.keys(data).reduce(
        (arr: any[], k: string) => {
          if(k.includes('tonnes') && data[k])
            arr.push({label: k, value: data[k]})
          return arr;
        },
        [],
      ),
    });
  });
}

export { loadData, fetchData, checkDataLoaded};
