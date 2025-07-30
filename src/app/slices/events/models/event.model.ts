import { Message } from "./message.model";
import { Topic } from "./topic.model";
import {Location} from "./location.model";


export interface Event {
  id: string;
  eventInfo:EventInfo;
  createdAt: Date;
  lastUpdatedAt: Date;
  
  isReviewed: Boolean ;

  topic: Topic;
  location: Location;
  messages: Message[];
}

export interface EventInfo{
  title: string;
  summary: string;
  sentimentScore:number;
  sentimentLabel:string
}