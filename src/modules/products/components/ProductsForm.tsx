import React, { useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import ProductItems from './ProductItems';
import FilterProduct from './FilterProduct';
import { IProducts } from '../../../models/products';
import { ICategory } from '../../../models/category';
import { useSelector } from 'react-redux';
import { AppState } from '../../../redux/reducer';
import BottomBar from '../../common/components/BottomBar';

interface Props {
  errorMessage: string;
  listProduct?: IProducts[];
  productCategory?: ICategory[];
}

const ProductsForm = (props: Props) => {
  const { listProduct, productCategory } = props;
  const [productItem, setProductItem] = useState(useSelector((state: AppState) => state.product.product));

  const handleSelectAll = (e: { target: { name: string; checked: boolean } }) => {
    const { name, checked } = e.target;
    if (name === 'allSelect') {
      const tempBox = productItem?.map((item) => {
        return { ...item, checked: checked };
      });
      setProductItem(tempBox);
    } else {
      const tempBox = productItem?.map((item) => (item.name === name ? { ...item, checked: checked } : item));
      setProductItem(tempBox);
    }
  };

  useEffect(() => {
    setProductItem(listProduct);
  }, [listProduct]);

  return (
    <div
      style={{
        marginTop: 'var(--navHeight)',
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
              <input
                type="checkbox"
                name="allSelect"
                // checked={
                //   users.filter((user) => user?.isChecked !== true).length < 1
                // }
                checked={!productItem?.some((item) => item?.checked !== true)}
                onChange={handleSelectAll}
              />
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
          <ProductItems handleSelectAll={handleSelectAll} productItem={productItem} />
        </tbody>
      </table>
      <BottomBar />
    </div>
  );
};

export default ProductsForm;
