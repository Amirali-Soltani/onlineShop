import React, { Component } from "react";
import HeaderFooter from "../header__footer";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import "./../../css/last_category.css";
import RightFilters from "./right__filters";
import FirstBox from "./top__first__box";
import SecondBox from "./top__second__box";
import WholeProduct from "./products";
import Pagination from "./pagination__box";
import { connect } from "react-redux";
import { getSpecificProduct } from "../../redux-slicers/products";
import { getcolors, getAttributes, checkForStock } from "../common/functionsOfProducts";
import { orderBy } from "lodash";
import { Link } from "react-router-dom";
import { closeSearch, openSearch } from "../../redux-slicers/burger-menu";

class Last_category extends Component {
  state = {
    products: [],
    allAttributeItemS: [],
    allCategories: [],
    categoryId: "",
    data: { internalSearchBox: "" },
    filtered: [],
    notFound: {
      filteredByStock: { status: false },
      filteredByDiscount: { status: false },
    },
    RangePriceClassName: [
      { name: "first", status: false, firtRange: 1, secondRange: 99 },
      { name: "second", status: false, firtRange: 100, secondRange: 149 },
      { name: "third", status: false, firtRange: 150, secondRange: 199 },
      { name: "forth", status: false, firtRange: 200, secondRange: 249 },
      { name: "fifth", status: false, firtRange: 250, secondRange: 299 },
      { name: "sixth", status: false, firtRange: 300, secondRange: 2000 },
    ],
    filterdByPrice: [],
    stock: false,
    discount: false,
    filteredByStock: [],
    filteredByDiscount: [],
    accordian: {
      color: true,
    },
    allAttributesSelected: {},
    listOfColors: {},
    filteredByColor: [],
    colors: [],
    sizes: [],
    filteredByDiffferentsAttributes: [],
    specificSelectedItems: [],
    finalResult: [],
    indexHolder: [],
    Sort: { path: "numberInStock.visited", order: "desc" },
    pagination: { pageSize: 16, currentPage: 1 },
    optionalFilters: {},
    initialAccordion: {},
    initialColors: {},
    PresentURL: { id: 0, stringFilter: "", arrayFilter: [] },
    originalSearch: "",
  };
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.match.params.id !== this.props.match.params.id) {
      let categoryId = this.props.match.params.id;
      categoryId = parseInt(categoryId);
      this.setState({ categoryId });
      let products = this.props.productsOfSpecificCategory(categoryId);
      this.setState({ products });
      let PresentURL = { ...this.state.PresentURL };
      PresentURL.id = categoryId;
      this.setState({ PresentURL });
    }
    if (prevProps.match.params.filters !== this.props.match.params.filters) {
      let PresentURL = { ...this.state.PresentURL };
      PresentURL.stringFilter = this.props.match.params.filters;
      this.setState({ PresentURL });
    }
    if (
      this.props.match.params.filters === undefined &&
      prevProps.match.params.id !== this.props.match.params.id
    ) {
      let { PresentURL } = this.state;
      PresentURL.stringFilter = "";
      this.setState({ PresentURL });
      this.deleteAllFilters();
      //   let categoryId = this.props.match.params.id;
      //   categoryId = parseInt(categoryId);
      //   this.setState({ categoryId });
    }
  }
  componentDidMount() {
    let categoryId = this.props.match.params.id;
    // if(this.props.filter===undefined)this.deleteAllFilters();
    categoryId = parseInt(categoryId);
    let products = this.props.productsOfSpecificCategory(categoryId);
    let allAttributeItemS = this.props.attribute;
    let allCategories = this.props.allCategories;
    let PresentURL = { ...this.state.PresentURL };
    PresentURL.id = categoryId;
    if (this.props.match.params.filters !== undefined) {
      PresentURL.stringFilter = this.props.match.params.filters;
      this.importInitialURL();
    }
    this.setState({
      categoryId,
      products,
      allAttributeItemS,
      allCategories,
      PresentURL,
    });
  }
  handelColorClick = (completeColor) => {
    let { PresentURL } = this.state;
    let stringFilter = PresentURL.stringFilter;
    let color = completeColor.class;
    let length = "color".length + 1;
    let index = stringFilter.indexOf("color");
    let index2 = stringFilter.indexOf(color);
    let common = stringFilter.toLowerCase().includes(color.toLowerCase());
    let length2 = color.length;
    this.handleColor(completeColor.class, completeColor);
    this.handleAllClick("color", index, length, color, index2, length2, common);
  };
  handelClickSearch = (searchWord) => {
    let { PresentURL, categoryId } = this.state;
    let stringFilter = PresentURL.stringFilter;
    let id = PresentURL.id;
    let newStringFilter = "";
    let length = "search".length + 1;
    let index = stringFilter.indexOf("search");
    if (index !== -1) {
      let sliceStringFilter = stringFilter.slice(index);
      let endOfIndexOldSearchWord = sliceStringFilter.indexOf("&");
      if (endOfIndexOldSearchWord !== -1) {
        newStringFilter =
          stringFilter.slice(0, index + length) +
          `${searchWord}` +
          stringFilter.slice(endOfIndexOldSearchWord + index);
      } else {
        newStringFilter =
          stringFilter.slice(0, index + length) + `${searchWord}`;
      }
    } else {
      newStringFilter = stringFilter + `&search=${searchWord}`;
    }
    this.handelSearch(searchWord);
    this.props.history.push(`/last__category/${categoryId}/${newStringFilter}`);
  };
  handelClickOrder = (order) => {
    let { PresentURL, categoryId } = this.state;
    let stringFilter = PresentURL.stringFilter;
    let id = PresentURL.id;
    let newStringFilter = "";
    let length = "order".length + 1;
    let index = stringFilter.indexOf("order");
    if (index !== -1) {
      let sliceStringFilter = stringFilter.slice(index);
      let endOfIndexOldSearchWord = sliceStringFilter.indexOf("&");
      if (endOfIndexOldSearchWord !== -1) {
        newStringFilter =
          stringFilter.slice(0, index + length) +
          `${order.path}_${order.sort}` +
          stringFilter.slice(endOfIndexOldSearchWord + index);
      } else {
        newStringFilter =
          stringFilter.slice(0, index + length) + `${order.path}_${order.sort}`;
      }
    } else {
      newStringFilter = stringFilter + `&order=${order.path}_${order.sort}`;
    }
    this.props.history.push(`/last__category/${categoryId}/${newStringFilter}`);
    this.handleSort(order);
  };
  handelClickDiscount = () => {
    let { PresentURL } = this.state;
    let stringFilter = PresentURL.stringFilter;
    let length = "discount".length + 1;
    let index = stringFilter.indexOf("discount");
    let index2 = stringFilter.indexOf("true");
    let common = stringFilter.toLowerCase().includes("true".toLowerCase());
    let length2 = "true".length;
    this.handleDiscount();
    this.handleAllClick(
      "discount",
      index,
      length,
      "true",
      index2,
      length2,
      common
    );
  };
  handelClickInStock = () => {
    let { PresentURL } = this.state;
    let stringFilter = PresentURL.stringFilter;
    let length = "inStock".length + 1;
    let index = stringFilter.indexOf("inStock");
    let index2 = stringFilter.indexOf("positive");
    let common = stringFilter.toLowerCase().includes("positive".toLowerCase());
    let length2 = "positive".length;
    this.handleStock();
    this.handleAllClick(
      "inStock",
      index,
      length,
      "positive",
      index2,
      length2,
      common
    );
  };
  handelPriceClick = (indexOfPrice) => {
    let { PresentURL } = this.state;
    let stringFilter = PresentURL.stringFilter;
    let length = "range".length + 1;
    let index = stringFilter.indexOf("range");
    let index2 = stringFilter.indexOf(indexOfPrice);
    let common = stringFilter.toLowerCase().includes(indexOfPrice);
    let length2 = indexOfPrice.toString().length;
    this.handleFilterOfPrice(indexOfPrice);
    this.handleAllClick(
      "range",
      index,
      length,
      indexOfPrice,
      index2,
      length2,
      common
    );
  };
  handelAllAttributesClick = (
    nameOfAttribute,
    indexOfAttribut,
    id,
    titleItem,
    item
  ) => {
    let { PresentURL } = this.state;
    this.handleAllAttributes(
      nameOfAttribute,
      indexOfAttribut,
      id,
      titleItem,
      item
    );
    titleItem = titleItem.trim();
    let stringFilter = PresentURL.stringFilter;
    let length = "optionalFilter".length + 1;
    let index = stringFilter.indexOf("optionalFilter");
    let index2 = stringFilter.indexOf(titleItem);
    let common = stringFilter.toLowerCase().includes(titleItem);
    let length2 = titleItem.length;
    this.handleAllClick(
      "optionalFilter",
      index,
      length,
      titleItem,
      index2,
      length2,
      common
    );
  };

  handleAllClick = (
    filterTitle,
    indexOfFilterTitle,
    lengthOfFilterTitle,
    filter,
    indexOffilter,
    lengthOfFilter,
    common
  ) => {
    // console.log("filter",filter,"filterTitle",filterTitle,"indexOfFilterTitle",indexOfFilterTitle,"lengthOfFilterTitle",lengthOfFilterTitle,"indexOffilter",indexOffilter,"lengthOfFilter",lengthOfFilter,"common",common);
    let { stringFilter, id } = this.state.PresentURL;
    let newStringFilter = "";
    let { categoryId } = this.state;
    if (indexOfFilterTitle !== -1) {
      if (common === false) {
        newStringFilter =
          stringFilter.slice(0, indexOfFilterTitle + lengthOfFilterTitle) +
          `${filter}_` +
          stringFilter.slice(indexOfFilterTitle + lengthOfFilterTitle);
        // console.log(11111111111,newStringFilter);
      }
      if (common === true) {
        let length = 0;
        // console.log(stringFilter.charAt(indexOffilter+lengthOfFilter));
        if (stringFilter.charAt(indexOffilter + lengthOfFilter) === "_")
          length = indexOffilter + lengthOfFilter + 1;
        else length = indexOffilter + lengthOfFilter;

        newStringFilter =
          stringFilter.slice(0, indexOffilter) + stringFilter.slice(length);
        // console.log(22222222222,newStringFilter,indexOffilter,length,indexOffilter,lengthOfFilter,indexOffilter+lengthOfFilter);
      }
    } else {
      newStringFilter = stringFilter + `&${filterTitle}=${filter}`;
      // console.log(33333333,newStringFilter);
    }

    this.props.history.push(`/last__category/${categoryId}/${newStringFilter}`);
  };

  deleteAllFilters = () => {
    let data = { ...this.state.data };
    data.internalSearchBox = "";
    this.handleExternalSearch("");
    let RangePriceClassName = [...this.state.RangePriceClassName];
    RangePriceClassName.map((price) => (price.status = false));
    let filterdByPrice = [...this.state.filterdByPrice];
    filterdByPrice = [];
    let stock = this.state.stock;
    let filteredByStock = [...this.state.filteredByStock];
    filteredByStock = [];
    stock = false;
    let discount = this.state.discunt;
    let filteredByDiscount = [...this.state.filteredByDiscount];
    filteredByDiscount = [];
    discount = false;
    let colors = [...this.state.colors];
    let listOfColors = { ...this.state.listOfColors };
    let filteredByColor = [...this.state.filteredByColor];
    colors = [];
    listOfColors = {};
    filteredByColor = [];
    let allAttributesSelected = { ...this.state.allAttributesSelected };
    let specificSelectedItems = [...this.state.specificSelectedItems];
    let filteredByDiffferentsAttributes = [
      ...this.state.filteredByDiffferentsAttributes,
    ];
    let indexHolder = { ...this.state.indexHolder };
    allAttributesSelected = {};
    specificSelectedItems = [];
    filteredByDiffferentsAttributes = [];
    indexHolder = [];
    let Sort = { ...this.state.order };
    Sort = { path: "numberInStock.visited", order: "desc" };
    this.setState({
      data,
      RangePriceClassName,
      filterdByPrice,
      stock,
      filteredByStock,
      discount,
      filteredByDiscount,
      colors,
      listOfColors,
      filteredByColor,
      allAttributesSelected,
      specificSelectedItems,
      filteredByDiffferentsAttributes,
      indexHolder,
      Sort,
    });
  };

  importInitialURL = () => {
    let initialFilters = this.props.match.params.filters;
    let categoryId = this.props.match.params.id;
    let PresentURL = { ...this.state.PresentURL };
    let filters = "";
    filters = initialFilters;
    PresentURL.id = categoryId;
    PresentURL.stringFilter = initialFilters;
    this.setState({ PresentURL });
    filters = filters.split("&");
    filters.map((filter) => {
      if (filter.slice(0, 5) === "order") {
        let order = filter.slice(6, filter.length);
        order = order.split("_");
        let Sort = { ...this.state.Sort };
        Sort.path = order[0];
        Sort.order = order[1];
        this.setState({ Sort });
      }
      if (filter.slice(0, 5) === "range") {
        let price = filter.slice(6, filter.length);
        price = price.split("_");
        price.map((p) => {
          if (p !== "") {
            setTimeout(() => {
              this.handleFilterOfPrice(p);
            }, 10);
          }
        });
      }
      if (filter.slice(0, 7) === "inStock") {
        let boolean = filter.slice(8, filter.length);
        if (boolean === "positive") {
          setTimeout(() => {
            this.handleStock();
          }, 100);
        }
      }
      if (filter.slice(0, 8) === "discount") {
        let boolean = filter.slice(9, filter.length);
        if (boolean === "true") {
          setTimeout(() => {
            this.handleDiscount();
          }, 100);
        }
      }
      if (filter.slice(0, 5) === "color") {
        let colors = filter.slice(6, filter.length);
        colors = colors.split("_");
        let initialColors = { ...this.state.initialColors };
        colors.map((filter, index) => {
          initialColors[index + 1] = filter;
        });
        // this.setState({ initialColors });
        setTimeout(() => {
          this.importURlColors(initialColors);
        }, 100);
      }
      if (filter.slice(0, 14) === "optionalFilter") {
        let filters = filter.slice(15, filter.length);
        filters = filters.split("_");
        let optionalFilters = { ...this.state.optionalFilters };
        filters.map((filter, index) => {
          optionalFilters[index + 1] = filter;
        });
        // this.setState({ optionalFilters });
        setTimeout(() => {
          this.importURlFilters(optionalFilters);
        }, 100);
      }
      if (filter.slice(0, 6) === "search") {
        let search = filter.slice(7, filter.length);
        this.setState({ originalSearch: search });

        setTimeout(() => {
          this.handleExternalSearch(search);
        }, 200);
      }
    });
  };
  importURlColors = (initialColors) => {
    let allColors = this.getRangeOfColor();
    for (let key in initialColors) {
      allColors.map((color) => {
        if (color.class === initialColors[key])
          this.handleColor(color.class, color);
      });
    }
  };

  importURlFilters = (optionalFilters) => {
    let others = this.getAllAttributes();
    let filters = [];
    for (let key in optionalFilters) {
      others.map((arrays, index) =>
        arrays[0].map((array) => {
          if (array.title.trim() === optionalFilters[key].trim()) {
            filters.push([
              arrays[1].name,
              index,
              arrays[1].id,
              array.title,
              array,
            ]);
          }
        })
      );
    }
    let initialAccordion = { ...this.state.initialAccordion };
    filters.map((filter) => {
      this.handleAllAttributes(
        filter[0],
        filter[1],
        filter[2],
        filter[3],
        filter[4]
      );
      this.handleAccordian(filter[0]);
      initialAccordion[filter[0]] = true;
    });

    this.setState({ initialAccordion });
  };

  getAllAttributes = () => {
    let {
      filtered,
      products,
      allAttributeItemS,
      allAttributesSelected,
    } = this.state;
    let searchWords = this.state.data.internalSearchBox;
    let numberOfIdOfAttributes = [
      { name: "سایز", id: 2 },
      { name: "جنس ", id: 3 },
      { name: "برند", id: 4 },
      { name: "گروه سنی", id: 5 },
      { name: "مناسب برای فصل", id: 6 },
      { name: "تن خور ", id: 7 },
      { name: "نوع آستین", id: 8 },
    ];
    let final = [];
    if (searchWords.length === 0) {
      final = products;
    } else if (searchWords.length > 0) {
      final = filtered;
    }
    let allAttributes = [];
    numberOfIdOfAttributes.map((att) => {
      let allAttributesInfilter = [];
      let primitive = [];
      if (allAttributeItemS.length > 0) {
        final.map((p) =>
          primitive.push(...getAttributes(p, allAttributeItemS, att.id))
        );
      }

      let add = [];
      for (let key in allAttributesSelected)
        if (allAttributesSelected[key] === true) add.push(key);
      let allOfAttributes = [];
      products.map((p) =>
        allOfAttributes.push(...getAttributes(p, allAttributeItemS, att.id))
      );
      let finalAdd = [];
      if (add.length > 0) {
        allOfAttributes.map((c) => {
          for (let index = 0; index < add.length; index++) {
            if (c.title === add[index]) finalAdd.push(c);
          }
        });
      }

      primitive.push(...finalAdd);
      primitive = [...new Set(primitive)];
      allAttributesInfilter.push(primitive);
      allAttributesInfilter.push(att);

      if (allAttributesInfilter.length > 0)
        allAttributes.push(allAttributesInfilter);
    });

    allAttributes = [...new Set(allAttributes)];
    return allAttributes;
  };

  getRangeOfColor = () => {
    let { filtered, products, allAttributeItemS, listOfColors } = this.state;
    let searchWords = this.state.data.internalSearchBox;
    let final = [];
    if (searchWords.length === 0) {
      final = products;
    } else if (searchWords.length > 0) {
      final = filtered;
    }
    let allColors = [];
    final.map((p) => allColors.push(...getcolors(p, allAttributeItemS)));
    let allofColors = [];
    products.map((p) => allofColors.push(...getcolors(p, allAttributeItemS)));
    let finalAdd = [];
    let add = [];
    for (let key in listOfColors) if (listOfColors[key] === true) add.push(key);

    if (add.length > 0) {
      allofColors.map((c) => {
        for (let index = 0; index < add.length; index++) {
          if (c.class === add[index]) finalAdd.push(c);
        }
      });
    }
    allColors.push(...finalAdd);
    allColors = [...new Set(allColors)];
    return allColors;
  };
  getParents = () => {
    let { allCategories } = this.props;
    let categoryId = this.props.match.params.id;
    categoryId = parseInt(categoryId);
    let allParentsId = [];
    while (categoryId !== undefined) {
      let nextParentId = allCategories.filter((c) => c.id === categoryId)[0];
      if (nextParentId.parentId !== undefined) {
        allParentsId.push(nextParentId);
      }
      categoryId = nextParentId.parentId;
    }
    allParentsId.reverse();
    return allParentsId;
  };
  handleExternalSearch = (searchWord) => {
    const data = { ...this.state.data };
    data.internalSearchBox = searchWord;
    this.setState({ data });
    setTimeout(() => {
      this.handelSearch(searchWord);
    }, 100);
  };
  //   setTimeout(() => {
  //     this.handelClickSearch(searchWord);
  //   }, 100);
  // };
  handleValue = ({ currentTarget: input }) => {
    const data = { ...this.state.data };
    data[input.name] = input.value;
    this.setState({ data });
    // this.handelSearch(input.value)
    this.handelClickSearch(input.value);
  };
  handelSearch = (searchWord) => {
    let { products } = this.state;
    let filtered = products.filter(
      (m) =>
        m.title.toLowerCase().includes(searchWord.toLowerCase()) ||
        m.title_En.toLowerCase().includes(searchWord.toLowerCase())
    );
    this.resetPaginate();
    this.setState({ filtered });
  };
  handleFilterOfPrice = (number) => {
    let { RangePriceClassName } = this.state;
    if (number) {
      if (RangePriceClassName[number].status === false) {
        RangePriceClassName[number].status = true;
      } else RangePriceClassName[number].status = false;
      // this.setState({ RangePriceClassName });
    }

    let { filterdByPrice } = this.state;
    let products= this.props.allProducts
    let prices = [];

    products.map((p) =>
      p.off
        ? prices.push((parseInt(p.price) * (100 - parseInt(p.off))) / 100)
        : prices.push(p.price)
    );

    let newRangePrice = prices.filter(
      (p) =>
        p >= RangePriceClassName[number].firtRange &&
        p <= RangePriceClassName[number].secondRange
    );
    let unique = [...new Set(newRangePrice)];
    let newProducts = [];
    products.map((p) => {
      for (let index = 0; index < prices.length; index++) {
        if (
          p.price === unique[index] ||
          (parseInt(p.price) * (100 - parseInt(p.off))) / 100 ===
            newRangePrice[index]
        ) {
          newProducts.push(p);
        }
      }
    });
    if (RangePriceClassName[number].status === true) {
      filterdByPrice.push(...newProducts);
    } else{
      filterdByPrice = filterdByPrice.filter(
        (item) => !newProducts.includes(item)
      );
    }
    this.resetPaginate();
    this.setState({ filterdByPrice,RangePriceClassName });
  };

  handleStock = () => {
    let { stock } = this.state;
    if (stock === false) stock = true;
    else stock = false;
    this.setState({ stock });

    let { products, filteredByStock, notFound } = this.state;
    let final = [];
    final = products;
    // let newProduct = final.filter((p) => p.price !== 0);
    let newProduct = final.filter((p) => checkForStock(p));

    if (stock === true && newProduct.length > 0) {
      filteredByStock = newProduct;
      notFound.filteredByStock.status = false;
    } else if (stock === true && newProduct.length === 0) {
      notFound.filteredByStock.status = true;
    } else {
      notFound.filteredByStock.status = false;
      filteredByStock = [];
    }
    this.resetPaginate();

    this.setState({ filteredByStock, notFound });
  };
  handleDiscount = () => {
    let { discount } = this.state;
    if (discount === false) {
      discount = true;
    } else discount = false;
    this.setState({ discount });

    let { products, filteredByDiscount, notFound } = this.state;
    let final = [];
    final = products;
    let newProduct = final.filter((p) => p.off !== null);
    if (discount === true && newProduct.length > 0) {
      filteredByDiscount = newProduct;
      notFound.filteredByDiscount.status = false;
    } else if (discount === true && newProduct.length === 0) {
      notFound.filteredByDiscount.status = true;
    } else {
      filteredByDiscount = [];
      notFound.filteredByDiscount.status = false;
    }
    this.resetPaginate();

    this.setState({ filteredByDiscount, notFound });
  };

  handleAccordian = (name) => {
    let { accordian } = this.state;
    if (accordian[name] === undefined) {
      accordian[name] = true;
    } else if (accordian[name] === false) {
      accordian[name] = true;
    } else accordian[name] = false;
    this.setState({ accordian });
  };

  handleColor = (colorName, c) => {
    let { listOfColors, colors } = this.state;
    if (
      listOfColors[colorName] === undefined ||
      listOfColors[colorName] === false
    ) {
      listOfColors[colorName] = true;
      colors.push(c);
    } else {
      listOfColors[colorName] = false;
      colors = colors.filter((item) => ![c].includes(item));
    }
    // this.setState({ listOfColors, colors });

    let { products, allAttributeItemS, filteredByColor } = this.state;
    let newProducts = [];
    products.map((p) => {
      if (
        getcolors(p, allAttributeItemS).filter((value) =>
          colors.includes(value)
        ).length > 0
      )
        newProducts.push(p);
    });
    this.resetPaginate();
    this.setState({ filteredByColor: newProducts, listOfColors, colors });
  };

  handleAllAttributes = (attribute, index, id, name, item) => {
    attribute.trim();
    name.trim();
    let allAttributesSelected = { ...this.state.allAttributesSelected };
    let { specificSelectedItems } = this.state;

    if (
      allAttributesSelected[name] === undefined ||
      allAttributesSelected[name] === false
    ) {
      allAttributesSelected[name] = true;
      if (specificSelectedItems[attribute] === undefined) {
        specificSelectedItems[attribute] = [item];
      } else {
        specificSelectedItems[attribute].push(item);
      }
    } else {
      allAttributesSelected[name] = false;
      specificSelectedItems[attribute] = specificSelectedItems[
        attribute
      ].filter((i) => ![item].includes(i));
    }

    // this.setState({ allAttributesSelected, specificSelectedItems });
    let {
      products,
      allAttributeItemS,
      filteredByDiffferentsAttributes,
    } = this.state;
    let newProducts = [];
    products.map((p) => {
      if (
        getAttributes(p, allAttributeItemS, id).filter((value) =>
          specificSelectedItems[attribute].includes(value)
        ).length > 0
      )
        newProducts.push(p);
    });
    filteredByDiffferentsAttributes[index] = newProducts;

    filteredByDiffferentsAttributes[index] = [
      ...new Set(filteredByDiffferentsAttributes[index]),
    ];
    // this.setState({ filteredByDiffferentsAttributes });
    let { indexHolder } = this.state;
    indexHolder.push({ attribute, index });
    this.setState({
      indexHolder,
      allAttributesSelected,
      specificSelectedItems,
      filteredByDiffferentsAttributes,
    });
    this.resetPaginate();
  };

  getProducts = () => {
    let {
      filtered,
      products,
      filterdByPrice,
      filteredByDiscount,
      filteredByStock,
      notFound,
      filteredByColor,
      filteredByDiffferentsAttributes,
    } = this.state;
    let searchWords = this.state.data.internalSearchBox;

    if (
      filteredByDiffferentsAttributes.filter((c) => c.length > 0).length ===
        0 ||
      filteredByDiffferentsAttributes.length === 0
    ) {
      filteredByDiffferentsAttributes = [products];
    }
    if (filterdByPrice.length === 0) filterdByPrice = products;
    if (filteredByColor.length === 0 && this.state.colors.length===0) filteredByColor = products;
    if (
      filteredByDiscount.length === 0 &&
      notFound.filteredByDiscount.status === false
    )
      filteredByDiscount = products;
    if (
      filteredByStock.length === 0 &&
      notFound.filteredByStock.status === false
    )
      filteredByStock = products;
    if (filtered.length === 0 && searchWords.length === 0) filtered = products;

    let result = products.filter(
      (value) =>
        filteredByDiscount.includes(value) &&
        filteredByStock.includes(value) &&
        filterdByPrice.includes(value) &&
        filtered.includes(value) &&
        filteredByColor.includes(value)
    );

    filteredByDiffferentsAttributes.map((category) => {
      if (category.length > 0){
        console.log("trueeeeeeeeeeeeeeee",category);
        result = category.filter((value) => result.includes(value));

      }
    });
    result = [...new Set(result)];
    console.log("0",products,"1",filteredByDiscount,"2",filteredByStock,"3",filterdByPrice,"4",filtered,"5",filteredByColor,result);
    return result;
  };

  deletFilterOfSearch = () => {
    let data = this.state.data;
    data.internalSearchBox = "";
    this.setState({ data });
    this.handelClickSearch("");
  };
  deletFilterOfDiscountStock = (name, status) => {
    this.setState({ [name]: "", [status]: false });
    this.resetPaginate();
  };
  handleSort = (order) => {
    let Sort = { ...this.state.Sort };
    Sort.path = order.path;
    Sort.order = order.sort;
    this.setState({ Sort });
    this.resetPaginate();
  };
  sortproducts = () => {
    let { Sort, getProducts } = this.state;
    let products = this.getProducts();
    let sorted = [];

    if (Sort.path === "price") {
      let prices = [];
      products.map((p) =>
        p.off
          ? prices.push((parseInt(p.price) * (100 - parseInt(p.off))) / 100)
          : prices.push(p.price)
      );
      let deletedZeroes = prices.filter((c) => c !== 0);
      let zeroes = products.filter((product) => product.price === 0);
      if (Sort.order === "asc")
        deletedZeroes = deletedZeroes.sort((a, b) => a - b);
      else deletedZeroes = deletedZeroes.sort((a, b) => b - a);

      deletedZeroes = [...new Set(deletedZeroes)];
      let primitiveSort = [];
      deletedZeroes.map((number) => {
        for (let index = 0; index < products.length; index++) {
          if (
            number === products[index].price ||
            number ===
              (products[index].price * (100 - parseInt(products[index].off))) /
                100
          )
            primitiveSort.push(products[index]);
        }
      });
      primitiveSort.push(...zeroes);
      sorted = primitiveSort;
    } else {
      sorted = orderBy(products, [Sort.path], [Sort.order]);
    }

    return sorted;
  };

  handlePgeChange = (page) => {
    let pagination = { ...this.state.pagination };
    pagination.currentPage = page;
    this.setState({ pagination });
    document.body.scrollTop = 185; // For Safari
    document.documentElement.scrollTop = 185; // For Chrome, Firefox, IE and Opera
  };

  paginate = () => {
    let { currentPage, pageSize } = this.state.pagination;

    let products = this.sortproducts();
    let paginated = products.slice(
      (currentPage - 1) * pageSize,
      currentPage * pageSize
    );
    return paginated;
  };
  resetPaginate = () => {
    let pagination = { ...this.state.pagination };
    pagination.currentPage = 1;
    this.setState({ pagination });
  };
  openCloseBurgerMenu=()=>{
    let {statusOfMenu}=this.props
     if(statusOfMenu===false) this.props.openSearch()
       else this.props.closeSearch()
       console.log(statusOfMenu);
   }

  render() {
    return (
      <HeaderFooter history={this.props.history}>
        <div className="main">
          <div className="container">
            <div className="breadcrumb11">
              <Breadcrumb>
                <Breadcrumb.Item href="#">صفحه اصلی </Breadcrumb.Item>
                {this.getParents().map((c) => {
                  if (c.id !== this.state.categoryId) {
                    return (
                      <Breadcrumb.Item key={c.id}>
                        <Link to={`/last__category/${c.id}`}>{c.title}</Link>
                      </Breadcrumb.Item>
                    );
                  } else {
                    return (
                      <Breadcrumb.Item active key={c.id}>
                        {" "}
                        {c.title}
                      </Breadcrumb.Item>
                    );
                  }
                })}
              </Breadcrumb>
            </div>
          </div>

          <div className="whole__category">
            <div className="container">
              <div className="main__search">
                <RightFilters
                  originalSearch={this.state.originalSearch}
                  handelPriceClick={this.handelPriceClick}
                  handelClickInStock={this.handelClickInStock}
                  handelClickDiscount={this.handelClickDiscount}
                  handelColorClick={this.handelColorClick}
                  handelAllAttributesClick={this.handelAllAttributesClick}
                  getAllAttributes={this.getAllAttributes}
                  getRangeOfColor={this.getRangeOfColor}
                  deletallFilters={this.deletallFilters}
                  history={this.props.history}
                  PresentURL={this.state.PresentURL}
                  initialAccordion={this.state.initialAccordion}
                  initialColors={this.state.initialColors}
                  optionalFilters={this.state.optionalFilters}
                  categoryId={this.state.categoryId}
                  allCategories={this.state.allCategories}
                  searchBoxValue={this.state.data}
                  handleValue={this.handleValue}
                  handleSearch={this.handelSearch}
                  products={this.state.products}
                  filtered={this.state.filtered}
                  searchWords={this.state.data.internalSearchBox}
                  RangePriceClassName={this.state.RangePriceClassName}
                  handleFilterOfPrice={this.handleFilterOfPrice}
                  handleStock={this.handleStock}
                  stock={this.state.stock}
                  discount={this.state.discount}
                  handleDiscount={this.handleDiscount}
                  accordian={this.state.accordian}
                  handleAccordian={this.handleAccordian}
                  allAttributeItemS={this.state.allAttributeItemS}
                  listOfColors={this.state.listOfColors}
                  handleColor={this.handleColor}
                  handleAllAttributes={this.handleAllAttributes}
                  allAttributesSelected={this.state.allAttributesSelected}
                ></RightFilters>
                <div className="left__search__products">
                  <div className="whole__left__search">
                    <FirstBox
                                    openCloseBurgerMenu={this.openCloseBurgerMenu}

                      handelPriceClick={this.handelPriceClick}
                      handelClickInStock={this.handelClickInStock}
                      handelClickDiscount={this.handelClickDiscount}
                      handelColorClick={this.handelColorClick}
                      handelAllAttributesClick={this.handelAllAttributesClick}
                      getProducts={this.getProducts}
                      searchWords={this.state.data.internalSearchBox}
                      deletFilterOfSearch={this.deletFilterOfSearch}
                      filteredByStock={this.state.filteredByStock}
                      filteredByDiscount={this.state.filteredByDiscount}
                      discount={this.state.notFound.filteredByDiscount.status}
                      stock={this.state.notFound.filteredByStock.status}
                      deletFilterOfDiscountStock={
                        this.deletFilterOfDiscountStock
                      }
                      RangePriceClassName={this.state.RangePriceClassName}
                      handleFilterOfPrice={this.handleFilterOfPrice}
                      colors={this.state.colors}
                      handleColor={this.handleColor}
                      allAttributesSelected={this.state.allAttributesSelected}
                      specificSelectedItems={this.state.specificSelectedItems}
                      indexHolder={this.state.indexHolder}
                      handleAllAttributes={this.handleAllAttributes}
                    ></FirstBox>
                    <SecondBox
                      handelClickOrder={this.handelClickOrder}
                      Sort={this.state.Sort}
                      handleSort={this.handleSort}
                    ></SecondBox>
                    <WholeProduct
                      getProducts={this.getProducts}
                      allAttributeItemS={this.state.allAttributeItemS}
                      sortproducts={this.sortproducts}
                      paginate={this.paginate}
                    ></WholeProduct>
                    <Pagination
                      sortproducts={this.sortproducts}
                      pagination={this.state.pagination}
                      handlePgeChange={this.handlePgeChange}
                    ></Pagination>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </HeaderFooter>
    );
  }
}
function mapStateToProps(state) {
  return {
    statusOfMenu:state.menu.open2,
    allCategories: state.api.apiattributeItem.categories,
    allProducts: state.api.apiProducts.list,
    productsOfSpecificCategory: (categoryId) =>
      getSpecificProduct(categoryId)(state),
    attribute: state.api.apiattributeItem.attributeItem,
  };
}
function mapDispatchToProps(dispatch) {
  return {
 
    openSearch: () => dispatch(openSearch()),
    closeSearch: () => dispatch(closeSearch()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Last_category);
