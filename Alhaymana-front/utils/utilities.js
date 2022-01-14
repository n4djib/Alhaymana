export const formatDecharges = (decharges) => {
  const formattedDecharges = {};

  for (let i = 0; i < decharges.length; i++) {
    const agent = decharges[i].agent;
    const article = decharges[i].article;
    if (agent && !(agent.id in formattedDecharges)) {
      formattedDecharges[agent.id] = {
        nom: agent.nom,
        prenom: agent.prenom,
        decharges: [],
      };
    }

    // add decharge to agent"
    const decharge = {
      id: decharges[i].id,
      articleId: article ? article.id : null,
      code: article ? article.code : null,
      designation: article ? article.designation : null,
      matricule: decharges[i].matricule,
      date: decharges[i].date,
    };

    // if (article !== null) {
    formattedDecharges[agent.id].decharges.push(decharge);
    // }
  }

  return formattedDecharges;
};
