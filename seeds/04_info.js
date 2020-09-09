exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("information")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("information").insert([
        {
          id: 1,
          title: "Dia Mundial sem Carro",
          description: `Dia Mundial sem carro. Acredito eu que deveria ser num final de semana é uma data internacional celebrada dia 22 de setembro, em cidades do mundo todo, que tem como objetivo estimular uma reflexão ... `,
          content: `Dia Mundial sem carro. Acredito eu que deveria ser num final de semana (em inglês: World Car Free Day) é uma data internacional celebrada dia 22 de setembro, 
          em cidades do mundo todo, que tem como objetivo estimular uma reflexão sobre o uso excessivo do automóvel, 
          além de propor às pessoas que dirigem todos os dias que revejam a dependência que criaram em relação ao carro ou moto. 
          Criado pelo movimento "Sem Carro" (em inglês: Car Free), tem como fundamento que as pessoas experimentem, pelo menos nesse dia, 
          formas alternativas de mobilidade, descobrindo que é possível se locomover pela cidade sem usar o automóvel e que há vida além do para-brisa. 
          Neste dia são realizadas atividades em defesa do meio ambiente e da qualidade de vida nas cidades, no que passou a ser conhecido como Dia Mundial Sem Carro.
           Na Europa, a semana toda é recheada de atividades, no que chamam de Semana Europeia da Mobilidade (16 a 22 de setembro). 
           A data foi criada na França, em 1997, sendo adotada por vários países europeus já no ano 2000.`,
          image_url:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRMHTVqqp7i1atNsbfQSKwSYh3B5AqWidPMpA&usqp=CAU",
          create_at: new Date(Date.now()),
          update_at: new Date(Date.now()),
          author: 1,
        },
      ]);
    });
};
