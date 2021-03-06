import React from 'react';
import BrandCard from '@components/BrandCard';
import { componentImage, Brands as BrandsType } from '@custom-types/index';
import chunk from 'lodash/chunk';
import './brands.scss';

type Props = BrandsType;

function renderBrands(brands: componentImage[]): React.ReactNode {
  return brands.map((brand: componentImage) => {
    const { id } = brand.sys;
    return <BrandCard key={id} brandData={brand} />;
  });
}

function renderBrandGroup(brands: componentImage[]): React.ReactNode {
  const groupBrands = chunk(brands, 3);
  return groupBrands.map((group: componentImage[], index) => {
    const key = `brand-group-${index}`;
    return (
      <div key={key} className="brands__container__logo-inner__brand-group">
        {renderBrands(group)}
      </div>
    );
  });
}

const Brands: React.FC<Props> = props => {
  const {
    fields: { headline, subcopy, brands }
  } = props;
  return (
    <section className="brands__container">
      <div className="brands__container__headline">
        <div className="brands__container__headline__inner">
          <h2>{headline}</h2>
          <p>{subcopy}</p>
        </div>
      </div>
      <div className="brands__container__logo-wrapper">
        <div className="brands__container__logo-inner">
          {renderBrandGroup(brands)}
        </div>
      </div>
      <div className="brands__container__background-bar" />
    </section>
  );
};

export default Brands;
