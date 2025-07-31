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
  type: NamedEntityType;
}

export interface NamedEntityType {
  id: string;
  typeName: string;
  normalisedName: string;
}
