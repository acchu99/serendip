import { Flairs } from "../constants/flairs";
import { Topics } from "../constants/topics";
import RadarViewDTO, { FlairTopicLikelihood } from "../interfaces/RadarViewDTO";
import RankViewData from "../interfaces/rankViewDTO"
import { barPlotDTO, lineChartDTO } from "../interfaces/textViewDTO"
import * as d3 from 'd3';

interface DataParserType {
  getMainData: () => {};
  getCorpusViewData: (data:string) => {};
  getRankViewData: (data:string) => RankViewData[];
  getTextViewBarPlotData: (flair:string) => barPlotDTO[];
  getCircularPackingData: () => any;
  getTextViewLineChartData: (flair:string) => lineChartDTO[];
  getMatrixData: () => {};
  getFlairTextData: (flair: string) => Promise<string>;
  getRadarViewData: () => Promise<RadarViewDTO>;
}

interface DataParserPrivateTypes {
   _parsedTopicWiseData: any,
   _parsedTopicWiseWordFrequencyData: RankViewData[],
   _parsedFlairwiseTopicFrequencyData: any,
   _readTopicWiseData: () => {},
   _readTopicWiseWordFrequency: () => {}
   _readFlairwiseTopicFrequency: () => {}
  }

const DataParserService: DataParserType & DataParserPrivateTypes = {

  _parsedTopicWiseData: null,
  _parsedTopicWiseWordFrequencyData: [],
  _parsedFlairwiseTopicFrequencyData: null,

  _readTopicWiseData: async () => {
    try {
      const data = await d3.csv('./data/topicwise.csv');
      return data;
    } catch (error) {
      console.log("Couldn't read not read topicwise.csv")
    }
  },
 
  _readTopicWiseWordFrequency: async() =>{
    try{
      const data = await d3.csv('./data/topicwise_word_frequency.csv');
      return data;
    }catch(error){
      console.log("Couldn't read topicwise_word_frequency.csv")

    }
  },

  _readFlairwiseTopicFrequency: async() =>{
    try{
      const data = await d3.csv('./data/flairwise_topic_frequency.csv');
      return data;
    }catch(error){
      console.log("Couldn't read flairwise_topic_frequency.csv")

    }
  },

  getMainData: async() => {
    DataParserService._parsedTopicWiseData = DataParserService._readTopicWiseData();
    DataParserService._parsedTopicWiseWordFrequencyData = DataParserService._readTopicWiseWordFrequency() as RankViewData[];
    DataParserService._parsedFlairwiseTopicFrequencyData = DataParserService._readFlairwiseTopicFrequency();
    console.log(DataParserService._parsedFlairwiseTopicFrequencyData);
    return ""
  },

  getMatrixData: () => {
    return DataParserService._parsedFlairwiseTopicFrequencyData;
  },

  getCorpusViewData: () => {
    console.log(DataParserService._parsedTopicWiseData);

    return DataParserService._parsedTopicWiseData;
  },

  getRankViewData: (data: string) => {

    console.log(DataParserService._parsedTopicWiseWordFrequencyData);

    return DataParserService._parsedTopicWiseWordFrequencyData;
    // const rankViewData: RankViewData[] = [
    //   {
    //     topicName: "topic_1",
    //       words : {
    //         "word1": 20,
    //         "word2": 25,
    //         "word3": 26,
    //         "word4": 15,
    //       }
    //   },
    //   {
    //     topicName: "topic_2",
    //       words : {
    //         "word1": 22,
    //         "word2": 29,
    //         "word3": 19,
    //         "word4": 10,
    //       }
    //   },
    //   {
    //     topicName: "topic_3",
    //       words : {
    //         "word1": 18,
    //         "word2": 26,
    //         "word3": 13,
    //         "word4": 35,
    //       }
    //   },
    //   {
    //     topicName: "topic_4",
    //       words : {
    //         "word1": 34,
    //         "word2": 23,
    //         "word3": 21,
    //         "word4": 18,
    //       }
    //   },
    //   {
    //     topicName: "topic_5",
    //       words : {
    //         "word1": 16,
    //         "word2": 22,
    //         "word3": 19,
    //         "word4": 20,
    //       }
    //   },
    // ];

    // return { "data": rankViewData }
  },

  getTextViewBarPlotData: (flair: string) => { 
    // Example function to parse data for view 2
    let barPlotData:barPlotDTO[] = [];

    d3.csv("./data/flairwise_topic_frequency.csv").then((iter:any) => {
      iter.map((d:any)=>{
        if(d.flair===flair){
          barPlotData.push({count:+d.count, flair:d.flair, topic:d.topic});
        }
      })
    });

    return barPlotData
  },
  
  getCircularPackingData: () => {
    let flairwise:any = {
      "NonPolitical":[],
      "Politics":[],
      "AskIndia":[],
      "Policy/Economy":[],
      "Business/Finance":[],
      "Science/Technology":[],
      "[R]eddiquette":[],
      "Coronavirus":[]
    }

    // Example function to parse data for view 2
    // let circularPackingData:barPlotDTO[] = [];

    d3.csv("./data/flairwise_topic_frequency.csv").then((iter:any) => {
      iter.map((d:any)=>{
        flairwise[d.flair].push({type: 'leaf', name:d.topic, value: d.count})
        // circularPackingData.push({count:+d.count, flair:d.flair, topic:d.topic})
      });
    });

    console.log('flairwise: ', flairwise)

    let output = {
      type: "node",
      name: "boss",
      value: 0,
      children: [
        {type: "node",name: "NonPolitical",value: 0,children: flairwise["NonPolitical"]},
        {type: "node",name: "Politics",value: 0,children: flairwise["Politics"]},
        {type: "node",name: "AskIndia",value: 0,children: flairwise["AskIndia"]},
        {type: "node",name: "Policy/Economy",value: 0,children: flairwise["Policy/Economy"]},
        {type: "node",name: "Business/Finance",value: 0,children: flairwise["Business/Finance"]},
        {type: "node",name: "Science/Technology",value: 0,children: flairwise["Science/Technology"]},
        {type: "node",name: "[R]eddiquette",value: 0,children: flairwise["[R]eddiquette"]},
        {type: "node",name: "Coronavirus",value: 0,children: flairwise["Coronavirus"]},
      ]
    }

    return output;
  },

  getTextViewLineChartData: (flair: string):lineChartDTO[] => {
    let lineChartData:lineChartDTO[] = [];

    d3.csv("./data/datelevel_topic_frequency.csv").then((iter:any) => {
      iter.map((d:any)=>{
        if(d.flair===flair){
          lineChartData.push({
            date: new Date(Date.parse(d.date)),
            // flair: d.flair,
            "topic-1": +d["topic-1"],
            "topic-2": +d["topic-2"],
            "topic-3": +d["topic-3"],
            "topic-4": +d["topic-4"],
            "topic-5": +d["topic-5"],
            "topic-6": +d["topic-6"],
            "topic-7": +d["topic-7"],
            "topic-8": +d["topic-8"],
            "topic-9": +d["topic-9"],
            "topic-10": +d["topic-10"],
            "topic-11": +d["topic-11"],
            "topic-12": +d["topic-12"],
            "topic-13": +d["topic-13"],
            "topic-14": +d["topic-14"],
            "topic-15": +d["topic-15"],
            "topic-16": +d["topic-16"],
            "topic-17": +d["topic-17"],
            "topic-18": +d["topic-18"],
            "topic-19": +d["topic-19"],
            "topic-20": +d["topic-20"],
            "topic-21": +d["topic-21"],
            "topic-22": +d["topic-22"],
            "topic-23": +d["topic-23"],
            "topic-24": +d["topic-24"],
            "topic-25": +d["topic-25"],
          });
        }
      })
    });

    return lineChartData
  },

  getFlairTextData: async (flair: string) => {
    console.log(flair);
    let filename: string = flair.replace(/\//g, '_');
    let text = await d3.text(`./data/flairs/${filename}.txt`);
    return text
  },

  async getRadarViewData(): Promise<RadarViewDTO> {
    // check from env file if we need to return dummy data
    // if true, return dummy data
    if (process.env.REACT_APP_RADAR_DUMMY_MODE === "true") {
      console.log("Using dummy data for radar view");
      let dummyRadarViewDTO: RadarViewDTO = {
        allTopics: ["topic1", "topic2", "topic3", "topic4", "topic5", "topic6", "topic7", "topic8", "topic9", "topic10"],
        allFlairs: ["flair1", "flair2", "flair3", "flair4", "flair5", "flair6", "flair7", "flair8", "flair9", "flair10"],
        selectedTopics: ["topic1", "topic2", "topic3", "topic4", "topic5"],
        selectedFlairs: ["flair1", "flair2", "flair3"],
        flairTopicLikelihood: [],
      };
      for (let i = 0; i < dummyRadarViewDTO.allFlairs.length; i++) {
        for (let j = 0; j < dummyRadarViewDTO.allTopics.length; j++) {
          dummyRadarViewDTO.flairTopicLikelihood.push({ flair: dummyRadarViewDTO.allFlairs[i], topic: dummyRadarViewDTO.allTopics[j], likeliness: Math.random() });
        }
      }
      console.log(dummyRadarViewDTO);
      return dummyRadarViewDTO;
    }
    console.log("Using real data for radar view");
    const csvdata = await d3.csv('./data/flairwise_topic_likelihood.csv');
    const data: FlairTopicLikelihood[] = csvdata.map((d: any) => {
      return {
        flair: d.flair,
        topic: d.topic,
        likeliness: d.likeliness
      }
    });
    console.log("radar_data",data);
    let topics: string[] = data.map((d: FlairTopicLikelihood) => d.topic)
      .reduce((acc: string[], curr: string) => {
        if (!acc.includes(curr)) {
          acc.push(curr);
        }
        return acc;
      }, []);
    let flairs: string[] = data.map((d: FlairTopicLikelihood) => d.flair)
      .reduce((acc: string[], curr: string) => {
        if (!acc.includes(curr)) {
          acc.push(curr);
        }
        return acc;
      }, []);

    let radarViewDTO: RadarViewDTO = {
      allTopics: topics,
      allFlairs: flairs,
      selectedTopics: [],
      selectedFlairs: [],
      flairTopicLikelihood: data,
    }
    return radarViewDTO;
  },
};



export default DataParserService;
