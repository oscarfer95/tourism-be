import { Contact } from "./contact.entity";
import { Location } from "./location.entity";

export class Attraction {
  id: string;
  name: string;
  description: string;
  coverUrl: string;
  mainCategories: string[];
  categories: string[];
  foods: string[];
  isFeatured: boolean;
  available: boolean;
  location: Location;
  contact: Contact;
  order: number;
  rating: number;
}
