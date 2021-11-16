module.exports = function fruit(pool){

  async  function createFruitBasket(fruit,qty,price){
        await pool.query('insert into fruit_basket(fruit_name,quantity,price) values($1,$2,$3)', [fruit,qty,price]) 

    }
//fruit basket for a given fruit type, qty & fruit price
   async function getFruit(){
   const fruits =  await pool.query('select fruit_name,quantity,price from fruit_basket')
   return fruits.rows;
   }

   //all the fruit baskets for a given fruit type
   async function getFruitType(fruitType){
    const allFruits = await pool.query('select fruit_name,quantity,price from fruit_basket where fruit_name = $1', [fruitType])
        return allFruits.rows

   }

   async function updateFruit(fruit_name,qty){
  await pool.query('update fruit_basket set quantity = quantity +$2 where fruit_name = $1 ', [fruit_name,qty])
  
   }
//total price for a given fruit basket
   async function basketTotal(fruit){
       const fruitTotal = await pool.query('select sum(price*quantity) from fruit_basket where fruit_name = $1',[fruit])
    return fruitTotal.rows
   }

   //the sum of the total of the fruit baskets for a given fruit type
async function getBasketSum(fruits){
    const fruitsSum = await pool.query('select sum(price) from fruit_basket where fruit_name = $1',[fruits])
    return fruitsSum.rows

}

   return{
       getFruit,
       getFruitType,
       updateFruit,
       createFruitBasket,
       basketTotal,
       getBasketSum
   }
}