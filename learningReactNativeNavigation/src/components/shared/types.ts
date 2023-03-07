import {NavigationProp} from '@react-navigation/native';

// https://reactnavigation.org/docs/navigation-prop

export type NavigationType = NavigationProp<any, any> & {
  toggleDrawer: () => void;
  openDrawer: () => void;
  closeDrawer: () => void;
  getParent: (id?: string) => NavigationType;
  push: (id: string) => void;
};
