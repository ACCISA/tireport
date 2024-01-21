import React, { useEffect, useState } from 'react';
import Papa from 'papaparse';
import { Chart } from 'react-google-charts';
import { useLocation } from 'react-router-dom';
import Table from "../components/Table"
import { faker } from '@faker-js/faker';

import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

import Iconify from 'src/components/iconify';

import AppTasks from '../sections/overview/app-tasks';
import AppNewsUpdate from '../sections/overview/app-news-update';
import AppOrderTimeline from '../sections/overview/app-order-timeline';
import AppCurrentVisits from '../sections/overview/app-current-visits';
import AppWebsiteVisits from '../sections/overview/app-website-visits';
import AppWidgetSummary from '../sections/overview/app-widget-summary';
import AppTrafficBySite from '../sections/overview/app-traffic-by-site';
import AppCurrentSubject from '../sections/overview/app-current-subject';
import AppConversionRates from '../sections/overview/app-conversion-rates';
import { TextField } from '@mui/material';
import { formatCarAndTruckChartData, formatChartData, processRows } from 'src/utils/processCSV';

const  generateReportName = (prefix) => {
  const timestamp = new Date().toISOString().slice(0, 16).replace('T', ' ');
  return `${prefix} ${timestamp}`;
}

export default function Report(){

    const [csvData, setCsvData] = useState([]);
    const [reportName, setReportName] = useState(generateReportName("TireShop Report"));
    const [totalEntries, setTotalEntries] = useState(100);
    const [validEntries, setValidEntries] = useState(170);
    const [invalidEntries, setInvalidEntries] = useState(10);
    const [walkinEntries, setWalkinEntries] = useState(20);
    const [isNameFocused, setIsNamedFocused] = useState(false);
    const [showData, setShowData] = useState({
      showWalkin: true,
      showValid: true,
      showInvalid: true,
    })
    const [chartData,setChartData] = useState({
      labels: [
        '01/01/2003',
        '02/01/2003',
        '03/01/2003',
        '04/01/2003',
        '05/01/2003',
        '06/01/2003',
        '07/01/2003',
        '08/01/2003',
        '09/01/2003',
        '10/01/2003',
        '11/01/2003',
      ],
      series: [
        {
          name: 'Invalid',
          type: 'line',
          fill: 'solid',
          data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30],
        },
        {
          name: 'Valid',
          type: 'area',
          fill: 'gradient',
          data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43],
        },
        {
          name: 'Walk-in',
          type: 'line',
          fill: 'solid',
          data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39],
        },
      ],
    })
    const [classes, setClasses] = useState(
      [
        { label: 'Class 1 Truck', value: 4344 },
        { label: 'Class 2 Truck', value: 5435 },
        { label: 'Compact', value: 1443 },
        { label: 'Medium', value: 1443 },
        { label: 'Full-Size', value: 1443 },
      ]
    )
    const [types, setTypes] = useState(
      [
        { label: 'Car', value: 4344 },
        { label: 'Truck', value: 5435 }
      ]
    )
    const [turnawayRates, setTurnawayRates] = useState({
      series: [
        { label: 'Passed Work Hours Walkin', value: 0 },
        { label: 'Passed Wrok Hours Booking', value: 0 },
        { label: 'No Availability Walking', value: 0 },
        { label: 'No Availability Booking', value: 0 },
      ],
    })
    const [totalTurnaways, setTotalTurnaways] = useState(0);
    const location = useLocation();

    useEffect(() => {
      setCsvData(location.state.key)
    },[location])

    useEffect(() => {
      if (isNameFocused === false){
        // make api request to change the na me
      }
    }, [isNameFocused])
    
    useEffect(() => {
      const { turnaway,walkins,validBooking,validWalkin,metadata } = processRows(csvData);
      setTurnawayRates({
        series: [
          { label: 'Passed Work Hours Walk-in', value: turnaway.passed_hours_walkin.length },
          { label: 'Passed Work Hours Booking', value: turnaway.passed_hours_booking.length },
          { label: 'No Availability Walk-in', value: turnaway.no_availability_walkin.length },
          { label: 'No Availability Booking', value: turnaway.no_availability_booking.length },
        ],
      })
      setTotalEntries(metadata.total_entries)
      setValidEntries(validBooking.total + validWalkin.total)
      setInvalidEntries(turnaway.total)
      setWalkinEntries(walkins.total)
      setTotalTurnaways(turnaway.total)
    },[csvData])

    useEffect(() => {},[turnawayRates,totalTurnaways,totalEntries,validEntries,walkinEntries])

    return (
      <div className='flex justify-center items-center bg-red-500 flex-col'>
         <Container maxWidth="xl">
      <Typography variant="h4" sx={{ mb: 5 }}>
        <div className='flex flex-row items-center gap-2 cursor-pointer'>
        {!isNameFocused ? (
        <Typography
          onClick={() => {
            setIsNamedFocused(true);
          }}
          className='text-4xl'
        >
          <h1 className='text-4xl'>{reportName}</h1>
        </Typography>
      ) : (
        <TextField
          autoFocus
          value={reportName}
          onChange={event => setReportName(event.target.value)}
          onBlur={event => setIsNamedFocused(false)}
          className='text-2xl'
        />
      )}
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
            <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
          </svg>
        </div>

      </Typography>

      <Grid container spacing={3}>
        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            className="cursor-pointer"
            title="Total Entries"
            total={totalEntries}
            color="success"
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_bag.png" />}
          />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="Valid Entries"
            total={validEntries}
            color="info"
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_users.png" />}
          />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="Invalid Entries"
            total={invalidEntries}
            color="warning"
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_buy.png" />}
          />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="Walkin Entries"
            total={walkinEntries}
            color="error"
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_message.png" />}
          />
        </Grid>

        <Grid xs={12} md={6} lg={8}>
          <AppWebsiteVisits
            title="Website Visits"
            subheader="(+43%) than last year"
            chart={chartData}
          />
        </Grid>

        <Grid xs={12} md={6} lg={4}>
          <AppCurrentVisits
            title="Report Graph"
            chart={{
              types: types,
              classes: classes
            }}
          />
        </Grid>

        <Grid xs={12} md={6} lg={8}>
          <AppConversionRates
            title="Turnaway Rates"
            subheader={totalTurnaways+" Total Turnaways"}
            chart={turnawayRates}
          />
        </Grid>

        <Grid xs={12} md={6} lg={4}>
          <AppCurrentSubject
            title="Current Subject"
            chart={{
              categories: ['English', 'History', 'Physics', 'Geography', 'Chinese', 'Math'],
              series: [
                { name: 'Series 1', data: [80, 50, 30, 40, 100, 20] },
                { name: 'Series 2', data: [20, 30, 40, 80, 20, 80] },
                { name: 'Series 3', data: [44, 76, 78, 13, 43, 10] },
              ],
            }}
          />
        </Grid>

        <Grid xs={12} md={6} lg={8}>
          <AppNewsUpdate
            title="News Update"
            list={[...Array(5)].map((_, index) => ({
              id: faker.string.uuid(),
              title: faker.person.jobTitle(),
              description: faker.commerce.productDescription(),
              image: `/assets/images/covers/cover_${index + 1}.jpg`,
              postedAt: faker.date.recent(),
            }))}
          />
        </Grid>

        <Grid xs={12} md={6} lg={4}>
          <AppOrderTimeline
            title="Order Timeline"
            list={[...Array(5)].map((_, index) => ({
              id: faker.string.uuid(),
              title: [
                '1983, orders, $4220',
                '12 Invoices have been paid',
                'Order #37745 from September',
                'New order placed #XF-2356',
                'New order placed #XF-2346',
              ][index],
              type: `order${index + 1}`,
              time: faker.date.past(),
            }))}
          />
        </Grid>

        <Grid xs={12} md={6} lg={4}>
          <AppTrafficBySite
            title="Traffic by Site"
            list={[
              {
                name: 'FaceBook',
                value: 323234,
                icon: <Iconify icon="eva:facebook-fill" color="#1877F2" width={32} />,
              },
              {
                name: 'Google',
                value: 341212,
                icon: <Iconify icon="eva:google-fill" color="#DF3E30" width={32} />,
              },
              {
                name: 'Linkedin',
                value: 411213,
                icon: <Iconify icon="eva:linkedin-fill" color="#006097" width={32} />,
              },
              {
                name: 'Twitter',
                value: 443232,
                icon: <Iconify icon="eva:twitter-fill" color="#1C9CEA" width={32} />,
              },
            ]}
          />
        </Grid>

        <Grid xs={12} md={6} lg={8}>
          <AppTasks
            title="Tasks"
            list={[
              { id: '1', name: 'Create FireStone Logo' },
              { id: '2', name: 'Add SCSS and JS files if required' },
              { id: '3', name: 'Stakeholder Meeting' },
              { id: '4', name: 'Scoping & Estimations' },
              { id: '5', name: 'Sprint Showcase' },
            ]}
          />
        </Grid>
      </Grid>
    </Container>
        
        <h1 className='text-4xl font-bold'>Title of Report</h1>
        {csvData.length > 0 && (
        <div>
          <h2>Car Type Count Chart:</h2>
          <Chart
            width='500px'
            height='300px'
            chartType="BarChart"
            loader={<div>Loading Chart</div>}
            data={formatChartData(csvData)}
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
            width='500px'
            height='300px'
            chartType="BarChart"
            loader={<div>Loading Chart</div>}
            data={formatCarAndTruckChartData(csvData)}
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
    )
}