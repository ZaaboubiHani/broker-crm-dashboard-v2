import React from 'react';
import Divider from '@mui/material/Divider';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import LinearProgress from '@mui/material/LinearProgress';
import Inventory2Icon from '@mui/icons-material/Inventory2';
import IconButton from '@mui/material/IconButton';
import { ListItem, ListItemText, Menu } from '@mui/material';

interface RevenuePanelProps {
  showData: boolean;
  total: number;
  totalHonored: number;
  totalNotHonored: number;
  wilayasRevenue: {
    name: string;
    totalSales: number;
    percentage: number;
    products: { name: string; quantity: number; total: number; percentage: number }[];
  }[];
  productsRevenue: { name: string; quantity: number; total: number; percentage: number }[];
}

const RevenuePanel: React.FC<RevenuePanelProps> = ({
  showData,
  total,
  totalHonored,
  totalNotHonored,
  wilayasRevenue,
  productsRevenue,
}) => {
  const [menuState, setMenuState] = React.useState<{ [key: string]: HTMLElement | null }>({});

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>, id: string) => {
    setMenuState({ ...menuState, [id]: event.currentTarget });
  };

  const handleClose = (id: string) => {
    setMenuState({ ...menuState, [id]: null });
  };

  const productsColumns: GridColDef[] = [
    { field: 'product', headerName: 'Produit', width: 100 },
    { field: 'quantity', headerName: 'Quantité', width: 70, align: 'center', headerAlign: 'center' },
    { field: 'total', headerName: 'Total', width: 150, align: 'center', headerAlign: 'center' },
    { field: 'percentage', headerName: 'Pourcentage', width: 100, align: 'right', headerAlign: 'right' },
  ];

  const wilayasColumns: GridColDef[] = [
    { field: 'wilaya', headerName: 'Wilaya', width: 150 },
    { field: 'total', headerName: 'Total', width: 150, align: 'center', headerAlign: 'center' },
    { field: 'percentage', headerName: 'Pourcentage', width: 100, align: 'center', headerAlign: 'center' },
    {
      field: 'products',
      headerName: 'Produits',
      width: 80,
      align: 'right',
      headerAlign: 'right',
      renderCell: (params) => {
        const id = params.id.toString();
        const isOpen = Boolean(menuState[id]);

        return (
          <>
            <IconButton onClick={(event) => handleClick(event, id)}>
              <Inventory2Icon />
            </IconButton>
            <Menu
              open={isOpen}
              anchorEl={menuState[id]}
              onClose={() => handleClose(id)}
              MenuListProps={{ 'aria-labelledby': 'basic-button' }}
            >
              {params.row.products.map((p: { name: string; quantity: number; total: number; percentage: number }) => (
                <ListItem key={p.name} sx={{ height: '50px' }}>
                  <ListItemText primary={p.name} secondary={p.total + 'DZD'} sx={{ marginRight: '16px' }} />
                  <ListItemText primary={p.quantity} secondary={p.percentage + '%'} />
                </ListItem>
              ))}
            </Menu>
          </>
        );
      },
    },
  ];

  if (showData) {
    return (
      <div
        style={{
          margin: '0px 0px 16px 16px',
          flexGrow: '1',
          flex: '1',
          height: '96%',
          overflowY: 'auto',
          overflowX: 'hidden',
          paddingRight: '8px',
        }}
      >
        <div style={{ display: 'flex' }}>
          <div style={{ marginRight: '8px' }}>
            <h6 style={{ fontSize: 15, fontWeight: '600', margin: '0px' }}>
              Total : {total.toLocaleString('fr-DZ', { style: 'currency', currency: 'DZD' })}
            </h6>
            <h6 style={{ fontSize: 15, fontWeight: '600', margin: '0px' }}>
              Total honore : {totalHonored.toLocaleString('fr-DZ', { style: 'currency', currency: 'DZD' })}
            </h6>
            <h6 style={{ fontSize: 15, fontWeight: '600', margin: '0px' }}>
              Total non honore : {totalNotHonored.toLocaleString('fr-DZ', { style: 'currency', currency: 'DZD' })}
            </h6>
          </div>
          <div
            style={{
              width: '50%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <div style={{ color: '#FC761E', display: 'flex', fontSize: 15, alignItems: 'center' }}>
              <LinearProgress sx={{ flex: '1', marginRight: '8px' }} color="inherit" variant="determinate" value={100} />
              100%
            </div>
            <div style={{ color: '#CC38E0', display: 'flex', fontSize: 15, alignItems: 'center' }}>
              <LinearProgress
                sx={{ flex: '1', marginRight: '8px' }}
                color="inherit"
                variant="determinate"
                value={(totalHonored / (total === 0 ? 1 : total)) * 100}
              />
              {(totalHonored / (total === 0 ? 1 : total) * 100).toFixed(0)}%
            </div>
            <div style={{ color: '#38EB5D', display: 'flex', fontSize: 15, alignItems: 'center' }}>
              <LinearProgress
                sx={{ flex: '1', marginRight: '8px' }}
                color="inherit"
                variant="determinate"
                value={(totalNotHonored / (total === 0 ? 1 : total)) * 100}
              />
              {(totalNotHonored / (total === 0 ? 1 : total) * 100).toFixed(0)}%
            </div>
          </div>
        </div>
        <Divider component="div" style={{ margin: '8px 0px' }} />
        <h6 style={{ fontSize: 15, fontWeight: '600', margin: '0px' }}>Vente par produit:</h6>
        <DataGrid
          sx={{
            flexGrow: '1',
            display: 'flex',
            flexDirection: 'column',
            borderRadius: '8px',
            overflow: 'hidden',
            border: '1px solid teal',
            height: 'max-content',
          }}
          rows={productsRevenue.map((row, index) => ({
            id: index,
            product: row.name,
            quantity: row.quantity,
            total: row.total?.toLocaleString('fr-DZ', { style: 'currency', currency: 'DZD' }),
            percentage: row.percentage + '%',
          }))}
          columns={productsColumns}
          hideFooterPagination
          hideFooter
          checkboxSelection={false}
        />
        <Divider component="div" style={{ margin: '8px 0px' }} />
        <h6 style={{ fontSize: 15, fontWeight: '600', margin: '0px' }}>Vente par wilaya:</h6>
        <DataGrid
          sx={{
            flexGrow: '1',
            display: 'flex',
            flexDirection: 'column',
            borderRadius: '8px',
            overflow: 'hidden',
            border: '1px solid teal',
            height: 'max-content',
          }}
          rows={wilayasRevenue.map((row, index) => ({
            id: index,
            wilaya: row.name,
            total: row.totalSales?.toLocaleString('fr-DZ', { style: 'currency', currency: 'DZD' }),
            percentage: row.percentage + '%',
            products: row.products,
          }))}
          columns={wilayasColumns}
          hideFooterPagination
          hideFooter
          checkboxSelection={false}
        />
      </div>
    );
  } else {
    return (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'grid',
          placeItems: 'center',
        }}
      >
        Cliquez sur "Afficher" pour voir les résultats.
      </div>
    );
  }
};

export default RevenuePanel;
