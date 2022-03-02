import React from 'react';
import { FormattedMessage } from 'react-intl';
import ProductItems from './ProductItems';
import FilterProduct from './FilterProduct';
import { IProducts } from '../../../models/products';
import { ICategory } from '../../../models/category';

interface Props {
  isLoading: boolean;
  errorMessage: string;
  listProduct?: IProducts[];
  productCategory?: ICategory[];
}

const ProductsForm = (props: Props) => {
  const { listProduct, productCategory } = props;

  return (
    <div
      style={{
        minHeight: '100vh',
        color: '#fff !important',
      }}
    >
      <title>
        <FormattedMessage id="product" />
      </title>
      <FilterProduct category={productCategory} />
      <ProductItems product={listProduct} />
    </div>
  );
};

export default ProductsForm;
