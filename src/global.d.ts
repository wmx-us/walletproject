type Nullable<T> = T | null;

type TypeFunction = () => void;

type TypeObject = Record<string, unknown>;

type typeDict = {
  value: string;
  description?: string;
  name?: string;
  label: string;
  code?: string;
  itemName?: string;
};

type ProfileType = {
  account: Nullable<string>;
  userName: Nullable<string>;
  phoneTailNum: Nullable<string>;
};
type typeDictResponse = Record<string, typeDict[]>;

type typePagination = {
  pageSize?: number,
  page?:number,
  total?: number;
};

interface LooseObject {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}
type MenuType = {
  element: React.JSX.Element;
  type?: "menu" | "page" | "button";
  code?: string;
  parent?: Nullable<string>;
  name?: string;
  order?: number;
  path?: string;
  filePath?: Nullable<string>;
  redirect?: Nullable<string>;
  icon?: string;
  children?: Nullable<MenuType[]>;
};