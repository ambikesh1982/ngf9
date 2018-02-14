export class MiniUser {
  userId: string;
  userName: string;
}

export class GeoLocation {
  lat: string;
  lng: string;
}

export class Feedback {
  comments: number;
  likes: number;
}

export class Fooditem {
         title: string;
         description: string;
         currency: string;
         price: number;
         serving: number;
         isNonVeg: boolean;
         category: string;
         cuisine: string;
         imageUrl: string;
         addedAt: Date;
         addedBy?: MiniUser;
         location?: GeoLocation;
         feedback?: Feedback;
       }
