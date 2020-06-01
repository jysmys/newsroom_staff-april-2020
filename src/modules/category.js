const categoryList = () => {
  const cats = [
    "Other",
    "Sport",
    "Local",
    "Politics",
    "Economy",
    "World",
    "Entertainment",
  ];

  return cats.map((cat) => {
    return { key: cat, text: cat, value: cat.toLowerCase() };
  });
};

export default categoryList;
