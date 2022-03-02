import { ActionType, createCustomAction, getType } from 'typesafe-actions';
import { IProducts } from '../../../models/products';

export interface ProductState {
  product?: IProducts[];
  initializeProduct?: IProducts[];
}

export const setProductData = createCustomAction('products/setProductData', (data: IProducts[]) => ({
  data,
}));

export const deleteProduct = createCustomAction('products/deleteProduct', (id: string) => ({ id }));

const actions = { deleteProduct, setProductData };

type Action = ActionType<typeof actions>;

export default function reducer(state: ProductState = {}, action: Action) {
  switch (action.type) {
    case getType(setProductData):
      return { ...state, product: action.data };
    case getType(deleteProduct): {
      const newData = state.product?.filter((item) => {
        return item.id !== action.id;
      });
      return { state, product: newData, initializeProduct: newData };
    }
    default:
      return state;
  }
}
