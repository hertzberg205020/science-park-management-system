export interface MenuItemInRow {
  key: string;
  label: string;
  icon?: string;
  children?: MenuItemInRow[] | null;
}
