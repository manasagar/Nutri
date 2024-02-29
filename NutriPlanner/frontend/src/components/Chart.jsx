import React from 'react'
import { PieChart } from '@mui/x-charts/PieChart';

export const Chart = ({labels,nutrient,unit}) => {
    let pieData = [];
    for(let i=0;i<labels.length;i++){
        pieData.push({
            id : i,
            value : nutrient[i],
            label: `${labels[i]}: ${nutrient[i]} ${unit}`,
        })
    }
    console.log(pieData);
  return (
    <PieChart
        colors={['red', 'orange', 'green','yellow']}
        series={[
            {
            data: pieData,
            },
        ]}
        width={500}
        height={200}
    />
  )
}

