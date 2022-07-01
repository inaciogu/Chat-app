import { CloseSharp } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { useSnackbar, VariantType } from 'notistack';

export default function useToast() {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const enqueueToast = (message: string, variant: VariantType) => {
    enqueueSnackbar(message, {
      variant,
      action: (key) => (
        <IconButton onClick={() => closeSnackbar(key)}>
          <CloseSharp />
        </IconButton>
      ),
    });
  };

  return { enqueueToast };
}
