import jwt from 'jsonwebtoken'

const generateToken = (id: string) => {
  if (process.env.SECRET_KEY !== undefined) {
    return jwt.sign({ id }, process.env.SECRET_KEY, {})
  }
}

export default generateToken
