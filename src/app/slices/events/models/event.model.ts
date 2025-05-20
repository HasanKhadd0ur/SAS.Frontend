import { Message } from "./message.model";
import { Topic } from "./topic.model";
import {Location} from "./location.model";


export interface Event {
  id: string;
  eventInfo:EventInfo;
  createdAt: Date;
  lastUpdatedAt: Date;
  
  status: 'Under Review' | 'Confirmed' | 'Dismissed' ;

  topic: Topic;
  location: Location;
  messages: Message[];
}

export interface EventInfo{
  title: string;
  summary: string;
  sentimentScore:number;
  sentimentLabel:""
}