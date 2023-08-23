import { DataComponent } from "./DataComponent"

export const DataTelemetry = ({data}) => {
    return (
        <div>
            <h1 className="dashboard-title">Data Telemetry</h1>
            <div className="dashboard-cards-container">
                {data.map((title, index) => <DataComponent key={index} title={title.toUpperCase()} />)}
            </div>
        </div>
    )
}
