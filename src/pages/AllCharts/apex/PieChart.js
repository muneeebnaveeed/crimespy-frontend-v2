import React, { Component } from 'react';
import ReactApexChart from 'react-apexcharts';

// class PieChart extends Component {
//     constructor(props) {
//         super(props);

//         this.state = {
//             series: [this.props.ttlValue],
//             // series: [this.props.theft, this.props.arrest, this.props.other],
//             options: {
//                 labels: ['Theft', 'Other', 'Vandalism', 'Shooting'],
//                 // labels: ['Vandalism', 'Arson', 'Theft', 'Shooting', 'Arrest', 'Others'],
//                 colors: ['#34c38f', '#556ee6', '#f1b44c', '#50a5f1'],
//                 // colors: ['#34c38f', '#556ee6', '#f46a6a', '#50a5f1', '#f1b44c'],
//                 legend: {
//                     show: true,
//                     position: 'bottom',
//                     horizontalAlign: 'center',
//                     verticalAlign: 'middle',
//                     floating: false,
//                     fontSize: '14px',
//                     offsetX: 0,
//                     offsetY: -10,
//                 },
//                 responsive: [
//                     {
//                         breakpoint: 600,
//                         options: {
//                             chart: {
//                                 height: 240,
//                             },
//                             legend: {
//                                 show: false,
//                             },
//                         },
//                     },
//                 ],
//             },
//         };
//     }

//     render() {
//         return (
//             <>
//                 {console.log(
//                     'dasdsadasdsasdadasd',

//                     this.props.ttlValue
//                 )}
//                 <ReactApexChart options={this.state.options} series={this.state.series} type="pie" height="420" />
//             </>
//         );
//     }
// }

function PieChart({ ttlValue }) {
    const spentData = ttlValue;

    const chartConfig = {
        labels: ['Theft', 'Assault', 'Arsonal', 'Other', 'Vandelism', 'Shooting', 'Arrest'],
        // labels: ['Vandalism', 'Arson', 'Theft', 'Shooting', 'Arrest', 'Others'],
        colors: ['#34c38f', '#556ee6', '#ff0000', '#50a5f1', '#ffe135'],
        // colors: ['#34c38f', '#556ee6', '#f46a6a', '#50a5f1', '#f1b44c'],
        legend: {
            show: true,
            position: 'bottom',
            horizontalAlign: 'center',
            verticalAlign: 'middle',
            floating: false,
            fontSize: '14px',
            offsetX: 0,
            offsetY: -10,
        },
        responsive: [
            {
                breakpoint: 600,
                options: {
                    chart: {
                        height: 240,
                    },
                    legend: {
                        show: false,
                    },
                },
            },
        ],
    };

    return (
        <>
            {console.log('dasda', ttlValue)}
            <ReactApexChart options={chartConfig} series={spentData} type="pie" height="420" />
        </>
    );
}

export default PieChart;
