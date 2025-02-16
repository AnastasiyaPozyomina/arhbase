import React from 'react';

//Import Material React Table and its Types
import { MaterialReactTable } from 'material-react-table';

//Import Material React Table Translations
import { MRT_Localization_RU } from 'material-react-table/locales/ru';
import { createTheme, ThemeProvider, useTheme } from '@mui/material';
import { ruRU } from '@mui/material/locale';


const Table = ({data, columns}) => {
  return (
    <MaterialReactTable
      columns={columns}
      data={data}
      localization={MRT_Localization_RU}
    />
  );
};


const TableWithThemeProvider = ({data, columns}) => {
  const theme = useTheme(); 
  return (
    <ThemeProvider theme={createTheme(theme, ruRU)}>
      <Table 
      data = {data} 
      columns= {columns} />
    </ThemeProvider>
  );
};

export default TableWithThemeProvider;