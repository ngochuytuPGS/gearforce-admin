import { SvgIconComponent } from '@mui/icons-material';

export type NestedListItemType = {
  listHeader: string;
  listIcon: SvgIconComponent;
  subList: { header: string; path: string; active: boolean }[];
  options?: {
    expand?: boolean;
  };
};
