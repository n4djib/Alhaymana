import styles from "../styles/Home.module.css";
import BoxLink from "../components/UI/BoxLink";

export default function Home() {
  return (
    <div className={styles.container}>
      <BoxLink href="/agents">Les Agents</BoxLink>
      <BoxLink href="/articles">Les Articles</BoxLink>
      <BoxLink href="/decharges">Decharges</BoxLink>
      <BoxLink href="/groupes">Groupes</BoxLink>
      <BoxLink href="/sites">Sites</BoxLink>

      <ol>
        <li>Décharges</li>
        <li>agents edit and deletion</li>
        <li>agents validation</li>
        <li>Contrat & model</li>
        <li>Rotation</li>
        <li>Printing</li>
        <li>Authentication</li>
        <li></li>
      </ol>
    </div>
  );
}
