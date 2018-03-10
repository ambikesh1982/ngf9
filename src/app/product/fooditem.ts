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

export interface Fooditem {
  id?: string;
  title?: string;
  description?: string;
  currency?: string;
  price?: number;
  serving?: number;
  isNonVeg?: boolean;
  category?: string;
  cuisine?: string;
  images?: string[];
  stepperStep?: number;
  // createdAt: Date;
  // createdBy: MiniUser;
  // location?: GeoLocation;
  // feedback?: Feedback;
}




// export class Fooditem {
  // title: string;
  // description: string;
  // currency: string;
  // price: number;
  // serving: number;
  // isNonVeg: boolean;
  // category: string;
  // cuisine: string;
  // images: string[];
  // stepperStep: number;
  // addedAt: Date;
  // addedBy: MiniUser;
  // location?: GeoLocation;
  // feedback?: Feedback;

    // ------------------------------
    // Default fooditem:
    // title = 'untitled'
    // addedBy = {userID, UserName}
    // stepperStep = 1
    // ------------------------------
  // constructor() {
    // console.log('From Fooditem constructor -');
    // this.title = 'untitled fooditem';
    // this.description = null;
    // this.currency = 'INR';
    // this.price = 0.0;
    // this.serving = 1;
    // this.isNonVeg = false;
    // this.category = null;
    // this.cuisine = null;
    // this.images = [];
    // this.stepperStep = 1;
    // this.addedAt = new Date();
    // this.addedBy = { userId: '12345', userName: 'dummyUser' };
    // this.location = { lat: 'xxxxx', lng: 'xxxxx' };
    // this.feedback = { comments: 0, likes: 0 };
  // }

// }
