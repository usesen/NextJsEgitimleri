import { toast } from 'react-toastify';

export const showErrors = (errors: any) => {
  // Eğer errors nesnesi varsa ve içinde hatalar mevcutsa
  if (errors && errors.errors) {
    Object.keys(errors.errors).forEach((key) => {
      const fieldErrors = errors.errors[key]; // Belirli bir alanın hataları
      fieldErrors.forEach((errMessage: string) => {
        toast.error(`${key}: ${errMessage}`);
      });
    });
  } else {
    // Eğer errors beklenmeyen bir formatta ise
    toast.error('Beklenmedik bir hata oluştu.');
  }
};
