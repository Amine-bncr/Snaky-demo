import { useReducer, useCallback, useMemo } from 'react';
import type { Product } from '../data/products';

export type OrderMode = 'particulier' | 'professionnel';

export interface OrderItem {
  productId: string;
  name: string;
  quantity: number;
  priceDA: number | null;
}

export interface OrderState {
  mode: OrderMode;
  customerName: string;
  company: string;
  contactName: string;
  location: string;
  items: OrderItem[];
}

type Action =
  | { type: 'SET_MODE'; payload: OrderMode }
  | { type: 'ADD_ITEM'; payload: { productId: string; name: string; priceDA: number | null } }
  | { type: 'SET_QUANTITY'; payload: { productId: string; quantity: number } }
  | { type: 'REMOVE_ITEM'; payload: string }
  | { type: 'SET_FIELD'; payload: { field: keyof Omit<OrderState, 'items' | 'mode'>; value: string } }
  | { type: 'CLEAR_ORDER' };

const initialState: OrderState = {
  mode: 'particulier',
  customerName: '',
  company: '',
  contactName: '',
  location: '',
  items: [],
};

function reducer(state: OrderState, action: Action): OrderState {
  switch (action.type) {
    case 'SET_MODE':
      return { ...state, mode: action.payload };
    case 'ADD_ITEM': {
      const existing = state.items.find((i) => i.productId === action.payload.productId);
      if (existing) {
        return {
          ...state,
          items: state.items.map((i) =>
            i.productId === action.payload.productId
              ? { ...i, quantity: i.quantity + 1 }
              : i,
          ),
        };
      }
      return {
        ...state,
        items: [
          ...state.items,
          {
            productId: action.payload.productId,
            name: action.payload.name,
            quantity: 1,
            priceDA: action.payload.priceDA,
          },
        ],
      };
    }
    case 'SET_QUANTITY':
      return {
        ...state,
        items: state.items
          .map((i) =>
            i.productId === action.payload.productId
              ? { ...i, quantity: action.payload.quantity }
              : i,
          )
          .filter((i) => i.quantity > 0),
      };
    case 'REMOVE_ITEM':
      return {
        ...state,
        items: state.items.filter((i) => i.productId !== action.payload),
      };
    case 'SET_FIELD':
      return { ...state, [action.payload.field]: action.payload.value };
    case 'CLEAR_ORDER':
      return { ...initialState };
    default:
      return state;
  }
}

export interface OrderApi {
  state: OrderState;
  mode: OrderMode;
  setMode: (m: OrderMode) => void;
  addItem: (product: Product) => void;
  setQuantity: (productId: string, quantity: number) => void;
  removeItem: (productId: string) => void;
  setField: (field: keyof Omit<OrderState, 'items' | 'mode'>, value: string) => void;
  clearOrder: () => void;
  totalCount: number;
  total: number | null;
  hasAllPrices: boolean;
  isEmpty: boolean;
}

export function useOrder(): OrderApi {
  const [state, dispatch] = useReducer(reducer, initialState);

  const setMode = useCallback((m: OrderMode) => dispatch({ type: 'SET_MODE', payload: m }), []);
  const addItem = useCallback((product: Product) => {
    dispatch({
      type: 'ADD_ITEM',
      payload: { productId: product.id, name: product.name, priceDA: product.priceDA },
    });
  }, []);
  const setQuantity = useCallback((productId: string, quantity: number) => {
    dispatch({ type: 'SET_QUANTITY', payload: { productId, quantity } });
  }, []);
  const removeItem = useCallback((productId: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: productId });
  }, []);
  const setField = useCallback(
    (field: keyof Omit<OrderState, 'items' | 'mode'>, value: string) => {
      dispatch({ type: 'SET_FIELD', payload: { field, value } });
    },
    [],
  );
  const clearOrder = useCallback(() => dispatch({ type: 'CLEAR_ORDER' }), []);

  const totalCount = useMemo(
    () => state.items.reduce((sum, i) => sum + i.quantity, 0),
    [state.items],
  );

  const hasAllPrices = useMemo(
    () => state.items.length > 0 && state.items.every((i) => i.priceDA !== null),
    [state.items],
  );

  const total = useMemo(() => {
    if (!hasAllPrices) return null;
    return state.items.reduce((sum, i) => sum + (i.priceDA ?? 0) * i.quantity, 0);
  }, [state.items, hasAllPrices]);

  return {
    state,
    mode: state.mode,
    setMode,
    addItem,
    setQuantity,
    removeItem,
    setField,
    clearOrder,
    totalCount,
    total,
    hasAllPrices,
    isEmpty: state.items.length === 0,
  };
}