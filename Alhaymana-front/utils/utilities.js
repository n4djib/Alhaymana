export const formatDecharges = (decharges) => {
  const formattedDecharges = {};

  for (let i = 0; i < decharges.length; i++) {
    const agent = decharges[i].agent;
    const article = decharges[i].article;
    if (!(agent.id in formattedDecharges)) {
      formattedDecharges[agent.id] = {
        nom: agent.nom,
        prenom: agent.prenom,
        decharges: [],
      };
    }

    // add decharge to agent"
    const decharge = {
      code: article.code,
      designation: article.designation,
      matricule: decharges[i].matricule,
    };

    if (article !== null) {
      formattedDecharges[agent.id].decharges.push(decharge);
    }
  }

  return formattedDecharges;
};
