import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose';

import { Contact } from "./contact.entity";
import { Location } from "./location.entity";

@Schema()
export class Attraction extends Document {
  @Prop({type: String, required: true})
  name: string;
  
  @Prop({type: String, required: true})
  description: string;
  
  @Prop({type: String})
  coverUrl: string;
  
  @Prop({type: String})
  categories: string[];
  
  @Prop({type: String})
  foods: string[];
  
  @Prop({type: String, required: true})
  isFeatured: boolean;
  
  @Prop({type: String, required: true})
  available: boolean;

  @Prop({type: Number, required: true})
  order: number;

  @Prop({type: Number, required: true})
  rating: number;

  @Prop({type: Object})
  location: Location;

  @Prop({type: Object})
  contact: Contact;
}

export const AttractionSchema = SchemaFactory.createForClass(Attraction)