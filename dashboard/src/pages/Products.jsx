import React, { useEffect, useState } from 'react';
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import { Box, Container, Typography } from "@mui/material";
import { Modal } from '@mui/joy';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Spinner } from '../components/reusable/Spinner';
import { Alert } from '../components/reusable/Alert'
import { Link, useNavigate } from 'react-router-dom';
import { DeleteProduct } from '../components/Products/DeleteProduct';
import { EditForm } from '../components/Products/EditForm';
import { CreateForm } from '../components/Products/CreateForm';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  maxWidth: 400,
  textAlign: "center",
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 3,
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center',
  borderRadius: 2
};

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
  const [refreshProducts, setRefreshProducts] = useState(false);

  const [openEditModal, setOpenEditModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState({});

  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [productIdToDelete, setProductIdToDelete] = useState(null);
  const handleDeleteButton = (id) => {
    setOpenDeleteModal(true);
    setProductIdToDelete(id);
  };
  const handleDeleteSuccess = () => {
    setRefreshProducts(true);
  }

  const navigate = useNavigate();

  const handleEditButton = (product) => {
    setSelectedProduct(product);
    setOpenEditModal(true);
  };

  const handleEditSuccess = () => {
    setRefreshProducts(true);
  };

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
        ok && setRefreshProducts(false)

        setTimeout(() => setLoading(false), 1100);

      } catch (error) {
        setStatesProducts({
          ...statesProducts,
          error: error.message
        })
      }
    }
    getProducts()
  }, [refreshProducts])

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

    columnsFormat.push({
      field: 'actions',
      type: 'actions',
      headerAlign: 'center',
      align: 'center',
      renderHeader: () => <strong>Acciones</strong>,
      width: 100,
      getActions: (params) => [
        <GridActionsCellItem
          icon={<EditIcon />}
          label="Edit"
          className="textPrimary"
          onClick={() => {
            handleEditButton(params.row)
          }}
          color="inherit"
        />,
        <GridActionsCellItem
          icon={<DeleteIcon />}
          label="Delete"
          onClick={() => {
            handleDeleteButton(params.row.id);
          }}
          color="inherit"
        />,
      ],
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
    <Container sx={{ marginBottom: '30px' }}>
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
            slots={{
              toolbar: (props) => (
                <CreateForm {...props} refreshProducts={refreshProducts} setRefreshProducts={setRefreshProducts} />
              ),
            }}
          /> : <Spinner containerClassName={'d-flex m-auto'} />
        }
      </Box>
      <DeleteProduct open={openDeleteModal} onClose={() => setOpenDeleteModal(false)} productId={productIdToDelete} onDeleteSuccess={handleDeleteSuccess} />
        
      <Modal open={openEditModal} onClose={() => setOpenEditModal(false)} aria-labelledby="modal-title" aria-describedby="modal-description">
        <Box sx={style}>
          {selectedProduct && (
            <EditForm product={selectedProduct} onUpdate={handleEditSuccess} onClose={() => setOpenEditModal(false)} />
          )}
        </Box>
      </Modal>
    </Container>
  );
}

export default Product;
