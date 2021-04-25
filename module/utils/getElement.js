// can be renamed when import
export default function getElement (selection){
  const element = document.querySelector(selection);
  if (element) {
    return element;
  } else {
    throw Error('YOU did not select element');
  }
}

// export default getElement; // can be renamed when import