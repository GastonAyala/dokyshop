import { Alert, Box, Container, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import { Spinner } from '../components/reusable/Spinner';
import ScheduleIcon from '@mui/icons-material/Schedule';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import { API_HOST } from '../environment';

function Order() {

  const [stateOrders, setStatesOrders] = useState({
    orders: [],
    error: ""
  });

  const [loading, setLoading] = useState(true);

  const [dataGrid, setDataGrid] = useState({
    columns: [],
    rows: []
  });

  useEffect(() => {
    const getOrders = async () => {
      try {
        const endpoint = `${API_HOST}/api/order/list`;
        const { ok, data = [], msg = null } = await fetch(endpoint).then((res) => res.json());

        if (!ok) throw new Error(msg);

        ok && setStatesOrders({
          ...stateOrders,
          orders: data
        });

        setTimeout(() => setLoading(false), 1100);

      } catch (error) {
        setStatesOrders({
          ...stateOrders,
          error: error.message
        })
      }
    }
    getOrders()
  }, [])

  useEffect(() => {
    const dataObjOrders = Object.entries(stateOrders.orders.length ? stateOrders.orders[0] : {});
    const headerNameTable = { id: 'Id', total: 'Total', userId: 'Id del usuario', state: 'Estado', products: 'Producto/s',createdAt: 'Creado', updatedAt: 'Actualizado' };

    const stateInSpanish = { pending: 'Pendiente', completed: 'Completado', canceled:'Cancelado' };
    const statusColors = { pending: '#FFA500', completed: '#008000', canceled: '#FF0000' };
    const statusIcons = { pending: <ScheduleIcon style={{ color: '#FFA500' }} />, completed: <CheckCircleIcon style={{ color: '#008000' }} />, canceled: <CancelIcon style={{ color: '#FF0000' }} /> };

    const listWrite = ['id', 'total', 'userId', 'state', 'products','createdAt', 'updatedAt'];
    const columnsFormat = dataObjOrders.filter(([key]) => listWrite.includes(key))
      .map(([key, value]) => {
        return {
          field: key,
          headerName: headerNameTable[key],
          headerAlign: 'center',
          align: 'center',
          renderHeader: () => <strong>{headerNameTable[key]}</strong>,
          width: 120,
          type: typeof value,
          renderCell: (params) => {
            if (key === 'state') {
              const color = statusColors[params.value];
              return (
                <div>
                  <span style={{ color }}>
                    {stateInSpanish[params.value]}
                  </span>
                  {statusIcons[params.value]}
                </div>
              );
            }
            if (key === 'total') {
              return params.value !== null ? `$${params.value}` : '';
            }
          }
        }
      })

    const rowsFormat = stateOrders.orders.map((order) => {
      const objData = {};
      Object.entries(order).forEach(([key, value]) => {
        if (listWrite.includes(key)) {
          objData[key] = key === 'products' ? value.map(product => product.title).join(', ') : value;
        }
      });
      return objData;
    });

    setDataGrid({
      rows: rowsFormat,
      columns: columnsFormat
    })

  }, [stateOrders.orders])


  return (
    <Container sx={{ marginBottom: '30px' }}>
      <Typography mb={2} variant="h3">Todas las ordenes</Typography>
      <Box sx={{ height: 648, width: '100%' }}>
        {stateOrders.error ? <Alert message={stateOrders.error} /> : null}
        {
          !loading ? <DataGrid
            rows={dataGrid.rows}
            columns={dataGrid.columns}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 10,
                },
              },
            }}
            pageSizeOptions={[10]}
            disableRowSelectionOnClick
          /> : <Spinner containerClassName={'d-flex m-auto'} />
        }
      </Box>
    </Container>
  );
}

export default Order;