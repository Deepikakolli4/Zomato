import React from 'react'
import './delivery.css';
import Filters from '../common/filters';
import DeliveryCollections from './deliveryCollections';
import TopBrands from './topBrands';
import ExploreSection from '../common/exploreSection/Explore';
const deliveryFilters = [
  {
      id : 1,
      icon : <i className="fi fi-rr-settings-sliders absolute-center"></i>,
      title : "Filters",
  },
  {
      id : 2,
      title : "Rating: 4.0+",
  },
  {
      id : 3,
      title : "Safe and Hygienic",
  },
  {
      id : 4,
      title : "Pure Veg",
  },
  {
      id : 5,
      title : "Non Veg",
  },
  {
      id : 5,
      title : "Delivery Time",
  },
  {
      id : 5,
      icon : <i className="fi fi-rr-apps-sort absolute-center"></i>,
      title : "Delivery Time",
  },
  {
      id : 6,
      title : "Great Offers",
  },
]
const Delivery = () => {
  return (
    <div>
      <div className="max-width">
      <Filters filterList = {deliveryFilters}/>
      </div>
      <DeliveryCollections/>
      <TopBrands/>
      <ExploreSection/>
    </div>
  )
}

export default Delivery;
