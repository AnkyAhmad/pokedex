import styles from "./TableMove.module.css";

export default function TableMove({
  title,
  detailPokemon,
  dataTable,
  machines = false,
  number = true,
}) {
  return (
    <div className={styles.table_layout}>
      <div className={styles.table_title}>{title}</div>
      <table
        style={{
          backgroundColor: detailPokemon.species?.color?.name,
        }}
        cellSpacing="0"
        cellPadding="0"
        className={styles.table_move}
      >
        <thead className={styles.table_head}>
          <tr>
            {number === true && (
              <th className={styles.table_label}>
                {machines === true ? "#" : "Level"}
              </th>
            )}
            <th className={styles.table_label}>name</th>
            <th className={styles.table_label}>Type</th>
            <th className={styles.table_label}>Category</th>
            <th className={styles.table_label}>power</th>
            <th className={styles.table_label}>Accuracy</th>
          </tr>
        </thead>
        <tbody>
          {dataTable && dataTable.length > 0 ? (
            dataTable?.map((move, index) => (
              <tr key={index}>
                {number === true && (
                  <td className={styles.table_content}>
                    {move.learn_method[0].level_learned_at > 0
                      ? move.learn_method[0].level_learned_at
                      : "TM/HM"}
                  </td>
                )}
                <td className={styles.table_content}>
                  {move.name.replace(/-/g, " ")}
                </td>
                <td className={styles.table_content}>{move.type}</td>
                <td className={styles.table_content}>{move.category}</td>
                <td className={styles.table_content}>{move.power ?? "-"}</td>
                <td className={styles.table_content}>{move.accuracy ?? "-"}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={6} className={styles.table_content}>
                Tidak Ada Data
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
