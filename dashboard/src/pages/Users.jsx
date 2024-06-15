import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Avatar, Box, Container, Typography } from '@mui/material';
import { Spinner } from '../components/reusable/Spinner';

function Users() {

  const [stateUsers, setStatesUsers] = useState({
    users: [],
    error: ""
  });

  const [loading, setLoading] = useState(true);

  const [dataGrid, setDataGrid] = useState({
    columns: [],
    rows: []
  });

  useEffect(() => {
    const getUsers = async () => {
      try {
        const endpoint = 'http://localhost:3030/api/users'
        const { ok, data = [], msg = null } = await fetch(endpoint).then((res) => res.json())

        if (!ok) throw new Error(msg)

        ok && setStatesUsers({
          ...stateUsers,
          users: data
        })

        setTimeout(() => setLoading(false), 1100);

      } catch (error) {
        setStatesUsers({
          ...stateUsers,
          error: error.message
        })
      }
    }
    getUsers()
  }, [])

  useEffect(() => {
    const dataObjUser = Object.entries(stateUsers.users.length ? stateUsers.users[1] : {});
    const headerNameTable = { id: 'Id', name: 'Nombre', email: 'Correo', role: 'Rol', imageAvatarAPI: 'Avatar', phone: 'Teléfono' }
    const listWrite = ['id', 'name', 'email', 'role', 'imageAvatarAPI', 'phone']
    const columnsFormat = dataObjUser.filter(([key, value]) => listWrite.includes(key))
      .map(([key, value]) => {
        return {
          field: key,
          headerName: headerNameTable[key],
          headerAlign: 'center',
          align: 'center',
          renderHeader: () => <strong>{headerNameTable[key]}</strong>,
          width: 150,
          type: typeof value,
          renderCell: (params) => {
            if (key === 'imageAvatarAPI') {
              return <Avatar style={{margin:'auto'}} src={params.value} alt={params.row.fullName} />;
            }

            if (key === 'role') {
              return params.value.name
            }
          }
        }
      })

    const rowsFormat = []
    stateUsers.users.forEach((user) => {
      const objData = {};
      Object.entries(user).forEach(([key, value]) => {
        if (listWrite.includes(key)) {
          objData[key] = value;
        }
      })
      rowsFormat.push(objData)
    });

    setDataGrid({
      rows: rowsFormat,
      columns: columnsFormat
    })

  }, [stateUsers.users])


  return (
    <>
      <Container sx={{marginBottom:'30px'}}>
        <Typography mb={2} variant="h3">Todos los usuarios</Typography>
        <Box sx={{ height: 648, width: '100%' }}>
          {stateUsers.error ? <Alert message={stateUsers.error} /> : null}
          {
            !loading ? <DataGrid
            rows={dataGrid.rows}
            columns={dataGrid.columns}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 10
                },
              },
            }}
            pageSizeOptions={[10]}
            checkboxSelection
          /> : <Spinner containerClassName={'d-flex m-auto'} />
          }
        </Box>
      </Container>
    </>
  );
}

export default Users;