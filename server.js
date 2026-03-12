require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { graphqlHTTP } = require("express-graphql");

const schema = require("./graphql/schema");
const usuarios = require("./routes/usuarios");
const catalogo = require("./routes/catalogo");
const reservas = require("./routes/reservas");

const app = express();

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB conectado com sucesso!"))
  .catch(err => console.error("Erro ao conectar no MongoDB:", err));

app.use(cors());
app.use(express.json());

app.use("/api/usuarios", usuarios);
app.use("/api/catalogo", catalogo);
app.use("/api/reservas", reservas);

app.use("/graphql", graphqlHTTP({
  schema,
  graphiql: true
}));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
  console.log(`Acesse http://localhost:${PORT}/graphql para testar o GraphQL`);
});