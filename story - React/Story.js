import React, { useState, useEffect } from "react";
import { client } from "../../Client";
import styles from "./story.module.scss";

function Story() {
  const [profile, setProfile] = useState([]);
  const [toggle, setToggle] = useState(false);

  function FetchData() {
    return client
      .items()
      .equalsFilter("system.id", "92634800-a677-4b2d-9122-7509a907b68c")
      .type("profile")
      .elementsParameter(["name", "dropcap", "introtext", "introduction"])
      .toPromise()
      .then((response) => {
        return response.items;
      });
  }

  useEffect(() => {
    FetchData().then((_profile) => setProfile(_profile));
  }, []);

  return (
    <section id="story" className={styles.story}>
      <div className={`box collapse ${toggle ? styles.open : styles.closed}`}>
        <img src="framephotov2.png" alt="foto van Chantal Sloep" align="right" />

        {profile.map((story) => {
          return (
            <div
              key={story.system.id}
              dangerouslySetInnerHTML={{
                __html: '<span class="dropcap">' + story.dropcap.value + "</span>" + story.introtext.value,
              }}
            ></div>
          );
        })}
      </div>

      <div className={`box ${styles.readmore}`}>
        <button onClick={() => setToggle(!toggle)} className={styles.button}>
          {toggle ? "Sluiten" : "Lees meer"}
        </button>
      </div>
    </section>
  );
}

export default Story;
