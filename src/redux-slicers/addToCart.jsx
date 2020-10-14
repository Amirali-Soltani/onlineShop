import { createSlice } from "@reduxjs/toolkit";
import { AddToCartBegan } from "./createActionAddtToCart";

const slice = createSlice({
  name: "addToCart",
  initialState: {
    products: [],
  },

  reducers: {
    addNewProduct: (cart, action) => {
      console.log(action.payload);
        cart.products.push(action.payload);

    },
addExistProduct:(cart, action) => {
    let index = action.payload.index
    let number =action.payload.number
   cart.products[index].number+=number
  },

increamentOrDeacreament:(cart, action) => {
  let index = action.payload.index
  let number =action.payload.number
  console.log(index,number,action);
 cart.products[index].number=number
},

    deleteSpeceficProduct: (cart, action) => {
        let index = action.payload.index;
        console.log(index);
      cart.products.splice(index,1)
    },

    deletAllProduct: (cart, action) => {
        cart.products=[]

    },
    increament: (cart, action) => {
      console.log(action);
        let index = cart.products.indexOf(...action.payload);
        console.log(index);

        // let index = action.payload.index;
      cart.products[index].number+=1
    },

    decreament: (cart, action) => {
        let index = cart.products.indexOf(...action.payload);
        cart.products[index].number-=1
    },
    
  },
});
export const { addNewProduct,addExistProduct,deletAllProduct,deleteSpeceficProduct,increament,decreament,increamentOrDeacreament} = slice.actions;
export default slice.reducer;

export const tryToAddToCart = (product,color,size,number,max) => (dispatch, getState) => {

  return dispatch(
    AddToCartBegan({
      onSuccess: addNewProduct.type,
      onExist: addExistProduct.type,
      newProduct:{product,color,size,number,max},
    })
  );
};