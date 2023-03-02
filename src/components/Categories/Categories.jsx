function Categories({ value, onClickCategories }) {

  // const [isActiveCategory, setIsActiveCategory] = useState(0);
  const categoryList = [
    "Все",
    "Мясные",
    "Вегетарианская",
    "Гриль",
    "Острые",
    "Закрытые",
  ];

  return (
    <div className="categories">
      <ul>
        {categoryList.map((categoryList, index) => (
          <li
            key={index.toString()}
            onClick={() => {onClickCategories(index)
            console.log(value)
              console.log(index)}}
            className={value === index ? "active" : ""}
          >
            {categoryList}
          </li>
        ))}
      </ul>
    </div>
  );
}
export default Categories;
