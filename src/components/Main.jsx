import { Dashboard } from "./Dashboard";
import { Navbar } from "./Navbar"

export const Main = () => {
    return (
        <section className="main">
            <Navbar />
            <Dashboard />
        </section>
    )
}
