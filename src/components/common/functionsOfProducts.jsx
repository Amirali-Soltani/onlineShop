export function getStarClasses(value, number) {
  let starClasses = `without__color number${number}`;
  if (value > 0) starClasses += " positive";
  return starClasses;
}

export function changeImage(product, index, color, Id) {
  if (product.productPic[color] !== undefined) {
    let image = document.getElementById(Id);
    image.src = product.productPic[color];
  }
}

export function backToFirstImage(product, index, color, Id) {
  let image = document.getElementById(Id);
  image.src = product.productPic[Object.keys(product.productPic)[0]];
}

export function getStars(comments) {
  let sum = 0;
  let numbers = comments.length;
  if (numbers === 0) return [0, 0, 0, 0, 0];
  comments.map((c) => (sum += c.vote));
  let finalAaverage = sum / numbers;
  finalAaverage = finalAaverage.toFixed(1);
  let showStar = [0, 0, 0, 0, 0];
  for (let index = 0; index < showStar.length; index++) {
    showStar[index] = finalAaverage;
    finalAaverage -= 1;
  }
  return showStar;
}

export function getPopularity(comments) {
  let sum = 0;
  let numbers = comments.length;
  if (numbers === 0) return [0, 0, 0, 0, 0];
  comments.map((c) => (sum += c.vote));
  let finalAaverage = sum / numbers;
  finalAaverage = finalAaverage.toFixed(1);
  return finalAaverage;
}

export function getPriceClasses(product) {
  let priceClasses = "poduct__price";
  priceClasses += product.off ? " discount__price" : "";
  // priceClasses += product.off && "discount__price";
  return priceClasses;
}

export function getcolors(product, allAttributeItemS) {
  let attribiuteItem = product.categoryAttributes;
  let items = [];
  attribiuteItem.map((a) => items.push(...a.items));
  let finalItem = items.map((a) => a.attItem);
  let unique = [...new Set(finalItem)];
  let result = [];
  allAttributeItemS.map((a) => {
    for (let index = 0; index < unique.length; index++) {
      if (unique[index] === a.id) {
        result.push(a);
      }
    }
  });
  let color = result.filter((a) => a.parentId === 1);
  return color;
}
export function checkForStock(product) {
  if (product !== undefined) {
    let total = 0;
    product.categoryAttributes.map((one) => {
      if (one.items[0].id === 1) total += one.count;
    });
    if (total > 0) return true;
    if (total === 0 || product.price === 0) return false;
  }
}

export function getSize(product, allAttributeItemS) {
  let attribiuteItem = product.categoryAttributes;
  let items = [];
  attribiuteItem.map((a) => items.push(...a.items));
  let finalItem = items.map((a) => a.attItem);
  let unique = [...new Set(finalItem)];
  let result = [];
  allAttributeItemS.map((a) => {
    for (let index = 0; index < unique.length; index++) {
      if (unique[index] === a.id) {
        result.push(a);
      }
    }
  });
  let color = result.filter((a) => a.parentId === 2);
  return color;
}
export function getAttributes(product, allAttributeItemS, id) {
  let attribiuteItem = product.categoryAttributes;
  let items = [];
  attribiuteItem.map((a) => items.push(...a.items));
  let finalItem = items.map((a) => a.attItem);
  let unique = [...new Set(finalItem)];
  let result = [];
  allAttributeItemS.map((a) => {
    for (let index = 0; index < unique.length; index++) {
      if (unique[index] === a.id) {
        result.push(a);
      }
    }
  });
  let Attribut = result.filter((a) => a.parentId === id);
  return Attribut;
}

export function findingChildren(id, categories) {
  let childIdies = [];
  let allchildidies = [];
  let mainCat = categories.filter((c) => c.id === id);
  let idies = [];
  idies.push(...mainCat);
  allchildidies.push(...mainCat);
  while (idies.length > 0) {
    categories.map((c) => {
      for (let index = 0; index < idies.length; index++) {
        if (c.parentId === idies[index].id) childIdies.push(c);
      }
    });
    allchildidies.push(...childIdies);
    idies = childIdies;
    childIdies = [];
  }

  let allIdies = [];
  allchildidies.map((c) => allIdies.push(c.id));
  return allIdies;
}
