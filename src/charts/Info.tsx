/**
 * "This classification is meant to show meat consumers the pollution caused by meat production dependent on their country and the way it varies. The aim is to sensibilize and inform meat consumers not only of their significance but also of their country’s investment in meat production and consumption, be it by capita of a country, the general culture and other deciding factors. 
  Reading the visualisation goes as listed:
  Main Visualization:
  X axis: Countries 
  Y axis: tonnes of meat production per country
  On hover over one bar: Cloud pie chart: the different types of meat produced most in the country (poultry, beef, mouton etc.)  
  
  Pie chart cloud on hover: composed of all animals and how their production pollutes the specific country by percentage.
 */

import type { ReactElement } from 'react';

function Info(): ReactElement<HTMLElement> {
  return (
    <header>
      <div className="m-5 max-w-4xl text-lg">
      <p>
        This classification is meant to show meat consumers the pollution caused by meat production dependent on their country and the way it varies. The aim is to sensibilize and inform meat consumers not only of their significance but also of their country’s investment in meat production and consumption, be it by capita of a country, the general culture and other deciding factors. 

      </p>
      <p>
      Reading the visualisation goes as listed:

      </p>
      <p>
        Main Visualization:

      </p>
      <p>X axis: Countries </p>
      <p>Y axis: tonnes of meat production per country</p>
      <p>
      On hover over one bar: Cloud pie chart: the different types of meat produced most in the country (poultry, beef, mouton etc.)  
      </p>
      
      <p>
      Pie chart cloud on hover: composed of all animals and how their production pollutes the specific country by percentage.

      </p>
      </div>

    </header>
  );
}

export{
  Info
}
