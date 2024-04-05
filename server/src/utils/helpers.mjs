import bcrypt from "bcrypt";

const saltRounds = 10;

export function hashPassword(password){
  const salt = bcrypt.genSaltSync(saltRounds);
  return bcrypt.hashSync(password, salt);
}

export function comparePassword(plain, password ){
  return bcrypt.compareSync(plain, password);
}

