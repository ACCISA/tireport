import VerticalBarChart from "../components/BarCharts/VerticalBarChart"
import Table from "../components/Table"

export default function Booking () {

    return (
        <>
            <VerticalBarChart icon={ { color: "info", component: "" }} title="test" description="some desc" height="19.125rem"/>
        </>
    )

}
VerticalBarChart.defaultProps = {
    icon: { color: "info", component: "" },
    title: "",
    description: "",
    height: "19.125rem",
  };