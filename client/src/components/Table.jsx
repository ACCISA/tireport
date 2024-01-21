import {useEffect, useState} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

export default function BasicTable({csvData}) {

    const [rows, setRows] = useState([]);

    const createData = (call_date, apnt_date, car_type)  => {
        return { call_date, apnt_date, car_type };
      }

    useEffect(() => {
        let tempRows = []
        for (let i = 0; i < csvData.length; i++){
            if (i == 0) continue;
            tempRows.push(createData(csvData[i][0],csvData[i][1],csvData[i][2]))
        }
        setRows(tempRows)
    }, [])

    useEffect(() => {}, [rows])

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Call Date</TableCell>
            <TableCell>Appointment Date</TableCell>
            <TableCell>Car Type</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.call_date}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">{row.call_date}</TableCell>
              <TableCell>{row.apnt_date}</TableCell>
              <TableCell>{row.car_type}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}