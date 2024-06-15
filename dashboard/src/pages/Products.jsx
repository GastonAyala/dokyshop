import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Box, Container, Typography } from "@mui/material";
import { Spinner } from '../components/reusable/Spinner';
import { Alert } from '../components/reusable/Alert'

function Product() {

  const [statesProducts, setStatesProducts] = useState({
    products: [],
    error: ""
  });

  const [loading, setLoading] = useState(true)

  const [dataGrid, setDataGrid] = useState({
    columns: [],
    rows: []
  });

  useEffect(() => {
    const getProducts = async () => {
      try {
        const endpoint = 'http://localhost:3030/api/products'
        const { ok, data = [], msg = null } = await fetch(endpoint).then((res) => res.json())

        if (!ok) throw new Error(msg)

        ok && setStatesProducts({
          ...statesProducts,
          products: data
        })

        setTimeout(() => setLoading(false), 1100);

      } catch (error) {
        setStatesProducts({
          ...statesProducts,
          error: error.message
        })
      }
    }
    getProducts()
  }, [])

  useEffect(() => {
    const dataObjProduct = Object.entries(statesProducts.products.length ? statesProducts.products[0] : {});
    const headerNameTable = { id: 'Id', imagePrincipalAPI: 'Imagen', imagesecondaries: 'Imagenes Secundarias', title: 'Título', category: 'Categoría', subcategory: 'Subcategoría', description: 'Descripción', price: 'Precio', sale: 'Descuento', quantity: 'Cantidad', available: 'Disponible' }
    const listWrite = ['id', 'imagePrincipalAPI', 'imagesecondaries', 'title', 'category', 'subcategory', 'description', 'price', 'sale', 'quantity', 'available']
    const columnsFormat = dataObjProduct.filter(([key, value]) => listWrite.includes(key))
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
            if (key === 'imagePrincipalAPI') {
              return <img src={params.value} alt={params.row.fullName} style={{ width: 'auto', height: '100%', padding: "7px" }} />;
            }
            if (key === 'imagesecondaries') {
              return params.value.map((img, i) => {
                return <img key={i} src={img.imageSecondaryAPI} alt={params.row.fullName} style={{ width: 'auto', height: '100%', padding: "7px" }} />;
              });
            }
            if (key === 'available') {
              return params.value ? '✔' : '✖';
            }
            if (key === 'category' || key === 'subcategory') {
              return params.value.name;
            }
          }
        }
      })

    const rowsFormat = [];
    statesProducts.products.forEach((product) => {
      const objData = {};
      Object.entries(product).forEach(([key, value]) => {
        if (listWrite.includes(key)) {
          objData[key] = value;
        }
      })
      rowsFormat.push(objData)
    })

    setDataGrid({
      rows: rowsFormat,
      columns: columnsFormat
    })

  }, [statesProducts.products])

  return (
    <>
      <Container sx={{marginBottom:'30px'}}>
        <Typography mb={2} variant="h3">Todos los productos</Typography>
        <Box sx={{ height: 648, width: '100%' }}>
          {statesProducts.error ? <Alert message={statesProducts.error} /> : null}
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
              checkboxSelection
              disableRowSelectionOnClick
            /> : <Spinner containerClassName={'d-flex m-auto'} />
          }
        </Box>
      </Container>
    </>
  );
}

export default Product;