import * as Yup from "yup";

export const reservationSchema = Yup.object({
  fullName: Yup.string()
    .required("Ad Soyad gereklidir.")
    .min(3, "Tam ad en az 3 karakter olmalıdır."),
  phoneNumber: Yup.string()
    .required("Boş bırakılamaz.")
    .min(10, "Telefon numarası en az 10 karakter olmalıdır."),
  email: Yup.string().required("Email gereklidir.").email("Email geçersiz."),
  persons: Yup.string().required("Kişi sayısı gereklidir."),
  date: Yup.string().required("tarih ve saat gereklidir."),
});
