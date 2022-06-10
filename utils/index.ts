import queryString from 'query-string';

const Brand = [
  'apple',
  'vsmart',
  'samsung',
  'xiaomi',
  'nokia',
  'oppo',
  'vivo',
  'asus',
  'realme'
];
const RAM = ['1', '2', '3', '4', '6', '8', '>8'];
const Storage = ['4', '8', '16', '32', '64', '128', '256', '>256'];
const Price = ['<5tr', '5-10tr', '10-15tr', '15-20tr', '>20tr'];
const Display = ['<5', '5-5.5', '5.5-6', '>6'];
const order = ['brand', 'ram', 'storage', 'price', 'display'];

export function formatMoney(money: number | string | undefined) {
  if (!money) return;
  if (typeof money === 'number') {
    money = money.toString();
  }
  return money.replace(/\B(?=(\d{3})+(?!\d))/g, '.') + ' ₫';
}
export function noop(): void {
  return;
}
export const customQueryString = {
  parse: (query: string) => {
    const objectFilter: Record<string, unknown> = queryString.parse(query, {
      arrayFormat: 'comma'
    });
    for (const key of Object.keys(objectFilter)) {
      if (!Array.isArray(objectFilter[key])) {
        objectFilter[key] = [objectFilter[key]] as any;
      }
    }
    return objectFilter;
  },
  stringify: (filter: any) =>
    queryString.stringify(filter, {
      arrayFormat: 'comma',
      sort: (a, b) => order.indexOf(a) - order.indexOf(b)
    })
};

export const Query2FilterArray = (filter: Record<string, unknown>) => {
  for (const key of Object.keys(filter)) {
    if (!Array.isArray(filter[key])) {
      filter[key] = (filter[key] as any).split(',');
    }
  }
  return filter;
};
