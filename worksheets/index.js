const { prisma } = require('./generated/prisma-client')
const { GraphQLServer } = require('graphql-yoga')

const resolvers = {
  Query: {
    

    products(root, args, context) {
      return context.prisma.products({
        prod_id: args.prod_id
      })
    },

    inventory(root, args, context) {
      return context.prisma.inventory
    }
    
  },

  
//Had some trouble getting mutations/querys to work with relationships, so reverted to basic ones
  

  Mutation: {
    
    createProduct(root, args, context) {
      return context.prisma.createProducts(
        { title: args.title,
        prod_id: args.prod_id,
        category: args.category,
        actor: args.actor,
        price: args.price
       }
      )
    },
  
    category(root, args, context) {
      return context.prisma.category({
        desc: args.desc
      })
    }
    }
  }





const server = new GraphQLServer({
    typeDefs: './schema.graphql',
    resolvers,
    context: {
      prisma
    },
  })
  server.start(() => console.log('Server is running on http://localhost:4001'))
  