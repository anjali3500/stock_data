import React,{useState,useEffect} from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);








export default function Stock() {

    const options = {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Chart.js Line Chart',
          },
        },
      };
      

    const [myArrayX, setMyArrayX] = useState([]);
    const [myArrayY, setMyArrayY] = useState([]);

    const data = {
        labels:myArrayX,
        datasets: [
          {
            label: 'Dataset 1',
            data: myArrayY,
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
          }
         
        ],
      };

      useEffect(()=>{
          fetchStock()
      },[]);




      const fetchStock=()=> {
        
        const API_KEY = "QKTX45A93IAJTFUS";
    const symbol = "RELIANCE.BSE";
    const API_Call = `https://www.alphavantage.co/query?function=TIME_SERIES_WEEKLY&symbol=${symbol}&outputsize=compact&apikey=${API_KEY}`;
    let stockChartXValuesFunction = [];
        let stockChartYValuesFunction = [];
    
        fetch(API_Call)
          .then(
            function(response) {
              return response.json();
            }
          )
          
          .then(
            function(data) {
              console.log(data);
              for (var key in data['Weekly Time Series']) {
                stockChartXValuesFunction.push(key);
                stockChartYValuesFunction.push(data['Weekly Time Series'][key]['1. open']);
                
              }
              
              setMyArrayX(stockChartXValuesFunction);
              setMyArrayY(stockChartYValuesFunction);
              // console.log(stockChartXValuesFunction);
             
            }
          )
      }
      

  return (
    <div height="400 px" width="400 px">
          <Line options={options} data={data} />
         
    </div>

  )
}
