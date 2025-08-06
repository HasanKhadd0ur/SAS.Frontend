import { Message } from "./message.model";
import { Topic } from "./topic.model";
import { Location } from "./location.model";

export interface Event {
  id: string;
  eventInfo: EventInfo;
  createdAt: Date;
  lastUpdatedAt: Date;
  isReviewed: boolean;
  topic: Topic;
  location: Location;
  reviews: Review[];
  messages: Message[];
  mentionedEntities: NamedEntity[]; 
}

export interface EventInfo {
  title: string;
  summary: string;
  sentimentScore: number;
  sentimentLabel: string;
}

export interface NamedEntity {
  id: string;
  entityName: string;
  lastMantionedAt:Date;
  type: NamedEntityType;
}

export interface NamedEntityType {
  id: string;
  typeName: string;
  normalisedName: string;
}

export interface Review {
  id: string;
  eventId: string;
  userId: string;
  userName: string;
  comment: string;
  createdAt: string;
  lastUpdatedAt:string
}
