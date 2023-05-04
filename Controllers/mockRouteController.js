import {faker} from "@faker-js/faker"

faker.locale="es"

const createMockProducts = () => {
    let numberOfProducts = 100

    let fakeProducts = []

    for (let i = 0; i<numberOfProducts; i++){
    const product = createNewProduct();
    fakeProducts.push(product)
    }
    return fakeProducts
}

export const createNewProduct = () =>{
    return {
        title:faker.name.firstName(),
        description: faker.lorem.lines(),
        code: faker.random.alphaNumeric(),
        price:faker.random.numeric(),
        stock:faker.random.numeric(1),
        status: faker.datatype.boolean(),
    }
}

export default createMockProducts

//Saque "category" y "thumbnails" porqué no eran compatibles con Faker