import typeColor from "~/constants/PokemonTypeColor";
import styles from "./Attribute.module.css";
import { Link } from "react-router-dom";

export default function Attribute({ detailPokemon }) {
  return (
    <div className={styles.details_background}>
      <div className={styles.pokemon_name}>
        {detailPokemon.name} {detailPokemon.id && "#" + detailPokemon.id}
      </div>
      <div className={styles.card_image_layout}>
        <div
          style={{
            backgroundImage: `radial-gradient(${
              detailPokemon.species?.color?.name ?? "grey"
            }, #ffffff)`,
          }}
          className={styles.card_image_background}
        ></div>
        <img
          style={{
            position: `${
              detailPokemon.sprites?.front_default ? "absolute" : "relative"
            }`,
          }}
          className={styles.card_image}
          src={detailPokemon.sprites?.front_default}
        />
      </div>
      <div className={styles.grid_info}>
        <div className={styles.label}>Height</div>
        <div className={styles.content}>
          {(detailPokemon.height ?? 0 / 10).toFixed(1) + " m"}
        </div>
        <div className={styles.label}>Weight</div>
        <div className={styles.content}>
          {(detailPokemon.weight ?? 0 / 10).toFixed(1) + " kg"}
        </div>
        <div className={styles.label}>abilities</div>
        <div className={styles.content}>
          {detailPokemon.abilities?.map((abiliti) => (
            <div
              key={abiliti.ability.name}
              style={{
                backgroundColor: `${detailPokemon.species.color.name}`,
              }}
              className={styles.content_abilities}
            >
              {abiliti.ability.name}
            </div>
          ))}
        </div>
        <div className={styles.label}>Type</div>
        <div className={styles.content}>
          {detailPokemon.types?.map((type) => (
            <div
              key={type.type.name}
              style={{
                backgroundColor: `${typeColor[type.type.name]}`,
              }}
              className={styles.content_abilities}
            >
              {type.type.name}
            </div>
          ))}
        </div>
        <div className={styles.label}>Base Exp</div>
        <div className={styles.content}>
          {detailPokemon.base_experience ?? "-"}
        </div>
      </div>
      <div className="flex_center">
        <Link className={styles.btn_back} to="/">
          Back home pokedex
        </Link>
      </div>
    </div>
  );
}
