import db from "../config/database.js"

export interface Employee {
  id: number
  fullName: string
  cpf: string
  email: string
  companyId: number
}

export async function findById(id: number) {
  const result = await db.query<Employee, [number]>(
    "SELECT * FROM employees WHERE id=$1",
    [id],
  )

  return result.rows[0]
}
