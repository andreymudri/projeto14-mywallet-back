import joi from "joi";

const registerSchema = joi.object({
  name: joi.string().alphanum().min(3).max(30).required(),

  password: joi.string().required().min(3).max(30).pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),

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

const operationSchema = joi.object({
  tipo: joi.string().valid("outbound", "inbound"),
  email: joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net", "br"] }
  }),
  date: joi.string(),
  value: joi.number(),
  description: joi.string(),
});
const createOpSchema = joi.object({
  tipo: joi.string().valid("outbound", "inbound").required(),
  email: joi.string().email().required(),
  date: joi.string().required(),
  value: joi.number().required(),
  description: joi.string().required(),
  

})
export { registerSchema, loginSchema, operationSchema , createOpSchema};
