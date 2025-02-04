"use client"
import React from 'react'
import { Line } from 'react-chartjs-2'
import {
    Chart as ChartJS,
    LinearScale,
    CategoryScale,
    LineElement,
    PointElement,
    Legend,
    Title,
    Tooltip

} from "chart.js"


ChartJS.register(
    LinearScale,
    CategoryScale,
    LineElement,
    PointElement,
    Legend,
    Title,
    Tooltip
)




function LineChart() {


    const chartData = {
        labels: ["mobile" , "tV" , "frideg" ,"Bike"], // x 
          datasets: [
            {
                data: [6700, 2300, 5000 , 3000] , // y  konsa item kitna sale howa 
                label : "sales in year 2024",
                borderColor: "green",
                BsBorderWidth : 3,
                tension : 0.2,
            },
            { // for incom
                data: [4000, 3000, 1000 , 2000] , // y  konsa item kitna sale howa 
                label : "Incom in year 2024",
                borderColor: "orange",
                BsBorderWidth : 3,
                tension : 0.2,
            }
          ]
    }



    const options = {
        responsive:true,
        aspectRation: 1,
        scales:{
            y:{
                beginAtZero: true,
                // min:0,
                // max : 20000,
                title : {
                    display: true,
                    text: "Amount in Rs",
                    Color : "#000",
                    font: {
                        size : 20,
                    },
                }

            },
            x:{
                title : {
                    display: true,
                    text: "item Name",
                    Color : "#000",
                    font: {
                        size : 20,
                    },
                }
            }
        },
        plugins : {
            legend : {
                position: "top"as const,
                labels: {
                    color: "green",
                    font: {
                        size : 15,
                    },
                    boxWidth:80,
                    boxHeight:34,


                },

            },
            title : {
                display : true,
                text : "Company Report - year 2024",
                font: {
                    size: 25,
                },
                color: "pink",

            }
        },
    }

  return (
    <div className='flex max-w-3xl  mx-auto justify-center items-center min-h-screen'>
    <Line data={chartData} options={options}></Line>
    </div>
  )
}

export default LineChart