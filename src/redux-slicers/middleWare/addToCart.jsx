import * as actions from "./../createActionAddtToCart";

const cart = ({ getState,dispatch }) => next => action => {
  if (action.type !== actions.AddToCartBegan.type) return next(action);
  next(action);

  const { newProduct, onSuccess, onExist } = action.payload;
let exisitingProduct = [...getState().addToCart.products];

if (exisitingProduct.length>0) {
  console.log(newProduct.size,newProduct.color,newProduct.product._id,newProduct.max);
  console.log(exisitingProduct);

  console.log(exisitingProduct[0].size,exisitingProduct[0].color,exisitingProduct[0].product._id);

   let repetetive = exisitingProduct.filter(p=>p.size===newProduct.size&&p.color[0]===newProduct.color[0]&&p.product._id===newProduct.product._id)
   console.log(repetetive);

    if (repetetive.length===0){
     dispatch({ type: onSuccess, payload:newProduct  });
    }
    else  {
        let index = exisitingProduct.indexOf(...repetetive);
        let number=newProduct.number
        dispatch({ type: onExist, payload:{index,number}});

}
}
else{
    
        dispatch({ type: onSuccess, payload:newProduct});
    }
  
};

export default cart;