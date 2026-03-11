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
.then(()=>console.log("MongoDB conectado"))
.catch(err=>console.log(err));

app.use(cors());
app.use(express.json());

app.use("/api/usuarios",usuarios);
app.use("/api/catalogo",catalogo);
app.use("/api/reservas",reservas);

app.use("/graphql",graphqlHTTP({
schema,
graphiql:true
}));

app.listen(process.env.PORT,()=>{
console.log("Servidor rodando na porta " + process.env.PORT);
console.log("Acesse http://localhost:" + process.env.PORT + "/graphql para usar o GraphQL");
});