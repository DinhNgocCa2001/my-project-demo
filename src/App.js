import logo from './logo.svg';
import './App.css';
import { Button } from 'primereact/button'; 
import Demo from './features/pages/demo-screem';
import OverView from './features/pages/OverView';
import InvoiedProduct from './features/components/invoied';


function App() {
  const listPerson = [{
    id: 0,
    name: "ca dinh ngoc",
    vai_tro : "giam doc",
    chuc_vu : "hello mmeeeeeeeeeeeeeeeeee"
  },
  {
    id: 1,
    name: "ca dinh ngoc",
    vai_tro : "giam doc",
    chuc_vu : "hello mmeeeeeeeeeeeeeeeeee"
  },
  {
    id: 2,
    name: "ca dinh ngoc",
    vai_tro : "giam doc",
    chuc_vu : "hello mmeeeeeeeeeeeeeeeeee"
  },
  {
    id: 3,
    name: "ca dinh ngoc",
    vai_tro : "giam doc",
    chuc_vu : "hello mmeeeeeeeeeeeeeeeeee"
  },
]
  return (
    <div className="App">
        {/* <InvoiedProduct title = "Nhân sự liên quan" listPerson={listPerson} ></InvoiedProduct>                   */}
        {/* <Demo>
          
        </Demo> */}

        <OverView>
          
        </OverView>
    </div>
  );
}

export default App;
