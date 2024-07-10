import typeColor from "~/constants/PokemonTypeColor";
import styles from "./Card.module.css";

export default function Card({ data, handleRedirect }) {
  if (!data?.resultDetails) {
    return (
      <div className={styles.card_container}>
        {Array.from({ length: 50 }, (_, i) => i + 1).map((d, index) => (
          <div key={index} className={styles.card_skleton}></div>
        ))}
      </div>
    );
  }

  return (
    <div className={styles.card_container}>
      {data?.resultDetails?.map((pokemon, index) => (
        <div key={index} onClick={() => handleRedirect(pokemon.name)}>
          <div className={styles.card}>
            <div className={styles.name}>{pokemon.name}</div>
            <div className={styles.card_image_layout}>
              <div
                style={{
                  backgroundImage: `radial-gradient(${pokemon.species.color.name}, white)`,
                }}
                className={styles.card_image_background}
              ></div>
              {pokemon.sprites.front_default && (
                <img
                  className={styles.card_image}
                  src={pokemon.sprites.front_default}
                />
              )}
            </div>
            <div className={styles.types_layout}>
              {pokemon.types.map((typeData, typeIndex) => (
                <div
                  key={typeIndex}
                  style={{ backgroundColor: typeColor[typeData.type.name] }}
                  className={styles.type}
                >
                  {typeData.type.name}
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
