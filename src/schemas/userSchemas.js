import joi from "joi";

const registerSchema = joi.object({
  name: joi.string().alphanum().min(3).max(30).required(),

  password: joi.string().required().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),

  email: joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net", "br"] },
  }),
  repeat_password: joi.ref("password"),
});
const loginSchema = joi.object({
  email: joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net", "br"] },
  }),
  password: joi.string().required().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
});

export { registerSchema, loginSchema };
