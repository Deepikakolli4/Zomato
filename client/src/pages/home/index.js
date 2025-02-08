import React, { useState } from 'react'
import Header from '../../components/common/header'
import TabOptions from '../../components/common/tabOptions'
import Footer from '../../components/common/footer'
import NightLife from '../../components/nightlife'
import DiningOut from  '../../components/dinningout'
import Delivery from   '../../components/delivery'
function HomePage(){
    const[activeTab,setActiveTab]=useState("Delivery");
  return (
    <div>
        <Header/>
       <TabOptions activeTab={activeTab} setActiveTab={setActiveTab} />
       {getCorrectScreen(activeTab)}
       <Footer />
    </div>
  );
};
const getCorrectScreen = (tab) =>{
    switch(tab) {
        case "Delivery" :
            return <div>
                <Delivery/>
                </div>;
        case  "Dining Out":
            return <div>
                  <DiningOut />
                </div>;
        case  "NightLife" :
            return <div>
                <NightLife/>
            </div>;
        default :
        return <div> 
            <Delivery/>
            </div>;
    }
}

export default HomePage;