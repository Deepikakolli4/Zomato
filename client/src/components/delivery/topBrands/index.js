import React from 'react'
import './topBrands.css'
import Slider from 'react-slick';
import PrevArrow from '../../common/carousel/prevArrow';
import NextArrow from '../../common/carousel/nextArrow';
const topBrandsList = [
    {
        id:1,
        time:"35 mins",
        cover :
        "https://b.zmtcdn.com/data/brand_creatives/logos/965c34226234ee1062370a32fce1bcb4_1649155865.png?output-format=webp",
    },
    {
        id:2,
        time:"23 mins",
        cover :
        "https://b.zmtcdn.com/data/brand_creatives/logos/a6927d83d9185b7788814049b4a9fc8c_1726604335.png?output-format=webp",
    },
    {
        id:3,
        time:"43 mins",
        cover :
        "https://b.zmtcdn.com/data/brand_creatives/logos/c38f7540bcc5a38e918856ac06409056_1504531339.png?output-format=webp",
    },
    {
        id:4,
        time:"17 mins",
        cover :
        "https://b.zmtcdn.com/data/brand_creatives/logos/f1dc700c8be881b9a17be904971a0644_1726678342.png?output-format=webp",
    },
    {
        id:5,
        time:"27 mins",
        cover :
        "https://b.zmtcdn.com/data/brand_creatives/logos/5caf38856d23347b351bb7abf97134d3_1550060255.png?output-format=webp",
    },
    {
        id:6,
        time:"27 mins",
        cover :
        "https://b.zmtcdn.com/data/brand_creatives/logos/24a22032f3a29cc6487f28cb045ecb03_1646749471.png?output-format=webp",
    },
    {
        id:7,
        time:"48 mins",
        cover :
        "https://b.zmtcdn.com/data/brand_creatives/logos/3d80cb89fca9e212f7dab2c1914ebd8f_1643983784.png?output-format=webp",
    },
    {
        id:8,
        time:"21 mins",
        cover :
        "https://b.zmtcdn.com/data/brand_creatives/logos/9302c59eca94abbee01aec9acf9305f6_1676521267.png?output-format=webp",
    },
    {
        id:9,
        time:"18 mins",
        cover :
        "https://b.zmtcdn.com/data/brand_creatives/logos/b39fb9a7762ce2a19750d676cf5ffcde_1669619963.png?output-format=webp",
    },
    {
        id:10,
        time:"53 mins",
        cover :
        "https://b.zmtcdn.com/data/brand_creatives/logos/45137b90df2f1154a8766b00c03c8fc3_1655798997.png?output-format=webp",
    },
]
const settings = {
    infinite : false,
    slidesToShow : 6,
    slidesToScroll: 2,
    nextArrow :<NextArrow/>,
    prevArrow :<PrevArrow/>
  };

const TopBrands = () => {
  return (
    <div className="top-brands max-width">
    <div className="collection-title">Top Brands For You</div>
    <Slider {...settings}>
     {topBrandsList.map((brand)=>{
        return <div>
            <div className="top-brand-cover">
             <img src={brand.cover} className="top-brand-image"
             alt={brand.time}/>
            </div>
            <div className="top-brand-text">{brand.time}</div>
        </div>
     })}
    </Slider>
    </div>
  )
}

export default TopBrands