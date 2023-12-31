import { Contact } from "./contact.entity";
import { Location } from "./location.entity";

export class Attraction {
  name: string;
  description: string;
  coverUrl: string;
  categories: string[];
  foods: string[];
  isFeatured: boolean;
  available: boolean;
  location: Location;
  contact: Contact;
  order: number;
  rating: number;
}
