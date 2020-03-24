import { config } from '@vue/test-utils';

const NSElements = [
  'ActionBar',
  'ActionItem',
  'FormattedString',
  'GridLayout',
  'FlexboxLayout',
  'HtmlView',
  'NavigationButton',
  'Page',
  'StackLayout',
  'Frame',
  'TabView',
  'TabViewItem',
  'TabContentItem',
  'TabStrip',
  'TabStripItem',
  'BottomNavigation',
  'TextField',
  'ScrollView',
  'ActivityIndicator',
  'template',
  'script',
  'style',
  'HomeComponent',
  'HoursComponent',
  'CalendarComponent',
  'AccountComponent',
  'CardView',
  'DropDown'
];

NSElements.forEach((ele) => {
  config.stubs[ele] = true;
});
