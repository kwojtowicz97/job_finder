import Slider from 'react-slick'
import { Company } from '../types/Company'
import CompanyCard from './CompanyCard'

interface Props {
  companies: Company[]
  sortBy: 'offersCount' | 'rating'
}

export const CardCarousel = ({ companies, sortBy }: Props) => {
  var settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  }

  const sortedCompanies =
    sortBy === 'offersCount'
      ? companies.sort((a, b) => b.offersCount - a.offersCount)
      : companies.sort((a, b) => b.rating - a.rating)

  return (
    <div>
      <Slider {...settings}>
        {sortedCompanies.slice(0, 5).map((company) => (
          <CompanyCard key={company._id} company={company} />
        ))}
      </Slider>
    </div>
  )
}
