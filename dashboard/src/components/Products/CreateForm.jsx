import { useEffect, useState } from 'react';
import { GridToolbarContainer, } from '@mui/x-data-grid';
import { Box, TextField, Button, styled, Checkbox, FormControlLabel, Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import { Modal, ModalClose, Sheet, DialogTitle } from '@mui/joy';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Add from '@mui/icons-material/Add';
import { API_HOST } from '../../environment';

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

const HiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
  '& .MuiTextField-root': { m: 1, width: '25ch' },
});

export const CreateForm = (props) => {
  const { refreshProducts, setRefreshProducts } = props;

  const [open, setOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [colors, setColors] = useState([]);
  const [newProduct, setNewProduct] = useState({
    image: "",
    title: "",
    category: "",
    subcategory: "",
    description: "",
    price: 0,
    sale: 0,
    stock: 0,
    available: true,
    color: ""
  });

  const [imgPrimary, setImgPrimary] = useState();
  const [imgSecondaries, setImgSecondaries] = useState([]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleImageChange = (e) => {
    if (e.target.name === "imagePrimary") {
      setImgPrimary(e.target.files[0]);
    } else if (e.target.name === "imagesSecondary") {
      setImgSecondaries([...imgSecondaries, ...e.target.files]);
    }
  };

  const handleChange = async (e) => {
    try {
      if (e.target.type === 'checkbox') {
        await setNewProduct({
          ...newProduct,
          [e.target.name]: e.target.checked
        });
      } else {
        await setNewProduct({
          ...newProduct,
          [e.target.name]: e.target.value
        });
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  const fetchCategoriesAndSubcategories = async () => {
    try {
    
      const { ok, data } = await fetch(`${API_HOST}/api/categories`).then(
        (res) => res.json()
      );
      ok && setCategories(data);

      const { ok: okSub, data: dataSub } = await fetch(`${API_HOST}/api/subcategories`).then(res => res.json());
      okSub && setSubcategories(dataSub);
    } catch (error) {
      console.error(error.message);
    }
  };

  const getColors = async () => {
    try {
      const { status, colors: apiColors } = await fetch("https://www.csscolorsapi.com/api/colors").then(res => res.json());

      status === 200 && setColors(apiColors);
    } catch (error) {
      console.error(error.message);
    }
  }

  useEffect(() => {
    open && fetchCategoriesAndSubcategories();
    open && getColors();
  }, [open]);

  const handleCreateProduct = async (e, newProduct) => {
    const endpoint = `${API_HOST}/api/products/create`;

    try {
      e.preventDefault()
      let formData = new FormData();

      formData.append('title', newProduct.title);
      formData.append('description', newProduct.description);
      formData.append('imagePrimary', imgPrimary);
      imgSecondaries.forEach((img) => {
        formData.append(`imagesSecondary`, img);
      });
      formData.append('price', newProduct.price);
      formData.append('sale', newProduct.sale);
      formData.append('quantity', newProduct.quantity);
      formData.append('available', newProduct.available);
      formData.append('color', newProduct.color);
      formData.append('category', newProduct.category);
      formData.append('subcategory', newProduct.subcategory);

      const { ok } = await fetch(endpoint, {
        method: "POST",
        body: formData,
      }).then(res => res.json());

      ok && handleClose();
      ok && setRefreshProducts(true);
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <GridToolbarContainer>
      <Button sx={{ backgroundColor: "rgb(64, 127, 185)", color: "rgba(255, 255, 255, .8)", m: 1 }} variant="contained" startIcon={<Add />} onClick={handleOpen}>
        Crear producto
      </Button>
      <Modal open={open} onClose={handleClose} aria-labelledby="modal-title" aria-describedby="modal-description">
          <Box component="form" id='createProductForm' noValidate autoComplete="off" sx={style} onSubmit={(e) => handleCreateProduct(e, newProduct)}>

          <ModalClose variant="plain" sx={{ m: "auto" }} />
          <DialogTitle id="modal-title" level="h4" component="h2">Crear producto</DialogTitle>

          <Sheet sx={{ display: 'flex', flexWrap: 'wrap', gap: "5px" }}>
            <Button component="label" variant='contained' sx={{ backgroundColor: "rgb(64, 127, 185)", color: "rgba(255, 255, 255, .8)", m: "auto", width: 150 }} startIcon={<CloudUploadIcon />}>
              Imágen principal
              <HiddenInput accept='image/*' type="file" id='imagePrimary' name='imagePrimary' onChange={handleImageChange} />
            </Button>
            <Button component="label" variant='contained' sx={{ backgroundColor: "rgb(64, 127, 185)", color: "rgba(255, 255, 255, .8)", m: "auto", width: 150 }} startIcon={<CloudUploadIcon />}>
              Imágenes secundarias
              <HiddenInput accept='image/*' type="file" multiple id='imagesSecondary' name='imagesSecondary' onChange={handleImageChange} />
            </Button>
          </Sheet>

          <Sheet sx={{ display: 'flex', flexWrap: 'wrap', gap: "5px" }}>
            <TextField sx={{ m: "auto", width: 120 }} id="title" name='title' label="Titulo" variant="filled" onChange={handleChange} />
            
            <FormControl variant="filled" sx={{ m: "auto", width: 120 }}>
              <InputLabel id="category-label">Categoría</InputLabel>
              <Select labelId="category-label" id="category" value={newProduct.category} label="Categoría" onChange={handleChange} name="category">
                <MenuItem selected value="">
                  <em>Seleccionar Categoria</em>
                </MenuItem>
                {categories?.map((c) => (
                  <MenuItem key={c.id} value={c.id}>{c.name}</MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl variant="filled" sx={{ m: "auto", width: 120 }}>
              <InputLabel id="subcategory-label">Subcategoría</InputLabel>
              <Select labelId="subcategory-label" id="subcategory" value={newProduct.subcategory} label="Subcategoría" onChange={handleChange} name="subcategory">
                <MenuItem selected value="">
                  <em>Seleccionar Subcategoria</em>
                </MenuItem>
                {subcategories?.map((sub) => (
                  <MenuItem key={sub.id} value={sub.id}>{sub.name}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField sx={{ m: "auto", width: 120 }} id="description" type="text" name='description' label="Descripción" variant="filled" onChange={handleChange} />
            <TextField sx={{ m: "auto", width: 120 }} id="price" type="number" name='price' label="Precio" variant="filled" onChange={handleChange} />
            <TextField sx={{ m: "auto", width: 120 }} id="sale" type="number" name='sale' label="Descuento" variant="filled" onChange={handleChange} />
            <TextField sx={{ m: "auto", width: 120 }} id="quantity" type="number" name='quantity' label="Cantidad" variant="filled" onChange={handleChange} />
            <FormControl variant="filled" sx={{ m: "auto", width: 120 }}>
              <InputLabel id="color-label">Color</InputLabel>
              <Select labelId="color-label" id="color" value={newProduct.color} label="color" onChange={handleChange} name="color">
                <MenuItem selected value="">
                  <em>Seleccionar color</em>
                </MenuItem>
                <MenuItem sx={{ backgroundImage: " linear-gradient(45deg, #f09433 0%,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888 100%)" }} value="Multicolor">Multicolor</MenuItem>
                {colors?.map((c) => (
                  <MenuItem sx={{ backgroundColor: c.name }} key={c.name} value={c.name}>{c.name}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControlLabel sx={{ m: "auto", width: 120 }} control={<Checkbox />} id="available" name='available' label="Disponible" onChange={handleChange} />
          </Sheet>

          <Button variant="outlined" sx={{ m: "auto", width: 150 }} onClick={handleClose}>Cancelar</Button>
          <Button variant="contained" sx={{ backgroundColor: "rgb(64, 127, 185)", color: "rgba(255, 255, 255, .8)", m: 1, width: 150 }} type="submit">Crear</Button>
          </Box>
      </Modal>
    </GridToolbarContainer>
  )
};
