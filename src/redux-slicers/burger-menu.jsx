import { createSlice } from "@reduxjs/toolkit";
const slice = createSlice({
    name: "menu",
    initialState: {
      open: false,
      open2:false
    },
  
    reducers: {
      openMenu: (menu,action) => {
          menu.open=true
      },
      closeMenu: (menu,action) => {
        menu.open=false
    },
    openSearch: (menu,action) => {
      menu.open2=true
  },
  closeSearch: (menu,action) => {
    menu.open2=false
},

}
})
export const { closeMenu,openMenu,openSearch,closeSearch} = slice.actions;
export default slice.reducer;