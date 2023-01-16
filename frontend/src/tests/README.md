I could not find a way to test components TripsView.jsx and TripsGrid.jsx with react testing library due to an issue with muix-dataGrid.
Currently it will not render the columns and rows properly if the column count is large. So it will only render the first 3 columns.
This is not a problem with StationsView.jsx and StationsGrid.jsx because the column count is only 2.

I did try a few solutions, for example disabling virtualization for muix-dataGrid and adding buffer columns. Both did not work in the end.

I did also try to use AutoSizer from the react-virtualized library but it did not work with my version of react. 

Other developers have reported the same issue [source](https://github.com/mui/mui-x/issues/1151)
