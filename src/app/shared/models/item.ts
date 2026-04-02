// An Interface is a specification that identifies a related set of properties
// and methods to be implemented by a class.

export interface Item {
  key?: string;
  title: string;
  price: number;
  category: string;
  imageUrl: string;
}
