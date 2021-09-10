import React, { useState, useEffect } from "react";
import { client } from "../../Client";
import styles from "./skills.module.scss";

import HorizontalScrollContainer from "../common/horizontalScrollContainer/HorizontalScrollContainer";
import Rating from "../common/rating/Rating";

function Skills() {
  const [skills, setSkills] = useState([]);
  //const [category, setCategory] = useState(["main", "softskills", "tech"]);

  function FetchData() {
    return client
      .items()
      .type("skill")
      .elementsParameter(["name", "category", "level"])
      .toPromise()
      .then((response) => {
        return response.items;
      });
  }

  useEffect(() => {
    FetchData().then((_skills) => setSkills(_skills));
  }, []);

  function ListCategories() {
    const _categories = [...new Set(skills.map((q) => q.category.value[0].codename))];
    return _categories;
  }

  function SortCategories() {
    const sortBy = ["main", "soft_skills", "tech", "methods", "platforms"];

    const customSort = ({ data, sortBy }) => {
      const sortByObject = sortBy.reduce((obj, item, index) => {
        return {
          ...obj,
          [item]: index,
        };
      }, {});
      return data.sort((a, b) => sortByObject[a] - sortByObject[b]);
    };

    return customSort({ data: ListCategories(), sortBy });
  }

  function RenameCategories() {
    const rename = ["Algemeen", "Soft skills", "Code", "Methoden", "Platforms/CMSen"];
    const renamed = SortCategories().map((category, index) => ({ category, name: rename[index] }));

    return renamed;
  }

  function FilterByCategory(category) {
    const filteredSkills = skills.filter((skill) => skill.category.value[0].codename === category);
    return filteredSkills;
  }

  return (
    <section id="skills" className={styles.skills}>
      <div className="box">
        <HorizontalScrollContainer height="210px" rows={1} width={1} unit="fr" gap="100px">
          {RenameCategories().map((category) => {
            return (
              <section className={`${category.category} ${styles.section}`} key={category.category}>
                <table>
                  <caption>{category.name}</caption>
                  <tbody>
                    {FilterByCategory(category.category).map((filteredSkill) => {
                      const amount = filteredSkill.level.value;
                      return (
                        <tr key={filteredSkill.system.id}>
                          <td className={styles.skill}>{filteredSkill.name.value}</td>
                          <td className="level">
                            <Rating amount={amount} />
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </section>
            );
          })}
        </HorizontalScrollContainer>
      </div>
    </section>
  );
}

export default Skills;
