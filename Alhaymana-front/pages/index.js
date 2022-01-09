import styles from "../styles/Home.module.css";
import BoxLink from "../components/UI/BoxLink";

import AgentCard from "../components/AgentCard";

export default function Home() {
  const agent = {
    id: 20,
    matricule: "2021/2314",
    nom: "sadd",
    prenom: "nadjib",
    nom_arab: "سعد",
    prenom_arab: "نجيب",
    date_naissance: null,
    lieu_naissance: null,
    cin: "453453453453453",
    cin_delivrer_par: null,
    cin_delivrer_le: null,
    cnas: null,
    telephone: null,
    adresse: null,
    email: null,
    prenom_pere: null,
    nom_prenom_mere: null,
    situation_familiale: null,
    num_acte_naissance: "55_5555555",
    sexe: null,
    groupe_sanguin: null,
    published_at: "2022-01-05T12:56:08.917Z",
    created_at: "2022-01-05T12:55:43.264Z",
    updated_at: "2022-01-05T12:57:02.323Z",
    photo: {
      id: 61,
      name: "262402880_1129506621153496_4904223817012870622_n.jpg",
      alternativeText: "",
      caption: "",
      width: 923,
      height: 920,
      formats: {
        thumbnail: {
          name: "thumbnail_262402880_1129506621153496_4904223817012870622_n.jpg",
          hash: "thumbnail_262402880_1129506621153496_4904223817012870622_n_07a9961bc3",
          ext: ".jpg",
          mime: "image/jpeg",
          width: 157,
          height: 156,
          size: 6.45,
          path: null,
          url: "/uploads/thumbnail_262402880_1129506621153496_4904223817012870622_n_07a9961bc3.jpg",
        },
        medium: {
          name: "medium_262402880_1129506621153496_4904223817012870622_n.jpg",
          hash: "medium_262402880_1129506621153496_4904223817012870622_n_07a9961bc3",
          ext: ".jpg",
          mime: "image/jpeg",
          width: 750,
          height: 748,
          size: 67.16,
          path: null,
          url: "/uploads/medium_262402880_1129506621153496_4904223817012870622_n_07a9961bc3.jpg",
        },
        small: {
          name: "small_262402880_1129506621153496_4904223817012870622_n.jpg",
          hash: "small_262402880_1129506621153496_4904223817012870622_n_07a9961bc3",
          ext: ".jpg",
          mime: "image/jpeg",
          width: 500,
          height: 498,
          size: 38.09,
          path: null,
          url: "/uploads/small_262402880_1129506621153496_4904223817012870622_n_07a9961bc3.jpg",
        },
      },
      hash: "262402880_1129506621153496_4904223817012870622_n_07a9961bc3",
      ext: ".jpg",
      mime: "image/jpeg",
      size: 62.91,
      url: "/uploads/262402880_1129506621153496_4904223817012870622_n_07a9961bc3.jpg",
      previewUrl: null,
      provider: "local",
      provider_metadata: null,
      created_at: "2022-01-05T12:56:58.279Z",
      updated_at: "2022-01-05T12:56:58.304Z",
    },
    contrats: [],
    visites_medicales: [],
    decharges: [],
  };

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
