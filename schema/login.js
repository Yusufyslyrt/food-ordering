import * as Yup from "yup";

export const loginSchema = Yup.object({
  email: Yup.string().required("E-posta gerekli.").email("E-posta geçersiz."),
  password: Yup.string()
    .required("Şifre gereklidir.")
    .min(8, "Şifre en az 8 karakter olmalıdır.")
    .max(18,"en fazla 18 karakter girilebilir.")
    /* .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Şifre en az bir büyük harf, bir küçük harf, bir rakam ve bir özel karakter içermelidir."
    ) */,
});
