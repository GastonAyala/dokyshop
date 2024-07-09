import React from 'react';
import { Box, Button, Sheet, Typography, Modal, ModalClose,  } from '@mui/joy';

export const DeleteProduct = ({ open, onClose, productId, onDeleteSuccess }) => {
    const handleDelete = async () => {
        try {
            const { ok, msg } = await fetch(`http://localhost:3030/api/products/delete/${productId}`, {
                method: 'DELETE',
            }).then(res => res.json());

            ok && onDeleteSuccess();

            if (!ok) throw new Error(msg);
            onClose();
        } catch (error) {
            console.error(error.message);
        }
    };

    return (
        <Modal aria-labelledby="modal-title" aria-describedby="modal-desc" open={open} onClose={onClose} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} >
            <Sheet variant="outlined" sx={{ maxWidth: 500, borderRadius: 'md', p: 3, boxShadow: 'lg', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <ModalClose variant="plain" sx={{ m: "auto"  }} onClick={onClose} />
                <Typography component="h2" id="modal-title" level="h4" textColor="inherit" fontWeight="lg" mb={1}>
                    ¿Estás seguro de eliminar este producto?
                </Typography>
                <Typography sx={{ textAlign: 'center', width: '100%' }} id="modal-desc" textColor="text.tertiary">
                    Esta acción no se puede deshacer.
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1, mt: 2 }}>
                    <Button variant="outlined" color="neutral" onClick={onClose}>
                        Cancelar
                    </Button>
                    <Button variant="solid" color="danger" onClick={handleDelete}>
                        Eliminar
                    </Button>
                </Box>
            </Sheet>
        </Modal>
    );
};
