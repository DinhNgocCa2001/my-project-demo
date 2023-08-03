import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { InputText } from "primereact/inputtext";
import { Image } from 'primereact/image';

import "./styles.css";

export default function Demo(props) {
    const rendenCardProduct = () => {
        return (
            <div className="card">
            <div>
                <img src="https://primefaces.org/cdn/primereact/images/galleria/galleria7.jpg" alt="Image" className="img-card">

                </img>
            </div>
            <div className="block h-10rem">
                <div className="block">
                    ca
                </div>
                <div className="block">
                    ca
                </div>
            </div>

            <div className="bg-blue-50">
                ca
            </div>
        </div>
        )
    }
    return(
        <div>
            {rendenCardProduct()}
        </div>
    )
}
