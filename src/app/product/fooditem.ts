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
         addedBy?: {userId: string, userName: string};
         location?: {lat: string, lng: string};
         feedback?: {comments: number, likes: number};
       }
