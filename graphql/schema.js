const {
GraphQLObjectType,
GraphQLSchema,
GraphQLString,
GraphQLList
} = require("graphql");

const Catalogo = require("../models/Catalogo");

const CatalogoType = new GraphQLObjectType({

name:"Catalogo",

fields:()=>({

id:{type:GraphQLString},
produto:{type:GraphQLString},
descricao:{type:GraphQLString},
preco:{type:GraphQLString}

})

});

const RootQuery = new GraphQLObjectType({

name:"RootQueryType",

fields:{

catalogo:{

type:new GraphQLList(CatalogoType),

resolve(){

return Catalogo.find();

}

}

}

});

module.exports = new GraphQLSchema({

query:RootQuery

});