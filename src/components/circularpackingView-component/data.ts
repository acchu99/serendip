export type TreeNode = {
  type: 'node';
  value: number;
  name: string;
  children: Tree[];
};
export type TreeLeaf = {
  type: 'leaf';
  name: string;
  value: number;
};

export type Tree = TreeNode | TreeLeaf;


export const data: Tree = {
  type: "node",
  name: "boss",
  value: 0,
  children: [
    {
      type: "node",
      name: "NonPolitical",
      value: 0,
      children: [
        {
          type: "leaf",
          name: "topic-1",
          value: +"99864"
        },
        {
          type: "leaf",
          name: "topic-2",
          value: +"89527"
        },
        {
          type: "leaf",
          name: "topic-7",
          value: +"55081"
        },
        {
          type: "leaf",
          name: "topic-5",
          value: +"47094"
        },
        {
          type: "leaf",
          name: "topic-10",
          value: +"31356"
        },
        {
          type: "leaf",
          name: "topic-4",
          value: +"30435"
        },
        {
          type: "leaf",
          name: "topic-8",
          value: +"28905"
        },
        {
          type: "leaf",
          name: "topic-3",
          value: +"28186"
        },
        {
          type: "leaf",
          name: "topic-11",
          value: +"26708"
        },
        {
          type: "leaf",
          name: "topic-6",
          value: +"21575"
        },
        {
          type: "leaf",
          name: "topic-21",
          value: +"19431"
        },
        {
          type: "leaf",
          name: "topic-17",
          value: +"15466"
        },
        {
          type: "leaf",
          name: "topic-13",
          value: +"15164"
        },
        {
          type: "leaf",
          name: "topic-19",
          value: +"12430"
        },
        {
          type: "leaf",
          name: "topic-18",
          value: +"9308"
        },
        {
          type: "leaf",
          name: "topic-16",
          value: +"9077"
        },
        {
          type: "leaf",
          name: "topic-25",
          value: +"5752"
        },
        {
          type: "leaf",
          name: "topic-12",
          value: +"5475"
        },
        {
          type: "leaf",
          name: "topic-23",
          value: +"5412"
        },
        {
          type: "leaf",
          name: "topic-22",
          value: +"4145"
        },
        {
          type: "leaf",
          name: "topic-24",
          value: +"4122"
        },
        {
          type: "leaf",
          name: "topic-14",
          value: +"4105"
        },
        {
          type: "leaf",
          name: "topic-15",
          value: +"3936"
        },
        {
          type: "leaf",
          name: "topic-9",
          value: +"3869"
        },
        {
          type: "leaf",
          name: "topic-20",
          value: +"1584"
        }
      ]
    },
    {
      type: "node",
      name: "Politics",
      value: 0,
      children: [
        {
          type: "leaf",
          name: "topic-1",
          value: +"84462"
        },
        {
          type: "leaf",
          name: "topic-2",
          value: +"78835"
        },
        {
          type: "leaf",
          name: "topic-5",
          value: +"49359"
        },
        {
          type: "leaf",
          name: "topic-7",
          value: +"38506"
        },
        {
          type: "leaf",
          name: "topic-4",
          value: +"33008"
        },
        {
          type: "leaf",
          name: "topic-10",
          value: +"29233"
        },
        {
          type: "leaf",
          name: "topic-21",
          value: +"27344"
        },
        {
          type: "leaf",
          name: "topic-8",
          value: +"25838"
        },
        {
          type: "leaf",
          name: "topic-6",
          value: +"19347"
        },
        {
          type: "leaf",
          name: "topic-11",
          value: +"15331"
        },
        {
          type: "leaf",
          name: "topic-3",
          value: +"11601"
        },
        {
          type: "leaf",
          name: "topic-18",
          value: +"8802"
        },
        {
          type: "leaf",
          name: "topic-17",
          value: +"8357"
        },
        {
          type: "leaf",
          name: "topic-19",
          value: +"8310"
        },
        {
          type: "leaf",
          name: "topic-13",
          value: +"8182"
        },
        {
          type: "leaf",
          name: "topic-25",
          value: +"4931"
        },
        {
          type: "leaf",
          name: "topic-12",
          value: +"4435"
        },
        {
          type: "leaf",
          name: "topic-16",
          value: +"4031"
        },
        {
          type: "leaf",
          name: "topic-22",
          value: +"3316"
        },
        {
          type: "leaf",
          name: "topic-15",
          value: +"3141"
        },
        {
          type: "leaf",
          name: "topic-24",
          value: +"2565"
        },
        {
          type: "leaf",
          name: "topic-23",
          value: +"2458"
        },
        {
          type: "leaf",
          name: "topic-9",
          value: +"1832"
        },
        {
          type: "leaf",
          name: "topic-14",
          value: +"1759"
        },
        {
          type: "leaf",
          name: "topic-20",
          value: +"1264"
        }
      ]
    },
    {
      type: "node",
      name: "AskIndia",
      value: 0,
      children: [
        {
          type: "leaf",
          name: "topic-1",
          value: +"125627"
        },
        {
          type: "leaf",
          name: "topic-2",
          value: +"104237"
        },
        {
          type: "leaf",
          name: "topic-7",
          value: +"53141"
        },
        {
          type: "leaf",
          name: "topic-5",
          value: +"44843"
        },
        {
          type: "leaf",
          name: "topic-3",
          value: +"42411"
        },
        {
          type: "leaf",
          name: "topic-11",
          value: +"39414"
        },
        {
          type: "leaf",
          name: "topic-8",
          value: +"36604"
        },
        {
          type: "leaf",
          name: "topic-4",
          value: +"26452"
        },
        {
          type: "leaf",
          name: "topic-10",
          value: +"24510"
        },
        {
          type: "leaf",
          name: "topic-17",
          value: +"22599"
        },
        {
          type: "leaf",
          name: "topic-13",
          value: +"20938"
        },
        {
          type: "leaf",
          name: "topic-6",
          value: +"15884"
        },
        {
          type: "leaf",
          name: "topic-21",
          value: +"15446"
        },
        {
          type: "leaf",
          name: "topic-19",
          value: +"13874"
        },
        {
          type: "leaf",
          name: "topic-18",
          value: +"10593"
        },
        {
          type: "leaf",
          name: "topic-23",
          value: +"10413"
        },
        {
          type: "leaf",
          name: "topic-16",
          value: +"10212"
        },
        {
          type: "leaf",
          name: "topic-25",
          value: +"5464"
        },
        {
          type: "leaf",
          name: "topic-14",
          value: +"5347"
        },
        {
          type: "leaf",
          name: "topic-12",
          value: +"5276"
        },
        {
          type: "leaf",
          name: "topic-24",
          value: +"5062"
        },
        {
          type: "leaf",
          name: "topic-9",
          value: +"4214"
        },
        {
          type: "leaf",
          name: "topic-22",
          value: +"3868"
        },
        {
          type: "leaf",
          name: "topic-15",
          value: +"3604"
        },
        {
          type: "leaf",
          name: "topic-20",
          value: +"1607"
        }
      ]
    },
    {
      type: "node",
      name: "Policy/Economy",
      value: 0,
      children: [
        {
          type: "leaf",
          name: "topic-2",
          value: +"24449"
        },
        {
          type: "leaf",
          name: "topic-1",
          value: +"21695"
        },
        {
          type: "leaf",
          name: "topic-5",
          value: +"12545"
        },
        {
          type: "leaf",
          name: "topic-7",
          value: +"11618"
        },
        {
          type: "leaf",
          name: "topic-4",
          value: +"10521"
        },
        {
          type: "leaf",
          name: "topic-10",
          value: +"9145"
        },
        {
          type: "leaf",
          name: "topic-21",
          value: +"7545"
        },
        {
          type: "leaf",
          name: "topic-6",
          value: +"7422"
        },
        {
          type: "leaf",
          name: "topic-18",
          value: +"5435"
        },
        {
          type: "leaf",
          name: "topic-11",
          value: +"4158"
        },
        {
          type: "leaf",
          name: "topic-8",
          value: +"3844"
        },
        {
          type: "leaf",
          name: "topic-3",
          value: +"3629"
        },
        {
          type: "leaf",
          name: "topic-24",
          value: +"2674"
        },
        {
          type: "leaf",
          name: "topic-19",
          value: +"2540"
        },
        {
          type: "leaf",
          name: "topic-17",
          value: +"2431"
        },
        {
          type: "leaf",
          name: "topic-13",
          value: +"2282"
        },
        {
          type: "leaf",
          name: "topic-15",
          value: +"1930"
        },
        {
          type: "leaf",
          name: "topic-22",
          value: +"1636"
        },
        {
          type: "leaf",
          name: "topic-12",
          value: +"1501"
        },
        {
          type: "leaf",
          name: "topic-25",
          value: +"1489"
        },
        {
          type: "leaf",
          name: "topic-16",
          value: +"1268"
        },
        {
          type: "leaf",
          name: "topic-9",
          value: +"750"
        },
        {
          type: "leaf",
          name: "topic-23",
          value: +"555"
        },
        {
          type: "leaf",
          name: "topic-20",
          value: +"477"
        },
        {
          type: "leaf",
          name: "topic-14",
          value: +"453"
        }
      ]
    },
    {
      type: "node",
      name: "Business/Finance",
      value: 0,
      children: [
        {
          type: "leaf",
          name: "topic-2",
          value: +"14767"
        },
        {
          type: "leaf",
          name: "topic-1",
          value: +"13489"
        },
        {
          type: "leaf",
          name: "topic-6",
          value: +"9644"
        },
        {
          type: "leaf",
          name: "topic-5",
          value: +"9609"
        },
        {
          type: "leaf",
          name: "topic-7",
          value: +"9100"
        },
        {
          type: "leaf",
          name: "topic-3",
          value: +"7180"
        },
        {
          type: "leaf",
          name: "topic-10",
          value: +"7171"
        },
        {
          type: "leaf",
          name: "topic-21",
          value: +"6345"
        },
        {
          type: "leaf",
          name: "topic-4",
          value: +"5757"
        },
        {
          type: "leaf",
          name: "topic-11",
          value: +"3353"
        },
        {
          type: "leaf",
          name: "topic-17",
          value: +"3235"
        },
        {
          type: "leaf",
          name: "topic-18",
          value: +"3047"
        },
        {
          type: "leaf",
          name: "topic-19",
          value: +"2701"
        },
        {
          type: "leaf",
          name: "topic-24",
          value: +"2635"
        },
        {
          type: "leaf",
          name: "topic-13",
          value: +"2380"
        },
        {
          type: "leaf",
          name: "topic-8",
          value: +"1925"
        },
        {
          type: "leaf",
          name: "topic-16",
          value: +"1865"
        },
        {
          type: "leaf",
          name: "topic-12",
          value: +"1862"
        },
        {
          type: "leaf",
          name: "topic-9",
          value: +"1776"
        },
        {
          type: "leaf",
          name: "topic-14",
          value: +"1005"
        },
        {
          type: "leaf",
          name: "topic-15",
          value: +"886"
        },
        {
          type: "leaf",
          name: "topic-25",
          value: +"868"
        },
        {
          type: "leaf",
          name: "topic-22",
          value: +"751"
        },
        {
          type: "leaf",
          name: "topic-23",
          value: +"469"
        },
        {
          type: "leaf",
          name: "topic-20",
          value: +"139"
        }
      ]
    },
    {
      type: "node",
      name: "Science/Technology",
      value: 0,
      children: [
        {
          type: "leaf",
          name: "topic-1",
          value: +"13490"
        },
        {
          type: "leaf",
          name: "topic-2",
          value: +"13275"
        },
        {
          type: "leaf",
          name: "topic-7",
          value: +"9926"
        },
        {
          type: "leaf",
          name: "topic-5",
          value: +"8142"
        },
        {
          type: "leaf",
          name: "topic-10",
          value: +"7626"
        },
        {
          type: "leaf",
          name: "topic-4",
          value: +"5287"
        },
        {
          type: "leaf",
          name: "topic-6",
          value: +"5236"
        },
        {
          type: "leaf",
          name: "topic-3",
          value: +"4510"
        },
        {
          type: "leaf",
          name: "topic-21",
          value: +"4380"
        },
        {
          type: "leaf",
          name: "topic-11",
          value: +"4095"
        },
        {
          type: "leaf",
          name: "topic-19",
          value: +"2736"
        },
        {
          type: "leaf",
          name: "topic-17",
          value: +"2574"
        },
        {
          type: "leaf",
          name: "topic-8",
          value: +"2377"
        },
        {
          type: "leaf",
          name: "topic-14",
          value: +"2323"
        },
        {
          type: "leaf",
          name: "topic-18",
          value: +"2318"
        },
        {
          type: "leaf",
          name: "topic-13",
          value: +"1976"
        },
        {
          type: "leaf",
          name: "topic-15",
          value: +"1558"
        },
        {
          type: "leaf",
          name: "topic-12",
          value: +"1473"
        },
        {
          type: "leaf",
          name: "topic-16",
          value: +"1409"
        },
        {
          type: "leaf",
          name: "topic-9",
          value: +"1158"
        },
        {
          type: "leaf",
          name: "topic-22",
          value: +"777"
        },
        {
          type: "leaf",
          name: "topic-25",
          value: +"770"
        },
        {
          type: "leaf",
          name: "topic-23",
          value: +"682"
        },
        {
          type: "leaf",
          name: "topic-24",
          value: +"539"
        },
        {
          type: "leaf",
          name: "topic-20",
          value: +"411"
        }
      ]
    },
    {
      type: "node",
      name: "[R]eddiquette",
      value: 0,
      children: [
        {
          type: "leaf",
          name: "topic-1",
          value: +"16735"
        },
        {
          type: "leaf",
          name: "topic-2",
          value: +"14342"
        },
        {
          type: "leaf",
          name: "topic-7",
          value: +"7614"
        },
        {
          type: "leaf",
          name: "topic-5",
          value: +"7105"
        },
        {
          type: "leaf",
          name: "topic-8",
          value: +"5242"
        },
        {
          type: "leaf",
          name: "topic-3",
          value: +"4746"
        },
        {
          type: "leaf",
          name: "topic-11",
          value: +"4353"
        },
        {
          type: "leaf",
          name: "topic-4",
          value: +"4287"
        },
        {
          type: "leaf",
          name: "topic-10",
          value: +"3997"
        },
        {
          type: "leaf",
          name: "topic-13",
          value: +"2613"
        },
        {
          type: "leaf",
          name: "topic-17",
          value: +"2588"
        },
        {
          type: "leaf",
          name: "topic-6",
          value: +"2580"
        },
        {
          type: "leaf",
          name: "topic-21",
          value: +"2532"
        },
        {
          type: "leaf",
          name: "topic-19",
          value: +"1852"
        },
        {
          type: "leaf",
          name: "topic-18",
          value: +"1482"
        },
        {
          type: "leaf",
          name: "topic-16",
          value: +"1460"
        },
        {
          type: "leaf",
          name: "topic-23",
          value: +"1084"
        },
        {
          type: "leaf",
          name: "topic-25",
          value: +"961"
        },
        {
          type: "leaf",
          name: "topic-12",
          value: +"888"
        },
        {
          type: "leaf",
          name: "topic-24",
          value: +"732"
        },
        {
          type: "leaf",
          name: "topic-22",
          value: +"663"
        },
        {
          type: "leaf",
          name: "topic-15",
          value: +"578"
        },
        {
          type: "leaf",
          name: "topic-14",
          value: +"527"
        },
        {
          type: "leaf",
          name: "topic-9",
          value: +"524"
        },
        {
          type: "leaf",
          name: "topic-20",
          value: +"288"
        }
      ]
    },
    {
      type: "node",
      name: "Coronavirus",
      value: 0,
      children: [
        {
          type: "leaf",
          name: "topic-4",
          value: +"11611"
        },
        {
          type: "leaf",
          name: "topic-1",
          value: +"10061"
        },
        {
          type: "leaf",
          name: "topic-2",
          value: +"9038"
        },
        {
          type: "leaf",
          name: "topic-5",
          value: +"6554"
        },
        {
          type: "leaf",
          name: "topic-7",
          value: +"4872"
        },
        {
          type: "leaf",
          name: "topic-8",
          value: +"4554"
        },
        {
          type: "leaf",
          name: "topic-10",
          value: +"3827"
        },
        {
          type: "leaf",
          name: "topic-21",
          value: +"2483"
        },
        {
          type: "leaf",
          name: "topic-6",
          value: +"2331"
        },
        {
          type: "leaf",
          name: "topic-13",
          value: +"2151"
        },
        {
          type: "leaf",
          name: "topic-11",
          value: +"1729"
        },
        {
          type: "leaf",
          name: "topic-3",
          value: +"1361"
        },
        {
          type: "leaf",
          name: "topic-19",
          value: +"1246"
        },
        {
          type: "leaf",
          name: "topic-17",
          value: +"1174"
        },
        {
          type: "leaf",
          name: "topic-18",
          value: +"1027"
        },
        {
          type: "leaf",
          name: "topic-16",
          value: +"946"
        },
        {
          type: "leaf",
          name: "topic-12",
          value: +"526"
        },
        {
          type: "leaf",
          name: "topic-23",
          value: +"525"
        },
        {
          type: "leaf",
          name: "topic-25",
          value: +"521"
        },
        {
          type: "leaf",
          name: "topic-15",
          value: +"347"
        },
        {
          type: "leaf",
          name: "topic-22",
          value: +"325"
        },
        {
          type: "leaf",
          name: "topic-9",
          value: +"250"
        },
        {
          type: "leaf",
          name: "topic-24",
          value: +"245"
        },
        {
          type: "leaf",
          name: "topic-14",
          value: +"194"
        },
        {
          type: "leaf",
          name: "topic-20",
          value: +"108"
        }
      ]
    }
  ]
}