import { useState } from "react";

const categoryList = [
  "Все",
  "Мясные",
  "Вегетарианская",
  "Гриль",
  "Острые",
  "Закрытые",
];

function Categories() {
  const [isActiveCategory, setIsActiveCategory] = useState(0);

  return (
    <div className="categories">
      <ul>
        {categoryList.map((categoryListItem, index) => (
          <li
            key={index.toString()}
            onClick={() => setIsActiveCategory(index)}
            className={isActiveCategory === index ? "active" : ""}
          >
            {categoryListItem}
          </li>
        ))}
      </ul>
    </div>
  );
}
export default Categories;
