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
    <div>
      <div className="m-5 max-w-2xl text-lg">
        <h3 className="ml-auto text-2xl font-bold">Introduction:</h3>
        <p>
          For as long as we’ve known, meat has been a key component in the human
          diet. While it would be debated that meat brings important nutritional
          values and is necessary for a healthy lifestyle, the ways meat
          production affects not only the animals concerned but our entire
          ecosystem is a non-negligible reality that we need to face sooner
          rather than later.
        </p>
        <p>
          As of today, meat and dairy production partake in the environmental
          crisis by using 83% of all agricultural land use and taking up 30 per
          cent of the planet’s land surface. In the meantime the process of its
          production keeps being one of the main causes of greenhouse gas
          emissions with an annual carbon dioxide equivalent of 1.1 tons on
          global average.
        </p>
      </div>
    </div>
  );
}

export { Info };
