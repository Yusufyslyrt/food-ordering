import * as Yup from "yup";

export const profileSchema = Yup.object({
  fullName: Yup.string()
    .required("Ad Soyad gerekli.")
    .min(3, "Ad Soyad en az 3 karakter olmalıdır."),
  phoneNumber: Yup.string()
    .required("Telefon Numarası gereklidir.")
    .min(10, "Telefon numarası en az 10 karakter olmalıdır."),
  email: Yup.string().required("Email gereklidir.").email("E-posta geçersiz."),
  address: Yup.string().required("Adres gerekli."),
  job: Yup.string().required("Meslek gerekli."),
  bio: Yup.string().required("Hakkımda gerekli."),
});
