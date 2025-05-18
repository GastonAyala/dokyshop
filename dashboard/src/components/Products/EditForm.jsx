import { useState, useEffect, forwardRef } from 'react';
import { Box, TextField, Button, styled, Checkbox, FormControlLabel, Select, MenuItem, FormControl, InputLabel, Autocomplete } from "@mui/material";
import { DialogTitle, ModalClose, Sheet } from '@mui/joy';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

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

export const EditForm = forwardRef(({ product, onUpdate, onClose }, ref) => {
  const [formData, setFormData] = useState({
    id: product.id,
    title: product.title,
    description: product.description,
    price: product.price,
    sale: product.sale,
    quantity: product.quantity,
    available: product.available || false,
    category: product.category?.id || null,
    subcategory: product.subcategory?.id || null,
  });

  const [imgPrimary, setImgPrimary] = useState();
  const [imgSecondaries, setImgSecondaries] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [colors, setColors] = useState([]);

  const handleImageChange = (e) => {
    if (e.target.name === "imagePrimary") {
      setImgPrimary(e.target.files[0]);
    } else if (e.target.name === "imagesSecondary") {
      setImgSecondaries([...imgSecondaries, ...e.target.files]);
    }
  };

  useEffect(() => {
    const fetchCategoriesAndSubcategories = async () => {
      try {
        const { ok, data } = await fetch(`/api/categories`).then(res => res.json());
        ok && setCategories(data);

        const { ok: okSub, data: dataSub } = await fetch(`api/subcategories`).then((res) => res.json());
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
    getColors();
    fetchCategoriesAndSubcategories();
  }, []);

  const handleChange = (e) => {
    if (e.target.name === 'available') {
      setFormData({
        ...formData,
        [e.target.name]: e.target.checked,
      });
    } else {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const submitFormData = new FormData();
      submitFormData.append('id', formData.id);
      submitFormData.append('title', formData.title);
      submitFormData.append('category', formData.category);
      submitFormData.append('subcategory', formData.subcategory);
      submitFormData.append('description', formData.description);
      submitFormData.append('price', formData.price);
      submitFormData.append('sale', formData.sale);
      submitFormData.append('quantity', formData.quantity);
      submitFormData.append('color', formData.color);
      submitFormData.append('available', formData.available);
      imgPrimary && submitFormData.append('imagePrimary', imgPrimary);

      if (imgSecondaries.length > 0) {
        imgSecondaries.forEach((img) => {
          submitFormData.append(`imagesSecondary`, img);
        });
      }

      const { ok, msg } = await fetch(`/api/products/update/${formData.id}`, {
        method: 'PUT',
        body: submitFormData,
      }).then(res => res.json());

      ok && onUpdate();
      ok && onClose();
      if (!ok) throw new Error(msg);
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} ref={ref} sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
      <ModalClose variant="plain" sx={{ m: "auto", display: 'inline' }} onClick={onClose} />
      <DialogTitle sx={{ textAlign: 'center' }} id="modal-title" level="h4" component="h2">Editar producto</DialogTitle>

      <Sheet sx={{ display: 'flex', flexWrap: 'wrap', gap: "5px" }}>
        <Button component="label" variant='contained' sx={{ backgroundColor: "rgb(64, 127, 185)", color: "rgba(255, 255, 255, .8)", m: "auto", width: 150 }} startIcon={<CloudUploadIcon />}>
          Imágen principal
          <HiddenInput accept="img/*" type="file" id='imagePrimary' name='imagePrimary' onChange={handleImageChange} />
        </Button>
        <Button component="label" variant='contained' sx={{ backgroundColor: "rgb(64, 127, 185)", color: "rgba(255, 255, 255, .8)", m: "auto", width: 150 }} startIcon={<CloudUploadIcon />}>
          Imágenes secundarias
          <HiddenInput accept="img/*" type="file" multiple id='imagesSecondary' name='imagesSecondary' onChange={handleImageChange} />
        </Button>
      </Sheet>

      <Sheet sx={{ display: 'flex', flexWrap: 'wrap', gap: "5px" }}>
        <TextField sx={{ m: "auto", width: 120 }} name="title" label="Título" variant="filled" value={formData.title} onChange={handleChange} />

        <Autocomplete
          name="category"
          sx={{ m: "auto", width: 120 }}
          options={categories}
          getOptionLabel={(option) => option.name}
          value={categories.find((c) => c.id === formData.category) || null}
          onChange={(_, newValue) => {
            setFormData({
              ...formData,
              category: newValue?.id || null
            });
          }}
          renderInput={(params) => (
            <TextField {...params} label="Categoría" variant="filled" />
          )}
        />

        <Autocomplete
          name="subcategory"
          sx={{ m: "auto", width: 120 }}
          options={subcategories}
          getOptionLabel={(option) => option.name}
          value={subcategories.find((s) => s.id === formData.subcategory) || null}
          onChange={(_, newValue) => {
            setFormData({
              ...formData,
              subcategory: newValue?.id || null
            });
          }}
          renderInput={(params) => (
            <TextField {...params} label="Subcategoría" variant="filled" />
          )}
        />

        <TextField sx={{ m: "auto", width: 120 }} id="description" type="text" name='description' label="Descripción" variant="filled" value={formData.description} onChange={handleChange} />
        <TextField sx={{ m: "auto", width: 120 }} id="price" type="number" name='price' label="Precio" variant="filled" value={formData.price} onChange={handleChange} />
        <TextField sx={{ m: "auto", width: 120 }} id="sale" type="number" name='sale' label="Descuento" variant="filled" value={formData.sale} onChange={handleChange} />
        <TextField sx={{ m: "auto", width: 120 }} id="quantity" type="number" name='quantity' label="Cantidad" variant="filled" value={formData.quantity} onChange={handleChange} />

        <FormControl variant="filled" sx={{ m: "auto", width: 120 }}>
          <InputLabel id="color-label">Color</InputLabel>
          <Select labelId="color-label" id="color" value={formData.color || ''} label="color" onChange={handleChange} name="color">
            <MenuItem selected value="">
              <em>Seleccionar color</em>
            </MenuItem>
            <MenuItem sx={{ backgroundImage: " linear-gradient(45deg, #f09433 0%,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888 100%)" }} value="Multicolor">Multicolor</MenuItem>
            {colors?.map((c) => (
              <MenuItem sx={{ backgroundColor: c.name }} key={c.name} value={c.name}>{c.name}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControlLabel sx={{ m: "auto", width: 120 }} control={<Checkbox />} id="available" name="available" checked={formData.available} label="Disponible" onChange={handleChange} />
      </Sheet>

      <Button onClick={onClose} variant="outlined" sx={{ m: "auto", width: 150 }}>
        Cancelar
      </Button>

      <Button type="submit" sx={{ backgroundColor: "rgb(64, 127, 185)", color: "rgba(255, 255, 255, .8)", m: 1, width: 150 }} variant="contained" >
        Actualizar
      </Button>
    </Box>
  );
});

EditForm.displayName = "EditForm";