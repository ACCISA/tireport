import { Fab } from "@mui/material";
import Papa from 'papaparse';
import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import Table from "../../components/Table"

export default function CreateReport() {
    const [csvData, setCsvData] = useState([]);
    const [createReport, setCreateReport] = useState(false);
    const navigate = useNavigate();

    const handleFile = (data) => {
      const headers = ["CallTime", "AppointmentTime", "CarType"];
      const parsedData = [headers, ...data];
      setCsvData(parsedData);
      setCreateReport(true);
    };
  
    useEffect(() => {
        if (createReport === false) return;
        navigate("/report",{state:{key:csvData}})
    },[csvData,navigate,createReport])

    return (
        <label htmlFor="upload-photo" className="items-center">
            <input
                style={{ display: 'none' }}
                id="upload-photo"
                name="upload-photo"
                type="file"
                onChange={(e) => {
                    Papa.parse(e.target.files[0], {
                      complete: (result) => {
                        handleFile(result.data);
                      },
                    });
                }}
            />

            <Fab
                color="default"
                size="medium"
                component="span"
                aria-label="add"
                variant="extended"
            >Import CSV</Fab>
            <br />
            <br />

        </label>
    )
}