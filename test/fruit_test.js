let assert = require("assert");
var basket = require("../fruit_basket");
const pg = require("pg");
const { ok } = require("assert");
const Pool = pg.Pool;

const connectionString = process.env.DATABASE_URL || 'postgresql://codex:codex123@localhost:5432/fruitbask_test';

const pool = new Pool({
    connectionString
});

describe('Fruit basket', function () {

    beforeEach(async function () {
        console.log("*****");
        await pool.query("delete from fruit_basket");
    })


    it('Should get all fruits in basket', async function () {
        let fruity = basket(pool);
        await fruity.createFruitBasket('Orange', 1, 3)
        assert.deepEqual([
            {
                fruit_name: "Orange",
                quantity: 1,
                price: "3.00",
            }
        ], await fruity.getFruit())
    })



    it('Should get all the fruit baskets for a given fruit type', async function () {
        let fruity = basket(pool);
        await fruity.createFruitBasket('Orange', 1, 2);

        assert.deepEqual([
            {
              fruit_name: 'Orange',
              price: '2.00',
              quantity: 1
            }
          ]
          , await fruity.getFruitType('Orange'))
    })



    it('Should update fruits in basket', async function () {
        let fruity = basket(pool);
        await fruity.createFruitBasket('lemon', 5, 5);
        await fruity.updateFruit('lemon', 2)
        assert.deepEqual([ {
            fruit_name: 'lemon',
            price: '5.00',
            quantity: 7
          }
        ]
           , await fruity.getFruit() )
    })


    it('Should get total price for a given fruit basket', async function () {
        let fruity = basket(pool);
        await fruity.createFruitBasket('lemon', 3, 6);
        assert.deepEqual([{sum: '18.00'}], await fruity.basketTotal('lemon'))
    })

    it('Should get sum of the total of the fruit baskets for a given fruit type', async function () {
        let fruity = basket(pool);
        await fruity.createFruitBasket('Banana', 1, 3);
        await fruity.createFruitBasket('Banana', 2, 2);
        assert.deepEqual([{sum: '5.00'}], await fruity.getBasketSum('Banana'))
    })   
})