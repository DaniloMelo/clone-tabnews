import database from "infra/database.js"

beforeAll(cleanDatabase)

async function cleanDatabase() {
  await database.query("drop schema public cascade; create schema public;")
}

test("DELETE, PUT, PATCH to api/v1/migrations shold return error", async () => {
  const reponseDeleteMethod = await fetch("http://localhost:3000/api/v1/migrations", {
    method: "DELETE"
  })
  expect(reponseDeleteMethod.status).toBe(405)

  const responsePutMethod = await fetch("http://localhost:3000/api/v1/migrations", {
    method: "PUT"
  })
  expect(responsePutMethod.status).toBe(405)

  const responsePatchMethod = await fetch("http://localhost:3000/api/v1/migrations", {
    method: "PATCH"
  })
  expect(responsePatchMethod.status).toBe(405)
})
