import React, { useState } from 'react';
import Papa from 'papaparse';
import { Chart } from 'react-google-charts';
import Table from "../components/Table"

const CsvFileReader = () => {
  const [csvData, setCsvData] = useState([]);

  const handleFile = (data) => {
    // Assuming the CSV file has a header row.
    const headers = ["CallTime", "AppointmentTime", "CarType"];
    const parsedData = [headers, ...data];

    setCsvData(parsedData);
  };

  // Count the occurrences of each car type
  const countCarTypes = () => {
    const carTypeCount = {};

    csvData.slice(1).forEach((row) => {
      const carType = row[2]; // Assuming car type is in the third column
      carTypeCount[carType] = (carTypeCount[carType] || 0) + 1;
    });

    return carTypeCount;
  };

  // Convert car type count to data format suitable for Google Charts
  const formatChartData = () => {
    const carTypeCount = countCarTypes();
    const chartData = [['CarType', 'Count']];

    Object.entries(carTypeCount).forEach(([carType, count]) => {
      chartData.push([carType, count]);
    });

    return chartData;
  };

  // Count the occurrences of each car and truck type
  const countCarAndTruckTypes = () => {
    const carTypeCount = { Car: 0, Truck: 0 };

    csvData.slice(1).forEach((row) => {
      const carType = row[2]; // Assuming car type is in the third column
      const isTruck = carType.toLowerCase().includes('truck');
      
      if (isTruck) {
        carTypeCount.Truck += 1;
      } else {
        carTypeCount.Car += 1;
      }
    });

    return carTypeCount;
  };

  // Convert car and truck type count to data format suitable for Google Charts
  const formatCarAndTruckChartData = () => {
    const carAndTruckCount = countCarAndTruckTypes();
    const chartData = [['Vehicle Type', 'Count']];

    Object.entries(carAndTruckCount).forEach(([vehicleType, count]) => {
      chartData.push([vehicleType, count]);
    });

    return chartData;
  };

  return (
    <div>
      <h1>CSV File Reader</h1>
      <input
        type="file"
        accept=".csv"
        onChange={(e) => {
          Papa.parse(e.target.files[0], {
            complete: (result) => {
              handleFile(result.data);
            },
          });
        }}
      />

      {csvData.length > 0 && (
        <div>
          <h2>Car Type Count Chart:</h2>
          <Chart
            width={'500px'}
            height={'300px'}
            chartType="BarChart"
            loader={<div>Loading Chart</div>}
            data={formatChartData()}
            options={{
              title: 'Car Type Count',
              chartArea: { width: '50%' },
              hAxis: {
                title: 'Count',
                minValue: 0,
              },
              vAxis: {
                title: 'Car Type',
              },
            }}
            legendToggle
          />

          <h2>Car and Truck Type Count Chart:</h2>
          <Chart
            width={'500px'}
            height={'300px'}
            chartType="BarChart"
            loader={<div>Loading Chart</div>}
            data={formatCarAndTruckChartData()}
            options={{
              title: 'Vehicle Type Count',
              chartArea: { width: '50%' },
              hAxis: {
                title: 'Count',
                minValue: 0,
              },
              vAxis: {
                title: 'Vehicle Type',
              },
            }}
            legendToggle
          />

          <h2>CSV File Content:</h2>
          <Table csvData={csvData}/>
        </div>
      )}
    </div>
  );
};

export default CsvFileReader;
