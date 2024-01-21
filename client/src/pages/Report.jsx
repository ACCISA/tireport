import CsvFileReader from "../components/CSVFileReader";
import BarChart from '../graph/BarChart'
import { Chart } from "react-google-charts";

export default function Report() {
    return (
        <>
            <>This is the repot page</>
            {/* <Chart
            chartType="ScatterChart"
            data={[
                ["Age", "Weight"],
                [4, 5.5],
                [8, 12],
                [2, 2]]
            }
            width="100%"
            height="400px"
            legendToggle
            /> */}
            <CsvFileReader/>    
        </>
    )
}