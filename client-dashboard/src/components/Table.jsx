import {useEffect, useState} from 'react';
import { Accordion, Button, Collapse } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Pagination from '@mui/material/Pagination';

export default function BasicTable(props) {

    const {csvData} = props;
    const [showCSV, setShowCSV] = useState(true);
    const [rows, setRows] = useState([]);
    const [page, setPage] = useState(0);
    const createData = (call_date, apnt_date, car_type)  => ({ call_date, apnt_date, car_type });
        
    const handleChange = (event, value) => {
      setPage(value);
    }

    const handleCollapse = () => {
      if (showCSV === true){
        setShowCSV(false);
        return;
      }
      setShowCSV(true);
    }


    useEffect(() => {
        const itemsPerPage = 50;
        const tempRows = [];
        let startIndex = page * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        if (startIndex === 0) startIndex+=1;
        for (let i = startIndex; i < endIndex; i+=1){
            tempRows.push(createData(csvData[i][0],csvData[i][1],csvData[i][2]))
        }
        setRows(tempRows)
    }, [csvData, page])

    useEffect(() => {}, [rows,showCSV])

  return (
    <div>
      
      {showCSV === true && <Button onClick={handleCollapse}>Hide Table</Button>}
      {showCSV === false && <Button onClick={handleCollapse}>Show Table</Button>}
      <Collapse timeout="auto" in={showCSV}>
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
          <Pagination count={10} variant="outlined" shape="rounded" onChange={handleChange} />
        </TableContainer>
      </Collapse>
    </div>
  );
}