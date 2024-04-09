'use client';
import React, { useState, useEffect } from 'react';
import MaxWidthWrapper from 'apps/student/components/MaxWidthWrapper';
import { Country } from '../Country';
import USA from '../../../assets/images/usa.jpg';
import Aus from '../../../assets/images/australia.jpg';
import Uk from '../../../assets/images/uk.jpg';
import Frn from '../../../assets/images/france.jpg';
import CarouselControls from 'apps/student/components/CarouselControls';
import { cn } from 'libs/utils';
import Link from 'next/link';
import { fetchAllUniversityByDestination } from '../../api/studyDestination';

interface IDestination {
  name: string;
  slug: string;
}

export const UniversityPage = () => {
  const [destination, setDestination] = useState<IDestination[]>([]);

  useEffect(() => {
    const fetchUniversities = async () => {
      try {
        const universities = await fetchAllUniversityByDestination();
        setDestination(universities);
      } catch (error) {
        console.error('Failed to fetch universities:', error);
        // Handle error, e.g., show a message to the user
      }
    };

    fetchUniversities();
  }, []);

  const renderCountries = () => {
    return destination.map((country, index) => (
      <div
        key={index}
        className={`w-full transform duration-200 ease-linear`}
        data-carousel-item={index === 0 ? 'active' : ''}
      >
        <Country
          country={country.name}
          slug={country.slug}
          countryImage={getCountryImage(country.name)}
        />
      </div>
    ));
  };

  const getCountryImage = (countryName: string) => {
    switch (countryName) {
      case 'New Zealand':
        return USA;
      case 'Australia':
        return Aus;
      case 'UK':
        return;
      case 'Canada':
        return Frn;
      default:
        return ''; // Default image path
    }
  };

  return (
    <section className="m-5 font-[quicksand]">
      <MaxWidthWrapper>
        <h2 className="font-bold text-xl md:text-2xl tracking-tight text-center text-dark-blue mb-5">
          Where to Study? Checkout some of Popular Countries
        </h2>

        <div className="relative h-52 md:h-96 mt-10 overflow-x-auto rounded-lg scrollbar-hidden">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {renderCountries()}
          </div>
        </div>
        {/* View All Countries button */}
        <div className="flex justify-center">
          <Link href={`/university?country=australia`}>
            <button
              type="button"
              className="w-full md:w-52 h-12 px-6  bg-dark-blue text-white flex justify-center items-center rounded mt-5"
            >
              View All Countries
            </button>
          </Link>
        </div>
      </MaxWidthWrapper>
    </section>
  );
};
