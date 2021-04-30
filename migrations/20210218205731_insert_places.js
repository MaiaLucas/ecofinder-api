exports.up = function (knex) {
  return knex("places").insert([
    {
      title: "Ecoponto",
      description: "leve seu lixo",
      images_url: {},
      city: "Fortaleza",
      rating: 4.87,
      address: "Rua dos bobos, 0",
      phone: "(99) 999999999",
      open_on_weekend: true,
      create_at: new Date(),
      update_at: new Date(),
      type: 1,
    },
    {
      title: "Ecopoint",
      description: "Passeio bacana",
      images_url: {},
      city: "Fortaleza",
      rating: 4.57,
      address: "Rua dos bobos, 0",
      phone: "(99) 999999999",
      open_on_weekend: true,
      create_at: new Date(),
      update_at: new Date(),
      type: 2,
    },
    {
      title: "Passeio no Parque do Cocó",
      description: "muito sustentável",
      images_url: {},
      city: "Fortaleza",
      rating: 4.92,
      address: "Rua dos bobos, 0",
      phone: "(99) 999999999",
      open_on_weekend: true,
      create_at: new Date(),
      update_at: new Date(),
      type: 2,
    },
    //exp1
    {
      title: "Ecomuseu Natural do Mangue",
      description: "O EcoMuseu Natural do Mangue é um museu brasileiro de ciências naturais, situado na Praia de Sabiaguaba, na cidade de Fortaleza. Está localizado na Área de Proteção Ambiental do Parque Municipal das Dunas de Sabiaguaba, foi criado em 19 de janeiro de 2001.",
      images_url: {
        images: [
          {
            path:
              "https://cdn.discordapp.com/attachments/837706734747385916/837716627444465684/musman1.jpg",
          },
          {
            path:
              "https://cdn.discordapp.com/attachments/837706734747385916/837716635807645766/musman2.jpg",
          },
          {
            path:
              "https://cdn.discordapp.com/attachments/837706734747385916/837716645441962044/musman3.jpg",
          },
        ],
      },
      city: "Fortaleza",
      rating: 5.0,
      address: "R. Prof. Valdivino, 48",
      phone: "(85) 98749-5286",
      hr_init: "9:00",
      hr_final: "17:00",
      open_on_weekend: true,
      create_at: new Date(),
      update_at: new Date(),
      type: 2,
    },
    //exp2
    {
      title: "Ecopoint Parque Ambiental",
      description: "Parque ecológico com diversos animais e pássaros, além de instalações para natação e apresentações infantis.",
      images_url: {
        images: [
          {
            path:
              "https://cdn.discordapp.com/attachments/837706734747385916/837717500555821116/paramb1.jpg",
          },
          {
            path:
              "https://cdn.discordapp.com/attachments/837706734747385916/837717510946160670/paramb2.jpg",
          },
          {
            path:
              "https://cdn.discordapp.com/attachments/837706734747385916/837717519065677872/paramb3.jpg",
          },
        ],
      },
      city: "Fortaleza",
      rating: 4.3,
      address: "Av. Senador Fernandes Távora, 387",
      phone: "(85) 3290-3339",
      hr_init: "10:00",
      hr_final: "17:00",
      open_on_weekend: true,
      create_at: new Date(),
      update_at: new Date(),
      type: 2,
    },
    //exp3
    {
      title: "Engenhoca Parque",
      description: "Parque de aventura ao ar livre com arvorismo, tirolesa, arco e flecha, minigolfe, caiaque e pedalinho.",
      images_url: {
        images: [
          {
            path:
              "https://cdn.discordapp.com/attachments/837706734747385916/837718806746234980/engpar1.jpg",
          },
          {
            path:
              "https://cdn.discordapp.com/attachments/837706734747385916/837718816405717012/engpar2.jpg",
          },
          {
            path:
              "https://cdn.discordapp.com/attachments/837706734747385916/837718819992371200/engpar3.jpg",
          },
        ],
      },
      city: "Fortaleza",
      rating: 4.7,
      address: "R. Raimundo Coelho, 200",
      phone: "(85) 3361-1010",
      hr_init: "10:30",
      hr_final: "16:00",
      open_on_weekend: true,
      create_at: new Date(),
      update_at: new Date(),
      type: 2,
    },
    //exp4
    {
      title: "Jardim Japonês",
      description: "Jardim aconchegante com paisagens, fontes e arquiteturas tradicionais do Japão.",
      images_url: {
        images: [
          {
            path:
              "https://cdn.discordapp.com/attachments/837706734747385916/837719658433478656/jarjap1.jpg",
          },
          {
            path:
              "https://cdn.discordapp.com/attachments/837706734747385916/837719668005404703/jarjap2.jpg",
          },
          {
            path:
              "https://cdn.discordapp.com/attachments/837706734747385916/837719676854468648/jarjap3.jpg",
          },
        ],
      },
      city: "Fortaleza",
      rating: 4.0,
      address: "Av. Beira Mar",
      phone: "(85) 3105-1444",
      hr_init: "06:00",
      hr_final: "22:00",
      open_on_weekend: true,
      create_at: new Date(),
      update_at: new Date(),
      type: 2,
    },
    //exp5
    {
      title: "Parque Botânico Ceará",
      description: "O Parque Botânico do Ceará é uma Unidade de Conservação em processo de revisão para adequação ao Sistema Nacional de Unidades de Conservação da Natureza. Representa uma Unidade de Proteção Integral e possui um perímetro de 7.053 metros limitados por marcos em estacas de cimento, arame e tela de proteção.",
      images_url: {
        images: [
          {
            path:
              "https://cdn.discordapp.com/attachments/837706734747385916/837720450024865872/botcea1.jpg",
          },
          {
            path:
              "https://cdn.discordapp.com/attachments/837706734747385916/837720457289138216/botcea2.jpg",
          },
          {
            path:
              "https://cdn.discordapp.com/attachments/837706734747385916/837720463119089684/botcea3.jpg",
          },
        ],
      },
      city: "Caucaia",
      rating: 4.2,
      address: "Estr. José Aragão e Albuquerque",
      phone: "(85) 3342-0794",
      hr_init: "08:00",
      hr_final: "17:00",
      open_on_weekend: true,
      create_at: new Date(),
      update_at: new Date(),
      type: 2,
    },
    //exp6
    {
      title: "Parque Estadual do Cocó",
      description: "O Parque Estadual do Cocó é o maior parque natural em área urbana do Norte e Nordeste do Brasil e o quarto da América Latina, sendo o maior fragmento verde da cidade de Fortaleza, com extenso manguezal e dunas milenares no entorno.",
      images_url: {
        images: [
          {
            path:
              "https://cdn.discordapp.com/attachments/837706734747385916/837720983045406730/parcoc1.jpg",
          },
          {
            path:
              "https://cdn.discordapp.com/attachments/837706734747385916/837720989366222868/parcoc2.jpg",
          },
          {
            path:
              "https://cdn.discordapp.com/attachments/837706734747385916/837720999427964948/parcoc3.jpg",
          },
        ],
      },
      city: "Fortaleza",
      rating: 4.8,
      address: "Av. Padre Antônio Tomás",
      phone: "(85) 3234 - 3574",
      hr_init: "5:30",
      hr_final: "22:00",
      open_on_weekend: true,
      create_at: new Date(),
      update_at: new Date(),
      type: 2,
    },
    //exp7
    {
      title: "Parque Rio Branco",
      description: "Parque ecológico para passeios, caminhadas, corridas e piqueniques, playground infantil e barras de exercício.",
      images_url: {
        images: [
          {
            path:
              "https://cdn.discordapp.com/attachments/837706734747385916/837721436406677524/riobra1.jpg",
          },
          {
            path:
              "https://cdn.discordapp.com/attachments/837706734747385916/837721442078425169/riobra2.jpg",
          },
          {
            path:
              "https://cdn.discordapp.com/attachments/837706734747385916/837721449501294613/riobra3.jpg",
          },
        ],
      },
      city: "Fortaleza",
      rating: 3.2,
      address: "Av. Pontes Vieira",
      phone: "(85) 3105-1444",
      hr_init: "00:00",
      hr_final: "00:00",
      open_on_weekend: true,
      create_at: new Date(),
      update_at: new Date(),
      type: 2,
    },
    //ponto1
    {
      title: "Ecoponto Antônio Bezerra",
      description: "Os Ecopontos são espaços adequados para o descarte correto de pequenas proporções de entulho, restos de poda, móveis e estofados velhos, além de óleo de cozinha, papelão, plásticos, vidros e metais.",
      images_url: {
        images: [
          {
            path:
              "https://cdn.discordapp.com/attachments/837706734747385916/837723574914514980/antbez1.jpg",
          },
          {
            path:
              "https://cdn.discordapp.com/attachments/837706734747385916/837723580715499540/antbez2.jpg",
          },
          {
            path:
              "https://cdn.discordapp.com/attachments/837706734747385916/837723587989209148/antbez3.jpg",
          },
        ],
      },
      city: "Fortaleza",
      rating: 4.4,
      address: "Antônio Bezerra",
      phone: "(85) 3452-6900",
      hr_init: "8:00",
      hr_final: "17:00",
      open_on_weekend: true,
      create_at: new Date(),
      update_at: new Date(),
      type: 1,
    },
    //ponto2
    {
      title: "Ecoponto Bairro de Fátima",
      description: "Os Ecopontos são espaços adequados para o descarte correto de pequenas proporções de entulho, restos de poda, móveis e estofados velhos, além de óleo de cozinha, papelão, plásticos, vidros e metais.",
      images_url: {
        images: [
          {
            path:
              "https://cdn.discordapp.com/attachments/837706734747385916/837723949063340032/barfat1.jpg",
          },
          {
            path:
              "https://cdn.discordapp.com/attachments/837706734747385916/837723955732283412/barfat2.jpg",
          },
          {
            path:
              "https://cdn.discordapp.com/attachments/837706734747385916/837723960614715402/barfat3.jpg",
          },
        ],
      },
      city: "Fortaleza",
      rating: 4.2,
      address: "Av. Eduardo Girão, 989",
      phone: "(85) 3452-6900",
      hr_init: "08:00",
      hr_final: "17:00",
      open_on_weekend: true,
      create_at: new Date(),
      update_at: new Date(),
      type: 1,
    },
    //ponto3
    {
      title: "Ecoponto Barra do Ceará",
      description: "Os Ecopontos são espaços adequados para o descarte correto de pequenas proporções de entulho, restos de poda, móveis e estofados velhos, além de óleo de cozinha, papelão, plásticos, vidros e metais.",
      images_url: {
        images: [
          {
            path:
              "https://cdn.discordapp.com/attachments/837706734747385916/837739975927791626/barcea1.jpg",
          },
          {
            path:
              "https://cdn.discordapp.com/attachments/837706734747385916/837739989542240346/barcea2.jpg",
          },
          {
            path:
              "https://cdn.discordapp.com/attachments/837706734747385916/837739998467457065/barcea3.jpg",
          },
        ],
      },
      city: "Fortaleza",
      rating: 4.7,
      address: "R. Graça Aranha, 300",
      phone: "(85) 3452-6900",
      hr_init: "08:00",
      hr_final: "17:00",
      open_on_weekend: true,
      create_at: new Date(),
      update_at: new Date(),
      type: 1,
    },
    //ponto4
    {
      title: "Ecoponto Cidade 2000",
      description: "Os Ecopontos são espaços adequados para o descarte correto de pequenas proporções de entulho, restos de poda, móveis e estofados velhos, além de óleo de cozinha, papelão, plásticos, vidros e metais.",
      images_url: {
        images: [
          {
            path:
              "https://cdn.discordapp.com/attachments/837706734747385916/837740249471385670/ecocid1.jpg",
          },
          {
            path:
              "https://cdn.discordapp.com/attachments/837706734747385916/837740257294024714/ecocid2.jpg",
          },
          {
            path:
              "https://cdn.discordapp.com/attachments/837706734747385916/837740263866630174/ecocid3.jpg",
          },
        ],
      },
      city: "Fortaleza",
      rating: 4.3,
      address: "R. Giselda Cysne, 92",
      phone: "(85) 3452-6900",
      hr_init: "08:00",
      hr_final: "17:00",
      open_on_weekend: true,
      create_at: new Date(),
      update_at: new Date(),
      type: 1,
    },
    //ponto5
    {
      title: "Ecoponto Conjunto Esperança",
      description: "Os Ecopontos são espaços adequados para o descarte correto de pequenas proporções de entulho, restos de poda, móveis e estofados velhos, além de óleo de cozinha, papelão, plásticos, vidros e metais.",
      images_url: {
        images: [
          {
            path:
              "https://cdn.discordapp.com/attachments/837706734747385916/837740564605829160/conesp1.jpg",
          },
          {
            path:
              "https://cdn.discordapp.com/attachments/837706734747385916/837740573015932948/conesp2.jpg",
          },
          {
            path:
              "https://cdn.discordapp.com/attachments/837706734747385916/837740578816655431/conesp3.jpg",
          },
        ],
      },
      city: "Fortaleza",
      rating: 4.6,
      address: "R. Marielle Franco",
      phone: "(85) 3452-6900",
      hr_init: "08:00",
      hr_final: "17:00",
      open_on_weekend: true,
      create_at: new Date(),
      update_at: new Date(),
      type: 1,
    },
    //ponto6
    {
      title: "Ecoponto Edson Queiroz",
      description: "Os Ecopontos são espaços adequados para o descarte correto de pequenas proporções de entulho, restos de poda, móveis e estofados velhos, além de óleo de cozinha, papelão, plásticos, vidros e metais.",
      images_url: {
        images: [
          {
            path:
              "https://cdn.discordapp.com/attachments/837706734747385916/837740826473791559/edsque1.jpg",
          },
          {
            path:
              "https://cdn.discordapp.com/attachments/837706734747385916/837740835529162752/edsque2.jpg",
          },
          {
            path:
              "https://cdn.discordapp.com/attachments/837706734747385916/837740844696993862/edsque3.jpg",
          },
        ],
      },
      city: "Fortaleza",
      rating: 4.1,
      address: "Rua Vereador José Batista Barbosa",
      phone: "(85) 3452-6900",
      hr_init: "08:00",
      hr_final: "17:00",
      open_on_weekend: true,
      create_at: new Date(),
      update_at: new Date(),
      type: 1,
    },
    //ponto7
    {
      title: "Ecoponto São João do Tauape",
      description: "Os Ecopontos são espaços adequados para o descarte correto de pequenas proporções de entulho, restos de poda, móveis e estofados velhos, além de óleo de cozinha, papelão, plásticos, vidros e metais.",
      images_url: {
        images: [
          {
            path:
              "https://cdn.discordapp.com/attachments/837706734747385916/837741093805883412/joatau1.jpg",
          },
          {
            path:
              "https://cdn.discordapp.com/attachments/837706734747385916/837741101858685029/joatau2.jpg",
          },
          {
            path:
              "https://cdn.discordapp.com/attachments/837706734747385916/837741107274055680/joatau3.jpg",
          },
        ],
      },
      city: "Fortaleza",
      rating: 4.2,
      address: "Av. Visconde do Rio Branco, 3485",
      phone: "(85) 3452-6900",
      hr_init: "08:00",
      hr_final: "17:00",
      open_on_weekend: true,
      create_at: new Date(),
      update_at: new Date(),
      type: 1,
    },
    //ponto8
    {
      title: "Ecoponto Varjota",
      description: "Os Ecopontos são espaços adequados para o descarte correto de pequenas proporções de entulho, restos de poda, móveis e estofados velhos, além de óleo de cozinha, papelão, plásticos, vidros e metais.",
      images_url: {
        images: [
          {
            path:
              "https://cdn.discordapp.com/attachments/837706734747385916/837741744094969886/ecovar1.jpg",
          },
          {
            path:
              "https://cdn.discordapp.com/attachments/837706734747385916/837741752852545576/ecovar2.jpg",
          },
          {
            path:
              "https://cdn.discordapp.com/attachments/837706734747385916/837741759538790431/ecovar3.jpg",
          },
        ],
      },
      city: "Fortaleza",
      rating: 4.5,
      address: "R. Meruoca, 224-326",
      phone: "(85) 3452-6900",
      hr_init: "08:00",
      hr_final: "17:00",
      open_on_weekend: true,
      create_at: new Date(),
      update_at: new Date(),
      type: 1,
    },
    //ponto9
    {
      title: "Ecoponto Vila Peri",
      description: "Os Ecopontos são espaços adequados para o descarte correto de pequenas proporções de entulho, restos de poda, móveis e estofados velhos, além de óleo de cozinha, papelão, plásticos, vidros e metais.",
      images_url: {
        images: [
          {
            path:
              "https://cdn.discordapp.com/attachments/837706734747385916/837741968712400957/vilper1.jpg",
          },
          {
            path:
              "https://cdn.discordapp.com/attachments/837706734747385916/837741975200596038/vilper2.jpg",
          },
          {
            path:
              "https://cdn.discordapp.com/attachments/837706734747385916/837741983447515167/vilper3.jpg",
          },
        ],
      },
      city: "Fortaleza",
      rating: 4.6,
      address: "R. Antônio Costa Mendes, 468",
      phone: "(85) 3452-6900",
      hr_init: "08:00",
      hr_final: "17:00",
      open_on_weekend: true,
      create_at: new Date(),
      update_at: new Date(),
      type: 1,
    },
    //ponto10
    {
      title: "Ecoponto Vila Velha",
      description: "Os Ecopontos são espaços adequados para o descarte correto de pequenas proporções de entulho, restos de poda, móveis e estofados velhos, além de óleo de cozinha, papelão, plásticos, vidros e metais.",
      images_url: {
        images: [
          {
            path:
              "https://cdn.discordapp.com/attachments/837706734747385916/837742298572783656/vilvel1.jpg",
          },
          {
            path:
              "https://cdn.discordapp.com/attachments/837706734747385916/837742305120616448/vilvel2.jpg",
          },
          {
            path:
              "https://cdn.discordapp.com/attachments/837706734747385916/837742311755874344/vilvel3.jpg",
          },
        ],
      },
      city: "Fortaleza",
      rating: 4.8,
      address: " R. Jasmim",
      phone: "(85) 3452-6900",
      hr_init: "08:00",
      hr_final: "17:00",
      open_on_weekend: true,
      create_at: new Date(),
      update_at: new Date(),
      type: 1,
    },
  ]);
};

exports.down = function (knex) {
  return knex("places").del();
};
