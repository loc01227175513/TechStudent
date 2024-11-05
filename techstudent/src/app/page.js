"use client"; 
import Header from './component/header/header';
import Homecomponent from "./component/home/home.component";
import Footercomponent from './component/footer/footer';


export default function Home() {
  return (
    <div>

      <Header/>
      <Homecomponent/>
      <Footercomponent/>
    </div>
  );
}
