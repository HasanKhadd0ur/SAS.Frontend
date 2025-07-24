
export interface EventNotification {
  id: string;
  userId: string;
  type: string;
  createdAt: Date;
  isRead: boolean;
  eventId: string;
  title: string;
  interestName: string;
  latitude: number;
  longitude: number;
  occurredAt: Date;
}
