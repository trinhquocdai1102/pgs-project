import React from 'react';
import { FormattedMessage } from 'react-intl';
import ProductItems from './ProductItems';
import FilterProduct from './FilterProduct';
import { IProducts } from '../../../models/products';
import { ICategory } from '../../../models/category';

interface Props {
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
      <button className="btn btn-table-common">Add Product</button>
      <table className="table table-data">
        <thead>
          <tr>
            <th>
              <input type="checkbox" />
            </th>
            <th>
              <span>SKU</span>
            </th>
            <th>
              <span>Name</span>
            </th>
            <th>
              <span>Category</span>
            </th>
            <th>
              <span>Price</span>
            </th>
            <th>
              <span>In stock</span>
            </th>
            <th>
              <span>Vendor</span>
            </th>
            <th>
              <span>Arrival Date</span>
            </th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <ProductItems product={listProduct} />
        </tbody>
      </table>
    </div>
  );
};

export default ProductsForm;
