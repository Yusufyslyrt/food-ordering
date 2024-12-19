import * as Yup from "yup";

export const adminSchema = Yup.object({
  username: Yup.string()
    .required("Kullanıcı adı gereklidir.")
    .min(3, "Kullanıcı adı en az 3 karakter olmalıdır."),
  password: Yup.string()
    .required("Şifre gereklidir.")
    .min(5, "Şifre en az 5 karakter olmalıdır.")
    /* .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Şifre en az bir büyük harf, bir küçük harf, bir rakam ve bir özel karakter içermelidir."
    ) */,
});
