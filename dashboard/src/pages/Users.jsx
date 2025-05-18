import { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Alert, Avatar, Box, Container, Typography } from '@mui/material';
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
        const endpoint = `/api/users`
        
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
    const getPropsFromObjects = (obj = {}, levelParams = 0, prefix = '') => {
      return Object.entries(obj).reduce((newObj, [key, value]) => {
        const uniqueKey = `${prefix}${key}${levelParams}`;
    
        if (Array.isArray(value)) {
          value.forEach((item, index) => {
            newObj = {
              ...newObj,
              ...getPropsFromObjects(item, index, `${uniqueKey}_`)
            };
          });
        } else if (typeof value === "object" && value !== null) {
          newObj = {
            ...newObj,
            ...getPropsFromObjects(value, levelParams, `${uniqueKey}_`)
          };
        } else {
          const idx = Object.keys(newObj).filter(k => k.startsWith(uniqueKey)).length;
          newObj[`${uniqueKey}${idx}`] = value;
        }
        return newObj;
      }, {});
    };
    
    const getProperties = (objPrincipal = {}, maxDepth = 3) => {
      let result = {};
    
      const process = (data, depth = 0) => {
        if (depth >= maxDepth || !data || typeof data !== 'object') return;
    
        result = { ...result, ...getPropsFromObjects(data, depth) };
    
        Object.values(data).forEach(value => {
          if (Array.isArray(value) || (typeof value === 'object' && value !== null)) {
            process(value, depth + 1);
          }
        });
      };
    
      process(objPrincipal);
    
      return result;
    };
    
    const dataProcess = getProperties(stateUsers.users.length ? stateUsers.users[0] : {});
  
    const dataObjUser = Object.entries(dataProcess);
      const headerNameTable = { 
        id00: 'Id',
        name00: 'Nombre', 
        email00: 'Correo', 
        role0_name00: 'Rol', 
        imageAvatarAPI00: 'Avatar', 
        phone00: 'Teléfono', 
        address0_street00: 'Dirección', 
        address0_city00: "Ciudad", 
        address0_province00: 'Provincia', 
        address0_zipCode00: 'Código Postal'
      }
      const listWrite = ['id00', 'name00', 'email00', 'role0_name00', 'imageAvatarAPI00', 'phone00', 'address0_street00', 'address0_city00', 'address0_province00', 'address0_zipCode00']
    
    const columnsFormat = dataObjUser.filter(([key]) => listWrite.includes(key))
      .map(([key, value]) => {
          const renderHeader = () => <strong>{headerNameTable[key]}</strong>;
          const renderCell = (params) => {
            switch(key) {
              case "imageAvatarAPI00":
                return <Avatar style={{margin:'auto'}} src={params.value} alt={params.row.fullName} />;
              case "name10":
                return params.value.name;
            }
          }
    
          return {
            field: key,
            headerName: headerNameTable[key],
            headerAlign: 'center',
            align: 'center',
            renderHeader,
            width: 120,
            type: typeof value,
            renderCell
          }
        }
      ) 

    const rowsFormat = stateUsers.users.map(user => ({
        id: user.id,
        id00: user.id,
        name00: user.name,
        email00: user.email,
        role0_name00: user.role.name,
        imageAvatarAPI00: user.imageAvatarAPI,
        phone00: user.phone,
        address0_street00: user.address.street,
        address0_city00: user.address.city,
        address0_province00: user.address.province,
        address0_zipCode00: user.address.zipCode
    }));


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
            disableRowSelectionOnClick
          /> : <Spinner containerClassName={'d-flex m-auto'} />
          }
        </Box>
      </Container>
    </>
  );
}

export default Users;