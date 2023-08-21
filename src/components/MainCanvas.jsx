import { useEffect, useRef, useState } from "react"
import axios from 'axios';

export const MainCanvas = () => {
    const canvasRef = useRef(null);
    const [data, setData] = useState(null);

    const test = async () => {
        try {
            const resp = await axios.get('http://127.0.0.1:5000');
            const { data } = resp;
            setData(data);
            console.log(data);
            console.log(resp);
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        const canvas = canvasRef.current;
        test();
    }, [])

    return (
        <section className="main">
            {data}
            <div className="main-canvas-container">
                <canvas id="canvas" width="800" height="500" ref={canvasRef}></canvas>
            </div>
        </section>
    )
}
